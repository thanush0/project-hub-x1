/**
 * Admin CMS - Main export file
 */

// Types
export * from './types';

// Content Store
export { ContentStore } from './content-store';

// Content Injection
export {
  ContentProvider,
  useContent,
  EditableText,
  EditableImage,
  EditableLink,
  EditableSection,
  withContentInjection,
} from './content-injector';

// Page Wrapper
export { PageWrapper, withCMS } from './page-wrapper';

// Page Registry
export { PAGE_REGISTRY, getPageByRoute, getPageById, getEnabledPages } from './page-registry';

// Content Scanner
export { scanPageContent } from './content-scanner';

// Page Definitions
export {
  homePageDefinition,
  projectsPageDefinition,
  contactPageDefinition,
  faqPageDefinition,
  allPageDefinitions,
  initializePageDefinitions,
} from './page-definitions';

// Auth Service
export { AdminAuthService } from './auth-service';
