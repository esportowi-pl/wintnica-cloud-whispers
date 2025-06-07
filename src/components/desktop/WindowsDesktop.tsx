
import React, { useState } from 'react';
import TaskBar from './TaskBar';
import DesktopWindow from './DesktopWindow';
import StartMenu from './StartMenu';
import WidgetPanel from './WidgetPanel';
import WallpaperSelector from './WallpaperSelector';
import { WindowState } from './types';

const WindowsDesktop = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showWidgets, setShowWidgets] = useState(false);
  const [showWallpaperSelector, setShowWallpaperSelector] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState('/api/placeholder/1920/1080?text=Witnica+Wallpaper');
  const [nextZIndex, setNextZIndex] = useState(100);

  const openWindow = (appId: string, title: string, component: React.ReactNode, initialSize = { width: 800, height: 600 }) => {
    const newWindow: WindowState = {
      id: Date.now().toString(),
      appId,
      title,
      component,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
      size: initialSize,
      zIndex: nextZIndex
    };
    
    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(window => window.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: true } : window
    ));
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { 
        ...window, 
        isMaximized: !window.isMaximized,
        position: window.isMaximized ? window.position : { x: 0, y: 0 },
        size: window.isMaximized ? window.size : { width: window.innerWidth || 1920, height: window.innerHeight || 1080 }
      } : window
    ));
  };

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, zIndex: nextZIndex, isMinimized: false } : window
    ));
    setNextZIndex(prev => prev + 1);
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, position } : window
    ));
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, size } : window
    ));
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative"
      style={{
        backgroundImage: `url(${currentWallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 space-y-2">
        <div 
          className="flex flex-col items-center text-white cursor-pointer hover:bg-white/20 p-2 rounded"
          onClick={() => setShowWallpaperSelector(true)}
        >
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-1">
            🖼️
          </div>
          <span className="text-xs text-center">Tapety</span>
        </div>
      </div>

      {/* Windows */}
      {windows.map(window => (
        !window.isMinimized && (
          <DesktopWindow
            key={window.id}
            window={window}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            onMove={(position) => updateWindowPosition(window.id, position)}
            onResize={(size) => updateWindowSize(window.id, size)}
          />
        )
      ))}

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu 
          onClose={() => setShowStartMenu(false)}
          onOpenApp={openWindow}
        />
      )}

      {/* Widgets Panel */}
      {showWidgets && (
        <WidgetPanel onClose={() => setShowWidgets(false)} />
      )}

      {/* Wallpaper Selector */}
      {showWallpaperSelector && (
        <WallpaperSelector 
          currentWallpaper={currentWallpaper}
          onWallpaperChange={setCurrentWallpaper}
          onClose={() => setShowWallpaperSelector(false)}
        />
      )}

      {/* TaskBar */}
      <TaskBar 
        windows={windows}
        onToggleStart={() => setShowStartMenu(!showStartMenu)}
        onToggleWidgets={() => setShowWidgets(!showWidgets)}
        onRestoreWindow={focusWindow}
        onOpenApp={openWindow}
      />
    </div>
  );
};

export default WindowsDesktop;
