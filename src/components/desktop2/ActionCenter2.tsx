
import React from 'react';
import { X, Wifi, Bluetooth, Battery, VolumeX, Settings, Moon, Sun } from 'lucide-react';

interface ActionCenter2Props {
  onClose: () => void;
  style: any;
}

const ActionCenter2: React.FC<ActionCenter2Props> = ({ onClose, style }) => {
  const notifications = [
    {
      id: 1,
      app: 'WitMail',
      icon: '📧',
      title: 'Nowa wiadomość',
      message: 'Otrzymałeś wiadomość od Urzędu Miasta WITNICA',
      time: '2 min temu',
      type: 'info'
    },
    {
      id: 2,
      app: 'Calendar',
      icon: '📅',
      title: 'Wydarzenie',
      message: 'Spotkanie rady miasta o 15:00',
      time: '1 godz temu',
      type: 'warning'
    },
    {
      id: 3,
      app: 'WitGames',
      icon: '🎮',
      title: 'Nowy rekord!',
      message: 'Zdobyłeś nowy rekord w grze WITNICA Quest',
      time: '3 godz temu',
      type: 'success'
    }
  ];

  const quickActions = [
    { icon: <Wifi className="w-5 h-5" />, label: 'WiFi', active: true },
    { icon: <Bluetooth className="w-5 h-5" />, label: 'Bluetooth', active: false },
    { icon: <VolumeX className="w-5 h-5" />, label: 'Wycisz', active: false },
    { icon: <Moon className="w-5 h-5" />, label: 'Tryb ciemny', active: true },
    { icon: <Battery className="w-5 h-5" />, label: 'Oszczędzanie', active: false },
    { icon: <Settings className="w-5 h-5" />, label: 'Ustawienia', active: false }
  ];

  return (
    <div 
      className="fixed bottom-14 right-4 w-80 h-[600px] rounded-2xl shadow-2xl z-50 overflow-hidden"
      style={{
        ...style,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(40px) saturate(1.8)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-white font-semibold">Centrum akcji</h2>
        <button onClick={onClose} className="text-white/60 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-white/10">
        <h3 className="text-white/80 text-sm font-medium mb-3">Szybkie akcje</h3>
        <div className="grid grid-cols-3 gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`p-3 rounded-xl transition-all duration-200 flex flex-col items-center space-y-1 ${
                action.active 
                  ? 'bg-blue-500/30 border border-blue-400/50' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className={`${action.active ? 'text-blue-300' : 'text-white/60'}`}>
                {action.icon}
              </div>
              <span className={`text-xs ${action.active ? 'text-blue-200' : 'text-white/60'}`}>
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-white/80 text-sm font-medium mb-3">Powiadomienia</h3>
        <div className="space-y-3">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border-l-4 border-blue-400"
            >
              <div className="flex items-start space-x-3">
                <span className="text-lg">{notification.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-medium">{notification.app}</span>
                    <span className="text-white/60 text-xs">{notification.time}</span>
                  </div>
                  <h4 className="text-white text-sm font-medium mb-1">{notification.title}</h4>
                  <p className="text-white/70 text-xs">{notification.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Focus Assist */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-lg">🎯</span>
            <h4 className="text-white font-medium">Tryb koncentracji</h4>
          </div>
          <p className="text-white/70 text-sm mb-3">Ukryj powiadomienia i skup się na pracy</p>
          <button className="w-full py-2 px-4 bg-purple-500/30 hover:bg-purple-500/40 rounded-lg text-white text-sm font-medium transition-colors">
            Włącz tryb koncentracji
          </button>
        </div>

        {/* Weather Widget */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">WITNICA</h4>
              <p className="text-white/70 text-sm">Słonecznie</p>
            </div>
            <div className="text-right">
              <div className="text-2xl">☀️</div>
              <div className="text-white font-bold text-lg">22°C</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors flex items-center justify-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Wszystkie ustawienia</span>
        </button>
      </div>
    </div>
  );
};

export default ActionCenter2;
