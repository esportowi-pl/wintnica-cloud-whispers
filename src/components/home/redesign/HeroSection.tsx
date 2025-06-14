
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  variant: 'minimal' | 'glass' | '3d' | 'mobile';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ variant }) => {
  if (variant === 'minimal') {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-light text-gray-900 mb-6 animate-fade-in">
            Witnica
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nowoczesne centrum społecznościowe dla mieszkańców miasta
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/desktop">
              <Button size="lg" className="rounded-full px-8">
                Rozpocznij <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              <Play className="mr-2 h-4 w-4" /> Obejrzyj demo
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'glass') {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493397212122-2b85dda8106b')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Witnica.info
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl mx-auto">
              Doświadcz przyszłości społeczności lokalnej
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full px-8">
                Wejdź do świata
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === '3d') {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black relative overflow-hidden perspective-1000">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="transform-gpu hover:rotate-y-6 transition-transform duration-700 preserve-3d">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 md:p-12 rounded-3xl shadow-2xl transform-gpu translate-z-12">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 transform-gpu translate-z-8">
                WITNICA
              </h1>
              <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-xl mx-auto transform-gpu translate-z-4">
                Trójwymiarowe doświadczenie społecznościowe
              </p>
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 rounded-full px-8 transform-gpu translate-z-8 hover:scale-110 transition-transform">
                Zanurz się
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // mobile variant
  return (
    <section className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-green-400 to-blue-500 relative">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Witnica
          </h1>
          <p className="text-lg mb-6">
            Mobilne centrum Twojego miasta
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {['Randki', 'Chat', 'Wydarzenia', 'Rynek'].map((item, index) => (
            <div key={item} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center text-white hover:bg-white/30 transition-colors">
              <div className="text-2xl mb-2">
                {index === 0 ? '💕' : index === 1 ? '💬' : index === 2 ? '🎉' : '🛒'}
              </div>
              <div className="font-medium">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
