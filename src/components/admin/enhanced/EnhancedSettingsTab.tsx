import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { toast } from 'sonner';
import { Save, Upload, Palette, Globe, Shield, Mail } from 'lucide-react';
import LogoUploadCard from './LogoUploadCard';

export default function EnhancedSettingsTab() {
  const { settings, updateSetting, loading } = useSiteSettings();
  const [saving, setSaving] = useState(false);

  const handleSaveSetting = async (key: string, value: any) => {
    setSaving(true);
    try {
      await updateSetting(key as any, value);
      toast.success('Ustawienie zapisane pomyślnie');
    } catch (error) {
      toast.error('Błąd podczas zapisywania ustawienia');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Ustawienia systemu</h1>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Ogólne
          </TabsTrigger>
          <TabsTrigger value="branding" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="auth" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Autoryzacja
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Podstawowe ustawienia strony
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nazwa strony</Label>
                <Input
                  id="site-name"
                  value={settings.site_name}
                  onChange={(e) => handleSaveSetting('site_name', e.target.value)}
                  placeholder="Nazwa Twojej strony"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Opis strony</Label>
                <Textarea
                  id="site-description"
                  value={settings.site_description}
                  onChange={(e) => handleSaveSetting('site_description', e.target.value)}
                  placeholder="Krótki opis Twojej strony"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tryb konserwacji</Label>
                  <p className="text-sm text-muted-foreground">
                    Wyłącz stronę dla użytkowników (admini nadal mają dostęp)
                  </p>
                </div>
                <Switch
                  checked={settings.maintenance_mode}
                  onCheckedChange={(checked) => handleSaveSetting('maintenance_mode', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tryb ciemny</Label>
                  <p className="text-sm text-muted-foreground">
                    Włącz obsługę trybu ciemnego dla użytkowników
                  </p>
                </div>
                <Switch
                  checked={settings.dark_mode_enabled}
                  onCheckedChange={(checked) => handleSaveSetting('dark_mode_enabled', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          {/* Logo Upload Card */}
          <LogoUploadCard 
            currentLogo={settings.logo_url}
            onLogoChange={(url) => handleSaveSetting('logo_url', url)}
          />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Kolory i wygląd
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Kolor główny</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={settings.primary_color}
                      onChange={(e) => handleSaveSetting('primary_color', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.primary_color}
                      onChange={(e) => handleSaveSetting('primary_color', e.target.value)}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Kolor pomocniczy</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={settings.secondary_color}
                      onChange={(e) => handleSaveSetting('secondary_color', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.secondary_color}
                      onChange={(e) => handleSaveSetting('secondary_color', e.target.value)}
                      placeholder="#64748b"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auth" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Ustawienia autoryzacji
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Wymagaj potwierdzenia emaila</Label>
                  <p className="text-sm text-muted-foreground">
                    Użytkownicy muszą potwierdzić email przed aktywacją konta
                  </p>
                </div>
                <Switch
                  checked={settings.email_confirmation_required}
                  onCheckedChange={(checked) => handleSaveSetting('email_confirmation_required', checked)}
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Informacja</h4>
                <p className="text-sm text-blue-700">
                  Wyłączenie potwierdzania emaila przyspiesza proces rejestracji, 
                  ale zmniejsza bezpieczeństwo. Zalecane tylko do testów.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Ustawienia email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-2">W przygotowaniu</h4>
                <p className="text-sm text-yellow-700">
                  Ustawienia serwera SMTP i szablonów email będą dostępne wkrótce.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button disabled={saving} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          {saving ? 'Zapisywanie...' : 'Zapisz wszystkie zmiany'}
        </Button>
      </div>
    </div>
  );
}
