
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/redesign/HeroSection';
import { FeatureGrid } from '@/components/home/redesign/FeatureGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Zap, Shield } from 'lucide-react';

const TestHomeV2 = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar />
      
      <HeroSection variant="glass" />
      
      <FeatureGrid variant="glass" />
      
      {/* Dashboard Widgets Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Live Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="h-6 w-6 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Aktywność</h3>
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">2,341</div>
              <div className="text-blue-200 text-sm">Interakcje dzisiaj</div>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-blue-400 w-3/4 rounded-full"></div>
              </div>
            </div>
            
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Energia</h3>
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">92%</div>
              <div className="text-blue-200 text-sm">Wydajność systemu</div>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 w-[92%] rounded-full"></div>
              </div>
            </div>
            
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Bezpieczeństwo</h3>
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-blue-200 text-sm">Zabezpieczenia aktywne</div>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 w-full rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Floating CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Wejdź do przyszłości
            </h2>
            <p className="text-blue-100 mb-6">
              Doświadcz nowoczesnego podejścia do społeczności lokalnej
            </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full px-8">
              Rozpocznij przygodę
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TestHomeV2;
