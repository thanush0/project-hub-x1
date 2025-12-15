/**
 * Version History - View and restore previous versions
 */

import { useState, useEffect } from 'react';
import { ContentStore, ContentVersion, PageContent } from '@/integrations/cms-admin';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { History, RotateCcw, Eye, Clock } from 'lucide-react';

interface VersionHistoryProps {
  pageId: string;
  onRestore: (version: ContentVersion) => void;
}

export default function VersionHistory({ pageId, onRestore }: VersionHistoryProps) {
  const [versions, setVersions] = useState<ContentVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<ContentVersion | null>(null);

  useEffect(() => {
    loadVersions();
  }, [pageId]);

  const loadVersions = () => {
    const history = ContentStore.getVersionHistory(pageId);
    setVersions(history.reverse()); // Most recent first
  };

  const handleRestore = (version: ContentVersion) => {
    if (confirm(`Restore version ${version.versionNumber}? This will create a new draft.`)) {
      ContentStore.restoreVersion(pageId, version.id);
      onRestore(version);
      alert('Version restored as draft. You can now edit and publish it.');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-foreground/5 border-accent/20">
        <div className="flex items-center gap-3 mb-6">
          <History className="w-6 h-6 text-accent" />
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Version History
            </h2>
            <p className="font-paragraph text-sm text-foreground/60">
              View and restore previous versions of this page
            </p>
          </div>
        </div>

        {versions.length > 0 ? (
          <div className="space-y-3">
            {versions.map((version) => (
              <Card
                key={version.id}
                className={`p-4 bg-background border transition-colors cursor-pointer ${
                  selectedVersion?.id === version.id
                    ? 'border-accent'
                    : 'border-accent/10 hover:border-accent/30'
                }`}
                onClick={() => setSelectedVersion(version)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded font-mono">
                        v{version.versionNumber}
                      </span>
                      <span className="font-paragraph text-sm font-semibold text-foreground">
                        {version.message || 'Version saved'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-foreground/60">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(version.createdAt)}
                      </div>
                      <div>
                        By: {version.createdBy}
                      </div>
                    </div>

                    {selectedVersion?.id === version.id && (
                      <div className="mt-4 pt-4 border-t border-accent/10">
                        <p className="font-paragraph text-sm text-foreground/70 mb-3">
                          Version Details:
                        </p>
                        <div className="space-y-1 text-xs text-foreground/60">
                          <p>• Sections: {version.content.sections.length}</p>
                          <p>
                            • Total Elements:{' '}
                            {version.content.sections.reduce(
                              (sum, s) => sum + s.elements.length,
                              0
                            )}
                          </p>
                          <p>• Page: {version.content.pageName}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVersion(version);
                      }}
                      className="border-accent/20"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRestore(version);
                      }}
                      className="bg-accent text-background hover:bg-accent/90"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <History className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
            <p className="font-paragraph text-foreground/60">
              No version history available yet
            </p>
            <p className="font-paragraph text-sm text-foreground/50 mt-2">
              Versions are created automatically when you publish changes
            </p>
          </div>
        )}
      </Card>

      {/* Version Comparison (Future Enhancement) */}
      {selectedVersion && (
        <Card className="p-6 bg-foreground/5 border-accent/20">
          <h3 className="font-heading text-lg font-bold mb-4 text-foreground">
            Version Preview
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-background border border-accent/10 rounded">
              <span className="font-paragraph text-sm text-foreground/70">
                SEO Title:
              </span>
              <span className="font-paragraph text-sm text-foreground font-semibold">
                {selectedVersion.content.seo.title}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background border border-accent/10 rounded">
              <span className="font-paragraph text-sm text-foreground/70">
                Status:
              </span>
              <span className="font-paragraph text-sm text-foreground font-semibold">
                {selectedVersion.content._status}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background border border-accent/10 rounded">
              <span className="font-paragraph text-sm text-foreground/70">
                Sections:
              </span>
              <span className="font-paragraph text-sm text-foreground font-semibold">
                {selectedVersion.content.sections.length}
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
