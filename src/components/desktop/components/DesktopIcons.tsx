
import React from 'react';

interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
}

interface DesktopIconsProps {
  icons: DesktopIcon[];
  draggedIcon: string | null;
  onIconMouseDown: (e: React.MouseEvent, iconId: string) => void;
  onIconDoubleClick: (iconId: string) => void;
}

const DesktopIcons: React.FC<DesktopIconsProps> = ({
  icons,
  draggedIcon,
  onIconMouseDown,
  onIconDoubleClick
}) => {
  return (
    <>
      {icons.map(icon => (
        <div
          key={icon.id}
          className={`absolute flex flex-col items-center text-white cursor-pointer hover:bg-white/20 p-2 rounded select-none transition-all duration-200 ${
            draggedIcon === icon.id ? 'scale-110 shadow-2xl z-50' : 'hover:scale-105'
          }`}
          style={{ left: icon.x, top: icon.y }}
          onMouseDown={(e) => onIconMouseDown(e, icon.id)}
          onDoubleClick={() => onIconDoubleClick(icon.id)}
        >
          <div className="w-12 h-12 text-3xl mb-1 flex items-center justify-center">
            {icon.icon}
          </div>
          <span className="text-xs text-center text-shadow-lg drop-shadow-lg">{icon.name}</span>
        </div>
      ))}
    </>
  );
};

export default DesktopIcons;
