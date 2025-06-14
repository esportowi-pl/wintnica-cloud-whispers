
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/redesign/HeroSection';
import { FeatureGrid } from '@/components/home/redesign/FeatureGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, MapPin } from 'lucide-react';

const TestHomeV1 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeroSection variant="minimal" />
      
      <FeatureGrid variant="minimal" />
      
      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-4xl font-light text-gray-900">6,847</div>
              <div className="text-gray-600">Aktywnych mieszkańców</div>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-4xl font-light text-gray-900">89%</div>
              <div className="text-gray-600">Zadowolonych użytkowników</div>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-4xl font-light text-gray-900">156</div>
              <div className="text-gray-600">Lokalnych biznesów</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-light text-white mb-6">
            Dołącz do społeczności Witnicy
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Poznaj swoich sąsiadów, odkryj lokalne wydarzenia i bądź częścią czegoś większego
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8">
            Zacznij już dziś
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TestHomeV1;
