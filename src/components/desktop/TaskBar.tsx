
import React from 'react';
import { Search, Wifi, Volume2, Battery, Calendar, Settings } from 'lucide-react';
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
  const quickApps = [
    { id: 'file-explorer', name: 'Eksploruj', icon: '📁' },
    { id: 'browser', name: 'Przeglądarka', icon: '🌐' },
    { id: 'chat', name: 'Chat', icon: '💬' },
    { id: 'dating', name: 'Randki', icon: '❤️' },
    { id: 'marketplace', name: 'Rynek', icon: '🛒' }
  ];

  const currentTime = new Date().toLocaleTimeString('pl-PL', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const currentDate = new Date().toLocaleDateString('pl-PL', { 
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-black/80 backdrop-blur-md border-t border-white/20 flex items-center justify-between px-2 z-50">
      {/* Start Button */}
      <button 
        className="flex items-center justify-center w-10 h-8 rounded hover:bg-white/20 transition-colors"
        onClick={onToggleStart}
      >
        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-sm flex items-center justify-center">
          <span className="text-white text-xs font-bold">W</span>
        </div>
      </button>

      {/* Search */}
      <div className="flex items-center ml-2">
        <div className="flex items-center bg-white/20 rounded-full px-3 py-1 w-60">
          <Search className="w-4 h-4 text-white/70 mr-2" />
          <input 
            type="text" 
            placeholder="Wpisz, aby wyszukać"
            className="bg-transparent text-white text-sm outline-none flex-1 placeholder-white/50"
          />
        </div>
      </div>

      {/* Task View */}
      <button 
        className="ml-2 w-8 h-8 rounded hover:bg-white/20 transition-colors flex items-center justify-center"
        title="Widok zadań"
      >
        <div className="w-4 h-4 border border-white/70 rounded-sm"></div>
      </button>

      {/* Widgets */}
      <button 
        className="ml-1 w-8 h-8 rounded hover:bg-white/20 transition-colors flex items-center justify-center"
        onClick={onToggleWidgets}
        title="Widżety"
      >
        <div className="w-4 h-4 bg-white/70 rounded-sm"></div>
      </button>

      {/* Quick Apps */}
      <div className="flex items-center ml-4 space-x-1">
        {quickApps.map(app => (
          <button
            key={app.id}
            className="w-10 h-8 rounded hover:bg-white/20 transition-colors flex items-center justify-center"
            onClick={() => onOpenApp(app.id, app.name, <div>Zawartość aplikacji {app.name}</div>)}
            title={app.name}
          >
            <span className="text-lg">{app.icon}</span>
          </button>
        ))}
      </div>

      {/* Running Apps */}
      <div className="flex items-center ml-4 space-x-1">
        {windows.map(window => (
          <button
            key={window.id}
            className={`px-3 h-8 rounded text-white text-xs transition-colors ${
              window.isMinimized 
                ? 'bg-white/20 hover:bg-white/30' 
                : 'bg-white/40 hover:bg-white/50'
            }`}
            onClick={() => onRestoreWindow(window.id)}
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center ml-auto space-x-2 text-white">
        <div className="flex items-center space-x-1">
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>
        
        <div className="text-right text-xs leading-tight">
          <div>{currentTime}</div>
          <div className="text-white/70">{currentDate}</div>
        </div>

        <button className="w-8 h-8 rounded hover:bg-white/20 transition-colors flex items-center justify-center">
          <div className="w-4 h-4 border border-white rounded-sm"></div>
        </button>
      </div>
    </div>
  );
};

export default TaskBar;
