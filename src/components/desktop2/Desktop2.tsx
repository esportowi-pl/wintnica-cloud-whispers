
import React from 'react';
import { useDesktop2State } from './hooks/useDesktop2State';
import TaskBar2 from './TaskBar2';
import StartMenu2 from './StartMenu2';
import ActionCenter2 from './ActionCenter2';
import WidgetPanel2 from './WidgetPanel2';
import EnhancedWindowManager from './components/EnhancedWindowManager';
import VirtualDesktops from './VirtualDesktops';
import { useFluentDesign } from './hooks/useFluentDesign';

const Desktop2: React.FC = () => {
  const {
    windows,
    startMenuOpen,
    actionCenterOpen,
    widgetPanelOpen,
    currentDesktop,
    desktops,
    openApp,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    toggleStartMenu,
    toggleActionCenter,
    toggleWidgetPanel,
    switchDesktop,
    updateWindowPosition,
    updateWindowSize,
    bringToFront
  } = useDesktop2State();

  const { glassMorphism } = useFluentDesign();

  // Dynamic wallpaper with WITNICA theme
  const getWallpaperStyle = () => {
    const hour = new Date().getHours();
    const isDaytime = hour >= 6 && hour < 18;
    
    return {
      background: isDaytime 
        ? 'linear-gradient(135deg, #0078D4 0%, #6B46C1 50%, #8B5CF6 100%)'
        : 'linear-gradient(135deg, #1e3a8a 0%, #4c1d95 50%, #581c87 100%)',
      transition: 'background 1s ease-in-out'
    };
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      style={getWallpaperStyle()}
    >
      {/* Desktop Background Effects */}
      <div className="absolute inset-0 bg-black/5" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)`,
        }}
      />

      {/* Virtual Desktops Indicator */}
      <VirtualDesktops
        desktops={desktops}
        currentDesktop={currentDesktop}
        onSwitchDesktop={switchDesktop}
      />

      {/* Desktop Icons */}
      <div className="absolute top-8 left-8 grid grid-cols-1 gap-4">
        {[
          { name: 'Kosz', icon: '🗑️', id: 'recycle' },
          { name: 'Mój Komputer', icon: '💻', id: 'computer' },
          { name: 'Dokumenty', icon: '📁', id: 'documents' },
          { name: 'WITNICA Portal', icon: '🌐', id: 'portal' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => openApp(item.id, item.name)}
            className="flex flex-col items-center p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group max-w-[80px]"
          >
            <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <span className="text-white text-xs font-medium text-center drop-shadow-lg">
              {item.name}
            </span>
          </button>
        ))}
      </div>

      {/* Enhanced Windows with advanced management */}
      <EnhancedWindowManager
        windows={windows}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
        onPositionChange={updateWindowPosition}
        onSizeChange={updateWindowSize}
        onBringToFront={bringToFront}
      />

      {/* Start Menu */}
      {startMenuOpen && (
        <StartMenu2
          onClose={toggleStartMenu}
          onOpenApp={openApp}
          style={glassMorphism}
        />
      )}

      {/* Action Center */}
      {actionCenterOpen && (
        <ActionCenter2
          onClose={toggleActionCenter}
          style={glassMorphism}
        />
      )}

      {/* Widget Panel */}
      {widgetPanelOpen && (
        <WidgetPanel2
          onClose={toggleWidgetPanel}
          style={glassMorphism}
        />
      )}

      {/* Taskbar */}
      <TaskBar2
        onToggleStart={toggleStartMenu}
        onToggleActionCenter={toggleActionCenter}
        onToggleWidgets={toggleWidgetPanel}
        openWindows={windows}
        onWindowClick={(windowId) => {
          const window = windows.find(w => w.id === windowId);
          if (window?.isMinimized) {
            minimizeWindow(windowId);
          } else {
            bringToFront(windowId);
          }
        }}
      />
    </div>
  );
};

export default Desktop2;
