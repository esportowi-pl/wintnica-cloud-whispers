
import React from 'react';
import EnhancedFluentWindow from './EnhancedFluentWindow';

interface EnhancedWindowManagerProps {
  windows: any[];
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  onSizeChange: (id: string, size: { width: number; height: number }) => void;
  onBringToFront: (id: string) => void;
}

const EnhancedWindowManager: React.FC<EnhancedWindowManagerProps> = ({
  windows,
  onClose,
  onMinimize,
  onMaximize,
  onPositionChange,
  onSizeChange,
  onBringToFront
}) => {
  return (
    <>
      {windows
        .filter(window => !window.isMinimized)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map(window => (
          <EnhancedFluentWindow
            key={window.id}
            window={window}
            onClose={() => onClose(window.id)}
            onMinimize={() => onMinimize(window.id)}
            onMaximize={() => onMaximize(window.id)}
            onPositionChange={onPositionChange}
            onSizeChange={onSizeChange}
            onBringToFront={onBringToFront}
          />
        ))}
    </>
  );
};

export default EnhancedWindowManager;
