
import React, { useEffect } from 'react';
import { Minus, Square, X } from 'lucide-react';
import { useWindowManager } from '../hooks/useWindowManager';

interface EnhancedFluentWindowProps {
  window: any;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  onSizeChange: (id: string, size: { width: number; height: number }) => void;
  onBringToFront: (id: string) => void;
}

const EnhancedFluentWindow: React.FC<EnhancedFluentWindowProps> = ({
  window,
  onClose,
  onMinimize,
  onMaximize,
  onPositionChange,
  onSizeChange,
  onBringToFront
}) => {
  const {
    windowRef,
    isDragging,
    isResizing,
    startDrag,
    startResize,
    attachGlobalListeners
  } = useWindowManager(
    window.id,
    window.position,
    window.size,
    onPositionChange,
    onSizeChange
  );

  useEffect(() => {
    const cleanup = attachGlobalListeners();
    return cleanup;
  }, [attachGlobalListeners]);

  const handleWindowClick = () => {
    onBringToFront(window.id);
  };

  const windowStyle = window.isMaximized
    ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 56px)',
        zIndex: window.zIndex,
      }
    : {
        position: 'absolute' as const,
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
      };

  return (
    <div
      ref={windowRef}
      style={windowStyle}
      className={`rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 ${
        window.isActive ? 'ring-2 ring-blue-400/50' : ''
      } ${isDragging ? 'select-none' : ''}`}
      onClick={handleWindowClick}
    >
      {/* Window Background with Fluent Design */}
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(40px) saturate(1.8)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      />

      {/* Window Header */}
      <div 
        className={`relative h-12 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 ${
          window.isMaximized ? 'cursor-default' : 'cursor-move'
        } ${isDragging ? 'cursor-grabbing' : ''}`}
        onMouseDown={window.isMaximized ? undefined : startDrag}
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
        className="relative flex-1 overflow-auto" 
        style={{ 
          height: 'calc(100% - 48px)',
          background: 'rgba(255, 255, 255, 0.05)'
        }}
      >
        {window.component}
      </div>

      {/* Resize Handles */}
      {!window.isMaximized && (
        <>
          {/* Bottom-right resize handle */}
          <div
            className={`absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize opacity-0 hover:opacity-100 transition-opacity ${
              isResizing ? 'opacity-100' : ''
            }`}
            style={{
              background: 'linear-gradient(-45deg, transparent 0%, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%, transparent 100%)'
            }}
            onMouseDown={startResize}
          />
          
          {/* Edge resize handles */}
          <div
            className="absolute bottom-0 left-0 right-4 h-1 cursor-ns-resize opacity-0 hover:opacity-50 transition-opacity bg-white/20"
            onMouseDown={startResize}
          />
          <div
            className="absolute top-12 right-0 bottom-4 w-1 cursor-ew-resize opacity-0 hover:opacity-50 transition-opacity bg-white/20"
            onMouseDown={startResize}
          />
        </>
      )}

      {/* Resize indicator */}
      {isResizing && (
        <div className="absolute bottom-2 right-2 text-xs text-white/60 font-mono bg-black/20 px-2 py-1 rounded">
          {window.size.width} × {window.size.height}
        </div>
      )}
    </div>
  );
};

export default EnhancedFluentWindow;
