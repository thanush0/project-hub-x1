/**
 * Content Auto-Detector
 * Automatically detects and structures content from pages
 * Creates editable content definitions without modifying page source
 */

import { PageContent, PageSection, PageContentElement } from './types';

/**
 * Auto-detect content structure for a page
 * This analyzes the page structure and creates editable fields
 */
export function autoDetectPageContent(pageId: string, pageName: string): PageContent {
  const sections: PageSection[] = [];
  
  // Define common sections based on pageId
  switch (pageId) {
    case 'home':
      sections.push(
        {
          id: 'hero',
          name: 'Hero Section',
          enabled: true,
          order: 0,
          elements: [
            {
              id: 'hero-title',
              type: 'text',
              label: 'Hero Title',
              content: '',
              metadata: { selector: 'h1:first-of-type', tagName: 'h1' },
            },
            {
              id: 'hero-subtitle',
              type: 'text',
              label: 'Hero Subtitle',
              content: '',
              metadata: { selector: '.hero-subtitle', tagName: 'p' },
            },
            {
              id: 'hero-cta-text',
              type: 'text',
              label: 'CTA Button Text',
              content: '',
              metadata: { selector: '.hero-cta', tagName: 'button' },
            },
          ],
        },
        {
          id: 'features',
          name: 'Features Section',
          enabled: true,
          order: 1,
          elements: [],
        },
        {
          id: 'testimonials',
          name: 'Testimonials Section',
          enabled: true,
          order: 2,
          elements: [],
        }
      );
      break;
      
    case 'projects':
      sections.push(
        {
          id: 'page-header',
          name: 'Page Header',
          enabled: true,
          order: 0,
          elements: [
            {
              id: 'page-title',
              type: 'text',
              label: 'Page Title',
              content: 'Project Marketplace',
              metadata: { selector: 'h1:first-of-type', tagName: 'h1' },
            },
            {
              id: 'page-description',
              type: 'text',
              label: 'Page Description',
              content: 'Browse our collection of ready-made projects. Find the perfect solution for your needs.',
              metadata: { selector: 'p:first-of-type', tagName: 'p' },
            },
          ],
        }
      );
      break;
      
    case 'contact':
      sections.push(
        {
          id: 'page-header',
          name: 'Page Header',
          enabled: true,
          order: 0,
          elements: [
            {
              id: 'page-title',
              type: 'text',
              label: 'Page Title',
              content: 'Get in Touch',
              metadata: { selector: 'h1:first-of-type', tagName: 'h1' },
            },
            {
              id: 'page-description',
              type: 'text',
              label: 'Page Description',
              content: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
              metadata: { selector: '.page-description', tagName: 'p' },
            },
          ],
        },
        {
          id: 'contact-info',
          name: 'Contact Information',
          enabled: true,
          order: 1,
          elements: [
            {
              id: 'contact-email',
              type: 'text',
              label: 'Email Address',
              content: 'contact@projecthubx.com',
              metadata: {},
            },
            {
              id: 'contact-phone',
              type: 'text',
              label: 'Phone Number',
              content: '+1 (555) 123-4567',
              metadata: {},
            },
            {
              id: 'contact-address',
              type: 'text',
              label: 'Physical Address',
              content: '123 Main Street, City, Country',
              metadata: {},
            },
          ],
        }
      );
      break;
      
    case 'faq':
      sections.push(
        {
          id: 'page-header',
          name: 'Page Header',
          enabled: true,
          order: 0,
          elements: [
            {
              id: 'page-title',
              type: 'text',
              label: 'Page Title',
              content: 'Frequently Asked Questions',
              metadata: {},
            },
          ],
        }
      );
      break;
      
    case 'custom-request':
      sections.push(
        {
          id: 'page-header',
          name: 'Page Header',
          enabled: true,
          order: 0,
          elements: [
            {
              id: 'page-title',
              type: 'text',
              label: 'Page Title',
              content: 'Custom Project Request',
              metadata: {},
            },
            {
              id: 'page-description',
              type: 'text',
              label: 'Page Description',
              content: "Can't find what you're looking for? Let us build a custom solution for you.",
              metadata: {},
            },
          ],
        }
      );
      break;
      
    case 'dashboard':
      sections.push(
        {
          id: 'page-header',
          name: 'Page Header',
          enabled: true,
          order: 0,
          elements: [
            {
              id: 'page-title',
              type: 'text',
              label: 'Dashboard Title',
              content: 'My Dashboard',
              metadata: {},
            },
          ],
        }
      );
      break;
      
    default:
      // Generic page structure
      sections.push({
        id: 'page-header',
        name: 'Page Header',
        enabled: true,
        order: 0,
        elements: [
          {
            id: 'page-title',
            type: 'text',
            label: 'Page Title',
            content: pageName,
            metadata: {},
          },
        ],
      });
  }
  
  return {
    pageId,
    pageName,
    route: pageId === 'home' ? '/' : `/${pageId}`,
    seo: {
      title: pageName,
      description: `${pageName} - Project Hub X`,
      keywords: [],
      ogImage: '',
      ogType: 'website',
    },
    sections,
    content: {},
    media: {},
    _status: 'draft',
    _version: 1,
    _createdDate: new Date(),
    _updatedDate: new Date(),
  };
}
