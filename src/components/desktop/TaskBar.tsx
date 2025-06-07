
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Wifi, 
  Volume2, 
  Battery, 
  Calendar,
  MessageSquare,
  Heart,
  ShoppingBag,
  Newspaper,
  Users,
  Settings,
  Power,
  User
} from 'lucide-react';
import { WindowState } from './types';

interface TaskBarProps {
  windows: WindowState[];
  onToggleStart: () => void;
  onToggleWidgets: () => void;
  onRestoreWindow: (id: string) => void;
  onOpenApp: (appId: string, title: string, component: React.ReactNode) => void;
}

const TaskBar: React.FC<TaskBarProps> = ({
  windows,
  onToggleStart,
  onToggleWidgets,
  onRestoreWindow,
  onOpenApp
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSystemTray, setShowSystemTray] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pinnedApps = [
    { 
      id: 'chat', 
      name: 'Chat', 
      icon: <MessageSquare className="w-5 h-5" />,
      component: <div className="p-4">Chat aplikacja - W budowie</div>
    },
    { 
      id: 'dating', 
      name: 'Portal Randkowy', 
      icon: <Heart className="w-5 h-5" />,
      component: <div className="p-4">Portal randkowy - W budowie</div>
    },
    { 
      id: 'marketplace', 
      name: 'Marketplace', 
      icon: <ShoppingBag className="w-5 h-5" />,
      component: <div className="p-4">Marketplace - W budowie</div>
    },
    { 
      id: 'news', 
      name: 'Gazeta', 
      icon: <Newspaper className="w-5 h-5" />,
      component: <div className="p-4">Gazeta miejska - W budowie</div>
    },
    { 
      id: 'groups', 
      name: 'Grupy', 
      icon: <Users className="w-5 h-5" />,
      component: <div className="p-4">Grupy lokalne - W budowie</div>
    },
  ];

  const openPinnedApp = (app: any) => {
    const existingWindow = windows.find(w => w.appId === app.id);
    if (existingWindow) {
      onRestoreWindow(existingWindow.id);
    } else {
      onOpenApp(app.id, app.name, app.component);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-900/95 backdrop-blur-md border-t border-white/20 flex items-center px-2 z-40">
      {/* Start Button */}
      <button
        onClick={onToggleStart}
        className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 rounded transition-colors"
      >
        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">W</span>
        </div>
        <span className="text-white text-sm font-medium hidden sm:block">Start</span>
      </button>

      {/* Search */}
      <div className="hidden md:flex items-center space-x-2 ml-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Szukaj w Witnicy..."
            className="bg-gray-800 text-white pl-8 pr-4 py-1 rounded text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Pinned Apps */}
      <div className="flex items-center space-x-1 ml-4">
        {pinnedApps.map(app => {
          const isOpen = windows.some(w => w.appId === app.id && !w.isMinimized);
          return (
            <button
              key={app.id}
              onClick={() => openPinnedApp(app)}
              className={`p-2 rounded transition-colors ${
                isOpen 
                  ? 'bg-blue-600/50 text-blue-200' 
                  : 'hover:bg-white/10 text-gray-300'
              }`}
              title={app.name}
            >
              {app.icon}
            </button>
          );
        })}
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-white/20 mx-2" />

      {/* Open Windows */}
      <div className="flex items-center space-x-1 flex-1">
        {windows.filter(w => !w.isMinimized).map(window => (
          <button
            key={window.id}
            onClick={() => onRestoreWindow(window.id)}
            className="flex items-center space-x-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-white text-sm max-w-48 truncate"
          >
            <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs">📱</span>
            </div>
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* Widgets Button */}
      <button
        onClick={onToggleWidgets}
        className="p-2 hover:bg-white/10 rounded transition-colors mr-2"
        title="Widżety"
      >
        <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
          <div className="bg-blue-400 rounded-sm"></div>
          <div className="bg-green-400 rounded-sm"></div>
          <div className="bg-yellow-400 rounded-sm"></div>
          <div className="bg-red-400 rounded-sm"></div>
        </div>
      </button>

      {/* System Tray */}
      <div className="flex items-center space-x-2 text-gray-300">
        {/* Notifications */}
        {notifications > 0 && (
          <button className="relative p-1 hover:bg-white/10 rounded">
            <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-0.5 -right-0.5"></div>
            <MessageSquare className="w-4 h-4" />
          </button>
        )}

        {/* System Icons */}
        <Wifi className="w-4 h-4" />
        <Volume2 className="w-4 h-4" />
        <Battery className="w-4 h-4" />

        {/* Date and Time */}
        <button
          onClick={() => setShowSystemTray(!showSystemTray)}
          className="text-right hover:bg-white/10 rounded px-2 py-1"
        >
          <div className="text-xs font-medium">
            {currentTime.toLocaleTimeString('pl-PL', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div className="text-xs text-gray-400">
            {currentTime.toLocaleDateString('pl-PL', { 
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </div>
        </button>

        {/* Show Desktop Button */}
        <button
          onClick={() => {
            // Minimize all windows
            windows.forEach(window => {
              if (!window.isMinimized) {
                onRestoreWindow(window.id);
              }
            });
          }}
          className="w-2 h-8 hover:bg-white/20 border-l border-white/20 ml-2"
          title="Pokaż pulpit"
        />
      </div>

      {/* System Tray Popup */}
      {showSystemTray && (
        <div className="absolute bottom-12 right-4 w-80 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/20 p-4">
          <div className="space-y-4">
            <div className="text-white">
              <h3 className="font-medium mb-2">Centrum akcji</h3>
              <div className="space-y-2">
                <div className="bg-blue-600 p-3 rounded">
                  <div className="text-sm">Nowa wiadomość w chat</div>
                  <div className="text-xs text-blue-200">2 minuty temu</div>
                </div>
                <div className="bg-green-600 p-3 rounded">
                  <div className="text-sm">Nowe wydarzenie w kalendarzu</div>
                  <div className="text-xs text-green-200">5 minut temu</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-4">
              <div className="grid grid-cols-4 gap-2">
                <button className="p-2 bg-gray-800 rounded hover:bg-gray-700">
                  <Wifi className="w-4 h-4 mx-auto text-white" />
                  <div className="text-xs text-white mt-1">WiFi</div>
                </button>
                <button className="p-2 bg-gray-800 rounded hover:bg-gray-700">
                  <Volume2 className="w-4 h-4 mx-auto text-white" />
                  <div className="text-xs text-white mt-1">Dźwięk</div>
                </button>
                <button className="p-2 bg-gray-800 rounded hover:bg-gray-700">
                  <Settings className="w-4 h-4 mx-auto text-white" />
                  <div className="text-xs text-white mt-1">Ustawienia</div>
                </button>
                <button className="p-2 bg-gray-800 rounded hover:bg-gray-700">
                  <Power className="w-4 h-4 mx-auto text-white" />
                  <div className="text-xs text-white mt-1">Zasilanie</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBar;
