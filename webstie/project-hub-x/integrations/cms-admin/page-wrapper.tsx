/**
 * Page Wrapper - Automatic content injection for all pages
 * Wraps pages with ContentProvider based on current route
 * NO MODIFICATION TO EXISTING PAGE CODE REQUIRED
 */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContentProvider } from './content-injector';
import { getPageByRoute } from './page-registry';

interface PageWrapperProps {
  children: React.ReactNode;
}

/**
 * Wraps any page component with CMS content injection
 * Automatically determines pageId from current route
 */
export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const location = useLocation();
  const pageEntry = getPageByRoute(location.pathname);
  
  // If page is registered in CMS, wrap with ContentProvider
  if (pageEntry && pageEntry.enabled) {
    return (
      <ContentProvider pageId={pageEntry.pageId}>
        {children}
      </ContentProvider>
    );
  }
  
  // Otherwise, render page without CMS
  return <>{children}</>;
};

/**
 * HOC to wrap individual page components
 * Usage: export default withCMS(HomePage);
 */
export function withCMS<P extends object>(
  Component: React.ComponentType<P>,
  pageId?: string
) {
  return function CMSWrappedComponent(props: P) {
    const location = useLocation();
    
    // Use provided pageId or determine from route
    const effectivePageId = pageId || getPageByRoute(location.pathname)?.pageId;
    
    if (!effectivePageId) {
      // No CMS for this page
      return <Component {...props} />;
    }
    
    return (
      <ContentProvider pageId={effectivePageId}>
        <Component {...props} />
      </ContentProvider>
    );
  };
}
