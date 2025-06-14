
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/redesign/HeroSection';
import { FeatureGrid } from '@/components/home/redesign/FeatureGrid';
import { Button } from '@/components/ui/button';
import { Cube, Layers, Box } from 'lucide-react';

const TestHomeV3 = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navbar />
      
      <HeroSection variant="3d" />
      
      <FeatureGrid variant="3d" />
      
      {/* 3D Interactive Section */}
      <section className="py-20 perspective-1000">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 text-white transform-gpu rotate-x-12">
            WYMIARY DOŚWIADCZENIA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-red-600 to-orange-600 p-8 rounded-xl shadow-2xl transform-gpu hover:rotate-y-12 hover:scale-110 transition-all duration-700 preserve-3d">
                <Cube className="h-16 w-16 text-white mb-4 group-hover:rotate-180 transition-transform duration-700 transform-gpu translate-z-8" />
                <h3 className="text-2xl font-black text-white mb-3 transform-gpu translate-z-4">SOCJAL</h3>
                <p className="text-orange-100 transform-gpu translate-z-2">Nawiązuj połączenia w trzech wymiarach</p>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-xl shadow-2xl transform-gpu hover:rotate-y-12 hover:scale-110 transition-all duration-700 preserve-3d">
                <Layers className="h-16 w-16 text-white mb-4 group-hover:rotate-180 transition-transform duration-700 transform-gpu translate-z-8" />
                <h3 className="text-2xl font-black text-white mb-3 transform-gpu translate-z-4">BIZNES</h3>
                <p className="text-blue-100 transform-gpu translate-z-2">Wielowarstwowe możliwości rozwoju</p>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-green-600 to-teal-600 p-8 rounded-xl shadow-2xl transform-gpu hover:rotate-y-12 hover:scale-110 transition-all duration-700 preserve-3d">
                <Box className="h-16 w-16 text-white mb-4 group-hover:rotate-180 transition-transform duration-700 transform-gpu translate-z-8" />
                <h3 className="text-2xl font-black text-white mb-3 transform-gpu translate-z-4">KULTURA</h3>
                <p className="text-green-100 transform-gpu translate-z-2">Przestrzenna eksploracja tradycji</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Immersive CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 p-12 rounded-3xl shadow-2xl transform-gpu hover:scale-105 transition-all duration-500 max-w-4xl mx-auto">
            <h2 className="text-5xl font-black text-white mb-6 transform-gpu translate-z-4">
              ZANURZ SIĘ W RZECZYWISTOŚĆ
            </h2>
            <p className="text-xl text-orange-100 mb-8 transform-gpu translate-z-2">
              Witnica w trzech wymiarach czeka na Ciebie
            </p>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 rounded-full px-12 py-4 text-lg font-bold transform-gpu translate-z-8 hover:scale-110 transition-all">
              WEJDŹ TERAZ
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TestHomeV3;
