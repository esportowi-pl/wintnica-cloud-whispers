
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Calendar, ShoppingBag, Users, Camera, Coffee, Gamepad } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureGridProps {
  variant: 'minimal' | 'glass' | '3d' | 'mobile';
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ variant }) => {
  const features = [
    { icon: Heart, title: 'Portal Randkowy', desc: 'Znajdź miłość w Witnicy', link: '/randki', color: 'text-pink-500' },
    { icon: MessageCircle, title: 'Chat', desc: 'Rozmawiaj z sąsiadami', link: '/chat', color: 'text-blue-500' },
    { icon: Calendar, title: 'Wydarzenia', desc: 'Nie przegap niczego', link: '/wydarzenia', color: 'text-purple-500' },
    { icon: ShoppingBag, title: 'Rynek', desc: 'Kupuj i sprzedawaj lokalnie', link: '/rynek', color: 'text-green-500' },
    { icon: Users, title: 'Grupy', desc: 'Dołącz do społeczności', link: '/grupy', color: 'text-orange-500' },
    { icon: Camera, title: 'Galeria', desc: 'Dziel się zdjęciami', link: '/galeria', color: 'text-indigo-500' },
    { icon: Coffee, title: 'Browar', desc: 'Lokalne smaki', link: '/browar', color: 'text-amber-500' },
    { icon: Gamepad, title: 'Gaming', desc: 'Graj z znajomymi', link: '/gaming', color: 'text-red-500' }
  ];

  if (variant === 'minimal') {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center mb-16 text-gray-900">
            Odkryj możliwości
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link key={feature.title} to={feature.link}>
                <div className="group cursor-pointer">
                  <div className="bg-gray-50 p-8 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <feature.icon className={`h-12 w-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform`} />
                    <h3 className="text-xl font-medium mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'glass') {
    return (
      <section className="py-20 bg-gradient-to-b from-purple-900/20 to-blue-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Funkcje Platformy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={feature.title} to={feature.link}>
                <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <feature.icon className={`h-10 w-10 text-white mb-4`} />
                  <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-blue-100 text-sm">{feature.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === '3d') {
    return (
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 text-white transform-gpu rotate-x-12">
            EKSPLORUJ FUNKCJE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
            {features.map((feature, index) => (
              <Link key={feature.title} to={feature.link}>
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl transform-gpu hover:rotate-y-12 hover:scale-105 transition-all duration-500 preserve-3d border-2 border-gray-700 hover:border-orange-500">
                    <feature.icon className={`h-10 w-10 text-orange-400 mb-4 group-hover:text-orange-300 transform-gpu translate-z-4`} />
                    <h3 className="text-lg font-bold mb-2 text-white transform-gpu translate-z-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm transform-gpu translate-z-1">{feature.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // mobile variant
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
          Wszystko w jednym miejscu
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <Link key={feature.title} to={feature.link}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <feature.icon className={`h-8 w-8 ${feature.color} mx-auto mb-2`} />
                  <h3 className="font-medium text-sm text-gray-900">{feature.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
