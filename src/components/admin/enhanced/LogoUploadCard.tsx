
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Eye, X } from 'lucide-react';
import { toast } from 'sonner';

interface LogoUploadCardProps {
  currentLogo: string;
  onLogoChange: (url: string) => void;
}

export default function LogoUploadCard({ currentLogo, onLogoChange }: LogoUploadCardProps) {
  const [logoUrl, setLogoUrl] = useState(currentLogo);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUrlChange = (url: string) => {
    setLogoUrl(url);
    setPreviewUrl(url);
  };

  const handleSave = async () => {
    setUploading(true);
    try {
      onLogoChange(logoUrl);
      toast.success('Logo zostało zaktualizowane');
    } catch (error) {
      toast.error('Błąd podczas zapisywania logo');
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    setPreviewUrl('');
    setLogoUrl('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Logo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="logo-url">URL Logo</Label>
          <div className="flex gap-2">
            <Input
              id="logo-url"
              value={logoUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://example.com/logo.png lub base64://..."
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setPreviewUrl(logoUrl)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {(previewUrl || currentLogo) && (
          <div className="space-y-2">
            <Label>Podgląd Logo</Label>
            <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
              <img 
                src={previewUrl || currentLogo} 
                alt="Logo preview" 
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = '';
                  toast.error('Nie można załadować obrazu');
                }}
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6"
                onClick={clearPreview}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-1">Przykładowe loga</h4>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUrlChange('https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop')}
            >
              Logo 1
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUrlChange('https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=100&h=100&fit=crop')}
            >
              Logo 2
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUrlChange('https://images.unsplash.com/photo-1545235617-7a424c1a60cc?w=100&h=100&fit=crop')}
            >
              Logo 3
            </Button>
          </div>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={uploading || !logoUrl}
          className="w-full"
        >
          {uploading ? 'Zapisywanie...' : 'Zapisz Logo'}
        </Button>
      </CardContent>
    </Card>
  );
}
