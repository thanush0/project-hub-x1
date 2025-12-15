/**
 * Content Injector - Runtime content injection system
 * Wraps components to inject CMS-managed content without modifying source code
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ContentStore } from './content-store';

// ============================================
// CONTENT CONTEXT
// ============================================

interface ContentContextValue {
  getContent: (contentId: string, defaultValue?: string) => string;
  isLoading: boolean;
  pageId: string | null;
}

const ContentContext = createContext<ContentContextValue>({
  getContent: (contentId: string, defaultValue?: string) => defaultValue || contentId,
  isLoading: false,
  pageId: null,
});

// ============================================
// CONTENT PROVIDER - Wraps entire app
// ============================================

interface ContentProviderProps {
  children: React.ReactNode;
  pageId: string;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children, pageId }) => {
  const [contentMapping, setContentMapping] = useState<Record<string, string | null>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load published content for this page
    const mapping = ContentStore.getPublishedMapping(pageId);
    setContentMapping(mapping);
    setIsLoading(false);
  }, [pageId]);

  const getContent = (contentId: string, defaultValue?: string): string => {
    // Check if we have CMS content for this ID
    if (contentMapping[contentId] !== undefined && contentMapping[contentId] !== null) {
      return contentMapping[contentId] as string;
    }
    // Fall back to default value
    return defaultValue || contentId;
  };

  return (
    <ContentContext.Provider value={{ getContent, isLoading, pageId }}>
      {children}
    </ContentContext.Provider>
  );
};

// ============================================
// HOOK - Access content from any component
// ============================================

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};

// ============================================
// EDITABLE COMPONENT WRAPPERS
// ============================================

/**
 * Editable Text - Replaces hardcoded text with CMS content
 */
interface EditableTextProps {
  id: string;
  defaultValue: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

export const EditableText: React.FC<EditableTextProps> = ({
  id,
  defaultValue,
  as: Component = 'span',
  className,
  children,
}) => {
  const { getContent } = useContent();
  const content = getContent(id, defaultValue);

  return (
    <Component className={className} data-content-id={id}>
      {content || children}
    </Component>
  );
};

/**
 * Editable Image - Replaces hardcoded images with CMS-managed images
 */
interface EditableImageProps {
  id: string;
  defaultSrc: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  id,
  defaultSrc,
  alt,
  className,
  width,
  height,
}) => {
  const { getContent } = useContent();
  const src = getContent(id, defaultSrc);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      data-content-id={id}
    />
  );
};

/**
 * Editable Link - Replaces hardcoded links with CMS-managed URLs
 */
interface EditableLinkProps {
  id: string;
  defaultHref: string;
  className?: string;
  children: React.ReactNode;
}

export const EditableLink: React.FC<EditableLinkProps> = ({
  id,
  defaultHref,
  className,
  children,
}) => {
  const { getContent } = useContent();
  const href = getContent(id, defaultHref);

  return (
    <a href={href} className={className} data-content-id={id}>
      {children}
    </a>
  );
};

/**
 * Editable Section - Can be enabled/disabled from admin
 */
interface EditableSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const EditableSection: React.FC<EditableSectionProps> = ({
  id,
  children,
  className,
}) => {
  const { pageId } = useContent();
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (!pageId) return;
    
    // Check if section is enabled in CMS
    const pageContent = ContentStore.getPageContent(pageId, 'published');
    if (pageContent) {
      const section = pageContent.sections.find(s => s.id === id);
      setIsEnabled(section?.enabled ?? true);
    }
  }, [id, pageId]);

  if (!isEnabled) return null;

  return (
    <div className={className} data-section-id={id}>
      {children}
    </div>
  );
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Parse page and extract editable elements
 * This is used by the admin panel to discover editable content
 */
export const extractEditableElements = (pageId: string): {
  texts: string[];
  images: string[];
  links: string[];
  sections: string[];
} => {
  // In a real implementation, this would scan the DOM
  // For now, we'll return empty arrays
  return {
    texts: [],
    images: [],
    links: [],
    sections: [],
  };
};

/**
 * Inject content into existing components without modifying them
 * This is a HOC (Higher Order Component) approach
 */
export function withContentInjection<P extends object>(
  Component: React.ComponentType<P>,
  pageId: string
) {
  return function ContentInjectedComponent(props: P) {
    return (
      <ContentProvider pageId={pageId}>
        <Component {...props} />
      </ContentProvider>
    );
  };
}
