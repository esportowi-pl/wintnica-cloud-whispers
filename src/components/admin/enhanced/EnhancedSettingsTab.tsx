
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { toast } from 'sonner';
import { Upload, Save, Palette, Globe } from 'lucide-react';

export default function EnhancedSettingsTab() {
  const { settings, updateSetting, loading } = useSiteSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(localSettings)) {
        if (value !== settings[key as keyof typeof settings]) {
          await updateSetting(key as keyof typeof settings, value);
        }
      }
      toast.success('Ustawienia zostały zapisane!');
    } catch (error) {
      toast.error('Błąd podczas zapisywania ustawień');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload to Supabase Storage here
    // For now, we'll just simulate it
    const fakeUrl = URL.createObjectURL(file);
    setLocalSettings(prev => ({ ...prev, logo_url: fakeUrl }));
    toast.success('Logo zostało przesłane!');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ustawienia zaawansowane</h1>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Zapisywanie...' : 'Zapisz zmiany'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Podstawowe informacje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site_name">Nazwa portalu</Label>
              <Input
                id="site_name"
                value={localSettings.site_name}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, site_name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="site_description">Opis portalu</Label>
              <Textarea
                id="site_description"
                value={localSettings.site_description}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, site_description: e.target.value }))}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Logo i branding
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="logo">Logo portalu</Label>
              <div className="flex items-center gap-4 mt-2">
                {localSettings.logo_url && (
                  <img
                    src={localSettings.logo_url}
                    alt="Logo"
                    className="h-12 w-12 rounded border"
                  />
                )}
                <div>
                  <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('logo')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Prześlij logo
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Kolory i wygląd
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="primary_color">Kolor główny</Label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="color"
                  id="primary_color"
                  value={localSettings.primary_color}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, primary_color: e.target.value }))}
                  className="h-10 w-20 rounded border cursor-pointer"
                />
                <Input
                  value={localSettings.primary_color}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, primary_color: e.target.value }))}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="secondary_color">Kolor drugorzędny</Label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="color"
                  id="secondary_color"
                  value={localSettings.secondary_color}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, secondary_color: e.target.value }))}
                  className="h-10 w-20 rounded border cursor-pointer"
                />
                <Input
                  value={localSettings.secondary_color}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, secondary_color: e.target.value }))}
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funkcjonalności</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Tryb ciemny</Label>
                <p className="text-sm text-muted-foreground">
                  Pozwól użytkownikom na przełączanie trybu ciemnego
                </p>
              </div>
              <Switch
                checked={localSettings.dark_mode_enabled}
                onCheckedChange={(checked) => 
                  setLocalSettings(prev => ({ ...prev, dark_mode_enabled: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Tryb konserwacji</Label>
                <p className="text-sm text-muted-foreground">
                  Wyłącz portal dla zwykłych użytkowników
                </p>
              </div>
              <Switch
                checked={localSettings.maintenance_mode}
                onCheckedChange={(checked) => 
                  setLocalSettings(prev => ({ ...prev, maintenance_mode: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
