
import React from 'react';
import { X, Play, Pause, Shuffle, Download } from 'lucide-react';

interface WallpaperSelectorProps {
  currentWallpaper: string;
  onWallpaperChange: (wallpaper: string) => void;
  onClose: () => void;
  wallpaperMode: 'static' | 'slideshow';
  onToggleMode: () => void;
}

const WallpaperSelector: React.FC<WallpaperSelectorProps> = ({
  currentWallpaper,
  onWallpaperChange,
  onClose,
  wallpaperMode,
  onToggleMode
}) => {
  const wallpapers = [
    { 
      id: 'witnica-park', 
      name: 'Park miejski', 
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop'
    },
    { 
      id: 'witnica-lake', 
      name: 'Jezioro', 
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop'
    },
    { 
      id: 'witnica-sunset', 
      name: 'Zachód słońca', 
      url: 'https://images.unsplash.com/photo-1506792006437-256b665541e2?q=80&w=1920&auto=format&fit=crop'
    },
    { 
      id: 'witnica-forest', 
      name: 'Las', 
      url: 'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?q=80&w=1920&auto=format&fit=crop'
    },
    { 
      id: 'witnica-flowers', 
      name: 'Łąka kwiatowa', 
      url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1920&auto=format&fit=crop'
    },
    { 
      id: 'witnica-bridge', 
      name: 'Most', 
      url: 'https://images.unsplash.com/photo-1477414956199-7dafc86a4f1a?q=80&w=1920&auto=format&fit=crop'
    },
    { 
      id: 'witnica-architecture', 
      name: 'Architektura', 
      url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1920&auto=format&fit=crop'
    },
    { 
      id: 'witnica-morning', 
      name: 'Poranek', 
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920&auto=format&fit=crop'
    },
    { 
      id: 'witnica-winter', 
      name: 'Zima', 
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop'
    }
  ];

  const setRandomWallpaper = () => {
    const randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    onWallpaperChange(randomWallpaper.url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="absolute inset-4 bg-gray-900/95 rounded-lg shadow-2xl border border-white/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-white">Personalizacja pulpitu</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={onToggleMode}
                className={`flex items-center space-x-2 px-3 py-1 rounded ${
                  wallpaperMode === 'slideshow' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {wallpaperMode === 'slideshow' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-sm">
                  {wallpaperMode === 'slideshow' ? 'Zatrzymaj pokaz' : 'Pokaz slajdów'}
                </span>
              </button>
              <button
                onClick={setRandomWallpaper}
                className="flex items-center space-x-2 px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
              >
                <Shuffle className="w-4 h-4" />
                <span className="text-sm">Losowa</span>
              </button>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded hover:bg-white/20 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Mode Info */}
        <div className="px-6 py-3 bg-blue-900/50 border-b border-white/10">
          <div className="text-blue-200 text-sm">
            {wallpaperMode === 'slideshow' ? (
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Pokaz slajdów jest aktywny - tapeta zmienia się co 30 sekund</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Pause className="w-4 h-4" />
                <span>Tryb statyczny - wybierz tapetę z galerii poniżej</span>
              </div>
            )}
          </div>
        </div>

        {/* Wallpapers Grid */}
        <div className="p-6 grid grid-cols-3 gap-4 overflow-y-auto" style={{ height: 'calc(100% - 160px)' }}>
          {wallpapers.map(wallpaper => (
            <div 
              key={wallpaper.id}
              className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all group ${
                currentWallpaper === wallpaper.url 
                  ? 'ring-4 ring-blue-500 scale-105' 
                  : 'hover:scale-105 hover:ring-2 hover:ring-white/50'
              }`}
              onClick={() => {
                onWallpaperChange(wallpaper.url);
                if (wallpaperMode === 'slideshow') {
                  onToggleMode(); // Switch to static when manually selecting
                }
              }}
            >
              <img 
                src={wallpaper.url} 
                alt={wallpaper.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white text-sm font-medium">{wallpaper.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-300">1920x1080</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(wallpaper.url, '_blank');
                    }}
                    className="p-1 rounded bg-white/20 hover:bg-white/40"
                  >
                    <Download className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
              {currentWallpaper === wallpaper.url && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/20 bg-gray-800/50">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Galeria tapet Witnicy - {wallpapers.length} dostępnych</span>
            <span>Tapety zmieniają się płynnie z efektami przejścia</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperSelector;
