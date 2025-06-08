
import { useState, useEffect } from 'react';

interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
}

const defaultIcons: DesktopIcon[] = [
  { id: 'wallpapers', name: 'Tapety', icon: '🖼️', x: 50, y: 50 },
  { id: 'recycle-bin', name: 'Kosz', icon: '🗑️', x: 50, y: 150 },
  { id: 'my-computer', name: 'Mój komputer', icon: '💻', x: 50, y: 250 },
  { id: 'witword', name: 'WitWord', icon: '📝', x: 200, y: 50 },
  { id: 'witsheets', name: 'WitSheets', icon: '📊', x: 200, y: 150 },
  { id: 'witpaint', name: 'WitPaint', icon: '🎨', x: 200, y: 250 },
  { id: 'witcode', name: 'WitCode', icon: '👨‍💻', x: 350, y: 50 },
  { id: 'witphotoshop', name: 'WitPhotoShop', icon: '🖼️', x: 350, y: 150 },
  { id: 'witslides', name: 'WitSlides', icon: '📽️', x: 350, y: 250 },
  { id: 'witnotes', name: 'WitNotes', icon: '📋', x: 500, y: 50 },
  { id: 'witmail', name: 'WitMail', icon: '📧', x: 500, y: 150 },
  { id: 'witgames', name: 'WitGames', icon: '🎮', x: 500, y: 250 },
];

export const useDesktopIcons = () => {
  const [desktopIcons, setDesktopIcons] = useState<DesktopIcon[]>(defaultIcons);
  const [draggedIcon, setDraggedIcon] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const savedIcons = localStorage.getItem('desktop-icons');
    if (savedIcons) {
      try {
        setDesktopIcons(JSON.parse(savedIcons));
      } catch (e) {
        console.error('Error loading desktop icons:', e);
      }
    }
  }, []);

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
        const newX = Math.max(0, Math.min(window.innerWidth - 100, e.clientX - dragOffset.x));
        const newY = Math.max(0, Math.min(window.innerHeight - 150, e.clientY - dragOffset.y));
        
        setDesktopIcons(prev => prev.map(icon => 
          icon.id === iconId ? { ...icon, x: newX, y: newY } : icon
        ));
      }
    };

    const handleMouseUp = () => {
      setDraggedIcon(null);
      const updatedIcons = desktopIcons.map(icon => 
        icon.id === iconId ? { 
          ...icon, 
          x: Math.max(0, Math.min(window.innerWidth - 100, icon.x)), 
          y: Math.max(0, Math.min(window.innerHeight - 150, icon.y)) 
        } : icon
      );
      setDesktopIcons(updatedIcons);
      localStorage.setItem('desktop-icons', JSON.stringify(updatedIcons));
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const createDesktopShortcut = (name: string, icon: string) => {
    const newIcon: DesktopIcon = {
      id: Date.now().toString(),
      name,
      icon,
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 100,
    };
    const updatedIcons = [...desktopIcons, newIcon];
    setDesktopIcons(updatedIcons);
    localStorage.setItem('desktop-icons', JSON.stringify(updatedIcons));
  };

  const deleteDesktopIcon = (id: string) => {
    const updatedIcons = desktopIcons.filter(icon => icon.id !== id);
    setDesktopIcons(updatedIcons);
    localStorage.setItem('desktop-icons', JSON.stringify(updatedIcons));
  };

  return {
    desktopIcons,
    draggedIcon,
    handleIconMouseDown,
    createDesktopShortcut,
    deleteDesktopIcon
  };
};
