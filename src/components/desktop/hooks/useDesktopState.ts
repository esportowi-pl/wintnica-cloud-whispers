
import { useState, useEffect } from 'react';
import { WindowState } from '../types';

export const useDesktopState = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showWidgets, setShowWidgets] = useState(false);
  const [showWallpaperSelector, setShowWallpaperSelector] = useState(false);
  const [nextZIndex, setNextZIndex] = useState(100);

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

  return {
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
  };
};
