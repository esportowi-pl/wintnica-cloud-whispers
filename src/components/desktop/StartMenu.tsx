
import React, { useState } from 'react';
import { X, Search, Power, Settings, User } from 'lucide-react';

interface StartMenuProps {
  onClose: () => void;
  onOpenApp: (appId: string, title: string, component: React.ReactNode) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose, onOpenApp }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const applications = [
    // Productivity Apps
    { id: 'witword', name: 'WitWord', icon: '📝', category: 'Produktywność', description: 'Edytor tekstu' },
    { id: 'witsheets', name: 'WitSheets', icon: '📊', category: 'Produktywność', description: 'Arkusz kalkulacyjny' },
    { id: 'witslides', name: 'WitSlides', icon: '📽️', category: 'Produktywność', description: 'Prezentacje' },
    { id: 'witnotes', name: 'WitNotes', icon: '📋', category: 'Produktywność', description: 'Notatnik z Markdown' },
    { id: 'witmail', name: 'WitMail', icon: '📧', category: 'Produktywność', description: 'Klient poczty' },
    
    // Creative Apps
    { id: 'witpaint', name: 'WitPaint', icon: '🎨', category: 'Kreatywność', description: 'Edytor graficzny' },
    { id: 'witphotoshop', name: 'WitPhotoShop', icon: '🖼️', category: 'Kreatywność', description: 'Edytor zdjęć' },
    { id: 'witcad', name: 'WitCAD', icon: '📐', category: 'Kreatywność', description: 'Projektowanie 2D' },
    { id: 'witvideo', name: 'WitVideo', icon: '🎬', category: 'Kreatywność', description: 'Edytor filmów' },
    { id: 'witaudio', name: 'WitAudio', icon: '🎵', category: 'Kreatywność', description: 'Studio nagrań' },
    
    // Development Apps
    { id: 'witcode', name: 'WitCode', icon: '👨‍💻', category: 'Programowanie', description: 'Edytor kodu' },
    { id: 'witdb', name: 'WitDB', icon: '🗄️', category: 'Programowanie', description: 'Menedżer baz danych' },
    { id: 'witftp', name: 'WitFTP', icon: '📁', category: 'Programowanie', description: 'Klient FTP' },
    
    // Entertainment
    { id: 'witgames', name: 'WitGames', icon: '🎮', category: 'Rozrywka', description: 'Centrum gier' },
    { id: 'witstream', name: 'WitStream', icon: '📺', category: 'Rozrywka', description: 'Odtwarzacz multimedialny' },
  ];

  const categories = ['Wszystko', 'Produktywność', 'Kreatywność', 'Programowanie', 'Rozrywka'];
  const [selectedCategory, setSelectedCategory] = useState('Wszystko');

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Wszystko' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAppClick = (app: any) => {
    onOpenApp(app.id, app.name, null);
    onClose();
  };

  return (
    <div className="fixed bottom-12 left-4 w-96 h-[600px] bg-gray-900/95 backdrop-blur-md rounded-lg border border-gray-700 shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="text-white font-medium">WitOS</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Szukaj aplikacji..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Grid */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-3 gap-3">
          {filteredApps.map(app => (
            <div
              key={app.id}
              onClick={() => handleAppClick(app)}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 text-2xl mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                {app.icon}
              </div>
              <span className="text-white text-xs text-center font-medium">{app.name}</span>
              <span className="text-gray-400 text-xs text-center mt-1">{app.description}</span>
            </div>
          ))}
        </div>
        
        {filteredApps.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <span>Nie znaleziono aplikacji</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 flex items-center justify-between">
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
            <User className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
            <Settings className="w-4 h-4" />
          </button>
        </div>
        <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded">
          <Power className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
