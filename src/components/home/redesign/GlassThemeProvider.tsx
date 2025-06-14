
import React, { createContext, useContext, useState, useEffect } from 'react';

interface GlassTheme {
  isDark: boolean;
  toggleTheme: () => void;
  glassStyles: {
    background: string;
    border: string;
    backdrop: string;
  };
}

const GlassThemeContext = createContext<GlassTheme | undefined>(undefined);

export const useGlassTheme = () => {
  const context = useContext(GlassThemeContext);
  if (!context) {
    throw new Error('useGlassTheme must be used within GlassThemeProvider');
  }
  return context;
};

interface GlassThemeProviderProps {
  children: React.ReactNode;
}

export const GlassThemeProvider: React.FC<GlassThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const glassStyles = {
    background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    border: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
    backdrop: 'blur(20px) saturate(1.5)'
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <GlassThemeContext.Provider value={{ isDark, toggleTheme, glassStyles }}>
      {children}
    </GlassThemeContext.Provider>
  );
};
