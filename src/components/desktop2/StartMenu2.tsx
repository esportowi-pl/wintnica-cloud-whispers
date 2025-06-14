
import React, { useState } from 'react';
import { Search, Power, Settings, User, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StartMenu2Props {
  onClose: () => void;
  onOpenApp: (appId: string, title: string) => void;
  style: any;
}

const StartMenu2: React.FC<StartMenu2Props> = ({ onClose, onOpenApp, style }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const applications = [
    { id: 'witword', name: 'WitWord', icon: '📝', category: 'Produktywność' },
    { id: 'witsheets', name: 'WitSheets', icon: '📊', category: 'Produktywność' },
    { id: 'witpaint', name: 'WitPaint', icon: '🎨', category: 'Kreatywność' },
    { id: 'witcode', name: 'WitCode', icon: '👨‍💻', category: 'Programowanie' },
    { id: 'witgames', name: 'WitGames', icon: '🎮', category: 'Rozrywka' },
    { id: 'witmail', name: 'WitMail', icon: '📧', category: 'Komunikacja' },
    { id: 'witnotes', name: 'WitNotes', icon: '📋', category: 'Produktywność' },
    { id: 'witcommand', name: 'Command Center', icon: '🖥️', category: 'System' }
  ];

  const recentFiles = [
    { name: 'Prezentacja WITNICA.pptx', icon: '📽️', app: 'WitSlides' },
    { name: 'Budżet 2024.xlsx', icon: '📊', app: 'WitSheets' },
    { name: 'Notatki.md', icon: '📋', app: 'WitNotes' },
    { name: 'Projekt Logo.png', icon: '🎨', app: 'WitPaint' }
  ];

  const filteredApps = applications.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className="fixed bottom-14 left-4 w-96 h-[600px] max-h-[calc(100vh-80px)] rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
      style={{
        ...style,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(40px) saturate(1.8)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      {/* Header - Fixed */}
      <div className="p-6 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">W</span>
            </div>
            <div>
              <h2 className="text-white font-semibold">WITNICA OS</h2>
              <p className="text-white/60 text-xs">Win20 Edition</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
          <input
            type="text"
            placeholder="Szukaj aplikacji, plików, ustawień..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Content - Scrollable */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Pinned Apps */}
          <div>
            <h3 className="text-white/80 text-sm font-medium mb-3">Przypięte</h3>
            <div className="grid grid-cols-3 gap-3">
              {filteredApps.slice(0, 6).map(app => (
                <button
                  key={app.id}
                  onClick={() => {
                    onOpenApp(app.id, app.name);
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                    {app.icon}
                  </div>
                  <div className="text-white text-xs font-medium">{app.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Files */}
          <div>
            <h3 className="text-white/80 text-sm font-medium mb-3">Ostatnie</h3>
            <div className="space-y-2">
              {recentFiles.map((file, index) => (
                <button
                  key={index}
                  className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 flex items-center space-x-3"
                >
                  <span className="text-lg">{file.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="text-white text-sm font-medium truncate">{file.name}</div>
                    <div className="text-white/60 text-xs">{file.app}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div>
            <h3 className="text-white/80 text-sm font-medium mb-3">Polecane</h3>
            <div className="space-y-2">
              <button className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center space-x-3">
                <span className="text-lg">📰</span>
                <div className="flex-1 text-left">
                  <div className="text-white text-sm font-medium">Aktualności WITNICA</div>
                  <div className="text-white/60 text-xs">Najnowsze wiadomości z miasta</div>
                </div>
              </button>
              <button className="w-full p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 flex items-center space-x-3">
                <span className="text-lg">🌤️</span>
                <div className="flex-1 text-left">
                  <div className="text-white text-sm font-medium">Pogoda</div>
                  <div className="text-white/60 text-xs">22°C, Słonecznie</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer - Fixed */}
      <div className="p-4 border-t border-white/10 flex items-center justify-between flex-shrink-0">
        <div className="flex space-x-2">
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <User className="w-4 h-4 text-white/60" />
          </button>
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Settings className="w-4 h-4 text-white/60" />
          </button>
        </div>
        <button className="p-2 rounded-lg hover:bg-red-500/20 transition-colors">
          <Power className="w-4 h-4 text-white/60" />
        </button>
      </div>
    </div>
  );
};

export default StartMenu2;
