/**
 * Admin Dashboard - Main CMS Interface
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminAuthService, ContentStore, PageContent } from '@/integrations/cms-admin';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentEditor from '@/components/admin/ContentEditor';
import MediaManager from '@/components/admin/MediaManager';
import VersionHistory from '@/components/admin/VersionHistory';
import { 
  LogOut, 
  FileEdit, 
  Image as ImageIcon, 
  Settings, 
  History,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [pages, setPages] = useState<PageContent[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null);

  useEffect(() => {
    // Check authentication
    const currentSession = AdminAuthService.getCurrentSession();
    
    if (!currentSession) {
      navigate('/admin/login');
      return;
    }

    setSession(currentSession);
    loadPages();
  }, [navigate]);

  const loadPages = () => {
    const allPages = ContentStore.getAllPages();
    // Filter to show only draft versions
    const draftPages = allPages.filter(p => p._status === 'draft');
    setPages(draftPages);
    
    // Auto-select first page
    if (draftPages.length > 0 && !selectedPage) {
      setSelectedPage(draftPages[0]);
    } else if (selectedPage) {
      // Refresh selected page data
      const updatedPage = draftPages.find(p => p.pageId === selectedPage.pageId);
      if (updatedPage) {
        setSelectedPage(updatedPage);
      }
    }
  };

  const handleLogout = () => {
    if (session) {
      AdminAuthService.logout(session.token);
      AdminAuthService.clearSession();
    }
    navigate('/admin/login');
  };

  const handleSave = (content: PageContent) => {
    ContentStore.savePageContent(content);
    alert('Draft saved successfully!');
    loadPages();
  };

  const handlePublish = (content: PageContent) => {
    // Save as draft first
    ContentStore.savePageContent({ ...content, _status: 'draft' });
    
    // Then publish
    const success = ContentStore.publishPage(content.pageId);
    if (success) {
      alert('Page published successfully!');
      loadPages();
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-accent/20 bg-foreground/5 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Admin CMS
            </h1>
            <p className="font-paragraph text-sm text-foreground/60">
              Content Management System
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-paragraph text-sm text-foreground/70">
                {session.email}
              </p>
              <p className="font-paragraph text-xs text-accent uppercase">
                {session.role}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-accent/20 text-foreground hover:bg-foreground hover:text-background"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="pages" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="pages">
              <FileEdit className="w-4 h-4 mr-2" />
              Pages
            </TabsTrigger>
            <TabsTrigger value="media">
              <ImageIcon className="w-4 h-4 mr-2" />
              Media
            </TabsTrigger>
            <TabsTrigger value="versions">
              <History className="w-4 h-4 mr-2" />
              Versions
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Pages Tab */}
          <TabsContent value="pages">
            <div className="grid grid-cols-12 gap-6">
              {/* Page List */}
              <div className="col-span-3">
                <Card className="p-4 bg-foreground/5 border-accent/20">
                  <h3 className="font-heading text-lg font-bold mb-4 text-foreground">
                    Pages
                  </h3>
                  <div className="space-y-2">
                    {pages.map(page => (
                      <button
                        key={page.pageId}
                        onClick={() => setSelectedPage(page)}
                        className={`w-full text-left p-3 rounded transition-colors ${
                          selectedPage?.pageId === page.pageId
                            ? 'bg-accent/20 border border-accent'
                            : 'bg-background border border-accent/10 hover:border-accent/30'
                        }`}
                      >
                        <p className="font-paragraph text-sm font-semibold text-foreground">
                          {page.pageName}
                        </p>
                        <p className="font-paragraph text-xs text-foreground/60">
                          {page.route}
                        </p>
                      </button>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Page Editor */}
              <div className="col-span-9">
                {selectedPage ? (
                  <ContentEditor
                    pageContent={selectedPage}
                    onSave={handleSave}
                    onPublish={handlePublish}
                  />
                ) : (
                  <Card className="p-6 bg-foreground/5 border-accent/20 text-center">
                    <p className="font-paragraph text-foreground/60">
                      Select a page to edit
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media">
            <MediaManager />
          </TabsContent>

          {/* Versions Tab */}
          <TabsContent value="versions">
            {selectedPage ? (
              <VersionHistory
                pageId={selectedPage.pageId}
                onRestore={() => loadPages()}
              />
            ) : (
              <Card className="p-6 bg-foreground/5 border-accent/20 text-center">
                <p className="font-paragraph text-foreground/60">
                  Select a page to view version history
                </p>
              </Card>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="p-6 bg-foreground/5 border-accent/20">
              <h2 className="font-heading text-2xl font-bold mb-4 text-foreground">
                Settings
              </h2>
              <p className="font-paragraph text-foreground/60">
                Settings coming soon...
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
