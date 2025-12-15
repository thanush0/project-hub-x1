/**
 * Content Scanner - Automatic content discovery from DOM
 * Scans existing pages and extracts editable elements
 */

export interface ScannedContent {
  pageId: string;
  texts: ContentItem[];
  images: ContentItem[];
  links: ContentItem[];
  sections: SectionItem[];
}

export interface ContentItem {
  id: string;
  type: 'text' | 'image' | 'link';
  label: string;
  value: string;
  selector: string;
  tagName: string;
}

export interface SectionItem {
  id: string;
  label: string;
  enabled: boolean;
  order: number;
}

/**
 * Scan DOM and extract editable content
 * This runs client-side to discover content structure
 */
export function scanPageContent(pageId: string): ScannedContent {
  const texts: ContentItem[] = [];
  const images: ContentItem[] = [];
  const links: ContentItem[] = [];
  const sections: SectionItem[] = [];

  // Scan for text elements with data-content-id
  const textElements = document.querySelectorAll('[data-content-id]');
  textElements.forEach((el, index) => {
    const id = el.getAttribute('data-content-id') || `${pageId}-text-${index}`;
    const tagName = el.tagName.toLowerCase();
    
    texts.push({
      id,
      type: 'text',
      label: generateLabel(id, tagName),
      value: el.textContent || '',
      selector: `[data-content-id="${id}"]`,
      tagName,
    });
  });

  // Scan for semantic headings (h1-h6)
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((el, index) => {
    // Skip if already has data-content-id
    if (el.hasAttribute('data-content-id')) return;
    
    const tagName = el.tagName.toLowerCase();
    const id = `${pageId}-${tagName}-${index}`;
    const text = el.textContent?.trim() || '';
    
    // Only include meaningful headings
    if (text.length > 0 && text.length < 200) {
      texts.push({
        id,
        type: 'text',
        label: `${tagName.toUpperCase()}: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`,
        value: text,
        selector: generateUniqueSelector(el),
        tagName,
      });
    }
  });

  // Scan for images
  const imageElements = document.querySelectorAll('img[src]');
  imageElements.forEach((el, index) => {
    const img = el as HTMLImageElement;
    const id = img.getAttribute('data-content-id') || `${pageId}-img-${index}`;
    const alt = img.alt || img.src.split('/').pop() || 'Image';
    
    images.push({
      id,
      type: 'image',
      label: alt,
      value: img.src,
      selector: generateUniqueSelector(img),
      tagName: 'img',
    });
  });

  // Scan for sections with data-section-id
  const sectionElements = document.querySelectorAll('[data-section-id]');
  sectionElements.forEach((el, index) => {
    const id = el.getAttribute('data-section-id') || `${pageId}-section-${index}`;
    const firstHeading = el.querySelector('h1, h2, h3, h4, h5, h6');
    const label = firstHeading?.textContent?.trim() || `Section ${index + 1}`;
    
    sections.push({
      id,
      label,
      enabled: true,
      order: index,
    });
  });

  return {
    pageId,
    texts,
    images,
    links,
    sections,
  };
}

/**
 * Generate a human-readable label from content ID
 */
function generateLabel(id: string, tagName: string): string {
  // Remove pageId prefix
  const cleanId = id.replace(/^[^-]+-/, '');
  
  // Convert kebab-case to Title Case
  const words = cleanId.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  );
  
  return `${tagName.toUpperCase()}: ${words.join(' ')}`;
}

/**
 * Generate a unique CSS selector for an element
 */
function generateUniqueSelector(element: Element): string {
  // Try data-content-id first
  if (element.hasAttribute('data-content-id')) {
    return `[data-content-id="${element.getAttribute('data-content-id')}"]`;
  }
  
  // Try ID
  if (element.id) {
    return `#${element.id}`;
  }
  
  // Build path from parent classes and element position
  const path: string[] = [];
  let current: Element | null = element;
  
  while (current && current !== document.body) {
    let selector = current.tagName.toLowerCase();
    
    // Add class if available
    if (current.className && typeof current.className === 'string') {
      const classes = current.className.split(' ').filter(c => c.length > 0);
      if (classes.length > 0) {
        selector += `.${classes[0]}`;
      }
    }
    
    // Add nth-child if needed for uniqueness
    const parent = current.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(
        s => s.tagName === current!.tagName
      );
      if (siblings.length > 1) {
        const index = siblings.indexOf(current) + 1;
        selector += `:nth-child(${index})`;
      }
    }
    
    path.unshift(selector);
    current = parent;
  }
  
  return path.join(' > ');
}

/**
 * Auto-generate content structure for a page
 * This is called when a page is first added to CMS
 */
export function generateInitialContent(pageId: string, pageName: string): any {
  // Import auto-detector at runtime to avoid circular dependencies
  const { autoDetectPageContent } = require('./content-auto-detector');
  return autoDetectPageContent(pageId, pageName);
}
