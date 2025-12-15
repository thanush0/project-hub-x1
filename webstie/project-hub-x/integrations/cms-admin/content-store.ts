/**
 * Content Store - Central storage for all editable page content
 * This acts as the single source of truth for CMS content
 */

import { PageContent, PageContentCache, ContentVersion, MediaAsset } from './types';

// ============================================
// IN-MEMORY STORAGE (Replace with DB in production)
// ============================================

// All page contents (both draft and published)
const pageContents: Map<string, PageContent> = new Map();

// Content version history
const contentVersions: Map<string, ContentVersion[]> = new Map();

// Media assets
const mediaAssets: Map<string, MediaAsset> = new Map();

// Published content cache (for fast runtime access)
const publishedCache: Map<string, PageContentCache> = new Map();

// ============================================
// CONTENT CRUD OPERATIONS
// ============================================

export const ContentStore = {
  // -------------------- PAGE CONTENT --------------------
  
  /**
   * Get page content by pageId
   */
  getPageContent(pageId: string, status: 'draft' | 'published' = 'published'): PageContent | null {
    const content = pageContents.get(`${pageId}_${status}`);
    return content || null;
  },

  /**
   * Save page content (draft or published)
   */
  savePageContent(pageContent: PageContent): void {
    const key = `${pageContent.pageId}_${pageContent._status || 'draft'}`;
    pageContent._updatedDate = new Date();
    
    if (!pageContent._createdDate) {
      pageContent._createdDate = new Date();
    }
    
    pageContents.set(key, pageContent);
    
    // Update published cache if status is published
    if (pageContent._status === 'published') {
      this.updatePublishedCache(pageContent);
    }
  },

  /**
   * Get all pages (both draft and published)
   */
  getAllPages(): PageContent[] {
    return Array.from(pageContents.values());
  },

  /**
   * Publish draft content
   */
  publishPage(pageId: string): boolean {
    const draft = this.getPageContent(pageId, 'draft');
    if (!draft) return false;

    // Create version before publishing
    this.createVersion(pageId, draft, 'system', 'Published from draft');

    // Copy draft to published
    const published = { ...draft, _status: 'published' as const };
    this.savePageContent(published);
    
    return true;
  },

  // -------------------- VERSION CONTROL --------------------
  
  /**
   * Create a new version of page content
   */
  createVersion(
    pageId: string,
    content: PageContent,
    createdBy: string,
    message?: string
  ): ContentVersion {
    const versions = contentVersions.get(pageId) || [];
    const newVersion: ContentVersion = {
      id: `version_${Date.now()}`,
      pageId,
      versionNumber: versions.length + 1,
      content: JSON.parse(JSON.stringify(content)), // Deep clone
      createdBy,
      createdAt: new Date(),
      message,
    };
    
    versions.push(newVersion);
    contentVersions.set(pageId, versions);
    
    return newVersion;
  },

  /**
   * Get version history for a page
   */
  getVersionHistory(pageId: string): ContentVersion[] {
    return contentVersions.get(pageId) || [];
  },

  /**
   * Restore a specific version
   */
  restoreVersion(pageId: string, versionId: string): boolean {
    const versions = this.getVersionHistory(pageId);
    const version = versions.find(v => v.id === versionId);
    
    if (!version) return false;
    
    const restoredContent = { ...version.content, _status: 'draft' as const };
    this.savePageContent(restoredContent);
    
    return true;
  },

  // -------------------- PUBLISHED CACHE --------------------
  
  /**
   * Update the published content cache for fast runtime access
   */
  updatePublishedCache(pageContent: PageContent): void {
    const mapping: Record<string, string | null> = {};
    
    // Flatten all sections and elements into a simple key-value map
    pageContent.sections.forEach(section => {
      if (section.enabled) {
        section.elements.forEach(element => {
          mapping[element.id] = element.content;
        });
      }
    });

    publishedCache.set(pageContent.pageId, {
      pageId: pageContent.pageId,
      status: 'published',
      mapping,
      lastUpdated: new Date(),
    });
  },

  /**
   * Get published content mapping (used for runtime content injection)
   */
  getPublishedMapping(pageId: string): Record<string, string | null> {
    const cache = publishedCache.get(pageId);
    return cache?.mapping || {};
  },

  // -------------------- MEDIA MANAGEMENT --------------------
  
  /**
   * Add a new media asset
   */
  addMediaAsset(asset: MediaAsset): void {
    mediaAssets.set(asset._id, asset);
  },

  /**
   * Get all media assets
   */
  getAllMedia(): MediaAsset[] {
    return Array.from(mediaAssets.values());
  },

  /**
   * Get media by ID
   */
  getMediaById(id: string): MediaAsset | null {
    return mediaAssets.get(id) || null;
  },

  /**
   * Delete media asset
   */
  deleteMedia(id: string): boolean {
    return mediaAssets.delete(id);
  },

  // -------------------- UTILITY --------------------
  
  /**
   * Export all content (for backup)
   */
  exportAll(): {
    pages: PageContent[];
    versions: Map<string, ContentVersion[]>;
    media: MediaAsset[];
  } {
    return {
      pages: this.getAllPages(),
      versions: contentVersions,
      media: this.getAllMedia(),
    };
  },

  /**
   * Clear all content (for testing)
   */
  clearAll(): void {
    pageContents.clear();
    contentVersions.clear();
    mediaAssets.clear();
    publishedCache.clear();
  },
};
