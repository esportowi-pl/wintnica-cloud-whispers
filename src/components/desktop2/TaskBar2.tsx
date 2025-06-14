
import React, { useState, useEffect } from 'react';
import { Search, Wifi, Volume2, Battery, Calendar, Bell, Settings, Power } from 'lucide-react';

interface TaskBar2Props {
  windows: any[];
  onToggleStart: () => void;
  onToggleActionCenter: () => void;
  onToggleWidgets: () => void;
  onOpenApp: (appId: string, title: string) => void;
  style: any;
}

const TaskBar2: React.FC<TaskBar2Props> = ({
  windows,
  onToggleStart,
  onToggleActionCenter,
  onToggleWidgets,
  onOpenApp,
  style
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pinnedApps = [
    { id: 'witword', name: 'WitWord', icon: '📝' },
    { id: 'witcode', name: 'WitCode', icon: '👨‍💻' },
    { id: 'witmail', name: 'WitMail', icon: '📧' },
    { id: 'witpaint', name: 'WitPaint', icon: '🎨' },
    { id: 'witgames', name: 'WitGames', icon: '🎮' }
  ];

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-50"
      style={{
        ...style,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      {/* Start Button */}
      <button
        onClick={onToggleStart}
        className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/10 transition-all duration-200 group"
      >
        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <span className="text-white text-xs font-bold">W</span>
        </div>
      </button>

      {/* Search Bar */}
      <div className="flex items-center space-x-4 flex-1 max-w-md mx-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            type="text"
            placeholder="Szukaj w WITNICA..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
      </div>

      {/* Centered App Icons */}
      <div className="flex items-center space-x-2 flex-1 justify-center">
        {pinnedApps.map(app => {
          const isOpen = windows.some(w => w.appId === app.id && !w.isMinimized);
          return (
            <button
              key={app.id}
              onClick={() => onOpenApp(app.id, app.name)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-white/10 ${
                isOpen ? 'bg-white/20 scale-110' : ''
              }`}
              title={app.name}
            >
              <span className="text-xl">{app.icon}</span>
            </button>
          );
        })}
        
        {/* Task View */}
        <button className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all duration-200">
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
            <div className="bg-white/60 rounded-sm"></div>
            <div className="bg-white/60 rounded-sm"></div>
            <div className="bg-white/60 rounded-sm"></div>
            <div className="bg-white/60 rounded-sm"></div>
          </div>
        </button>
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-2">
        {/* Widgets */}
        <button
          onClick={onToggleWidgets}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-200"
        >
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
            <div className="bg-blue-400 rounded-sm"></div>
            <div className="bg-green-400 rounded-sm"></div>
            <div className="bg-yellow-400 rounded-sm"></div>
            <div className="bg-red-400 rounded-sm"></div>
          </div>
        </button>

        {/* System Icons */}
        <div className="flex items-center space-x-1 text-white/80">
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>

        {/* Notifications */}
        <button
          onClick={onToggleActionCenter}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-200 relative"
        >
          <Bell className="w-4 h-4 text-white/80" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white">3</span>
          </div>
        </button>

        {/* Date & Time */}
        <button className="text-right text-white/90 hover:bg-white/10 rounded-lg px-2 py-1 transition-all duration-200">
          <div className="text-xs font-medium">
            {currentTime.toLocaleTimeString('pl-PL', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div className="text-xs opacity-75">
            {currentTime.toLocaleDateString('pl-PL', { 
              day: '2-digit',
              month: '2-digit'
            })}
          </div>
        </button>

        {/* Show Desktop */}
        <div className="w-2 h-10 hover:bg-white/20 border-l border-white/20 cursor-pointer transition-all duration-200" />
      </div>
    </div>
  );
};

export default TaskBar2;
