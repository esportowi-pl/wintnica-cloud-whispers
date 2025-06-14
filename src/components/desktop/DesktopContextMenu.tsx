
import React, { useState } from 'react';
import {
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { 
  Plus, 
  Image, 
  RefreshCw, 
  Monitor, 
  Folder, 
  FileText, 
  Settings,
  Play,
  Pause,
  Palette,
  Grid3X3,
  Layers,
  Edit
} from 'lucide-react';

interface DesktopContextMenuProps {
  onCreateShortcut: (name: string, icon: string) => void;
  onOpenWallpaperSelector: () => void;
  onToggleWallpaperMode: () => void;
  wallpaperMode: 'static' | 'slideshow';
  onRefresh: () => void;
  onToggleEditMode: () => void;
  isEditMode: boolean;
}

const DesktopContextMenu: React.FC<DesktopContextMenuProps> = ({
  onCreateShortcut,
  onOpenWallpaperSelector,
  onToggleWallpaperMode,
  wallpaperMode,
  onRefresh,
  onToggleEditMode,
  isEditMode
}) => {
  const quickShortcuts = [
    { name: 'Notatnik', icon: '📝' },
    { name: 'Kalkulator', icon: '🧮' },
    { name: 'Paint', icon: '🎨' },
    { name: 'Internet Explorer', icon: '🌐' },
    { name: 'Muzyka', icon: '🎵' },
    { name: 'Zdjęcia', icon: '📸' },
  ];

  return (
    <>
      <ContextMenuItem onSelect={() => onRefresh()}>
        <RefreshCw className="w-4 h-4 mr-2" />
        Odśwież pulpit
      </ContextMenuItem>

      <ContextMenuSeparator />

      <ContextMenuItem onSelect={onToggleEditMode}>
        <Edit className="w-4 h-4 mr-2" />
        {isEditMode ? 'Wyłącz tryb edycji' : 'Włącz tryb edycji'}
      </ContextMenuItem>

      <ContextMenuSeparator />

      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <Plus className="w-4 h-4 mr-2" />
          Nowy
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem onSelect={() => onCreateShortcut('Nowy folder', '📁')}>
            <Folder className="w-4 h-4 mr-2" />
            Folder
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => onCreateShortcut('Dokument tekstowy', '📄')}>
            <FileText className="w-4 h-4 mr-2" />
            Dokument tekstowy
          </ContextMenuItem>
          <ContextMenuSeparator />
          {quickShortcuts.map((shortcut, index) => (
            <ContextMenuItem 
              key={index}
              onSelect={() => onCreateShortcut(shortcut.name, shortcut.icon)}
            >
              <span className="w-4 h-4 mr-2 text-center">{shortcut.icon}</span>
              Skrót do {shortcut.name}
            </ContextMenuItem>
          ))}
        </ContextMenuSubContent>
      </ContextMenuSub>

      <ContextMenuSeparator />

      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <Image className="w-4 h-4 mr-2" />
          Tapeta
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem onSelect={onOpenWallpaperSelector}>
            <Palette className="w-4 h-4 mr-2" />
            Zmień tapetę
          </ContextMenuItem>
          <ContextMenuItem onSelect={onToggleWallpaperMode}>
            {wallpaperMode === 'slideshow' ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Zatrzymaj pokaz slajdów
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Uruchom pokaz slajdów
              </>
            )}
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={() => {
            const randomWallpapers = [
              'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1506792006437-256b665541e2?q=80&w=1920&auto=format&fit=crop'
            ];
            const randomWallpaper = randomWallpapers[Math.floor(Math.random() * randomWallpapers.length)];
            localStorage.setItem('desktop-wallpaper', randomWallpaper);
            window.location.reload();
          }}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Losowa tapeta
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>

      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <Grid3X3 className="w-4 h-4 mr-2" />
          Widok
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem onSelect={() => {
            const icons = document.querySelectorAll('[data-desktop-icon]');
            icons.forEach(icon => {
              (icon as HTMLElement).style.display = 
                (icon as HTMLElement).style.display === 'none' ? 'flex' : 'none';
            });
          }}>
            <Layers className="w-4 h-4 mr-2" />
            Pokaż/Ukryj ikony pulpitu
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => {
            const desktop = document.querySelector('[data-desktop]');
            if (desktop) {
              desktop.classList.toggle('grid');
              desktop.classList.toggle('grid-cols-8');
              desktop.classList.toggle('gap-4');
              desktop.classList.toggle('p-4');
            }
          }}>
            <Grid3X3 className="w-4 h-4 mr-2" />
            Wyrównaj ikony do siatki
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>

      <ContextMenuSeparator />

      <ContextMenuItem onSelect={() => window.open('/admin', '_blank')}>
        <Settings className="w-4 h-4 mr-2" />
        Właściwości systemu
      </ContextMenuItem>

      <ContextMenuItem onSelect={() => {
        const display = document.querySelector('[data-desktop]');
        if (display) {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            display.requestFullscreen();
          }
        }
      }}>
        <Monitor className="w-4 h-4 mr-2" />
        Pełny ekran
      </ContextMenuItem>
    </>
  );
};

export default DesktopContextMenu;
