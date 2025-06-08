
import { useState, useEffect } from 'react';

const wallpapers = [
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506792006437-256b665541e2?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1477414956199-7dafc86a4f1a?q=80&w=1920&auto=format&fit=crop',
];

export const useWallpaperState = () => {
  const [currentWallpaper, setCurrentWallpaper] = useState('');
  const [wallpaperMode, setWallpaperMode] = useState<'static' | 'slideshow'>('static');

  // Load saved wallpaper and settings from localStorage
  useEffect(() => {
    const savedWallpaper = localStorage.getItem('desktop-wallpaper');
    const savedMode = localStorage.getItem('wallpaper-mode') as 'static' | 'slideshow';

    if (savedWallpaper) {
      setCurrentWallpaper(savedWallpaper);
    } else {
      const randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
      setCurrentWallpaper(randomWallpaper);
    }

    if (savedMode) {
      setWallpaperMode(savedMode);
    }
  }, []);

  // Slideshow functionality
  useEffect(() => {
    if (wallpaperMode === 'slideshow') {
      const interval = setInterval(() => {
        const currentIndex = wallpapers.indexOf(currentWallpaper);
        const nextIndex = (currentIndex + 1) % wallpapers.length;
        const nextWallpaper = wallpapers[nextIndex];
        setCurrentWallpaper(nextWallpaper);
        localStorage.setItem('desktop-wallpaper', nextWallpaper);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [wallpaperMode, currentWallpaper]);

  const handleWallpaperChange = (wallpaper: string) => {
    setCurrentWallpaper(wallpaper);
    localStorage.setItem('desktop-wallpaper', wallpaper);
  };

  const toggleWallpaperMode = () => {
    const newMode = wallpaperMode === 'static' ? 'slideshow' : 'static';
    setWallpaperMode(newMode);
    localStorage.setItem('wallpaper-mode', newMode);
  };

  return {
    currentWallpaper,
    wallpaperMode,
    handleWallpaperChange,
    toggleWallpaperMode
  };
};
