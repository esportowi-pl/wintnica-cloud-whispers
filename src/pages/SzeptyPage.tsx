
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Eye, Heart, MessageCircle, Send, AlertTriangle } from "lucide-react";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const SzeptyPage = () => {
  const [newSecret, setNewSecret] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('confession');

  const secrets = [
    {
      id: '1',
      content: 'Zawsze marzyłem o otwarciu małej kawiarni w centrum Witnicy, ale boję się, że nie dam rady...',
      category: 'dreams',
      hearts: 23,
      replies: 7,
      timeAgo: '2h',
      verified: true
    },
    {
      id: '2',
      content: 'Czasami przechodzę przez park tylko po to, żeby usłyszeć śmiech dzieci. To daje mi nadzieję.',
      category: 'feelings',
      hearts: 45,
      replies: 12,
      timeAgo: '4h',
      verified: true
    },
    {
      id: '3',
      content: 'Mój sąsiad zawsze pomaga mi z zakupami, ale nigdy mu nie podziękowałem...',
      category: 'confession',
      hearts: 34,
      replies: 15,
      timeAgo: '6h',
      verified: true
    },
    {
      id: '4',
      content: 'Widziałem jak właściciel sklepu na rogu daje jedzenie bezdomnym kotom. Ma dobre serce.',
      category: 'positive',
      hearts: 67,
      replies: 3,
      timeAgo: '8h',
      verified: true
    }
  ];

  const categories = [
    { id: 'confession', label: 'Wyznania', icon: '💭', color: 'bg-blue-100 text-blue-700' },
    { id: 'dreams', label: 'Marzenia', icon: '✨', color: 'bg-purple-100 text-purple-700' },
    { id: 'feelings', label: 'Uczucia', icon: '❤️', color: 'bg-red-100 text-red-700' },
    { id: 'positive', label: 'Pozytywne', icon: '🌟', color: 'bg-green-100 text-green-700' },
    { id: 'advice', label: 'Rady', icon: '💡', color: 'bg-yellow-100 text-yellow-700' }
  ];

  const handleSubmit = () => {
    if (!newSecret.trim()) return;
    console.log('New secret:', { content: newSecret, category: selectedCategory });
    setNewSecret('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            🤫 Szepty Witnicy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bezpieczne miejsce dla Twoich myśli, marzeń i tajemnic. 
            Wszystko jest anonimowe, nic nie zostanie ujawnione.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post New Secret */}
            <Card className="border-2 border-dashed border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Podziel się swoim szeptem
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                    >
                      <span>{category.icon}</span>
                      {category.label}
                    </Button>
                  ))}
                </div>
                
                <Textarea
                  placeholder="Co chciałbyś/chciałabyś wyszeptać? Pamiętaj - to jest całkowicie anonimowe..."
                  value={newSecret}
                  onChange={(e) => setNewSecret(e.target.value)}
                  className="min-h-24 resize-none"
                  maxLength={280}
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" />
                    <span>W pełni anonimowe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {newSecret.length}/280
                    </span>
                    <Button onClick={handleSubmit} disabled={!newSecret.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Wyślij szept
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Secrets Feed */}
            <div className="space-y-4">
              {secrets.map((secret) => {
                const categoryInfo = categories.find(c => c.id === secret.category);
                
                return (
                  <Card key={secret.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <Badge className={categoryInfo?.color}>
                            <span className="mr-1">{categoryInfo?.icon}</span>
                            {categoryInfo?.label}
                          </Badge>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{secret.timeAgo}</span>
                            {secret.verified && (
                              <ShieldCheck className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        </div>
                        
                        <p className="text-foreground leading-relaxed">
                          {secret.content}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-red-500">
                              <Heart className="h-4 w-4" />
                              <span>{secret.hearts}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                              <MessageCircle className="h-4 w-4" />
                              <span>{secret.replies}</span>
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            <span>Anonimowy mieszkaniec</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Safety Guidelines */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="h-5 w-5" />
                  Zasady bezpieczeństwa
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-yellow-700 space-y-2">
                <div>🔒 Twoja tożsamość jest w pełni chroniona</div>
                <div>💚 Szanujemy inne osoby i ich uczucia</div>
                <div>🚫 Nie tolerujemy nękania czy nienawiści</div>
                <div>⚖️ Wszystko jest moderowane przez społeczność</div>
                <div>🆘 Pomoc w sytuacjach kryzysowych: 116 123</div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Statystyki społeczności</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Szeptów dziś:</span>
                  <span className="font-bold">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Wsparcia udzielone:</span>
                  <span className="font-bold text-green-600">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Aktywni użytkownicy:</span>
                  <span className="font-bold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Pozytywna atmosfera:</span>
                  <span className="font-bold text-blue-600">98%</span>
                </div>
              </CardContent>
            </Card>

            {/* Categories Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Popularne kategorie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span className="text-sm">{category.label}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {Math.floor(Math.random() * 20) + 5}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Support Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Potrzebujesz pomocy?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium">Telefon zaufania</div>
                  <div className="text-blue-600">116 123</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium">Poradnia rodzinna</div>
                  <div className="text-green-600">ul. Główna 15</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-medium">Psycholog miejski</div>
                  <div className="text-purple-600">Środy 16:00-18:00</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SzeptyPage;
