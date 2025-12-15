/**
 * Content Editor - WYSIWYG-style editor for page content
 */

import { useState, useEffect } from 'react';
import { PageContent, PageSection, PageContentElement, ContentStore } from '@/integrations/cms-admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  Eye, 
  Upload, 
  Trash2, 
  ChevronUp, 
  ChevronDown,
  Plus,
  Type,
  Image as ImageIcon,
  Link as LinkIcon,
  Layout
} from 'lucide-react';

interface ContentEditorProps {
  pageContent: PageContent;
  onSave: (content: PageContent) => void;
  onPublish: (content: PageContent) => void;
}

export default function ContentEditor({ pageContent, onSave, onPublish }: ContentEditorProps) {
  const [editedContent, setEditedContent] = useState<PageContent>(pageContent);
  const [activeSection, setActiveSection] = useState<string | null>(
    pageContent.sections[0]?.id || null
  );
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setEditedContent(pageContent);
    setHasChanges(false);
  }, [pageContent]);

  const handleSeoChange = (field: keyof typeof editedContent.seo, value: string) => {
    const updated = {
      ...editedContent,
      seo: {
        ...editedContent.seo,
        [field]: value,
      },
    };
    setEditedContent(updated);
    setHasChanges(true);
  };

  const handleSectionToggle = (sectionId: string) => {
    const updated = {
      ...editedContent,
      sections: editedContent.sections.map(section =>
        section.id === sectionId
          ? { ...section, enabled: !section.enabled }
          : section
      ),
    };
    setEditedContent(updated);
    setHasChanges(true);
  };

  const handleElementChange = (sectionId: string, elementId: string, value: string) => {
    const updated = {
      ...editedContent,
      sections: editedContent.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              elements: section.elements.map(element =>
                element.id === elementId
                  ? { ...element, content: value }
                  : element
              ),
            }
          : section
      ),
    };
    setEditedContent(updated);
    setHasChanges(true);
  };

  const handleSectionOrderChange = (sectionId: string, direction: 'up' | 'down') => {
    const currentIndex = editedContent.sections.findIndex(s => s.id === sectionId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= editedContent.sections.length) return;

    const newSections = [...editedContent.sections];
    [newSections[currentIndex], newSections[newIndex]] = [newSections[newIndex], newSections[currentIndex]];

    // Update order numbers
    newSections.forEach((section, index) => {
      section.order = index + 1;
    });

    setEditedContent({ ...editedContent, sections: newSections });
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(editedContent);
    setHasChanges(false);
  };

  const handlePublish = () => {
    onPublish(editedContent);
    setHasChanges(false);
  };

  const renderElementEditor = (section: PageSection, element: PageContentElement) => {
    const elementValue = element.content || '';

    return (
      <div
        key={element.id}
        className="p-4 bg-foreground/5 border border-accent/10 rounded-lg hover:border-accent/30 transition-colors"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {element.type === 'text' && <Type className="w-4 h-4 text-accent" />}
              {element.type === 'heading' && <Type className="w-4 h-4 text-accent" />}
              {element.type === 'image' && <ImageIcon className="w-4 h-4 text-accent" />}
              {element.type === 'link' && <LinkIcon className="w-4 h-4 text-accent" />}
              {element.type === 'button' && <Layout className="w-4 h-4 text-accent" />}
              
              <p className="font-paragraph text-sm font-semibold text-foreground">
                {element.metadata?.label || element.id}
              </p>
            </div>
            {element.metadata?.description && (
              <p className="font-paragraph text-xs text-foreground/50">
                {element.metadata.description}
              </p>
            )}
          </div>
          <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded uppercase">
            {element.type}
          </span>
        </div>

        {element.type === 'image' ? (
          <div className="space-y-2">
            <Input
              type="url"
              value={elementValue}
              onChange={(e) => handleElementChange(section.id, element.id, e.target.value)}
              placeholder="Image URL"
              className="bg-background border-accent/20 focus:border-accent"
            />
            {elementValue && (
              <div className="mt-2 border border-accent/20 rounded overflow-hidden">
                <img
                  src={elementValue}
                  alt="Preview"
                  className="w-full h-32 object-cover"
                />
              </div>
            )}
          </div>
        ) : element.type === 'button' || element.type === 'text' ? (
          <Input
            type="text"
            value={elementValue}
            onChange={(e) => handleElementChange(section.id, element.id, e.target.value)}
            placeholder={element.metadata?.placeholder || 'Enter text'}
            className="bg-background border-accent/20 focus:border-accent"
          />
        ) : (
          <Textarea
            value={elementValue}
            onChange={(e) => handleElementChange(section.id, element.id, e.target.value)}
            placeholder={element.metadata?.placeholder || 'Enter content'}
            rows={element.type === 'heading' ? 2 : 4}
            className="bg-background border-accent/20 focus:border-accent resize-none"
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between p-4 bg-foreground/5 border border-accent/20 rounded-lg">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">
            {editedContent.pageName}
          </h2>
          <p className="font-paragraph text-sm text-foreground/60">
            {editedContent.route}
          </p>
        </div>
        
        <div className="flex gap-2">
          {hasChanges && (
            <span className="px-3 py-2 bg-accent/10 text-accent text-sm rounded">
              Unsaved changes
            </span>
          )}
          <Button
            variant="outline"
            className="border-accent/20"
            disabled={!hasChanges}
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button
            className="bg-accent text-background hover:bg-accent/90"
            onClick={handlePublish}
          >
            <Upload className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          {editedContent.sections.map((section, index) => (
            <Card key={section.id} className="p-6 bg-background border-accent/10">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-accent/10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                    className="font-heading text-lg font-bold text-foreground hover:text-accent transition-colors"
                  >
                    {section.name}
                  </button>
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                    {section.elements.length} elements
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Order Controls */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleSectionOrderChange(section.id, 'up')}
                      disabled={index === 0}
                      className="p-1 hover:bg-foreground/10 rounded disabled:opacity-30"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleSectionOrderChange(section.id, 'down')}
                      disabled={index === editedContent.sections.length - 1}
                      className="p-1 hover:bg-foreground/10 rounded disabled:opacity-30"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Enable/Disable Toggle */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={section.enabled}
                      onChange={() => handleSectionToggle(section.id)}
                      className="w-4 h-4 accent-accent"
                    />
                    <span className="font-paragraph text-sm text-foreground/70">
                      {section.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Section Elements */}
              {activeSection === section.id && (
                <div className="space-y-3">
                  {section.elements.map(element => renderElementEditor(section, element))}
                </div>
              )}
            </Card>
          ))}
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo">
          <Card className="p-6 bg-background border-accent/10">
            <h3 className="font-heading text-lg font-bold mb-4 text-foreground">
              SEO Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="font-paragraph text-sm text-foreground/70 block mb-2">
                  Page Title
                </label>
                <Input
                  type="text"
                  value={editedContent.seo.title}
                  onChange={(e) => handleSeoChange('title', e.target.value)}
                  placeholder="Page title for search engines"
                  className="bg-foreground/5 border-accent/20 focus:border-accent"
                />
                <p className="font-paragraph text-xs text-foreground/50 mt-1">
                  {editedContent.seo.title.length} / 60 characters recommended
                </p>
              </div>

              <div>
                <label className="font-paragraph text-sm text-foreground/70 block mb-2">
                  Meta Description
                </label>
                <Textarea
                  value={editedContent.seo.description}
                  onChange={(e) => handleSeoChange('description', e.target.value)}
                  placeholder="Brief description for search results"
                  rows={4}
                  className="bg-foreground/5 border-accent/20 focus:border-accent"
                />
                <p className="font-paragraph text-xs text-foreground/50 mt-1">
                  {editedContent.seo.description.length} / 160 characters recommended
                </p>
              </div>

              <div>
                <label className="font-paragraph text-sm text-foreground/70 block mb-2">
                  Keywords (optional)
                </label>
                <Input
                  type="text"
                  value={editedContent.seo.keywords || ''}
                  onChange={(e) => handleSeoChange('keywords', e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                  className="bg-foreground/5 border-accent/20 focus:border-accent"
                />
              </div>

              <div>
                <label className="font-paragraph text-sm text-foreground/70 block mb-2">
                  OG Image URL (optional)
                </label>
                <Input
                  type="url"
                  value={editedContent.seo.ogImage || ''}
                  onChange={(e) => handleSeoChange('ogImage', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="bg-foreground/5 border-accent/20 focus:border-accent"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview">
          <Card className="p-6 bg-background border-accent/10">
            <h3 className="font-heading text-lg font-bold mb-4 text-foreground">
              Preview
            </h3>
            <p className="font-paragraph text-foreground/60">
              Live preview will be available in the next update.
            </p>
            <p className="font-paragraph text-sm text-foreground/50 mt-2">
              For now, you can publish changes and view them on the actual page.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
