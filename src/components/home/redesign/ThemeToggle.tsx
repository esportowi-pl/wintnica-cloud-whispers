
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useGlassTheme } from './GlassThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useGlassTheme();

  return (
    <button
      onClick={toggleTheme}
      className="backdrop-blur-lg bg-white/10 rounded-full p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-blue-400" />
      )}
    </button>
  );
};
