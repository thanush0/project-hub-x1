/**
 * Admin CMS Content Management System
 * Type definitions for editable content
 */

// ============================================
// PAGE CONTENT SCHEMA
// ============================================

export interface PageContentElement {
  id: string;                    // Unique identifier for the element
  type: 'text' | 'heading' | 'paragraph' | 'button' | 'image' | 'link' | 'section';
  content: string | null;        // The actual content
  metadata?: {
    label?: string;              // Admin-friendly label
    description?: string;        // What this element does
    placeholder?: string;        // Default value
    className?: string;          // Original CSS classes
    tag?: string;               // HTML tag (h1, p, span, etc.)
  };
}

export interface PageSection {
  id: string;                    // Unique section identifier
  name: string;                  // Human-readable name
  enabled: boolean;              // Show/hide section
  order: number;                 // Display order
  elements: PageContentElement[]; // All editable elements in this section
}

export interface PageContent {
  pageId: string;                // Unique page identifier (e.g., 'home', 'projects')
  pageName: string;              // Human-readable name
  route: string;                 // URL route
  seo: {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
  };
  sections: PageSection[];       // All sections on the page
  _version?: number;             // Content version
  _status?: 'draft' | 'published';
  _createdDate?: Date;
  _updatedDate?: Date;
}

// ============================================
// CONTENT VERSION CONTROL
// ============================================

export interface ContentVersion {
  id: string;
  pageId: string;
  versionNumber: number;
  content: PageContent;
  createdBy: string;
  createdAt: Date;
  message?: string;              // Commit message
}

// ============================================
// MEDIA MANAGEMENT
// ============================================

export interface MediaAsset {
  _id: string;
  filename: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;                  // in bytes
  mimeType: string;
  alt?: string;
  uploadedBy: string;
  uploadedAt: Date;
  usedIn: string[];             // Array of pageIds where used
}

// ============================================
// ADMIN USER & AUTHENTICATION
// ============================================

export interface AdminUser {
  _id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'editor' | 'viewer';
  name: string;
  lastLogin?: Date;
  _createdDate: Date;
}

export interface AdminSession {
  token: string;
  userId: string;
  email: string;
  role: string;
  expiresAt: Date;
}

// ============================================
// CONTENT INJECTION MAPPING
// ============================================

export interface ContentMapping {
  // Maps data-content-id to actual content
  [contentId: string]: string | null;
}

export interface PageContentCache {
  pageId: string;
  status: 'draft' | 'published';
  mapping: ContentMapping;
  lastUpdated: Date;
}

// ============================================
// ADMIN DASHBOARD STATE
// ============================================

export interface AdminState {
  currentPage: PageContent | null;
  selectedSection: string | null;
  editMode: boolean;
  previewMode: boolean;
  unsavedChanges: boolean;
}
