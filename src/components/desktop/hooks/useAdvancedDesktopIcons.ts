import { useState, useEffect, useCallback } from 'react';

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

interface DesktopFolder {
  id: string;
  name: string;
  x: number;
  y: number;
  icons: string[];
  isOpen: boolean;
}

const defaultIcons: DesktopIcon[] = [
  { id: 'wallpapers', name: 'Tapety', icon: '🖼️', x: 50, y: 50, type: 'app', isSystem: true },
  { id: 'recycle-bin', name: 'Kosz', icon: '🗑️', x: 50, y: 150, type: 'app', isSystem: true },
  { id: 'my-computer', name: 'Mój komputer', icon: '💻', x: 50, y: 250, type: 'app', isSystem: true },
  { id: 'witcommand', name: 'Command Center', icon: '🖥️', x: 50, y: 350, type: 'app', isSystem: true },
  { id: 'witword', name: 'WitWord', icon: '📝', x: 200, y: 50, type: 'app', isEditable: true },
  { id: 'witsheets', name: 'WitSheets', icon: '📊', x: 200, y: 150, type: 'app', isEditable: true },
  { id: 'witpaint', name: 'WitPaint', icon: '🎨', x: 200, y: 250, type: 'app', isEditable: true },
  { id: 'witcode', name: 'WitCode', icon: '👨‍💻', x: 350, y: 50, type: 'app', isEditable: true },
  { id: 'witphotoshop', name: 'WitPhotoShop', icon: '🖼️', x: 350, y: 150, type: 'app', isEditable: true },
  { id: 'witslides', name: 'WitSlides', icon: '📽️', x: 350, y: 250, type: 'app', isEditable: true },
  { id: 'witnotes', name: 'WitNotes', icon: '📋', x: 500, y: 50, type: 'app', isEditable: true },
  { id: 'witmail', name: 'WitMail', icon: '📧', x: 500, y: 150, type: 'app', isEditable: true },
  { id: 'witgames', name: 'WitGames', icon: '🎮', x: 500, y: 250, type: 'app', isEditable: true },
];

export const useAdvancedDesktopIcons = () => {
  const [desktopIcons, setDesktopIcons] = useState<DesktopIcon[]>(defaultIcons);
  const [desktopFolders, setDesktopFolders] = useState<DesktopFolder[]>([]);
  const [draggedIcon, setDraggedIcon] = useState<string | null>(null);
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const savedIcons = localStorage.getItem('desktop-icons');
    const savedFolders = localStorage.getItem('desktop-folders');
    
    if (savedIcons) {
      try {
        setDesktopIcons(JSON.parse(savedIcons));
      } catch (e) {
        console.error('Error loading desktop icons:', e);
      }
    }
    
    if (savedFolders) {
      try {
        setDesktopFolders(JSON.parse(savedFolders));
      } catch (e) {
        console.error('Error loading desktop folders:', e);
      }
    }
  }, []);

  const saveToStorage = useCallback(() => {
    localStorage.setItem('desktop-icons', JSON.stringify(desktopIcons));
    localStorage.setItem('desktop-folders', JSON.stringify(desktopFolders));
  }, [desktopIcons, desktopFolders]);

  useEffect(() => {
    saveToStorage();
  }, [saveToStorage]);

  const snapToGrid = (x: number, y: number, gridSize: number = 100) => {
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize,
    };
  };

  const handleIconMouseDown = (e: React.MouseEvent, iconId: string) => {
    e.preventDefault();
    const icon = desktopIcons.find(i => i.id === iconId);
    if (!icon) return;

    setDraggedIcon(iconId);
    setDragOffset({
      x: e.clientX - icon.x,
      y: e.clientY - icon.y
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (draggedIcon) {
        const newPos = snapToGrid(
          e.clientX - dragOffset.x,
          e.clientY - dragOffset.y
        );
        
        const boundedX = Math.max(0, Math.min(window.innerWidth - 100, newPos.x));
        const boundedY = Math.max(0, Math.min(window.innerHeight - 150, newPos.y));
        
        setDesktopIcons(prev => prev.map(icon => 
          icon.id === iconId ? { ...icon, x: boundedX, y: boundedY } : icon
        ));
      }
    };

    const handleMouseUp = () => {
      setDraggedIcon(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleIconSelect = (iconId: string, ctrlKey: boolean = false) => {
    if (ctrlKey) {
      setSelectedIcons(prev => 
        prev.includes(iconId) 
          ? prev.filter(id => id !== iconId)
          : [...prev, iconId]
      );
    } else {
      setSelectedIcons([iconId]);
    }
  };

  const handleIconDoubleClick = (iconId: string) => {
    // This will be handled by parent component
    console.log('Double click on icon:', iconId);
  };

  const handleDeleteIcon = (iconId: string) => {
    const icon = desktopIcons.find(i => i.id === iconId);
    if (icon && icon.isEditable) {
      setDesktopIcons(prev => prev.filter(i => i.id !== iconId));
      setSelectedIcons(prev => prev.filter(id => id !== iconId));
    }
  };

  const createDesktopShortcut = (name: string, icon: string, type: 'app' | 'widget' = 'app') => {
    const newIcon: DesktopIcon = {
      id: Date.now().toString(),
      name,
      icon,
      type,
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 100,
      isEditable: true
    };
    setDesktopIcons(prev => [...prev, newIcon]);
  };

  const createFolder = (name: string = 'Nowy folder') => {
    const newFolder: DesktopFolder = {
      id: Date.now().toString(),
      name,
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 100,
      icons: [],
      isOpen: false
    };
    setDesktopFolders(prev => [...prev, newFolder]);
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
    setSelectedIcons([]);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Delete' && selectedIcons.length > 0) {
      selectedIcons.forEach(iconId => {
        const icon = desktopIcons.find(i => i.id === iconId);
        if (icon && icon.isEditable) {
          handleDeleteIcon(iconId);
        }
      });
    }
    if (e.key === 'Escape') {
      setSelectedIcons([]);
      setIsEditMode(false);
    }
  }, [selectedIcons, desktopIcons]);

  useEffect(() => {
    if (isEditMode) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isEditMode, handleKeyDown]);

  return {
    desktopIcons,
    desktopFolders,
    draggedIcon,
    selectedIcons,
    isEditMode,
    handleIconMouseDown,
    handleIconSelect,
    handleIconDoubleClick,
    handleDeleteIcon,
    createDesktopShortcut,
    createFolder,
    toggleEditMode,
    setDesktopFolders
  };
};
