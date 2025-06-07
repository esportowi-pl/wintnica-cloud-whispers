
import React from 'react';
import { X, Cloud, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import WeatherAPI from '@/components/weather/WeatherAPI';
import CityStatsWidget from '@/components/home/CityStatsWidget';

interface WidgetPanelProps {
  onClose: () => void;
}

const WidgetPanel: React.FC<WidgetPanelProps> = ({ onClose }) => {
  const currentTime = new Date().toLocaleTimeString('pl-PL', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div 
      className="fixed inset-0 z-40"
      onClick={onClose}
    >
      <div 
        className="absolute top-4 right-4 w-80 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/20 flex items-center justify-between">
          <h3 className="text-white font-medium">Widżety</h3>
          <button 
            onClick={onClose}
            className="w-6 h-6 rounded hover:bg-white/20 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Widgets */}
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {/* Time Widget */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white">
            <div className="text-2xl font-bold">{currentTime}</div>
            <div className="text-blue-100">
              {new Date().toLocaleDateString('pl-PL', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          {/* Weather Widget */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <WeatherAPI />
          </div>

          {/* News Widget */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span className="text-white font-medium">Najnowsze z Witnicy</span>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">
                • Nowy park przy ulicy Głównej
              </div>
              <div className="text-sm text-gray-300">
                • Festyn miejski w weekend
              </div>
              <div className="text-sm text-gray-300">
                • Remonty dróg na osiedlu
              </div>
            </div>
          </div>

          {/* Events Widget */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-4 h-4 text-green-400" />
              <span className="text-white font-medium">Nadchodzące wydarzenia</span>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">
                <div className="font-medium">Festyn miejski</div>
                <div className="text-xs text-gray-400">Sobota, 15:00</div>
              </div>
              <div className="text-sm text-gray-300">
                <div className="font-medium">Koncert na rynku</div>
                <div className="text-xs text-gray-400">Niedziela, 18:00</div>
              </div>
            </div>
          </div>

          {/* Stats Widget */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <CityStatsWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetPanel;
