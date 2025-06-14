
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Server, Code2 } from 'lucide-react';

const Hidden2Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-900 to-teal-700">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-emerald-500/20 rounded-full">
              <Database className="w-12 h-12 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Strona Hidden 2</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Centrum danych i analityki. Tutaj znajdują się zaawansowane narzędzia 
            do monitorowania i zarządzania platformą.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-emerald-800/30 border-emerald-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-emerald-400" />
                Monitoring Systemu
              </CardTitle>
              <CardDescription className="text-emerald-200">
                Śledzenie wydajności i statusu serwerów
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-300">Status serwera:</span>
                  <span className="text-green-400 font-semibold">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-300">Obciążenie CPU:</span>
                  <span className="text-yellow-400 font-semibold">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-300">Użycie RAM:</span>
                  <span className="text-blue-400 font-semibold">62%</span>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Szczegóły
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-emerald-800/30 border-emerald-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-teal-400" />
                Panel Deweloperski
              </CardTitle>
              <CardDescription className="text-emerald-200">
                Narzędzia dla programistów
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full" variant="outline">
                  Konsola API
                </Button>
                <Button className="w-full" variant="outline">
                  Logi systemu
                </Button>
                <Button className="w-full" variant="outline">
                  Debugger
                </Button>
                <Button className="w-full" variant="outline">
                  Testy automatyczne
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-emerald-800/20 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Analityka Zaawansowana</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">1,247</div>
              <div className="text-emerald-200">Aktywni użytkownicy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-400 mb-2">89.2%</div>
              <div className="text-emerald-200">Dostępność systemu</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">342ms</div>
              <div className="text-emerald-200">Średni czas odpowiedzi</div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Hidden2Page;
