
import React, { useState, useEffect } from 'react';
import TaskBar from './TaskBar';
import DesktopWindow from './DesktopWindow';
import StartMenu from './StartMenu';
import WidgetPanel from './WidgetPanel';
import WallpaperSelector from './WallpaperSelector';
import DesktopContextMenu from './DesktopContextMenu';
import { WindowState } from './types';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

// Import all the new applications
import WitWord from './apps/WitWord';
import WitSheets from './apps/WitSheets';
import WitPaint from './apps/WitPaint';
import WitCode from './apps/WitCode';
import WitGames from './apps/WitGames';
import WitMail from './apps/WitMail';

const WindowsDesktop = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showWidgets, setShowWidgets] = useState(false);
  const [showWallpaperSelector, setShowWallpaperSelector] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState('');
  const [wallpaperMode, setWallpaperMode] = useState<'static' | 'slideshow'>('static');
  const [nextZIndex, setNextZIndex] = useState(100);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [desktopIcons, setDesktopIcons] = useState([
    { id: 'wallpapers', name: 'Tapety', icon: '🖼️', x: 50, y: 50 },
    { id: 'recycle-bin', name: 'Kosz', icon: '🗑️', x: 50, y: 150 },
    { id: 'my-computer', name: 'Mój komputer', icon: '💻', x: 50, y: 250 },
  ]);

  const wallpapers = [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506792006437-256b665541e2?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1477414956199-7dafc86a4f1a?q=80&w=1920&auto=format&fit=crop',
  ];

  // Load saved wallpaper and settings from localStorage
  useEffect(() => {
    const savedWallpaper = localStorage.getItem('desktop-wallpaper');
    const savedMode = localStorage.getItem('wallpaper-mode') as 'static' | 'slideshow';
    const savedIcons = localStorage.getItem('desktop-icons');

    if (savedWallpaper) {
      setCurrentWallpaper(savedWallpaper);
    } else {
      // Set random wallpaper if none saved
      const randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
      setCurrentWallpaper(randomWallpaper);
    }

    if (savedMode) {
      setWallpaperMode(savedMode);
    }

    if (savedIcons) {
      try {
        setDesktopIcons(JSON.parse(savedIcons));
      } catch (e) {
        console.error('Error loading desktop icons:', e);
      }
    }
  }, []);

  // Slideshow functionality
  useEffect(() => {
    if (wallpaperMode === 'slideshow') {
      const interval = setInterval(() => {
        const currentIndex = wallpapers.indexOf(currentWallpaper);
        const nextIndex = (currentIndex + 1) % wallpapers.length;
        const nextWallpaper = wallpapers[nextIndex];
        setCurrentWallpaper(nextWallpaper);
        localStorage.setItem('desktop-wallpaper', nextWallpaper);
      }, 30000); // Change every 30 seconds

      return () => clearInterval(interval);
    }
  }, [wallpaperMode, currentWallpaper, wallpapers]);

  const openWindow = (appId: string, title: string, component: React.ReactNode, initialSize = { width: 800, height: 600 }) => {
    // Check if this is one of our new applications and render the proper component
    let appComponent = component;
    
    switch (appId) {
      case 'witword':
        appComponent = <WitWord />;
        initialSize = { width: 1000, height: 700 };
        break;
      case 'witsheets':
        appComponent = <WitSheets />;
        initialSize = { width: 1200, height: 800 };
        break;
      case 'witpaint':
        appComponent = <WitPaint />;
        initialSize = { width: 1000, height: 700 };
        break;
      case 'witcode':
        appComponent = <WitCode />;
        initialSize = { width: 1200, height: 800 };
        break;
      case 'witgames':
        appComponent = <WitGames />;
        initialSize = { width: 800, height: 600 };
        break;
      case 'witmail':
        appComponent = <WitMail />;
        initialSize = { width: 1000, height: 700 };
        break;
      default:
        appComponent = component;
    }

    const newWindow: WindowState = {
      id: Date.now().toString(),
      appId,
      title,
      component: appComponent,
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

  const handleWallpaperChange = (wallpaper: string) => {
    setCurrentWallpaper(wallpaper);
    localStorage.setItem('desktop-wallpaper', wallpaper);
  };

  const toggleWallpaperMode = () => {
    const newMode = wallpaperMode === 'static' ? 'slideshow' : 'static';
    setWallpaperMode(newMode);
    localStorage.setItem('wallpaper-mode', newMode);
  };

  const createDesktopShortcut = (name: string, icon: string) => {
    const newIcon = {
      id: Date.now().toString(),
      name,
      icon,
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 100,
    };
    const updatedIcons = [...desktopIcons, newIcon];
    setDesktopIcons(updatedIcons);
    localStorage.setItem('desktop-icons', JSON.stringify(updatedIcons));
  };

  const deleteDesktopIcon = (id: string) => {
    const updatedIcons = desktopIcons.filter(icon => icon.id !== id);
    setDesktopIcons(updatedIcons);
    localStorage.setItem('desktop-icons', JSON.stringify(updatedIcons));
  };

  const handleDesktopClick = () => {
    setShowStartMenu(false);
    setShowWidgets(false);
  };

  const handleIconDoubleClick = (iconId: string) => {
    switch (iconId) {
      case 'wallpapers':
        setShowWallpaperSelector(true);
        break;
      case 'my-computer':
        openWindow('explorer', 'Eksplorator plików', <div className="p-4">Eksplorator plików - W budowie</div>);
        break;
      case 'recycle-bin':
        openWindow('recycle', 'Kosz', <div className="p-4">Kosz jest pusty</div>);
        break;
      default:
        console.log('Opening:', iconId);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div 
          className="h-screen w-screen overflow-hidden relative transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentWallpaper})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          onClick={handleDesktopClick}
        >
          {/* Desktop Icons */}
          {desktopIcons.map(icon => (
            <div
              key={icon.id}
              className="absolute flex flex-col items-center text-white cursor-pointer hover:bg-white/20 p-2 rounded select-none"
              style={{ left: icon.x, top: icon.y }}
              onDoubleClick={() => handleIconDoubleClick(icon.id)}
            >
              <div className="w-12 h-12 text-3xl mb-1 flex items-center justify-center">
                {icon.icon}
              </div>
              <span className="text-xs text-center text-shadow-lg drop-shadow-lg">{icon.name}</span>
            </div>
          ))}

          {/* Wallpaper Mode Indicator */}
          {wallpaperMode === 'slideshow' && (
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              📺 Pokaz slajdów aktywny
            </div>
          )}

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
              onWallpaperChange={handleWallpaperChange}
              onClose={() => setShowWallpaperSelector(false)}
              wallpaperMode={wallpaperMode}
              onToggleMode={toggleWallpaperMode}
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
      </ContextMenuTrigger>
      
      <ContextMenuContent>
        <DesktopContextMenu 
          onCreateShortcut={createDesktopShortcut}
          onOpenWallpaperSelector={() => setShowWallpaperSelector(true)}
          onToggleWallpaperMode={toggleWallpaperMode}
          wallpaperMode={wallpaperMode}
          onRefresh={() => window.location.reload()}
        />
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default WindowsDesktop;
