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
