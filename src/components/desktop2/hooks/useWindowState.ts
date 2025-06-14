
import { useState, useCallback } from 'react';

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  component: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export const useWindowState = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);

  const addWindow = useCallback((windowData: Omit<WindowState, 'id' | 'zIndex'>) => {
    const newWindow: WindowState = {
      ...windowData,
      id: `window-${Date.now()}-${Math.random()}`,
      zIndex: nextZIndex,
    };
    
    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
    
    return newWindow.id;
  }, [nextZIndex]);

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, position } : window
    ));
  }, []);

  const updateWindowSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, size } : window
    ));
  }, []);

  const bringToFront = useCallback((id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, zIndex: nextZIndex } : window
    ));
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: true } : window
    ));
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(window => {
      if (window.id === id) {
        if (window.isMaximized) {
          return { ...window, isMaximized: false };
        } else {
          return { 
            ...window, 
            isMaximized: true,
            position: { x: 0, y: 0 },
            size: { width: globalThis.innerWidth || 1920, height: (globalThis.innerHeight || 1080) - 80 }
          };
        }
      }
      return window;
    }));
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(window => window.id !== id));
  }, []);

  return {
    windows,
    addWindow,
    updateWindowPosition,
    updateWindowSize,
    bringToFront,
    minimizeWindow,
    maximizeWindow,
    closeWindow,
  };
};
