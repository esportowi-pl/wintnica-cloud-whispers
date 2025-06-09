
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AnimatedURLDisplay = () => {
  const location = useLocation();
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getPageKeyword = (pathname: string) => {
    const routes = {
      '/': 'Strona główna',
      '/dating': 'Randki',
      '/rynek': 'Rynek',
      '/rekreacja': 'Rekreacja',
      '/browar': 'Browar',
      '/chat': 'Chat',
      '/groups': 'Grupy',
      '/aktualnosci': 'Aktualności',
      '/classifieds': 'Ogłoszenia',
      '/events': 'Wydarzenia',
      '/galeria': 'Galeria',
      '/gazeta': 'Gazeta',
      '/pogoda': 'Pogoda',
      '/mapa': 'Mapa',
      '/desktop': 'Desktop'
    };
    return routes[pathname as keyof typeof routes] || 'Witnica.info';
  };

  useEffect(() => {
    const keyword = getPageKeyword(location.pathname);
    const fullUrl = `witnica.info/${keyword}`;
    
    setIsTyping(true);
    setDisplayText('');
    
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < fullUrl.length) {
        setDisplayText(fullUrl.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-primary/90 backdrop-blur-sm text-primary-foreground py-2">
      <div className="container mx-auto px-4">
        <div className="text-center font-mono text-lg">
          <span className="font-bold">
            {displayText}
            {isTyping && <span className="animate-pulse">|</span>}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedURLDisplay;
