
import React from 'react';
import { Search, Power, Settings, User } from 'lucide-react';
import ChatPage from '@/pages/ChatPage';
import DatingPortalPage from '@/pages/DatingPortalPage';
import MarketplacePage from '@/pages/MarketplacePage';
import EventsPage from '@/pages/EventsPage';
import GazettePage from '@/pages/GazettePage';

interface StartMenuProps {
  onClose: () => void;
  onOpenApp: (appId: string, title: string, component: React.ReactNode) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose, onOpenApp }) => {
  const pinnedApps = [
    { id: 'chat', name: 'Chat Witnicy', icon: '💬', component: <ChatPage /> },
    { id: 'dating', name: 'Portal Randkowy', icon: '❤️', component: <DatingPortalPage /> },
    { id: 'marketplace', name: 'Rynek', icon: '🛒', component: <MarketplacePage /> },
    { id: 'events', name: 'Wydarzenia', icon: '📅', component: <EventsPage /> },
    { id: 'gazette', name: 'Gazeta', icon: '📰', component: <GazettePage /> },
    { id: 'weather', name: 'Pogoda', icon: '🌤️', component: <div className="p-4">Widget pogody</div> },
    { id: 'calculator', name: 'Kalkulator', icon: '🔢', component: <div className="p-4">Kalkulator</div> },
    { id: 'notepad', name: 'Notatnik', icon: '📝', component: <div className="p-4">Notatnik</div> }
  ];

  const recentFiles = [
    'Dokument1.txt',
    'Zdjęcie_wakacje.jpg',
    'Raport_miesięczny.pdf'
  ];

  return (
    <div 
      className="fixed inset-0 z-40"
      onClick={onClose}
    >
      <div 
        className="absolute bottom-12 left-2 w-80 h-96 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* User Info */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-medium">Użytkownik</div>
              <div className="text-white/70 text-xs">Mieszkaniec Witnicy</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-white/20">
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-white/70 mr-2" />
            <input 
              type="text"
              placeholder="Wpisz, aby wyszukać"
              className="bg-transparent text-white text-sm outline-none flex-1 placeholder-white/50"
            />
          </div>
        </div>

        {/* Pinned Apps */}
        <div className="p-3 flex-1 overflow-y-auto">
          <div className="text-white/70 text-xs font-medium mb-2">Przypięte</div>
          <div className="grid grid-cols-3 gap-2">
            {pinnedApps.map(app => (
              <button
                key={app.id}
                className="flex flex-col items-center p-2 rounded-lg hover:bg-white/20 transition-colors"
                onClick={() => {
                  onOpenApp(app.id, app.name, app.component);
                  onClose();
                }}
              >
                <div className="text-2xl mb-1">{app.icon}</div>
                <span className="text-white text-xs text-center">{app.name}</span>
              </button>
            ))}
          </div>

          {/* Recent Files */}
          <div className="mt-4">
            <div className="text-white/70 text-xs font-medium mb-2">Ostatnie</div>
            <div className="space-y-1">
              {recentFiles.map((file, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 p-2 rounded hover:bg-white/20 cursor-pointer"
                >
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-xs">📄</div>
                  <span className="text-white text-sm">{file}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Power Options */}
        <div className="p-3 border-t border-white/20 flex justify-end">
          <button className="w-8 h-8 rounded hover:bg-white/20 flex items-center justify-center">
            <Power className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
