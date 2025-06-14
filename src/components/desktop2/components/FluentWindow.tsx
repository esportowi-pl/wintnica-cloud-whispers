
import React, { useState, useRef } from 'react';
import { Minus, Square, X, Maximize2 } from 'lucide-react';

interface FluentWindowProps {
  window: any;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

const FluentWindow: React.FC<FluentWindowProps> = ({
  window,
  onClose,
  onMinimize,
  onMaximize
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('window-header')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y
      });
    }
  };

  const windowStyle = window.isMaximized
    ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 56px)',
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
      className="rounded-2xl shadow-2xl overflow-hidden transition-all duration-300"
      onMouseDown={handleMouseDown}
      style={{
        ...windowStyle,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(40px) saturate(1.8)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Window Header */}
      <div 
        className="window-header h-12 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs">📱</span>
          </div>
          <span className="text-white font-medium truncate">
            {window.title}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={onMinimize}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors group"
          >
            <Minus className="w-4 h-4 text-white/60 group-hover:text-white" />
          </button>
          <button
            onClick={onMaximize}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors group"
          >
            <Square className="w-4 h-4 text-white/60 group-hover:text-white" />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-red-500/30 hover:text-white flex items-center justify-center transition-colors group"
          >
            <X className="w-4 h-4 text-white/60 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div 
        className="flex-1 overflow-auto" 
        style={{ 
          height: 'calc(100% - 48px)',
          background: 'rgba(255, 255, 255, 0.05)'
        }}
      >
        {window.component}
      </div>

      {/* Resize Handle */}
      {!window.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize opacity-0 hover:opacity-100 transition-opacity"
          style={{
            background: 'linear-gradient(-45deg, transparent 0%, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%, transparent 100%)'
          }}
        />
      )}
    </div>
  );
};

export default FluentWindow;
