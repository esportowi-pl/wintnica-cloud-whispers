
import React from 'react';
import FluentWindow from './components/FluentWindow';

interface WindowManager2Props {
  windows: any[];
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
}

const WindowManager2: React.FC<WindowManager2Props> = ({
  windows,
  onClose,
  onMinimize,
  onMaximize
}) => {
  return (
    <>
      {windows
        .filter(window => !window.isMinimized)
        .map(window => (
          <FluentWindow
            key={window.id}
            window={window}
            onClose={() => onClose(window.id)}
            onMinimize={() => onMinimize(window.id)}
            onMaximize={() => onMaximize(window.id)}
          />
        ))}
    </>
  );
};

export default WindowManager2;
