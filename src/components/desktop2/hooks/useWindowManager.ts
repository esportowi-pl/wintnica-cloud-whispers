
import { useState, useCallback, useRef } from 'react';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowManagerState {
  isDragging: boolean;
  isResizing: boolean;
  dragOffset: WindowPosition;
  initialMousePos: WindowPosition;
  initialWindowPos: WindowPosition;
  initialWindowSize: WindowSize;
}

export const useWindowManager = (
  windowId: string,
  initialPosition: WindowPosition,
  initialSize: WindowSize,
  onPositionChange: (id: string, position: WindowPosition) => void,
  onSizeChange: (id: string, size: WindowSize) => void
) => {
  const [state, setState] = useState<WindowManagerState>({
    isDragging: false,
    isResizing: false,
    dragOffset: { x: 0, y: 0 },
    initialMousePos: { x: 0, y: 0 },
    initialWindowPos: initialPosition,
    initialWindowSize: initialSize
  });

  const windowRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;

    setState(prev => ({
      ...prev,
      isDragging: true,
      dragOffset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      },
      initialMousePos: { x: e.clientX, y: e.clientY },
      initialWindowPos: initialPosition
    }));
  }, [initialPosition]);

  const startResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setState(prev => ({
      ...prev,
      isResizing: true,
      initialMousePos: { x: e.clientX, y: e.clientY },
      initialWindowSize: initialSize
    }));
  }, [initialSize]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (state.isDragging) {
      const newX = Math.max(0, e.clientX - state.dragOffset.x);
      const newY = Math.max(0, e.clientY - state.dragOffset.y);
      
      // Ensure window stays within viewport
      const maxX = window.innerWidth - 200; // minimum 200px visible
      const maxY = window.innerHeight - 100; // minimum 100px visible
      
      const clampedX = Math.min(newX, maxX);
      const clampedY = Math.min(newY, maxY);
      
      onPositionChange(windowId, { x: clampedX, y: clampedY });
    }

    if (state.isResizing) {
      const deltaX = e.clientX - state.initialMousePos.x;
      const deltaY = e.clientY - state.initialMousePos.y;
      
      const newWidth = Math.max(300, state.initialWindowSize.width + deltaX);
      const newHeight = Math.max(200, state.initialWindowSize.height + deltaY);
      
      onSizeChange(windowId, { width: newWidth, height: newHeight });
    }
  }, [state, windowId, onPositionChange, onSizeChange]);

  const handleMouseUp = useCallback(() => {
    setState(prev => ({
      ...prev,
      isDragging: false,
      isResizing: false
    }));
  }, []);

  // Global mouse event listeners
  const attachGlobalListeners = useCallback(() => {
    if (state.isDragging || state.isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = state.isDragging ? 'grabbing' : 'nw-resize';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [state.isDragging, state.isResizing, handleMouseMove, handleMouseUp]);

  return {
    windowRef,
    isDragging: state.isDragging,
    isResizing: state.isResizing,
    startDrag,
    startResize,
    attachGlobalListeners
  };
};
