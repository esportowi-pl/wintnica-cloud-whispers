
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/redesign/HeroSection';
import { FeatureGrid } from '@/components/home/redesign/FeatureGrid';
import { GlassStatsCard } from '@/components/home/redesign/GlassStatsCard';
import { InteractiveChart } from '@/components/home/redesign/InteractiveChart';
import { GlassThemeProvider } from '@/components/home/redesign/GlassThemeProvider';
import { ThemeToggle } from '@/components/home/redesign/ThemeToggle';
import { FloatingParticles } from '@/components/home/redesign/FloatingParticles';
import { Button } from '@/components/ui/button';
import { Activity, Zap, Shield, Users, Calendar, TrendingUp } from 'lucide-react';
import { useRealTimeData } from '@/hooks/useRealTimeData';

const TestHomeV2 = () => {
  const { stats } = useRealTimeData();
  const [chartData, setChartData] = useState([
    { time: '00:00', activity: 2200, energy: 90 },
    { time: '04:00', activity: 1800, energy: 85 },
    { time: '08:00', activity: 2800, energy: 95 },
    { time: '12:00', activity: 3200, energy: 88 },
    { time: '16:00', activity: 2900, energy: 92 },
    { time: '20:00', activity: 2600, energy: 89 }
  ]);

  useEffect(() => {
    const updateChart = () => {
      setChartData(prev => {
        const newData = [...prev];
        newData.push({
          time: new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
          activity: stats.activity,
          energy: stats.energy
        });
        return newData.slice(-6); // Keep only last 6 entries
      });
    };

    const interval = setInterval(updateChart, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [stats]);

  return (
    <GlassThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <FloatingParticles />
        
        <div className="relative z-10">
          <Navbar />
          
          {/* Theme Toggle */}
          <div className="fixed top-20 right-4 z-50">
            <ThemeToggle />
          </div>
          
          <HeroSection variant="glass" />
          
          <FeatureGrid variant="glass" />
          
          {/* Enhanced Dashboard Widgets Section */}
          <section className="py-20 relative z-10">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-16 text-white">
                Live Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <GlassStatsCard
                  icon={Activity}
                  title="Aktywność"
                  value={stats.activity}
                  subtitle="Interakcje dzisiaj"
                  color="text-green-400"
                  progress={(stats.activity / 3000) * 100}
                />
                
                <GlassStatsCard
                  icon={Zap}
                  title="Energia"
                  value={stats.energy}
                  subtitle="Wydajność systemu"
                  color="text-yellow-400"
                  progress={stats.energy}
                />
                
                <GlassStatsCard
                  icon={Shield}
                  title="Bezpieczeństwo"
                  value={stats.security}
                  subtitle="Zabezpieczenia aktywne"
                  color="text-blue-400"
                  progress={stats.security}
                />
              </div>

              {/* Additional Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <GlassStatsCard
                  icon={Users}
                  title="Użytkownicy Online"
                  value={stats.activeUsers}
                  subtitle="Aktywni teraz"
                  color="text-purple-400"
                  progress={(stats.activeUsers / 200) * 100}
                />
                
                <GlassStatsCard
                  icon={Calendar}
                  title="Nowe Wydarzenia"
                  value={stats.newEvents}
                  subtitle="W tym tygodniu"
                  color="text-pink-400"
                  progress={(stats.newEvents / 50) * 100}
                />
                
                <GlassStatsCard
                  icon={TrendingUp}
                  title="Obciążenie Systemu"
                  value={`${stats.systemLoad.toFixed(0)}%`}
                  subtitle="Wykorzystanie zasobów"
                  color="text-orange-400"
                  progress={stats.systemLoad}
                />
              </div>

              {/* Interactive Chart */}
              <div className="mb-12">
                <InteractiveChart
                  data={chartData}
                  title="Aktywność w Czasie Rzeczywistym"
                />
              </div>
            </div>
          </section>
          
          {/* Enhanced Floating CTA */}
          <section className="py-20 relative z-10">
            <div className="container mx-auto px-4 text-center">
              <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto hover:bg-white/15 transition-all duration-500 hover:scale-105">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Wejdź do przyszłości
                </h2>
                <p className="text-blue-100 mb-6">
                  Doświadcz nowoczesnego podejścia do społeczności lokalnej
                </p>
                <div className="flex gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full px-8 hover:scale-105 transition-transform">
                    Rozpocznij przygodę
                  </Button>
                  <Button size="lg" variant="outline" className="backdrop-blur-lg bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full px-8 hover:scale-105 transition-transform">
                    Dowiedz się więcej
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          <Footer />
        </div>
      </div>
    </GlassThemeProvider>
  );
};

export default TestHomeV2;
