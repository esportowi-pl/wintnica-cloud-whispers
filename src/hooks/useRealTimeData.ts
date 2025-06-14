
import { useState, useEffect } from 'react';

interface RealTimeStats {
  activity: number;
  energy: number;
  security: number;
  activeUsers: number;
  newEvents: number;
  systemLoad: number;
}

export const useRealTimeData = () => {
  const [stats, setStats] = useState<RealTimeStats>({
    activity: 2341,
    energy: 92,
    security: 100,
    activeUsers: 156,
    newEvents: 23,
    systemLoad: 45
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateStats = () => {
      setStats(prev => ({
        activity: prev.activity + Math.floor(Math.random() * 10) - 5,
        energy: Math.max(85, Math.min(100, prev.energy + (Math.random() * 2 - 1))),
        security: Math.random() > 0.95 ? 98 : 100,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 6) - 3,
        newEvents: prev.newEvents + Math.floor(Math.random() * 3),
        systemLoad: Math.max(20, Math.min(80, prev.systemLoad + (Math.random() * 10 - 5)))
      }));
    };

    const interval = setInterval(updateStats, 3000);
    return () => clearInterval(interval);
  }, []);

  return { stats, isLoading };
};
