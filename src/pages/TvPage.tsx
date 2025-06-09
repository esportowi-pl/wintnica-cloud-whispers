import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tv, Play, Calendar, Clock, Users, Video } from "lucide-react";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const TvPage = () => {
  const liveStreams = [
    {
      id: '1',
      title: 'Sesja Rady Miasta',
      description: 'Live transmisja z posiedzenia rady miasta Witnicy',
      viewers: 234,
      isLive: true,
      category: 'Samorząd'
    },
    {
      id: '2',
      title: 'Festiwal Kultury Lokalnej',
      description: 'Koncert lokalnych zespołów na rynku',
      viewers: 89,
      isLive: true,
      category: 'Kultura'
    }
  ];

  const upcomingShows = [
    {
      id: '1',
      title: 'Poranne Wiadomości z Witnicy',
      time: '08:00',
      description: 'Codzienne podsumowanie wydarzeń lokalnych'
    },
    {
      id: '2',
      title: 'Kulinarne Tradycje Witnicy',
      time: '14:30',
      description: 'Babcia Halina pokazuje tradycyjne przepisy'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Tv className="h-10 w-10" />
            Witnica TV
          </h1>
          <p className="text-xl text-muted-foreground">
            Lokalna telewizja internetowa - wydarzenia na żywo i archiwum
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Live Stream */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center relative">
                  <div className="text-white text-center">
                    <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Główna transmisja na żywo</p>
                    <Badge className="bg-red-600 text-white mt-2">
                      🔴 NA ŻYWO
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Sesja Rady Miasta</h3>
                  <p className="text-muted-foreground mb-4">
                    Live transmisja z posiedzenia rady miasta Witnicy - omawiamy budżet na 2024 rok
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>234 widzów</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Rozpoczęte 14:00</span>
                      </div>
                    </div>
                    <Button>
                      <Play className="h-4 w-4 mr-2" />
                      Oglądaj
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Other Live Streams */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Inne transmisje na żywo</h2>
              {liveStreams.slice(1).map((stream) => (
                <Card key={stream.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold">{stream.title}</h3>
                          <Badge variant="destructive">🔴 LIVE</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{stream.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{stream.viewers} widzów</span>
                          </div>
                          <Badge variant="outline">{stream.category}</Badge>
                        </div>
                      </div>
                      <Button size="sm">
                        <Play className="h-3 w-3 mr-1" />
                        Oglądaj
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Program dnia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Program dnia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingShows.map((show) => (
                  <div key={show.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="text-center">
                      <div className="font-bold text-primary">{show.time}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{show.title}</h4>
                      <p className="text-sm text-muted-foreground">{show.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popularne kategorie */}
            <Card>
              <CardHeader>
                <CardTitle>Popularne kategorie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    🏛️ Samorząd (12 filmów)
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    🎭 Kultura (8 filmów)
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    🏃 Sport (15 filmów)
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    🍳 Kulinaria (6 filmów)
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    📚 Edukacja (10 filmów)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Archiwum */}
            <Card>
              <CardHeader>
                <CardTitle>Ostatnie nagrania</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Świąteczny jarmark 2023</div>
                  <div className="text-xs text-muted-foreground">2 dni temu • 1.2k wyświetleń</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Debata przedwyborcza</div>
                  <div className="text-xs text-muted-foreground">1 tydzień temu • 890 wyświetleń</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Festyn rodzinny</div>
                  <div className="text-xs text-muted-foreground">2 tygodnie temu • 567 wyświetleń</div>
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

export default TvPage;
