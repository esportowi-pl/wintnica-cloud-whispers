
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Eye, 
  Save, 
  Upload, 
  Download, 
  Trash2, 
  Play,
  Palette,
  Settings,
  Monitor
} from "lucide-react";
import { toast } from "sonner";

interface Widget {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  code: string;
  styles: string;
  config: Record<string, any>;
  version: string;
  author: string;
  isPublic: boolean;
  downloads: number;
  rating: number;
}

const WidgetCreator = () => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [currentWidget, setCurrentWidget] = useState<Partial<Widget>>({
    name: '',
    description: '',
    icon: '📱',
    category: 'utility',
    code: `// Widget Code
import React from 'react';

const MyWidget = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="font-bold text-lg mb-2">Mój Widget</h3>
      <p className="text-gray-600">To jest przykładowy widget!</p>
    </div>
  );
};

export default MyWidget;`,
    styles: `/* Widget Styles */
.my-widget {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
  color: white;
}`,
    config: {},
    version: '1.0.0',
    author: 'Admin',
    isPublic: false
  });
  
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'utility', name: 'Narzędzia', icon: '🔧' },
    { id: 'social', name: 'Społeczność', icon: '👥' },
    { id: 'entertainment', name: 'Rozrywka', icon: '🎮' },
    { id: 'productivity', name: 'Produktywność', icon: '📊' },
    { id: 'weather', name: 'Pogoda', icon: '🌤️' },
    { id: 'news', name: 'Aktualności', icon: '📰' },
    { id: 'custom', name: 'Niestandardowe', icon: '⚙️' }
  ];

  const handleSaveWidget = () => {
    if (!currentWidget.name || !currentWidget.code) {
      toast.error("Nazwa i kod widgetu są wymagane!");
      return;
    }

    const newWidget: Widget = {
      id: Date.now().toString(),
      name: currentWidget.name!,
      description: currentWidget.description || '',
      icon: currentWidget.icon || '📱',
      category: currentWidget.category || 'utility',
      code: currentWidget.code!,
      styles: currentWidget.styles || '',
      config: currentWidget.config || {},
      version: currentWidget.version || '1.0.0',
      author: currentWidget.author || 'Admin',
      isPublic: currentWidget.isPublic || false,
      downloads: 0,
      rating: 5
    };

    setWidgets(prev => [...prev, newWidget]);
    toast.success("Widget zapisany pomyślnie!");
    
    // Reset form
    setCurrentWidget({
      name: '',
      description: '',
      icon: '📱',
      category: 'utility',
      code: `// Widget Code
import React from 'react';

const MyWidget = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="font-bold text-lg mb-2">Nowy Widget</h3>
      <p className="text-gray-600">Dodaj swoją funkcjonalność tutaj!</p>
    </div>
  );
};

export default MyWidget;`,
      styles: '',
      config: {},
      version: '1.0.0',
      author: 'Admin',
      isPublic: false
    });
  };

  const handleDeleteWidget = (widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
    toast.success("Widget usunięty!");
  };

  const handleExportWidget = (widget: Widget) => {
    const dataStr = JSON.stringify(widget, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${widget.name}-widget.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success("Widget wyeksportowany!");
  };

  const filteredWidgets = selectedCategory === 'all' 
    ? widgets 
    : widgets.filter(w => w.category === selectedCategory);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kreator Widgetów</h1>
          <p className="text-muted-foreground">Twórz i zarządzaj niestandardowymi widgetami dla pulpitu</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {widgets.length} widgetów
        </Badge>
      </div>

      <Tabs defaultValue="creator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="creator" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Kreator
          </TabsTrigger>
          <TabsTrigger value="library" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Biblioteka
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Sklep
          </TabsTrigger>
        </TabsList>

        <TabsContent value="creator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Widget Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Konfiguracja Widgetu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="widget-name">Nazwa</Label>
                    <Input
                      id="widget-name"
                      value={currentWidget.name}
                      onChange={(e) => setCurrentWidget(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Nazwa widgetu"
                    />
                  </div>
                  <div>
                    <Label htmlFor="widget-icon">Ikona</Label>
                    <Input
                      id="widget-icon"
                      value={currentWidget.icon}
                      onChange={(e) => setCurrentWidget(prev => ({ ...prev, icon: e.target.value }))}
                      placeholder="📱"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="widget-description">Opis</Label>
                  <Textarea
                    id="widget-description"
                    value={currentWidget.description}
                    onChange={(e) => setCurrentWidget(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Opis funkcjonalności widgetu"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="widget-category">Kategoria</Label>
                    <Select 
                      value={currentWidget.category} 
                      onValueChange={(value) => setCurrentWidget(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="widget-version">Wersja</Label>
                    <Input
                      id="widget-version"
                      value={currentWidget.version}
                      onChange={(e) => setCurrentWidget(prev => ({ ...prev, version: e.target.value }))}
                      placeholder="1.0.0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Editor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Edytor Kodu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={currentWidget.code}
                  onChange={(e) => setCurrentWidget(prev => ({ ...prev, code: e.target.value }))}
                  className="font-mono text-sm min-h-96"
                  placeholder="Wprowadź kod React dla widgetu..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Styles Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Style CSS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={currentWidget.styles}
                onChange={(e) => setCurrentWidget(prev => ({ ...prev, styles: e.target.value }))}
                className="font-mono text-sm min-h-32"
                placeholder="Dodaj niestandardowe style CSS..."
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button onClick={handleSaveWidget} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Zapisz Widget
            </Button>
            <Button variant="outline" onClick={() => setPreviewMode(!previewMode)} className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {previewMode ? 'Ukryj' : 'Pokaż'} Podgląd
            </Button>
          </div>

          {/* Preview */}
          {previewMode && (
            <Card>
              <CardHeader>
                <CardTitle>Podgląd Widgetu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="text-center text-gray-500">
                    Podgląd widgetu będzie tutaj
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <div className="flex items-center gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie kategorie</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWidgets.map(widget => (
              <Card key={widget.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{widget.icon}</span>
                    <div>
                      <div className="text-lg">{widget.name}</div>
                      <div className="text-sm text-muted-foreground">v{widget.version}</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{widget.description}</p>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {categories.find(c => c.id === widget.category)?.name}
                    </Badge>
                    {widget.isPublic && (
                      <Badge variant="default">Publiczny</Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleExportWidget(widget)}>
                      <Download className="h-4 w-4 mr-2" />
                      Eksportuj
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteWidget(widget.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredWidgets.length === 0 && (
            <div className="text-center py-12">
              <Monitor className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Brak widgetów</h3>
              <p className="text-muted-foreground">Utwórz swój pierwszy widget w zakładce Kreator</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="store" className="space-y-6">
          <div className="text-center py-12">
            <Download className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Sklep Widgetów</h3>
            <p className="text-muted-foreground">Przeglądaj i pobieraj widgety stworzone przez społeczność</p>
            <Button className="mt-4">Przeglądaj Sklep</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WidgetCreator;
