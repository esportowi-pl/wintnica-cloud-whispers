
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
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showActionCenter, setShowActionCenter] = useState(false);
  const [showWidgets, setShowWidgets] = useState(false);
  const [currentDesktop, setCurrentDesktop] = useState(0);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=1920&auto=format&fit=crop');

  const virtualDesktops = [
    { id: 0, name: 'Główny', windows: [] },
    { id: 1, name: 'Praca', windows: [] },
    { id: 2, name: 'Rozrywka', windows: [] }
  ];

  const handleOpenApp = (appId: string, title: string) => {
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

  const handleCloseWindow = (id: string) => {
    setWindows(prev => prev.filter(window => window.id !== id));
  };

  const handleMinimizeWindow = (id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: true } : window
    ));
  };

  const handleMaximizeWindow = (id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { 
        ...window, 
        isMaximized: !window.isMaximized
      } : window
    ));
  };

  const toggleStartMenu = () => {
    setShowStartMenu(prev => !prev);
    setShowActionCenter(false);
    setShowWidgets(false);
  };

  const toggleActionCenter = () => {
    setShowActionCenter(prev => !prev);
    setShowStartMenu(false);
    setShowWidgets(false);
  };

  const toggleWidgets = () => {
    setShowWidgets(prev => !prev);
    setShowStartMenu(false);
    setShowActionCenter(false);
  };

  const switchDesktop = (index: number) => {
    setCurrentDesktop(index);
  };

  return {
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
  };
};
