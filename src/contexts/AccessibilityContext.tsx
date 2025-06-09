
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ColorBlindnessType = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
export type VisualMode = 'day' | 'night' | 'auto' | 'high-contrast';
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

interface AccessibilitySettings {
  colorBlindness: ColorBlindnessType;
  visualMode: VisualMode;
  season: Season;
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
  applyColorBlindnessFilter: (imageUrl: string) => Promise<string>;
}

const defaultSettings: AccessibilitySettings = {
  colorBlindness: 'none',
  visualMode: 'auto',
  season: 'spring',
  fontSize: 16,
  highContrast: false,
  reducedMotion: false,
  screenReader: false
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
    }
    
    // Auto-detect season based on current date
    const month = new Date().getMonth();
    let autoSeason: Season = 'spring';
    if (month >= 2 && month <= 4) autoSeason = 'spring';
    else if (month >= 5 && month <= 7) autoSeason = 'summer';
    else if (month >= 8 && month <= 10) autoSeason = 'autumn';
    else autoSeason = 'winter';
    
    setSettings(prev => ({ ...prev, season: autoSeason }));
  }, []);

  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    applySettingsToDocument();
  }, [settings]);

  const applySettingsToDocument = () => {
    const root = document.documentElement;
    
    // Apply visual mode
    root.className = root.className.replace(/theme-\w+/g, '');
    root.classList.add(`theme-${settings.visualMode}`);
    
    // Apply season
    root.className = root.className.replace(/season-\w+/g, '');
    root.classList.add(`season-${settings.season}`);
    
    // Apply color blindness filter
    root.className = root.className.replace(/colorblind-\w+/g, '');
    if (settings.colorBlindness !== 'none') {
      root.classList.add(`colorblind-${settings.colorBlindness}`);
    }
    
    // Apply font size
    root.style.fontSize = `${settings.fontSize}px`;
    
    // Apply high contrast
    root.classList.toggle('high-contrast', settings.highContrast);
    
    // Apply reduced motion
    root.classList.toggle('reduced-motion', settings.reducedMotion);
  };

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const applyColorBlindnessFilter = async (imageUrl: string): Promise<string> => {
    if (settings.colorBlindness === 'none') return imageUrl;
    
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        if (ctx) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Apply color blindness simulation
          for (let i = 0; i < data.length; i += 4) {
            const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
            let [newR, newG, newB] = [r, g, b];
            
            switch (settings.colorBlindness) {
              case 'protanopia':
                newR = 0.567 * r + 0.433 * g;
                newG = 0.558 * r + 0.442 * g;
                newB = 0.242 * g + 0.758 * b;
                break;
              case 'deuteranopia':
                newR = 0.625 * r + 0.375 * g;
                newG = 0.7 * r + 0.3 * g;
                newB = 0.3 * g + 0.7 * b;
                break;
              case 'tritanopia':
                newR = 0.95 * r + 0.05 * g;
                newG = 0.433 * g + 0.567 * b;
                newB = 0.475 * g + 0.525 * b;
                break;
              case 'achromatopsia':
                const gray = 0.299 * r + 0.587 * g + 0.114 * b;
                newR = newG = newB = gray;
                break;
            }
            
            data[i] = Math.min(255, Math.max(0, newR));
            data[i + 1] = Math.min(255, Math.max(0, newG));
            data[i + 2] = Math.min(255, Math.max(0, newB));
          }
          
          ctx.putImageData(imageData, 0, 0);
        }
        
        resolve(canvas.toDataURL());
      };
      
      img.onerror = () => resolve(imageUrl);
      img.src = imageUrl;
    });
  };

  return (
    <AccessibilityContext.Provider value={{
      settings,
      updateSettings,
      resetSettings,
      applyColorBlindnessFilter
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
