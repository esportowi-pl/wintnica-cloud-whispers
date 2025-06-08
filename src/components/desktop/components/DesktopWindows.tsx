
import React from 'react';
import DesktopWindow from '../DesktopWindow';
import { WindowState } from '../types';

interface DesktopWindowsProps {
  windows: WindowState[];
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, position: { x: number; y: number }) => void;
  onResize: (id: string, size: { width: number; height: number }) => void;
}

const DesktopWindows: React.FC<DesktopWindowsProps> = ({
  windows,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize
}) => {
  return (
    <>
      {windows.map(window => (
        !window.isMinimized && (
          <DesktopWindow
            key={window.id}
            window={window}
            onClose={() => onClose(window.id)}
            onMinimize={() => onMinimize(window.id)}
            onMaximize={() => onMaximize(window.id)}
            onFocus={() => onFocus(window.id)}
            onMove={(position) => onMove(window.id, position)}
            onResize={(size) => onResize(window.id, size)}
          />
        )
      ))}
    </>
  );
};

export default DesktopWindows;
