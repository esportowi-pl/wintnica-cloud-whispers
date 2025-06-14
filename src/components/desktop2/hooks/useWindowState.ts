
import { useState, useCallback } from 'react';

interface WindowPosition {
  x: number;
  y: number;
}

interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  component: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  position: WindowPosition;
  size: WindowSize;
  zIndex: number;
  isActive: boolean;
}

export const useWindowState = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);

  const updateWindowPosition = useCallback((id: string, position: WindowPosition) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, position } : window
    ));
  }, []);

  const updateWindowSize = useCallback((id: string, size: WindowSize) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, size } : window
    ));
  }, []);

  const bringToFront = useCallback((id: string) => {
    setWindows(prev => {
      const window = prev.find(w => w.id === id);
      if (!window) return prev;

      const newZIndex = nextZIndex;
      setNextZIndex(prev => prev + 1);

      return prev.map(w => ({
        ...w,
        zIndex: w.id === id ? newZIndex : w.zIndex,
        isActive: w.id === id
      }));
    });
  }, [nextZIndex]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: !window.isMinimized } : window
    ));
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { 
        ...window, 
        isMaximized: !window.isMaximized,
        position: window.isMaximized ? window.position : { x: 0, y: 0 },
        size: window.isMaximized ? window.size : { width: window.innerWidth || 1920, height: (window.innerHeight || 1080) - 56 }
      } : window
    ));
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(window => window.id !== id));
  }, []);

  const addWindow = useCallback((window: Omit<WindowState, 'id' | 'zIndex' | 'isActive'>) => {
    const id = Date.now().toString();
    const newWindow: WindowState = {
      ...window,
      id,
      zIndex: nextZIndex,
      isActive: true
    };
    
    setWindows(prev => [...prev.map(w => ({ ...w, isActive: false })), newWindow]);
    setNextZIndex(prev => prev + 1);
    
    return id;
  }, [nextZIndex]);

  return {
    windows,
    updateWindowPosition,
    updateWindowSize,
    bringToFront,
    minimizeWindow,
    maximizeWindow,
    closeWindow,
    addWindow
  };
};
