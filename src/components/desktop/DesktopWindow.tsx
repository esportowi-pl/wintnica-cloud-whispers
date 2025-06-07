
import React, { useState, useRef } from 'react';
import { Minus, Square, X, Maximize2 } from 'lucide-react';
import { WindowState } from './types';

interface DesktopWindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (position: { x: number; y: number }) => void;
  onResize: (size: { width: number; height: number }) => void;
}

const DesktopWindow: React.FC<DesktopWindowProps> = ({
  window,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('window-header')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y
      });
      onFocus();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      onMove({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart]);

  const windowStyle = window.isMaximized
    ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 48px)', // Account for taskbar
        zIndex: window.zIndex
      }
    : {
        position: 'absolute' as const,
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex
      };

  return (
    <div
      ref={windowRef}
      style={windowStyle}
      className="bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden"
      onClick={onFocus}
    >
      {/* Window Header */}
      <div 
        className="window-header h-8 bg-gray-50 border-b border-gray-200 flex items-center justify-between px-3 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs">📱</span>
          </div>
          <span className="text-sm font-medium text-gray-700 truncate">
            {window.title}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={onMinimize}
            className="w-6 h-6 rounded hover:bg-gray-200 flex items-center justify-center"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            onClick={onMaximize}
            className="w-6 h-6 rounded hover:bg-gray-200 flex items-center justify-center"
          >
            <Square className="w-3 h-3" />
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded hover:bg-red-500 hover:text-white flex items-center justify-center"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto" style={{ height: 'calc(100% - 32px)' }}>
        {window.component}
      </div>

      {/* Resize Handle */}
      {!window.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-3 h-3 cursor-nw-resize"
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsResizing(true);
            setDragStart({ x: e.clientX, y: e.clientY });
          }}
        />
      )}
    </div>
  );
};

export default DesktopWindow;
