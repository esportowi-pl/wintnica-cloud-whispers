
import { useState, useEffect } from 'react';

export const useFluentDesign = () => {
  const [glassMorphism, setGlassMorphism] = useState({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px) saturate(1.5)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
  });

  const [fluentBlur, setFluentBlur] = useState({
    backdropFilter: 'blur(40px) saturate(1.8)',
    background: 'rgba(255, 255, 255, 0.05)'
  });

  const [dynamicLighting, setDynamicLighting] = useState({
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)'
  });

  useEffect(() => {
    const updateLighting = () => {
      const hour = new Date().getHours();
      const isDayTime = hour >= 6 && hour < 18;
      
      if (isDayTime) {
        setGlassMorphism(prev => ({
          ...prev,
          background: 'rgba(255, 255, 255, 0.15)'
        }));
      } else {
        setGlassMorphism(prev => ({
          ...prev,
          background: 'rgba(255, 255, 255, 0.08)'
        }));
      }
    };

    updateLighting();
    const interval = setInterval(updateLighting, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return {
    glassMorphism,
    fluentBlur,
    dynamicLighting
  };
};
