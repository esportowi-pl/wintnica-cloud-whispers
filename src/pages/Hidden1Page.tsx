
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Lock, Shield } from 'lucide-react';

const Hidden1Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-700">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-500/20 rounded-full">
              <Eye className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Strona Hidden 1</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Ukryta strona dostępna tylko dla wybranych użytkowników. 
            Miejsce ekskluzywnych treści i funkcji specjalnych.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Bezpieczne Treści
              </CardTitle>
              <CardDescription className="text-slate-300">
                Ekskluzywne materiały dostępne tylko tutaj
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">
                Specjalne treści przeznaczone dla wybranych użytkowników portalu Witnica.
              </p>
              <Button className="w-full" variant="outline">
                Przeglądaj
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-400" />
                Prywatne Forum
              </CardTitle>
              <CardDescription className="text-slate-300">
                Dyskusje w zamkniętym gronie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">
                Miejsce do prowadzenia poufnych rozmów i wymiany opinii.
              </p>
              <Button className="w-full" variant="outline">
                Dołącz
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                Specjalne Narzędzia
              </CardTitle>
              <CardDescription className="text-slate-300">
                Zaawansowane funkcje platformy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">
                Dostęp do specjalnych narzędzi i funkcji administracyjnych.
              </p>
              <Button className="w-full" variant="outline">
                Uruchom
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="bg-slate-800/30 rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Dostęp Ograniczony</h2>
            <p className="text-slate-300 mb-6">
              Ta strona jest częścią ukrytej sekcji portalu Witnica. 
              Treści i funkcje dostępne tutaj są przeznaczone dla wybranych użytkowników.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="default">Kontynuuj</Button>
              <Button variant="outline">Wróć</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Hidden1Page;
