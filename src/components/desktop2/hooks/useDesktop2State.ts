import { useState, useEffect } from 'react';
import React from 'react';
import { useWindowState } from './useWindowState';

export const useDesktop2State = () => {
  const {
    windows,
    updateWindowPosition,
    updateWindowSize,
    bringToFront,
    minimizeWindow,
    maximizeWindow,
    closeWindow,
    addWindow
  } = useWindowState();

  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [actionCenterOpen, setActionCenterOpen] = useState(false);
  const [widgetPanelOpen, setWidgetPanelOpen] = useState(false);
  const [currentDesktop, setCurrentDesktop] = useState(0);

  const desktops = [
    { id: 0, name: 'Główny', windows: [] },
    { id: 1, name: 'Praca', windows: [] },
    { id: 2, name: 'Rozrywka', windows: [] }
  ];

  const openApp = (appId: string, title: string) => {
    // Try to import app factory dynamically
    import('../../desktop/utils/appFactory')
      .then(({ createAppComponent }) => {
        const { component: appComponent, size: initialSize } = createAppComponent(appId);
        
        addWindow({
          appId,
          title,
          component: appComponent,
          isMinimized: false,
          isMaximized: false,
          position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
          size: initialSize
        });
      })
      .catch(error => {
        console.error('Failed to load app component:', error);
        // Create fallback component inline
        const fallbackComponent = React.createElement('div', { className: 'p-4 text-white' }, 
          React.createElement('h2', { className: 'text-xl font-bold mb-4' }, title),
          React.createElement('p', null, `Aplikacja ${title} jest w trakcie ładowania...`)
        );
        
        addWindow({
          appId,
          title,
          component: fallbackComponent,
          isMinimized: false,
          isMaximized: false,
          position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
          size: { width: 800, height: 600 }
        });
      });
  };

  const toggleStartMenu = () => {
    setStartMenuOpen(prev => !prev);
    setActionCenterOpen(false);
    setWidgetPanelOpen(false);
  };

  const toggleActionCenter = () => {
    setActionCenterOpen(prev => !prev);
    setStartMenuOpen(false);
    setWidgetPanelOpen(false);
  };

  const toggleWidgetPanel = () => {
    setWidgetPanelOpen(prev => !prev);
    setStartMenuOpen(false);
    setActionCenterOpen(false);
  };

  const switchDesktop = (index: number) => {
    setCurrentDesktop(index);
  };

  return {
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
  };
};
