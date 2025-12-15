const PAGE_REGISTRY = [
  {
    pageId: "home",
    pageName: "Home Page",
    route: "/",
    description: "Main landing page with hero, features, and testimonials",
    enabled: true
  },
  {
    pageId: "projects",
    pageName: "Projects Page",
    route: "/projects",
    description: "Browse all ready-made projects",
    enabled: true
  },
  {
    pageId: "contact",
    pageName: "Contact Page",
    route: "/contact",
    description: "Contact form and information",
    enabled: true
  },
  {
    pageId: "faq",
    pageName: "FAQ Page",
    route: "/faq",
    description: "Frequently asked questions",
    enabled: true
  },
  {
    pageId: "custom-request",
    pageName: "Custom Request Page",
    route: "/custom-request",
    description: "Custom project request form",
    enabled: true
  },
  {
    pageId: "dashboard",
    pageName: "User Dashboard",
    route: "/dashboard",
    description: "Member dashboard (protected)",
    enabled: true
  }
];

function generateInitialContent(pageId, pageName) {
  const { autoDetectPageContent } = require("./content-auto-detector");
  return autoDetectPageContent(pageId, pageName);
}

const pageContents = /* @__PURE__ */ new Map();
const contentVersions = /* @__PURE__ */ new Map();
const mediaAssets = /* @__PURE__ */ new Map();
const publishedCache = /* @__PURE__ */ new Map();
const ContentStore = {
  // -------------------- PAGE CONTENT --------------------
  /**
   * Get page content by pageId
   */
  getPageContent(pageId, status = "published") {
    const content = pageContents.get(`${pageId}_${status}`);
    return content || null;
  },
  /**
   * Save page content (draft or published)
   */
  savePageContent(pageContent) {
    const key = `${pageContent.pageId}_${pageContent._status || "draft"}`;
    pageContent._updatedDate = /* @__PURE__ */ new Date();
    if (!pageContent._createdDate) {
      pageContent._createdDate = /* @__PURE__ */ new Date();
    }
    pageContents.set(key, pageContent);
    if (pageContent._status === "published") {
      this.updatePublishedCache(pageContent);
    }
  },
  /**
   * Get all pages (both draft and published)
   * Initializes pages from PAGE_REGISTRY if they don't exist
   */
  getAllPages() {
    PAGE_REGISTRY.forEach((pageEntry) => {
      const draftKey = `${pageEntry.pageId}_draft`;
      const publishedKey = `${pageEntry.pageId}_published`;
      if (!pageContents.has(draftKey)) {
        const initialContent = generateInitialContent(
          pageEntry.pageId,
          pageEntry.pageName
        );
        pageContents.set(draftKey, initialContent);
      }
      if (!pageContents.has(publishedKey)) {
        const draftContent = pageContents.get(draftKey);
        if (draftContent) {
          const publishedContent = { ...draftContent, _status: "published" };
          pageContents.set(publishedKey, publishedContent);
          this.rebuildPublishedCache(pageEntry.pageId);
        }
      }
    });
    return Array.from(pageContents.values());
  },
  /**
   * Publish draft content
   */
  publishPage(pageId) {
    const draft = this.getPageContent(pageId, "draft");
    if (!draft) return false;
    this.createVersion(pageId, draft, "system", "Published from draft");
    const published = { ...draft, _status: "published" };
    this.savePageContent(published);
    return true;
  },
  // -------------------- VERSION CONTROL --------------------
  /**
   * Create a new version of page content
   */
  createVersion(pageId, content, createdBy, message) {
    const versions = contentVersions.get(pageId) || [];
    const newVersion = {
      id: `version_${Date.now()}`,
      pageId,
      versionNumber: versions.length + 1,
      content: JSON.parse(JSON.stringify(content)),
      // Deep clone
      createdBy,
      createdAt: /* @__PURE__ */ new Date(),
      message
    };
    versions.push(newVersion);
    contentVersions.set(pageId, versions);
    return newVersion;
  },
  /**
   * Get version history for a page
   */
  getVersionHistory(pageId) {
    return contentVersions.get(pageId) || [];
  },
  /**
   * Restore a specific version
   */
  restoreVersion(pageId, versionId) {
    const versions = this.getVersionHistory(pageId);
    const version = versions.find((v) => v.id === versionId);
    if (!version) return false;
    const restoredContent = { ...version.content, _status: "draft" };
    this.savePageContent(restoredContent);
    return true;
  },
  // -------------------- PUBLISHED CACHE --------------------
  /**
   * Update the published content cache for fast runtime access
   */
  updatePublishedCache(pageContent) {
    const mapping = {};
    pageContent.sections.forEach((section) => {
      if (section.enabled) {
        section.elements.forEach((element) => {
          mapping[element.id] = element.content;
        });
      }
    });
    publishedCache.set(pageContent.pageId, {
      pageId: pageContent.pageId,
      status: "published",
      mapping,
      lastUpdated: /* @__PURE__ */ new Date()
    });
  },
  /**
   * Get published content mapping (used for runtime content injection)
   * Supports both direct content and nested field structures
   */
  getPublishedMapping(pageId) {
    const cache = publishedCache.get(pageId);
    if (cache) {
      return cache.mapping;
    }
    const page = this.getPageContent(pageId, "published");
    if (!page) {
      return {};
    }
    const mapping = {};
    if (page.content) {
      this.flattenObject(page.content, "", mapping);
    }
    if (page.media) {
      Object.entries(page.media).forEach(([key, value]) => {
        mapping[key] = value;
      });
    }
    return mapping;
  },
  /**
   * Flatten nested object into dot notation keys
   * Example: {hero: {title: "Hello"}} => {"hero.title": "Hello"}
   */
  flattenObject(obj, prefix, result) {
    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        this.flattenObject(value, fullKey, result);
      } else {
        result[fullKey] = value;
      }
    });
  },
  // -------------------- MEDIA MANAGEMENT --------------------
  /**
   * Add a new media asset
   */
  addMediaAsset(asset) {
    mediaAssets.set(asset._id, asset);
  },
  /**
   * Get all media assets
   */
  getAllMedia() {
    return Array.from(mediaAssets.values());
  },
  /**
   * Get media by ID
   */
  getMediaById(id) {
    return mediaAssets.get(id) || null;
  },
  /**
   * Delete media asset
   */
  deleteMedia(id) {
    return mediaAssets.delete(id);
  },
  // -------------------- UTILITY --------------------
  /**
   * Export all content (for backup)
   */
  exportAll() {
    return {
      pages: this.getAllPages(),
      versions: contentVersions,
      media: this.getAllMedia()
    };
  },
  /**
   * Clear all content (for testing)
   */
  clearAll() {
    pageContents.clear();
    contentVersions.clear();
    mediaAssets.clear();
    publishedCache.clear();
  }
};

export { ContentStore };
