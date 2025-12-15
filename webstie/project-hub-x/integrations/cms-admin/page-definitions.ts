/**
 * Page Definitions - Define all editable content on each page
 * This is the bridge between static pages and CMS
 */

import { PageContent } from './types';

// ============================================
// HOME PAGE DEFINITION
// ============================================

export const homePageDefinition: PageContent = {
  pageId: 'home',
  pageName: 'Home Page',
  route: '/',
  seo: {
    title: 'Project Hub X - Academic Excellence & Software Solutions',
    description: 'The definitive marketplace for academic excellence and real-world software solutions.',
    keywords: 'projects, software, academic, solutions',
  },
  sections: [
    {
      id: 'hero-section',
      name: 'Hero Section',
      enabled: true,
      order: 1,
      elements: [
        {
          id: 'hero-badge-text',
          type: 'text',
          content: 'System Online v2.0',
          metadata: {
            label: 'Hero Badge Text',
            description: 'Small badge text above main heading',
            tag: 'span',
          },
        },
        {
          id: 'hero-heading-1',
          type: 'heading',
          content: 'PROJECT',
          metadata: {
            label: 'Hero Heading Line 1',
            description: 'First line of main heading',
            tag: 'h1',
          },
        },
        {
          id: 'hero-heading-2',
          type: 'heading',
          content: 'HUB',
          metadata: {
            label: 'Hero Heading Line 2 (Accent)',
            description: 'Second line of main heading (colored)',
            tag: 'h1',
          },
        },
        {
          id: 'hero-heading-3',
          type: 'heading',
          content: 'X',
          metadata: {
            label: 'Hero Heading Line 3 (Outlined)',
            description: 'Third line of main heading (outlined)',
            tag: 'h1',
          },
        },
        {
          id: 'hero-description',
          type: 'paragraph',
          content: 'The definitive marketplace for academic excellence and real-world software solutions. We bridge the gap between theoretical concepts and production-grade execution.',
          metadata: {
            label: 'Hero Description',
            description: 'Main description text under heading',
            tag: 'p',
          },
        },
        {
          id: 'hero-cta-1',
          type: 'button',
          content: 'EXPLORE VAULT',
          metadata: {
            label: 'Primary CTA Button',
            description: 'Main call-to-action button text',
            tag: 'button',
          },
        },
        {
          id: 'hero-cta-2',
          type: 'button',
          content: 'INITIATE REQUEST',
          metadata: {
            label: 'Secondary CTA Button',
            description: 'Secondary call-to-action button text',
            tag: 'button',
          },
        },
        {
          id: 'hero-image',
          type: 'image',
          content: 'https://static.wixstatic.com/media/9bded3_922e5e5d2d5b444b8614250845ab3e7e~mv2.png',
          metadata: {
            label: 'Hero Image',
            description: 'Main hero section image',
          },
        },
      ],
    },
    {
      id: 'stats-section',
      name: 'Stats Ticker',
      enabled: true,
      order: 2,
      elements: [
        {
          id: 'stat-1-number',
          type: 'text',
          content: '500+',
          metadata: { label: 'Stat 1 Number', tag: 'span' },
        },
        {
          id: 'stat-1-label',
          type: 'text',
          content: 'Projects Deployed',
          metadata: { label: 'Stat 1 Label', tag: 'span' },
        },
        {
          id: 'stat-2-number',
          type: 'text',
          content: '98%',
          metadata: { label: 'Stat 2 Number', tag: 'span' },
        },
        {
          id: 'stat-2-label',
          type: 'text',
          content: 'Success Rate',
          metadata: { label: 'Stat 2 Label', tag: 'span' },
        },
        {
          id: 'stat-3-number',
          type: 'text',
          content: '24/7',
          metadata: { label: 'Stat 3 Number', tag: 'span' },
        },
        {
          id: 'stat-3-label',
          type: 'text',
          content: 'Active Support',
          metadata: { label: 'Stat 3 Label', tag: 'span' },
        },
        {
          id: 'stat-4-number',
          type: 'text',
          content: '1K+',
          metadata: { label: 'Stat 4 Number', tag: 'span' },
        },
        {
          id: 'stat-4-label',
          type: 'text',
          content: 'Happy Clients',
          metadata: { label: 'Stat 4 Label', tag: 'span' },
        },
      ],
    },
    {
      id: 'featured-projects',
      name: 'Featured Projects (The Vault)',
      enabled: true,
      order: 3,
      elements: [
        {
          id: 'vault-heading',
          type: 'heading',
          content: 'The Vault',
          metadata: { label: 'Section Heading', tag: 'h2' },
        },
        {
          id: 'vault-description',
          type: 'paragraph',
          content: 'Curated selection of production-ready systems available for immediate deployment.',
          metadata: { label: 'Section Description', tag: 'p' },
        },
        {
          id: 'vault-cta',
          type: 'button',
          content: 'VIEW ALL ARCHIVES',
          metadata: { label: 'View All Button', tag: 'button' },
        },
      ],
    },
  ],
  _status: 'published',
  _version: 1,
  _createdDate: new Date(),
  _updatedDate: new Date(),
};

