
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accessibility, 
  Eye, 
  Sun, 
  Moon, 
  Palette, 
  Type, 
  Volume2, 
  Settings,
  X,
  Snowflake,
  Flower,
  Leaf,
  Zap
} from "lucide-react";
import { useAccessibility } from '@/contexts/AccessibilityContext';

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useAccessibility();

  const colorBlindnessOptions = [
    { value: 'none', label: 'Normalny wzrok', desc: 'Standardowe kolory' },
    { value: 'protanopia', label: 'Protanopia', desc: 'Brak percepcji czerwieni' },
    { value: 'deuteranopia', label: 'Deuteranopia', desc: 'Brak percepcji zieleni' },
    { value: 'tritanopia', label: 'Tritanopia', desc: 'Brak percepcji błękitu' },
    { value: 'achromatopsia', label: 'Achromatyzm', desc: 'Brak percepcji kolorów' }
  ];

  const visualModes = [
    { value: 'day', label: 'Dzień', icon: Sun },
    { value: 'night', label: 'Noc', icon: Moon },
    { value: 'auto', label: 'Auto', icon: Settings },
    { value: 'high-contrast', label: 'Wysoki kontrast', icon: Eye }
  ];

  const seasons = [
    { value: 'spring', label: 'Wiosna', icon: Flower, color: 'text-green-500' },
    { value: 'summer', label: 'Lato', icon: Sun, color: 'text-yellow-500' },
    { value: 'autumn', label: 'Jesień', icon: Leaf, color: 'text-orange-500' },
    { value: 'winter', label: 'Zima', icon: Snowflake, color: 'text-blue-500' }
  ];

  return (
    <>
      {/* Floating Accessibility Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg"
        size="icon"
        title="Ustawienia dostępności"
      >
        <Accessibility className="h-6 w-6" />
      </Button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="h-5 w-5" />
                Centrum Dostępności Witnica.info
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="vision" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="vision">Wzrok</TabsTrigger>
                  <TabsTrigger value="visual">Tryby</TabsTrigger>
                  <TabsTrigger value="themes">Motywy</TabsTrigger>
                  <TabsTrigger value="other">Inne</TabsTrigger>
                </TabsList>

                <TabsContent value="vision" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dostosowanie wzroku</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Typ daltonizmu / Wada wzroku
                        </label>
                        <div className="space-y-2">
                          {colorBlindnessOptions.map((option) => (
                            <div
                              key={option.value}
                              className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                                settings.colorBlindness === option.value 
                                  ? 'border-primary bg-primary/10' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => updateSettings({ colorBlindness: option.value as any })}
                            >
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-muted-foreground">{option.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
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
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="visual" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tryby wizualne</h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {visualModes.map((mode) => {
                        const Icon = mode.icon;
                        return (
                          <Button
                            key={mode.value}
                            variant={settings.visualMode === mode.value ? "default" : "outline"}
                            className="h-20 flex flex-col gap-2"
                            onClick={() => updateSettings({ visualMode: mode.value as any })}
                          >
                            <Icon className="h-6 w-6" />
                            <span>{mode.label}</span>
                          </Button>
                        );
                      })}
                    </div>

                    <div className="space-y-4 mt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Wysoki kontrast</label>
                          <div className="text-xs text-muted-foreground">Zwiększ czytelność tekstu</div>
                        </div>
                        <Switch
                          checked={settings.highContrast}
                          onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Ograniczone animacje</label>
                          <div className="text-xs text-muted-foreground">Zmniejsz ruch na stronie</div>
                        </div>
                        <Switch
                          checked={settings.reducedMotion}
                          onCheckedChange={(checked) => updateSettings({ reducedMotion: checked })}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="themes" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Motywy sezonowe</h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {seasons.map((season) => {
                        const Icon = season.icon;
                        return (
                          <Button
                            key={season.value}
                            variant={settings.season === season.value ? "default" : "outline"}
                            className="h-20 flex flex-col gap-2"
                            onClick={() => updateSettings({ season: season.value as any })}
                          >
                            <Icon className={`h-6 w-6 ${season.color}`} />
                            <span>{season.label}</span>
                          </Button>
                        );
                      })}
                    </div>

                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">O motywach sezonowych</h4>
                      <p className="text-sm text-muted-foreground">
                        Każdy motyw dostosowuje kolory strony do pory roku, tworząc przyjemniejsze 
                        doświadczenie wizualne i pomagając w orientacji czasowej.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="other" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dodatkowe ustawienia</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Czytnik ekranu</label>
                          <div className="text-xs text-muted-foreground">Wsparcie dla teknologii asystujących</div>
                        </div>
                        <Switch
                          checked={settings.screenReader}
                          onCheckedChange={(checked) => updateSettings({ screenReader: checked })}
                        />
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Symulator wzroku
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Zobacz stronę oczami osób z różnymi wadami wzroku. 
                          Pomaga budować empatię i zrozumienie.
                        </p>
                        <Button size="sm" variant="outline">
                          Uruchom symulator
                        </Button>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium mb-2">✅ Status dostępności</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">WCAG 2.1 AA</Badge>
                            <span>Zgodność z standardami</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">Keyboard</Badge>
                            <span>Nawigacja klawiaturą</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">Screen Reader</Badge>
                            <span>Wsparcie czytników</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between mt-6 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    updateSettings({
                      colorBlindness: 'none',
                      visualMode: 'auto',
                      season: 'spring',
                      fontSize: 16,
                      highContrast: false,
                      reducedMotion: false,
                      screenReader: false
                    });
                  }}
                >
                  Resetuj ustawienia
                </Button>
                <Button onClick={() => setIsOpen(false)}>
                  Zapisz i zamknij
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AccessibilityPanel;
