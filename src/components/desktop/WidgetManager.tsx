
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Grid, 
  List, 
  Filter,
  Download,
  Star,
  Settings,
  Trash2,
  Eye
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface DesktopWidget {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  size: 'small' | 'medium' | 'large';
  isInstalled: boolean;
  isActive: boolean;
  rating: number;
  downloads: number;
  author: string;
  version: string;
}

const WidgetManager = () => {
  const [widgets] = useState<DesktopWidget[]>([
    {
      id: '1',
      name: 'Pogoda Witnicy',
      description: 'Lokalny widget pogody z prognozą na 7 dni',
      icon: '🌤️',
      category: 'weather',
      size: 'medium',
      isInstalled: true,
      isActive: true,
      rating: 4.8,
      downloads: 1247,
      author: 'MeteoWitnica',
      version: '2.1.0'
    },
    {
      id: '2',
      name: 'Aktualności Lokalne',
      description: 'Najświeższe wiadomości z Witnicy i okolic',
      icon: '📰',
      category: 'news',
      size: 'large',
      isInstalled: true,
      isActive: false,
      rating: 4.6,
      downloads: 892,
      author: 'InfoWitnica',
      version: '1.5.2'
    },
    {
      id: '3',
      name: 'Kalendarz Wydarzeń',
      description: 'Nadchodzące wydarzenia w mieście',
      icon: '📅',
      category: 'utility',
      size: 'medium',
      isInstalled: false,
      isActive: false,
      rating: 4.9,
      downloads: 2341,
      author: 'EventsTeam',
      version: '3.0.1'
    },
    {
      id: '4',
      name: 'Transport Publiczny',
      description: 'Rozkłady jazdy i opóźnienia autobusów',
      icon: '🚌',
      category: 'transport',
      size: 'small',
      isInstalled: false,
      isActive: false,
      rating: 4.4,
      downloads: 1876,
      author: 'TransportWitnica',
      version: '1.8.0'
    },
    {
      id: '5',
      name: 'Czat Społeczności',
      description: 'Szybki dostęp do czatu z sąsiadami',
      icon: '💬',
      category: 'social',
      size: 'medium',
      isInstalled: true,
      isActive: true,
      rating: 4.7,
      downloads: 3456,
      author: 'SocialWitnica',
      version: '2.3.4'
    },
    {
      id: '6',
      name: 'Monitor Jakości Powietrza',
      description: 'Aktualne dane o jakości powietrza w mieście',
      icon: '🌱',
      category: 'environment',
      size: 'small',
      isInstalled: false,
      isActive: false,
      rating: 4.5,
      downloads: 1123,
      author: 'EcoWitnica',
      version: '1.2.1'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'Wszystkie', count: widgets.length },
    { id: 'weather', name: 'Pogoda', count: widgets.filter(w => w.category === 'weather').length },
    { id: 'news', name: 'Aktualności', count: widgets.filter(w => w.category === 'news').length },
    { id: 'utility', name: 'Narzędzia', count: widgets.filter(w => w.category === 'utility').length },
    { id: 'social', name: 'Społeczność', count: widgets.filter(w => w.category === 'social').length },
    { id: 'transport', name: 'Transport', count: widgets.filter(w => w.category === 'transport').length },
    { id: 'environment', name: 'Środowisko', count: widgets.filter(w => w.category === 'environment').length }
  ];

  const filteredWidgets = widgets.filter(widget => {
    const matchesSearch = widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         widget.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || widget.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const installedWidgets = widgets.filter(w => w.isInstalled);
  const activeWidgets = widgets.filter(w => w.isActive);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Menedżer Widgetów</h1>
          <p className="text-muted-foreground">Zarządzaj widgetami na pulpicie</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="default">
            {activeWidgets.length} aktywnych
          </Badge>
          <Badge variant="secondary">
            {installedWidgets.length} zainstalowanych
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Grid className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{widgets.length}</div>
                <div className="text-sm text-muted-foreground">Dostępne</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Download className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{installedWidgets.length}</div>
                <div className="text-sm text-muted-foreground">Zainstalowane</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Eye className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{activeWidgets.length}</div>
                <div className="text-sm text-muted-foreground">Aktywne</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">4.7</div>
                <div className="text-sm text-muted-foreground">Średnia ocena</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj widgetów..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Widgets Grid/List */}
      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredWidgets.map(widget => (
          <Card key={widget.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-3xl">{widget.icon}</span>
                <div className="flex-1">
                  <div className="text-lg">{widget.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {widget.author} • v{widget.version}
                  </div>
                </div>
                {widget.isInstalled && (
                  <Badge variant={widget.isActive ? "default" : "secondary"}>
                    {widget.isActive ? "Aktywny" : "Zainstalowany"}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{widget.description}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{widget.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>{widget.downloads.toLocaleString()}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {widget.size}
                </Badge>
              </div>
              
              <div className="flex gap-2">
                {widget.isInstalled ? (
                  <>
                    <Button 
                      size="sm" 
                      variant={widget.isActive ? "outline" : "default"}
                    >
                      {widget.isActive ? "Wyłącz" : "Włącz"}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" className="flex-1">
                      <Plus className="h-4 w-4 mr-2" />
                      Zainstaluj
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Podgląd: {widget.name}</DialogTitle>
                        </DialogHeader>
                        <div className="p-4 border rounded-lg bg-gray-50">
                          <div className="text-center text-gray-500">
                            Podgląd widgetu {widget.name}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWidgets.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Brak wyników</h3>
          <p className="text-muted-foreground">Spróbuj zmienić kryteria wyszukiwania</p>
        </div>
      )}
    </div>
  );
};

export default WidgetManager;
