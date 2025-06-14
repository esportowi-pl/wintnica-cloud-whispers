
import React from 'react';
import { X, Plus, Calendar, MapPin, TrendingUp } from 'lucide-react';

interface WidgetPanel2Props {
  onClose: () => void;
  style: any;
}

const WidgetPanel2: React.FC<WidgetPanel2Props> = ({ onClose, style }) => {
  return (
    <div 
      className="fixed top-0 right-0 w-80 h-full shadow-2xl z-50 overflow-hidden"
      style={{
        ...style,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(40px) saturate(1.8)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-white font-semibold">Widżety</h2>
        <button onClick={onClose} className="text-white/60 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Widgets Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Weather Widget */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-400/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Pogoda</h3>
            <MapPin className="w-4 h-4 text-white/60" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl mb-2">☀️</div>
              <div className="text-white text-2xl font-bold">22°C</div>
              <div className="text-white/70 text-sm">Słonecznie</div>
            </div>
            <div className="text-right">
              <div className="text-white/70 text-sm">WITNICA</div>
              <div className="text-white/60 text-xs">Wiatr: 10 km/h</div>
              <div className="text-white/60 text-xs">Wilgotność: 45%</div>
            </div>
          </div>
          <div className="mt-3 flex justify-between text-xs text-white/60">
            <span>Max: 25°C</span>
            <span>Min: 18°C</span>
          </div>
        </div>

        {/* Calendar Widget */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-400/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Kalendarz</h3>
            <Calendar className="w-4 h-4 text-white/60" />
          </div>
          <div className="text-white text-lg font-bold mb-1">14 czerwca</div>
          <div className="text-white/70 text-sm mb-3">Piątek</div>
          <div className="space-y-2">
            <div className="p-2 rounded-lg bg-white/10">
              <div className="text-white text-sm font-medium">Spotkanie rady miasta</div>
              <div className="text-white/60 text-xs">15:00 - 17:00</div>
            </div>
            <div className="p-2 rounded-lg bg-white/10">
              <div className="text-white text-sm font-medium">Event WITNICA</div>
              <div className="text-white/60 text-xs">19:00 - 22:00</div>
            </div>
          </div>
        </div>

        {/* News Widget */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 border border-green-400/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Aktualności</h3>
            <TrendingUp className="w-4 h-4 text-white/60" />
          </div>
          <div className="space-y-3">
            <div className="border-l-2 border-green-400 pl-3">
              <div className="text-white text-sm font-medium mb-1">Nowa inwestycja w WITNICY</div>
              <div className="text-white/70 text-xs">Rozpoczęła się budowa nowego parku rekreacyjnego...</div>
            </div>
            <div className="border-l-2 border-blue-400 pl-3">
              <div className="text-white text-sm font-medium mb-1">Festiwal Letni 2024</div>
              <div className="text-white/70 text-xs">Już wkrótce wielki festiwal muzyczny w centrum miasta...</div>
            </div>
          </div>
        </div>

        {/* System Performance */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/30 to-red-500/30 border border-orange-400/30">
          <h3 className="text-white font-medium mb-3">Wydajność systemu</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm text-white/70 mb-1">
                <span>CPU</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-white/70 mb-1">
                <span>RAM</span>
                <span>72%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-white font-medium mb-3">Szybkie akcje</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center">
              <span className="text-lg mb-1">📁</span>
              <span className="text-white text-xs">Pliki</span>
            </button>
            <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center">
              <span className="text-lg mb-1">⚙️</span>
              <span className="text-white text-xs">Ustawienia</span>
            </button>
            <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center">
              <span className="text-lg mb-1">📷</span>
              <span className="text-white text-xs">Zrzut ekranu</span>
            </button>
            <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center">
              <span className="text-lg mb-1">🔒</span>
              <span className="text-white text-xs">Zablokuj</span>
            </button>
          </div>
        </div>

        {/* Add Widget */}
        <button className="w-full p-4 rounded-2xl border-2 border-dashed border-white/30 hover:border-white/50 transition-colors flex flex-col items-center justify-center">
          <Plus className="w-6 h-6 text-white/60 mb-2" />
          <span className="text-white/60 text-sm">Dodaj widżet</span>
        </button>
      </div>
    </div>
  );
};

export default WidgetPanel2;
