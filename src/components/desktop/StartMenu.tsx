
import React, { useState } from 'react';
import { 
  Search, 
  Power, 
  Settings, 
  User, 
  FileText, 
  Image, 
  Music, 
  Video,
  Folder,
  Calculator,
  MessageSquare,
  Heart,
  ShoppingBag,
  Newspaper,
  Users,
  Calendar,
  Map,
  TrendingUp,
  Coffee,
  Star,
  ChevronRight
} from 'lucide-react';

interface StartMenuProps {
  onClose: () => void;
  onOpenApp: (appId: string, title: string, component: React.ReactNode) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose, onOpenApp }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = {
    recommended: {
      title: 'Polecane',
      icon: <Star className="w-4 h-4" />,
      apps: [
        { id: 'chat', name: 'Chat Witnicy', icon: <MessageSquare className="w-6 h-6" />, category: 'social' },
        { id: 'dating', name: 'Portal Randkowy', icon: <Heart className="w-6 h-6" />, category: 'social' },
        { id: 'marketplace', name: 'Marketplace', icon: <ShoppingBag className="w-6 h-6" />, category: 'shopping' },
        { id: 'events', name: 'Wydarzenia', icon: <Calendar className="w-6 h-6" />, category: 'social' },
      ]
    },
    social: {
      title: 'Społeczność',
      icon: <Users className="w-4 h-4" />,
      apps: [
        { id: 'chat', name: 'Chat Witnicy', icon: <MessageSquare className="w-6 h-6" />, category: 'social' },
        { id: 'dating', name: 'Portal Randkowy', icon: <Heart className="w-6 h-6" />, category: 'social' },
        { id: 'groups', name: 'Grupy Lokalne', icon: <Users className="w-6 h-6" />, category: 'social' },
        { id: 'events', name: 'Wydarzenia', icon: <Calendar className="w-6 h-6" />, category: 'social' },
      ]
    },
    productivity: {
      title: 'Produktywność',
      icon: <FileText className="w-4 h-4" />,
      apps: [
        { id: 'notepad', name: 'Notatnik', icon: <FileText className="w-6 h-6" />, category: 'productivity' },
        { id: 'calculator', name: 'Kalkulator', icon: <Calculator className="w-6 h-6" />, category: 'productivity' },
        { id: 'files', name: 'Pliki', icon: <Folder className="w-6 h-6" />, category: 'productivity' },
        { id: 'settings', name: 'Ustawienia', icon: <Settings className="w-6 h-6" />, category: 'productivity' },
      ]
    },
    entertainment: {
      title: 'Rozrywka',
      icon: <Music className="w-4 h-4" />,
      apps: [
        { id: 'music', name: 'Muzyka', icon: <Music className="w-6 h-6" />, category: 'entertainment' },
        { id: 'photos', name: 'Zdjęcia', icon: <Image className="w-6 h-6" />, category: 'entertainment' },
        { id: 'videos', name: 'Filmy', icon: <Video className="w-6 h-6" />, category: 'entertainment' },
        { id: 'games', name: 'Gry', icon: <Coffee className="w-6 h-6" />, category: 'entertainment' },
      ]
    },
    local: {
      title: 'Witnica',
      icon: <Map className="w-4 h-4" />,
      apps: [
        { id: 'gazette', name: 'Gazeta Miejska', icon: <Newspaper className="w-6 h-6" />, category: 'local' },
        { id: 'marketplace', name: 'Marketplace', icon: <ShoppingBag className="w-6 h-6" />, category: 'local' },
        { id: 'map', name: 'Mapa Witnicy', icon: <Map className="w-6 h-6" />, category: 'local' },
        { id: 'stats', name: 'Statystyki Miasta', icon: <TrendingUp className="w-6 h-6" />, category: 'local' },
      ]
    }
  };

  const allApps = Object.values(categories).flatMap(cat => cat.apps);
  const filteredApps = searchTerm 
    ? allApps.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const recentApps = [
    { id: 'chat', name: 'Chat Witnicy', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'dating', name: 'Portal Randkowy', icon: <Heart className="w-5 h-5" /> },
    { id: 'marketplace', name: 'Marketplace', icon: <ShoppingBag className="w-5 h-5" /> },
  ];

  const openApp = (appId: string, appName: string) => {
    const components: { [key: string]: React.ReactNode } = {
      chat: <div className="p-6"><h2 className="text-xl font-bold mb-4">Chat Witnicy</h2><p>Funkcja chat w budowie...</p></div>,
      dating: <div className="p-6"><h2 className="text-xl font-bold mb-4">Portal Randkowy</h2><p>Portal randkowy w budowie...</p></div>,
      marketplace: <div className="p-6"><h2 className="text-xl font-bold mb-4">Marketplace</h2><p>Marketplace w budowie...</p></div>,
      events: <div className="p-6"><h2 className="text-xl font-bold mb-4">Wydarzenia</h2><p>Kalendarz wydarzeń w budowie...</p></div>,
      groups: <div className="p-6"><h2 className="text-xl font-bold mb-4">Grupy Lokalne</h2><p>Grupy lokalne w budowie...</p></div>,
      gazette: <div className="p-6"><h2 className="text-xl font-bold mb-4">Gazeta Miejska</h2><p>Gazeta miejska w budowie...</p></div>,
      notepad: <div className="p-6"><textarea className="w-full h-80 p-4 border rounded" placeholder="Wprowadź tekst..."></textarea></div>,
      calculator: <div className="p-6"><div className="bg-gray-800 p-4 rounded"><div className="text-white text-right text-2xl mb-4">0</div><div className="grid grid-cols-4 gap-2">{['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(btn => <button key={btn} className="bg-gray-600 text-white p-2 rounded hover:bg-gray-500">{btn}</button>)}</div></div></div>,
      files: <div className="p-6"><h2 className="text-xl font-bold mb-4">Eksplorator plików</h2><div className="space-y-2"><div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"><Folder className="w-5 h-5 text-blue-500" /><span>Dokumenty</span></div><div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"><Folder className="w-5 h-5 text-blue-500" /><span>Obrazy</span></div><div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"><Folder className="w-5 h-5 text-blue-500" /><span>Muzyka</span></div></div></div>,
      music: <div className="p-6"><h2 className="text-xl font-bold mb-4">Odtwarzacz muzyki</h2><p>Odtwarzacz muzyki w budowie...</p></div>,
      photos: <div className="p-6"><h2 className="text-xl font-bold mb-4">Galeria zdjęć</h2><p>Galeria zdjęć w budowie...</p></div>,
      videos: <div className="p-6"><h2 className="text-xl font-bold mb-4">Odtwarzacz filmów</h2><p>Odtwarzacz filmów w budowie...</p></div>,
      games: <div className="p-6"><h2 className="text-xl font-bold mb-4">Centrum gier</h2><p>Centrum gier w budowie...</p></div>,
      map: <div className="p-6"><h2 className="text-xl font-bold mb-4">Mapa Witnicy</h2><p>Interaktywna mapa miasta w budowie...</p></div>,
      stats: <div className="p-6"><h2 className="text-xl font-bold mb-4">Statystyki Miasta</h2><p>Dashboard ze statystykami w budowie...</p></div>,
      settings: <div className="p-6"><h2 className="text-xl font-bold mb-4">Ustawienia systemu</h2><p>Panel ustawień w budowie...</p></div>,
    };

    onOpenApp(appId, appName, components[appId] || <div className="p-6">Aplikacja w budowie...</div>);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      <div 
        className="absolute bottom-12 left-4 w-96 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-medium">Użytkownik</div>
                <div className="text-gray-400 text-sm">witnica.info</div>
              </div>
            </div>
            <button 
              onClick={() => window.open('/admin', '_blank')}
              className="p-2 hover:bg-white/10 rounded"
            >
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj aplikacji i plików..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {searchTerm ? (
            /* Search Results */
            <div className="p-4">
              <h3 className="text-white font-medium mb-3">Wyniki wyszukiwania</h3>
              <div className="space-y-1">
                {filteredApps.map(app => (
                  <button
                    key={app.id}
                    onClick={() => openApp(app.id, app.name)}
                    className="w-full flex items-center space-x-3 p-2 hover:bg-white/10 rounded text-left"
                  >
                    <div className="text-blue-400">{app.icon}</div>
                    <span className="text-white">{app.name}</span>
                  </button>
                ))}
                {filteredApps.length === 0 && (
                  <div className="text-gray-400 text-center py-4">Nie znaleziono aplikacji</div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Recent Apps */}
              <div className="p-4 border-b border-white/20">
                <h3 className="text-white font-medium mb-3">Ostatnio używane</h3>
                <div className="space-y-1">
                  {recentApps.map(app => (
                    <button
                      key={app.id}
                      onClick={() => openApp(app.id, app.name)}
                      className="w-full flex items-center space-x-3 p-2 hover:bg-white/10 rounded text-left"
                    >
                      <div className="text-blue-400">{app.icon}</div>
                      <span className="text-white">{app.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="p-4">
                <div className="space-y-2">
                  {Object.entries(categories).map(([key, category]) => (
                    <div key={key}>
                      <button
                        onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                        className="w-full flex items-center justify-between p-2 hover:bg-white/10 rounded text-left"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-blue-400">{category.icon}</div>
                          <span className="text-white">{category.title}</span>
                        </div>
                        <ChevronRight 
                          className={`w-4 h-4 text-gray-400 transition-transform ${
                            activeCategory === key ? 'rotate-90' : ''
                          }`} 
                        />
                      </button>
                      {activeCategory === key && (
                        <div className="ml-6 mt-1 space-y-1">
                          {category.apps.map(app => (
                            <button
                              key={app.id}
                              onClick={() => openApp(app.id, app.name)}
                              className="w-full flex items-center space-x-3 p-2 hover:bg-white/10 rounded text-left"
                            >
                              <div className="text-blue-400">{app.icon}</div>
                              <span className="text-white text-sm">{app.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/20 flex items-center justify-between">
          <button 
            onClick={() => window.open('/user-panel', '_blank')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white"
          >
            <User className="w-4 h-4" />
            <span className="text-sm">Profil użytkownika</span>
          </button>
          <button 
            onClick={() => {
              if (confirm('Czy na pewno chcesz wylogować się z systemu?')) {
                localStorage.clear();
                window.location.href = '/';
              }
            }}
            className="flex items-center space-x-2 text-gray-400 hover:text-red-400"
          >
            <Power className="w-4 h-4" />
            <span className="text-sm">Wyloguj</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
