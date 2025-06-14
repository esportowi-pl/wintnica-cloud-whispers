
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Star, Crown, Sparkles } from 'lucide-react';

const Hidden3Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 to-indigo-800">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-purple-500/20 rounded-full">
              <Crown className="w-12 h-12 text-purple-400" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Strona Hidden 3</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Ekskluzywna strefa premium. Miejsce dla najbardziej aktywnych 
            i cenionych członków społeczności Witnicy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Program VIP
              </CardTitle>
              <CardDescription className="text-purple-200">
                Ekskluzywne korzyści dla członków VIP
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-purple-700/30 rounded-lg">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Priorytetowa obsługa</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-700/30 rounded-lg">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Wczesny dostęp do nowości</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-700/30 rounded-lg">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Ekskluzywne wydarzenia</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-700/30 rounded-lg">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Dedykowany chat</span>
              </div>
              <Button className="w-full mt-4" variant="default">
                Aktywuj VIP
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                Super Funkcje
              </CardTitle>
              <CardDescription className="text-purple-200">
                Zaawansowane narzędzia i możliwości
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                Kreator Treści AI
              </Button>
              <Button className="w-full" variant="outline">
                Analityka Zaawansowana
              </Button>
              <Button className="w-full" variant="outline">
                Masowe Wiadomości
              </Button>
              <Button className="w-full" variant="outline">
                Custom Dashboard
              </Button>
              <Button className="w-full" variant="outline">
                API Access
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-800/40 to-indigo-800/40 rounded-xl p-8 max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Strefa Elite</h2>
            <p className="text-purple-100 mb-6 text-lg">
              Witaj w najbardziej ekskluzywnej części portalu Witnica. 
              Tutaj spotykają się najważniejsi członkowie naszej społeczności.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-purple-200">Dostępność</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-400 mb-2">∞</div>
                <div className="text-purple-200">Możliwości</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">100%</div>
                <div className="text-purple-200">Satysfakcja</div>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600">
                Rozpocznij Przygodę
              </Button>
              <Button size="lg" variant="outline">
                Dowiedz się więcej
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Hidden3Page;
