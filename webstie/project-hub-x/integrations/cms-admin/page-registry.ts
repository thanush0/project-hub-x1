/**
 * Page Registry - Central mapping of all routes to CMS pages
 * This is the SINGLE SOURCE OF TRUTH for page-to-route mapping
 */

export interface PageRegistryEntry {
  pageId: string;
  pageName: string;
  route: string;
  description: string;
  enabled: boolean;
}

/**
 * CENTRAL PAGE REGISTRY
 * Add new pages here to make them CMS-manageable
 */
export const PAGE_REGISTRY: PageRegistryEntry[] = [
  {
    pageId: 'home',
    pageName: 'Home Page',
    route: '/',
    description: 'Main landing page with hero, features, and testimonials',
    enabled: true,
  },
  {
    pageId: 'projects',
    pageName: 'Projects Page',
    route: '/projects',
    description: 'Browse all ready-made projects',
    enabled: true,
  },
  {
    pageId: 'contact',
    pageName: 'Contact Page',
    route: '/contact',
    description: 'Contact form and information',
    enabled: true,
  },
  {
    pageId: 'faq',
    pageName: 'FAQ Page',
    route: '/faq',
    description: 'Frequently asked questions',
    enabled: true,
  },
  {
    pageId: 'custom-request',
    pageName: 'Custom Request Page',
    route: '/custom-request',
    description: 'Custom project request form',
    enabled: true,
  },
  {
    pageId: 'dashboard',
    pageName: 'User Dashboard',
    route: '/dashboard',
    description: 'Member dashboard (protected)',
    enabled: true,
  },
];

/**
 * Get page registry entry by route
 */
export function getPageByRoute(route: string): PageRegistryEntry | null {
  return PAGE_REGISTRY.find(p => p.route === route) || null;
}

/**
 * Get page registry entry by pageId
 */
export function getPageById(pageId: string): PageRegistryEntry | null {
  return PAGE_REGISTRY.find(p => p.pageId === pageId) || null;
}

/**
 * Get all enabled pages
 */
export function getEnabledPages(): PageRegistryEntry[] {
  return PAGE_REGISTRY.filter(p => p.enabled);
}

/**
 * Check if a route is CMS-managed
 */
export function isPageManaged(route: string): boolean {
  return PAGE_REGISTRY.some(p => p.route === route && p.enabled);
}
