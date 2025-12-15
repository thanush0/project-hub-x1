/**
 * Media Manager - Upload and manage media assets
 */

import { useState, useEffect } from 'react';
import { ContentStore, MediaAsset } from '@/integrations/cms-admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Upload, Trash2, Search, Image as ImageIcon, Copy, Check } from 'lucide-react';

export default function MediaManager() {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedia, setFilteredMedia] = useState<MediaAsset[]>([]);
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadAlt, setUploadAlt] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredMedia(
        mediaAssets.filter(
          (asset) =>
            asset.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asset.alt?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredMedia(mediaAssets);
    }
  }, [searchTerm, mediaAssets]);

  const loadMedia = () => {
    const assets = ContentStore.getAllMedia();
    setMediaAssets(assets);
    setFilteredMedia(assets);
  };

  const handleUpload = () => {
    if (!uploadUrl) {
      alert('Please enter an image URL');
      return;
    }

    const newAsset: MediaAsset = {
      _id: `media_${Date.now()}`,
      filename: uploadUrl.split('/').pop() || 'unnamed',
      url: uploadUrl,
      type: 'image',
      size: 0,
      mimeType: 'image/jpeg',
      alt: uploadAlt,
      uploadedBy: 'admin',
      uploadedAt: new Date(),
      usedIn: [],
    };

    ContentStore.addMediaAsset(newAsset);
    setUploadUrl('');
    setUploadAlt('');
    loadMedia();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this media asset?')) {
      ContentStore.deleteMedia(id);
      loadMedia();
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="p-6 bg-foreground/5 border-accent/20">
        <h3 className="font-heading text-lg font-bold mb-4 text-foreground">
          Upload Media
        </h3>
        <div className="space-y-4">
          <div>
            <label className="font-paragraph text-sm text-foreground/70 block mb-2">
              Image URL
            </label>
            <Input
              type="url"
              value={uploadUrl}
              onChange={(e) => setUploadUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="bg-background border-accent/20 focus:border-accent"
            />
          </div>
          <div>
            <label className="font-paragraph text-sm text-foreground/70 block mb-2">
              Alt Text (optional)
            </label>
            <Input
              type="text"
              value={uploadAlt}
              onChange={(e) => setUploadAlt(e.target.value)}
              placeholder="Describe the image"
              className="bg-background border-accent/20 focus:border-accent"
            />
          </div>
          <Button
            onClick={handleUpload}
            className="bg-accent text-background hover:bg-accent/90"
          >
            <Upload className="w-4 h-4 mr-2" />
            Add Media
          </Button>
        </div>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50 w-4 h-4" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search media..."
          className="pl-10 bg-foreground/5 border-accent/20 focus:border-accent"
        />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.length > 0 ? (
          filteredMedia.map((asset) => (
            <Card
              key={asset._id}
              className="overflow-hidden bg-foreground/5 border-accent/20 hover:border-accent transition-colors group"
            >
              {/* Image Preview */}
              <div className="aspect-square bg-background relative">
                {asset.type === 'image' ? (
                  <img
                    src={asset.url}
                    alt={asset.alt || asset.filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-foreground/20" />
                  </div>
                )}
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyUrl(asset.url, asset._id)}
                    className="border-accent/20"
                  >
                    {copiedId === asset._id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(asset._id)}
                    className="border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="font-paragraph text-sm font-semibold text-foreground truncate">
                  {asset.filename}
                </p>
                {asset.alt && (
                  <p className="font-paragraph text-xs text-foreground/60 truncate mt-1">
                    {asset.alt}
                  </p>
                )}
                <p className="font-paragraph text-xs text-foreground/50 mt-1">
                  {new Date(asset.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <ImageIcon className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
            <p className="font-paragraph text-foreground/60">
              {searchTerm ? 'No media found' : 'No media uploaded yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
