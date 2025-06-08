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
  ChevronRight,
  Brush,
  Code,
  Mail,
  Gamepad2,
  Sheet,
  Presentation,
  StickyNote,
  Camera,
  MicIcon,
  Database,
  Wifi,
  PlayCircle
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
        { id: 'witword', name: 'WitWord', icon: <FileText className="w-6 h-6" />, category: 'office' },
        { id: 'witpaint', name: 'WitPaint', icon: <Brush className="w-6 h-6" />, category: 'graphics' },
        { id: 'witcode', name: 'WitCode', icon: <Code className="w-6 h-6" />, category: 'developer' },
        { id: 'witgames', name: 'WitGames', icon: <Gamepad2 className="w-6 h-6" />, category: 'entertainment' },
      ]
    },
    office: {
      title: 'Pakiet Office',
      icon: <FileText className="w-4 h-4" />,
      apps: [
        { id: 'witword', name: 'WitWord', icon: <FileText className="w-6 h-6" />, category: 'office' },
        { id: 'witsheets', name: 'WitSheets', icon: <Sheet className="w-6 h-6" />, category: 'office' },
        { id: 'witslides', name: 'WitSlides', icon: <Presentation className="w-6 h-6" />, category: 'office' },
        { id: 'witmail', name: 'WitMail', icon: <Mail className="w-6 h-6" />, category: 'office' },
        { id: 'witnotes', name: 'WitNotes', icon: <StickyNote className="w-6 h-6" />, category: 'office' },
      ]
    },
    graphics: {
      title: 'Grafika i multimedia',
      icon: <Image className="w-4 h-4" />,
      apps: [
        { id: 'witpaint', name: 'WitPaint', icon: <Brush className="w-6 h-6" />, category: 'graphics' },
        { id: 'witphotoshop', name: 'WitPhotoShop', icon: <Camera className="w-6 h-6" />, category: 'graphics' },
        { id: 'witcad', name: 'WitCAD', icon: <Image className="w-6 h-6" />, category: 'graphics' },
        { id: 'witvideo', name: 'WitVideo', icon: <Video className="w-6 h-6" />, category: 'graphics' },
        { id: 'witaudio', name: 'WitAudio', icon: <MicIcon className="w-6 h-6" />, category: 'graphics' },
      ]
    },
    developer: {
      title: 'Narzędzia programisty',
      icon: <Code className="w-4 h-4" />,
      apps: [
        { id: 'witcode', name: 'WitCode IDE', icon: <Code className="w-6 h-6" />, category: 'developer' },
        { id: 'witdb', name: 'WitDB Manager', icon: <Database className="w-6 h-6" />, category: 'developer' },
        { id: 'witftp', name: 'WitFTP Client', icon: <Wifi className="w-6 h-6" />, category: 'developer' },
      ]
    },
    entertainment: {
      title: 'Rozrywka',
      icon: <Music className="w-4 h-4" />,
      apps: [
        { id: 'witgames', name: 'WitGames Arcade', icon: <Gamepad2 className="w-6 h-6" />, category: 'entertainment' },
        { id: 'witstream', name: 'WitStream Player', icon: <PlayCircle className="w-6 h-6" />, category: 'entertainment' },
        { id: 'music', name: 'Muzyka', icon: <Music className="w-6 h-6" />, category: 'entertainment' },
        { id: 'photos', name: 'Zdjęcia', icon: <Image className="w-6 h-6" />, category: 'entertainment' },
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
      // Office Suite
      witword: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitWord</h2><p>Zaawansowany edytor tekstu ładuje się...</p></div>,
      witsheets: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitSheets</h2><p>Arkusz kalkulacyjny ładuje się...</p></div>,
      witslides: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitSlides</h2><p>Edytor prezentacji ładuje się...</p></div>,
      witmail: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitMail</h2><p>Klient poczty ładuje się...</p></div>,
      witnotes: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitNotes</h2><p>Notatnik ładuje się...</p></div>,
      
      // Graphics & Multimedia
      witpaint: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitPaint</h2><p>Edytor graficzny ładuje się...</p></div>,
      witphotoshop: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitPhotoShop</h2><p>Zaawansowany edytor zdjęć ładuje się...</p></div>,
      witcad: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitCAD</h2><p>Narzędzie CAD ładuje się...</p></div>,
      witvideo: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitVideo</h2><p>Edytor filmów ładuje się...</p></div>,
      witaudio: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitAudio</h2><p>Studio audio ładuje się...</p></div>,
      
      // Developer Tools
      witcode: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitCode IDE</h2><p>Środowisko programistyczne ładuje się...</p></div>,
      witdb: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitDB Manager</h2><p>Menedżer baz danych ładuje się...</p></div>,
      witftp: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitFTP Client</h2><p>Klient FTP ładuje się...</p></div>,
      
      // Entertainment
      witgames: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitGames Arcade</h2><p>Centrum gier ładuje się...</p></div>,
      witstream: <div className="p-6"><h2 className="text-xl font-bold mb-4">WitStream Player</h2><p>Odtwarzacz multimedialny ładuje się...</p></div>,
      
      // Existing apps
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
