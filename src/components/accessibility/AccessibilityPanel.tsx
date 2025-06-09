
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAccessibility, ColorBlindnessType, VisualMode, Season } from "@/contexts/AccessibilityContext";
import { Settings, Eye, Palette, Sun, Moon, Contrast, Type, Volume2 } from "lucide-react";

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings, resetSettings } = useAccessibility();

  const colorBlindnessOptions = [
    { value: 'none', label: 'Normalny wzrok', description: 'Bez filtrów kolorów' },
    { value: 'protanopia', label: 'Protanopia', description: 'Brak percepcji czerwieni' },
    { value: 'deuteranopia', label: 'Deuteranopia', description: 'Brak percepcji zieleni' },
    { value: 'tritanopia', label: 'Tritanopia', description: 'Brak percepcji błękitu' },
    { value: 'achromatopsia', label: 'Achromatyzm', description: 'Brak percepcji kolorów' }
  ];

  const visualModeOptions = [
    { value: 'day', label: 'Dzień', icon: Sun },
    { value: 'night', label: 'Noc', icon: Moon },
    { value: 'auto', label: 'Auto', icon: Settings },
    { value: 'high-contrast', label: 'Wysoki kontrast', icon: Contrast }
  ];

  const seasonOptions = [
    { value: 'spring', label: 'Wiosna', color: 'bg-green-500' },
    { value: 'summer', label: 'Lato', color: 'bg-yellow-500' },
    { value: 'autumn', label: 'Jesień', color: 'bg-orange-500' },
    { value: 'winter', label: 'Zima', color: 'bg-blue-500' }
  ];

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 shadow-lg"
        size="icon"
        title="Otwórz panel dostępności"
      >
        <Eye className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[80vh] overflow-y-auto">
      <Card className="shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Panel Dostępności
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Tryb wizualny */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Tryb wizualny
            </label>
            <div className="grid grid-cols-2 gap-2">
              {visualModeOptions.map((mode) => {
                const Icon = mode.icon;
                return (
                  <Button
                    key={mode.value}
                    variant={settings.visualMode === mode.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSettings({ visualMode: mode.value as VisualMode })}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {mode.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Sezon */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Motyw sezonowy</label>
            <div className="grid grid-cols-2 gap-2">
              {seasonOptions.map((season) => (
                <Button
                  key={season.value}
                  variant={settings.season === season.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSettings({ season: season.value as Season })}
                  className="flex items-center gap-2"
                >
                  <div className={`w-3 h-3 rounded-full ${season.color}`} />
                  {season.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Daltonizm */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Typ daltonizmu</label>
            <Select 
              value={settings.colorBlindness} 
              onValueChange={(value) => updateSettings({ colorBlindness: value as ColorBlindnessType })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {colorBlindnessOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rozmiar czcionki */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Type className="h-4 w-4" />
              Rozmiar czcionki: {settings.fontSize}px
            </label>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([value]) => updateSettings({ fontSize: value })}
              min={12}
              max={24}
              step={1}
              className="w-full"
            />
          </div>

          {/* Przełączniki */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                <label className="text-sm font-medium">Wysoki kontrast</label>
              </div>
              <Switch
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <label className="text-sm font-medium">Redukuj animacje</label>
              </div>
              <Switch
                checked={settings.reducedMotion}
                onCheckedChange={(checked) => updateSettings({ reducedMotion: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <label className="text-sm font-medium">Czytnik ekranu</label>
              </div>
              <Switch
                checked={settings.screenReader}
                onCheckedChange={(checked) => updateSettings({ screenReader: checked })}
              />
            </div>
          </div>

          {/* Status i akcje */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex flex-wrap gap-1">
              {settings.colorBlindness !== 'none' && (
                <Badge variant="secondary">
                  {colorBlindnessOptions.find(o => o.value === settings.colorBlindness)?.label}
                </Badge>
              )}
              {settings.highContrast && <Badge variant="secondary">Wysoki kontrast</Badge>}
              {settings.reducedMotion && <Badge variant="secondary">Mniej animacji</Badge>}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={resetSettings}
              className="w-full"
            >
              Przywróć domyślne
            </Button>
          </div>

          {/* Informacja */}
          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <p className="font-medium mb-1">💙 Witnica dla wszystkich</p>
            <p>Ten panel pomaga dostosować stronę do Twoich potrzeb wzrokowych, abyś mógł zobaczyć nasz świat w tych samych kolorach co inni mieszkańcy Witnicy.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilityPanel;