// ============================================
// PROJECTS PAGE DEFINITION
// ============================================

export const projectsPageDefinition: PageContent = {
  pageId: 'projects',
  pageName: 'Projects Page',
  route: '/projects',
  seo: {
    title: 'Project Marketplace - Browse All Projects',
    description: 'Browse our collection of ready-made projects. Find the perfect solution for your needs.',
  },
  sections: [
    {
      id: 'projects-header',
      name: 'Page Header',
      enabled: true,
      order: 1,
      elements: [
        {
          id: 'projects-heading',
          type: 'heading',
          content: 'Project Marketplace',
          metadata: { label: 'Page Title', tag: 'h1' },
        },
        {
          id: 'projects-description',
          type: 'paragraph',
          content: 'Browse our collection of ready-made projects. Find the perfect solution for your needs.',
          metadata: { label: 'Page Description', tag: 'p' },
        },
        {
          id: 'projects-search-placeholder',
          type: 'text',
          content: 'Search projects by name, description, or tech stack...',
          metadata: { label: 'Search Placeholder', tag: 'input' },
        },
      ],
    },
  ],
  _status: 'published',
  _version: 1,
  _createdDate: new Date(),
  _updatedDate: new Date(),
};

// ============================================
// CONTACT PAGE DEFINITION
// ============================================

export const contactPageDefinition: PageContent = {
  pageId: 'contact',
  pageName: 'Contact Page',
  route: '/contact',
  seo: {
    title: 'Contact Us - Project Hub X',
    description: 'Get in touch with our team',
  },
  sections: [
    {
      id: 'contact-header',
      name: 'Contact Header',
      enabled: true,
      order: 1,
      elements: [
        {
          id: 'contact-heading',
          type: 'heading',
          content: 'Get In Touch',
          metadata: { label: 'Page Title', tag: 'h1' },
        },
        {
          id: 'contact-description',
          type: 'paragraph',
          content: 'Have questions? We\'d love to hear from you.',
          metadata: { label: 'Page Description', tag: 'p' },
        },
      ],
    },
  ],
  _status: 'published',
  _version: 1,
  _createdDate: new Date(),
  _updatedDate: new Date(),
};

// ============================================
// FAQ PAGE DEFINITION
// ============================================

export const faqPageDefinition: PageContent = {
  pageId: 'faq',
  pageName: 'FAQ Page',
  route: '/faq',
  seo: {
    title: 'Frequently Asked Questions - Project Hub X',
    description: 'Find answers to common questions',
  },
  sections: [
    {
      id: 'faq-header',
      name: 'FAQ Header',
      enabled: true,
      order: 1,
      elements: [
        {
          id: 'faq-heading',
          type: 'heading',
          content: 'Frequently Asked Questions',
          metadata: { label: 'Page Title', tag: 'h1' },
        },
        {
          id: 'faq-description',
          type: 'paragraph',
          content: 'Find answers to the most commonly asked questions.',
          metadata: { label: 'Page Description', tag: 'p' },
        },
      ],
    },
  ],
  _status: 'published',
  _version: 1,
  _createdDate: new Date(),
  _updatedDate: new Date(),
};

// ============================================
// ALL PAGE DEFINITIONS
// ============================================

export const allPageDefinitions: PageContent[] = [
  homePageDefinition,
  projectsPageDefinition,
  contactPageDefinition,
  faqPageDefinition,
];

/**
 * Initialize all page definitions in the content store
 */
export const initializePageDefinitions = async () => {
  const { ContentStore } = await import('./content-store');
  
  allPageDefinitions.forEach(pageDef => {
    // Save as both draft and published
    ContentStore.savePageContent({ ...pageDef, _status: 'draft' });
    ContentStore.savePageContent({ ...pageDef, _status: 'published' });
  });
  
  console.log('✅ Page definitions initialized');
};
