
import React from 'react';
import TaskBar from './TaskBar';
import StartMenu from './StartMenu';
import WidgetPanel from './WidgetPanel';
import WallpaperSelector from './WallpaperSelector';
import DesktopContextMenu from './DesktopContextMenu';
import EnhancedDesktopIcons from './components/EnhancedDesktopIcons';
import DesktopWindows from './components/DesktopWindows';
import WidgetManager from './WidgetManager';
import { WindowState } from './types';
import { useDesktopState } from './hooks/useDesktopState';
import { useWallpaperState } from './hooks/useWallpaperState';
import { useAdvancedDesktopIcons } from './hooks/useAdvancedDesktopIcons';
import { createAppComponent } from './utils/appFactory';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const WindowsDesktop = () => {
  const {
    windows,
    setWindows,
    showStartMenu,
    setShowStartMenu,
    showWidgets,
    setShowWidgets,
    showWallpaperSelector,
    setShowWallpaperSelector,
    nextZIndex,
    setNextZIndex,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize
  } = useDesktopState();

  const {
    currentWallpaper,
    wallpaperMode,
    handleWallpaperChange,
    toggleWallpaperMode
  } = useWallpaperState();

  const {
    desktopIcons,
    selectedIcons,
    draggedIcon,
    isEditMode,
    handleIconMouseDown,
    handleIconSelect,
    handleIconDoubleClick: iconDoubleClick,
    handleDeleteIcon,
    createDesktopShortcut,
    toggleEditMode
  } = useAdvancedDesktopIcons();

  const handleIconDoubleClick = (iconId: string) => {
    switch (iconId) {
      case 'wallpapers':
        setShowWallpaperSelector(true);
        break;
      case 'my-computer':
        openWindow('explorer', 'Eksplorator plików');
        break;
      case 'recycle-bin':
        openWindow('recycle', 'Kosz');
        break;
      case 'widget-manager':
        openWindow('widget-manager', 'Menedżer Widgetów', <WidgetManager />);
        break;
      default:
        openWindow(iconId, getAppTitle(iconId));
    }
  };

  const getAppTitle = (appId: string): string => {
    const appTitles: Record<string, string> = {
      witword: 'WitWord',
      witsheets: 'WitSheets',
      witpaint: 'WitPaint',
      witcode: 'WitCode',
      witphotoshop: 'WitPhotoShop',
      witslides: 'WitSlides',
      witnotes: 'WitNotes',
      witmail: 'WitMail',
      witgames: 'WitGames',
      witcad: 'WitCAD',
      witvideo: 'WitVideo',
      witaudio: 'WitAudio',
      witdb: 'WitDB',
      witftp: 'WitFTP',
      witstream: 'WitStream'
    };
    return appTitles[appId] || appId;
  };

  const openWindow = (appId: string, title: string, component?: React.ReactNode) => {
    const { component: appComponent, size: initialSize } = createAppComponent(appId);

    const newWindow: WindowState = {
      id: Date.now().toString(),
      appId,
      title,
      component: component || appComponent,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
      size: initialSize,
      zIndex: nextZIndex
    };
    
    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const handleDesktopClick = () => {
    setShowStartMenu(false);
    setShowWidgets(false);
    if (isEditMode && selectedIcons.length > 0) {
      handleIconSelect('', false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'F2' && !isEditMode) {
      toggleEditMode();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isEditMode]);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div 
          data-desktop
          className="h-screen w-screen overflow-hidden relative transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentWallpaper})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          onClick={handleDesktopClick}
        >
          <EnhancedDesktopIcons
            icons={desktopIcons}
            selectedIcons={selectedIcons}
            draggedIcon={draggedIcon}
            isEditMode={isEditMode}
            onIconMouseDown={handleIconMouseDown}
            onIconSelect={handleIconSelect}
            onIconDoubleClick={handleIconDoubleClick}
            onDeleteIcon={handleDeleteIcon}
            onCreateShortcut={createDesktopShortcut}
          />

          {wallpaperMode === 'slideshow' && (
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              📺 Pokaz slajdów aktywny
            </div>
          )}

          {isEditMode && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg z-50 flex items-center gap-4">
              <span className="text-sm font-medium">🔧 Tryb edycji aktywny</span>
              <button 
                onClick={toggleEditMode}
                className="text-xs bg-white/20 px-2 py-1 rounded"
              >
                ESC aby wyjść
              </button>
            </div>
          )}

          <DesktopWindows
            windows={windows}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
            onFocus={focusWindow}
            onMove={updateWindowPosition}
            onResize={updateWindowSize}
          />

          {showStartMenu && (
            <StartMenu 
              onClose={() => setShowStartMenu(false)}
              onOpenApp={openWindow}
            />
          )}

          {showWidgets && (
            <WidgetPanel onClose={() => setShowWidgets(false)} />
          )}

          {showWallpaperSelector && (
            <WallpaperSelector 
              currentWallpaper={currentWallpaper}
              onWallpaperChange={handleWallpaperChange}
              onClose={() => setShowWallpaperSelector(false)}
              wallpaperMode={wallpaperMode}
              onToggleMode={toggleWallpaperMode}
            />
          )}

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
          onToggleEditMode={toggleEditMode}
          isEditMode={isEditMode}
        />
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default WindowsDesktop;
