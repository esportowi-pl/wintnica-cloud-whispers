
import React from 'react';
import { X } from 'lucide-react';

interface WallpaperSelectorProps {
  currentWallpaper: string;
  onWallpaperChange: (wallpaper: string) => void;
  onClose: () => void;
}

const WallpaperSelector: React.FC<WallpaperSelectorProps> = ({
  currentWallpaper,
  onWallpaperChange,
  onClose
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
    }
  ];

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
          <h2 className="text-xl font-bold text-white">Wybierz tapetę</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded hover:bg-white/20 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Wallpapers Grid */}
        <div className="p-6 grid grid-cols-3 gap-4 overflow-y-auto" style={{ height: 'calc(100% - 80px)' }}>
          {wallpapers.map(wallpaper => (
            <div 
              key={wallpaper.id}
              className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all ${
                currentWallpaper === wallpaper.url 
                  ? 'ring-4 ring-blue-500 scale-105' 
                  : 'hover:scale-105'
              }`}
              onClick={() => {
                onWallpaperChange(wallpaper.url);
                onClose();
              }}
            >
              <img 
                src={wallpaper.url} 
                alt={wallpaper.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <h3 className="text-white text-sm font-medium">{wallpaper.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WallpaperSelector;
