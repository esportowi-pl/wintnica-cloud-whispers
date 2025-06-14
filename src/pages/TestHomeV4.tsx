
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/redesign/HeroSection';
import { FeatureGrid } from '@/components/home/redesign/FeatureGrid';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Wifi, Bell, Download } from 'lucide-react';

const TestHomeV4 = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-400 to-blue-600">
      <Navbar />
      
      <HeroSection variant="mobile" />
      
      <FeatureGrid variant="mobile" />
      
      {/* Mobile-First Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Zaprojektowane dla urządzeń mobilnych
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Smartphone className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Responsywny design</h3>
                <p className="text-gray-600 text-sm">Idealne doświadczenie na każdym urządzeniu</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Wifi className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tryb offline</h3>
                <p className="text-gray-600 text-sm">Korzystaj nawet bez połączenia internetowego</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Bell className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Push notifications</h3>
                <p className="text-gray-600 text-sm">Bądź na bieżąco z wydarzeniami w mieście</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Download className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">PWA Ready</h3>
                <p className="text-gray-600 text-sm">Zainstaluj jak natywną aplikację</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Quick Stats */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-gray-600">Mobile Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">2.1s</div>
              <div className="text-sm text-gray-600">Load Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">4.9★</div>
              <div className="text-sm text-gray-600">User Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">Dostępność</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile CTA */}
      <section className="py-12 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Pobierz aplikację już dziś
          </h2>
          <p className="text-blue-100 mb-6">
            Miej Witnicę zawsze pod ręką
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800">
              <Download className="mr-2 h-4 w-4" />
              App Store
            </Button>
            <Button size="lg" className="bg-green-600 text-white hover:bg-green-700">
              <Download className="mr-2 h-4 w-4" />
              Google Play
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TestHomeV4;
