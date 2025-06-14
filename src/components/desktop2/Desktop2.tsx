
import React from 'react';
import TaskBar2 from './TaskBar2';
import StartMenu2 from './StartMenu2';
import ActionCenter2 from './ActionCenter2';
import WidgetPanel2 from './WidgetPanel2';
import WindowManager2 from './WindowManager2';
import VirtualDesktops from './VirtualDesktops';
import FluentWindow from './components/FluentWindow';
import { useDesktop2State } from './hooks/useDesktop2State';
import { useFluentDesign } from './hooks/useFluentDesign';
import { witnicaTheme } from './themes/witnicaTheme';

const Desktop2 = () => {
  const {
    windows,
    showStartMenu,
    showActionCenter,
    showWidgets,
    currentDesktop,
    virtualDesktops,
    wallpaper,
    handleOpenApp,
    handleCloseWindow,
    handleMinimizeWindow,
    handleMaximizeWindow,
    toggleStartMenu,
    toggleActionCenter,
    toggleWidgets,
    switchDesktop
  } = useDesktop2State();

  const { glassMorphism, fluentBlur, dynamicLighting } = useFluentDesign();

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, ${witnicaTheme.colors.primary}, ${witnicaTheme.colors.secondary})`,
        backgroundImage: wallpaper ? `url(${wallpaper})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...dynamicLighting
      }}
    >
      {/* Dynamic Blur Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backdropFilter: 'blur(1px) saturate(1.2)',
          background: 'rgba(11, 18, 42, 0.1)'
        }}
      />

      {/* Virtual Desktops Indicator */}
      <VirtualDesktops
        desktops={virtualDesktops}
        currentDesktop={currentDesktop}
        onSwitchDesktop={switchDesktop}
      />

      {/* Window Manager */}
      <WindowManager2
        windows={windows}
        onClose={handleCloseWindow}
        onMinimize={handleMinimizeWindow}
        onMaximize={handleMaximizeWindow}
      />

      {/* Start Menu 2.0 */}
      {showStartMenu && (
        <StartMenu2 
          onClose={toggleStartMenu}
          onOpenApp={handleOpenApp}
          style={glassMorphism}
        />
      )}

      {/* Action Center 2.0 */}
      {showActionCenter && (
        <ActionCenter2 
          onClose={toggleActionCenter}
          style={glassMorphism}
        />
      )}

      {/* Widget Panel 2.0 */}
      {showWidgets && (
        <WidgetPanel2 
          onClose={toggleWidgets}
          style={glassMorphism}
        />
      )}

      {/* Cortana WITNICA Assistant */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          style={fluentBlur}
        >
          <span className="text-white text-xl">🤖</span>
        </button>
      </div>

      {/* TaskBar 2.0 */}
      <TaskBar2 
        windows={windows}
        onToggleStart={toggleStartMenu}
        onToggleActionCenter={toggleActionCenter}
        onToggleWidgets={toggleWidgets}
        onOpenApp={handleOpenApp}
        style={glassMorphism}
      />

      {/* Focus Assist Overlay */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-black/20 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-medium">
          🎯 Desktop2 Mode Win20 WITNICA Edition
        </div>
      </div>
    </div>
  );
};

export default Desktop2;
