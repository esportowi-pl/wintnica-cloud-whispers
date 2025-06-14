
import React from 'react';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  type: 'app' | 'widget' | 'folder';
  isEditable?: boolean;
  isSystem?: boolean;
}

interface EnhancedDesktopIconsProps {
  icons: DesktopIcon[];
  selectedIcons: string[];
  draggedIcon: string | null;
  isEditMode: boolean;
  onIconMouseDown: (e: React.MouseEvent, iconId: string) => void;
  onIconSelect: (iconId: string, ctrlKey: boolean) => void;
  onIconDoubleClick: (iconId: string) => void;
  onDeleteIcon: (iconId: string) => void;
  onCreateShortcut: (name: string, icon: string) => void;
}

const EnhancedDesktopIcons: React.FC<EnhancedDesktopIconsProps> = ({
  icons,
  selectedIcons,
  draggedIcon,
  isEditMode,
  onIconMouseDown,
  onIconSelect,
  onIconDoubleClick,
  onDeleteIcon,
  onCreateShortcut
}) => {
  const handleIconClick = (e: React.MouseEvent, iconId: string) => {
    e.stopPropagation();
    onIconSelect(iconId, e.ctrlKey);
  };

  return (
    <>
      {icons.map(icon => (
        <ContextMenu key={icon.id}>
          <ContextMenuTrigger asChild>
            <div
              className={`absolute flex flex-col items-center text-white cursor-pointer p-2 rounded select-none transition-all duration-200 ${
                draggedIcon === icon.id ? 'scale-110 shadow-2xl z-50' : 
                selectedIcons.includes(icon.id) ? 'bg-blue-500/30 border-2 border-blue-300' :
                'hover:bg-white/20 hover:scale-105'
              } ${isEditMode ? 'animate-pulse' : ''}`}
              style={{ left: icon.x, top: icon.y }}
              onMouseDown={(e) => onIconMouseDown(e, icon.id)}
              onClick={(e) => handleIconClick(e, icon.id)}
              onDoubleClick={() => onIconDoubleClick(icon.id)}
            >
              <div className="w-12 h-12 text-3xl mb-1 flex items-center justify-center relative">
                {icon.icon}
                {icon.type === 'widget' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                )}
                {isEditMode && icon.isEditable && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs cursor-pointer hover:bg-red-600 transition-colors"
                       onClick={(e) => {
                         e.stopPropagation();
                         onDeleteIcon(icon.id);
                       }}>
                    ×
                  </div>
                )}
              </div>
              <span className="text-xs text-center text-shadow-lg drop-shadow-lg max-w-20 truncate">
                {icon.name}
              </span>
            </div>
          </ContextMenuTrigger>
          
          <ContextMenuContent>
            <ContextMenuItem onClick={() => onIconDoubleClick(icon.id)}>
              Otwórz
            </ContextMenuItem>
            {icon.isEditable && (
              <ContextMenuItem onClick={() => onDeleteIcon(icon.id)}>
                Usuń
              </ContextMenuItem>
            )}
            <ContextMenuItem onClick={() => onIconSelect(icon.id, false)}>
              Zaznacz
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onCreateShortcut('Nowy skrót', '📱')}>
              Utwórz skrót
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
      
      {isEditMode && (
        <div className="fixed top-4 left-4 bg-black/80 text-white px-4 py-2 rounded-lg z-50">
          <div className="text-sm font-medium">Tryb edycji</div>
          <div className="text-xs opacity-75">
            Przeciągnij ikony • Delete aby usunąć • Escape aby wyjść
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedDesktopIcons;
