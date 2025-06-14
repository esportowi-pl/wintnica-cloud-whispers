
import { useState, useEffect } from 'react';

interface WindowState {
  id: string;
  appId: string;
  title: string;
  component: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export const useDesktop2State = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [actionCenterOpen, setActionCenterOpen] = useState(false);
  const [widgetPanelOpen, setWidgetPanelOpen] = useState(false);
  const [currentDesktop, setCurrentDesktop] = useState(0);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=1920&auto=format&fit=crop');

  const desktops = [
    { id: 0, name: 'Główny', windows: [] },
    { id: 1, name: 'Praca', windows: [] },
    { id: 2, name: 'Rozrywka', windows: [] }
  ];

  const openApp = (appId: string, title: string) => {
    const { createAppComponent } = require('../../../utils/appFactory');
    const { component: appComponent, size: initialSize } = createAppComponent(appId);

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
      window.id === id ? { ...window, isMinimized: !window.isMinimized } : window
    ));
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { 
        ...window, 
        isMaximized: !window.isMaximized
      } : window
    ));
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
    wallpaper,
    openApp,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    toggleStartMenu,
    toggleActionCenter,
    toggleWidgetPanel,
    switchDesktop
  };
};
