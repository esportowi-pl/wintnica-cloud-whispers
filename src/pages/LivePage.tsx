import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Radio, Users, MessageCircle, Heart, Share, Mic, Camera } from "lucide-react";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const LivePage = () => {
  const [chatMessage, setChatMessage] = useState('');

  const liveEvents = [
    {
      id: '1',
      title: 'Gotowanie z Babcią Hanią',
      host: 'Hania Kowalska',
      viewers: 156,
      category: 'Kulinaria',
      isLive: true,
      startedAt: '19:00'
    },
    {
      id: '2',
      title: 'Q&A z Burmistrzem',
      host: 'Jan Nowak',
      viewers: 89,
      category: 'Samorząd', 
      isLive: true,
      startedAt: '20:00'
    }
  ];

  const chatMessages = [
    { id: '1', user: 'Anna', message: 'Świetny przepis! 😍', time: '20:15' },
    { id: '2', user: 'Piotr', message: 'Czy mogę zapytać o składniki?', time: '20:16' },
    { id: '3', user: 'Marta', message: 'Dzięki za transmisję!', time: '20:17' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Radio className="h-10 w-10" />
            Live Hub Witnicy
          </h1>
          <p className="text-xl text-muted-foreground">
            Transmisje na żywo od mieszkańców dla mieszkańców
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Stream */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-pink-500 to-purple-600 rounded-t-lg flex items-center justify-center relative">
                  <div className="text-white text-center">
                    <Camera className="h-16 w-16 mx-auto mb-4" />
                    <p className="text-lg font-bold">Gotowanie z Babcią Hanią</p>
                    <Badge className="bg-red-600 text-white mt-2">
                      🔴 NA ŻYWO
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/50 text-white">
                      <Users className="h-3 w-3 mr-1" />
                      156 widzów
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Tradycyjny rosół babci Hani</h3>
                      <p className="text-muted-foreground">
                        Uczymy się robić tradycyjny rosół według przepisu przekazywanego z pokolenia na pokolenie
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        243
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4 mr-1" />
                        Udostępnij
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Rozpoczęte o 19:00</span>
                    <Badge variant="outline">Kulinaria</Badge>
                    <span>Host: Hania Kowalska</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Other Live Streams */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Inne transmisje na żywo</h2>
              {liveEvents.slice(1).map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                        <Mic className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold">{event.title}</h3>
                          <Badge variant="destructive">🔴 LIVE</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Host: {event.host}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{event.viewers} widzów</span>
                          </div>
                          <Badge variant="outline">{event.category}</Badge>
                          <span>Od {event.startedAt}</span>
                        </div>
                      </div>
                      <Button size="sm">Dołącz</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Start Your Stream */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Rozpocznij własną transmisję</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-24 flex flex-col gap-2">
                    <Camera className="h-8 w-8" />
                    Transmisja wideo
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col gap-2">
                    <Mic className="h-8 w-8" />
                    Tylko audio
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Udostępnij swoje umiejętności, opowiedz o swoich pasjach lub po prostu porozmawiaj z sąsiadami!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chat Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat na żywo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-64 overflow-y-auto space-y-2 border rounded-lg p-3 bg-muted/20">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-primary">{msg.user}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p>{msg.message}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="Napisz wiadomość..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm">Wyślij</Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Nadchodzące wydarzneia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 p-3 border rounded-lg">
                  <div className="font-medium text-sm">Warsztat ceramiczny</div>
                  <div className="text-xs text-muted-foreground">Jutro 15:00 • Marta Nowak</div>
                </div>
                <div className="space-y-2 p-3 border rounded-lg">
                  <div className="font-medium text-sm">Lekcje gitary</div>
                  <div className="text-xs text-muted-foreground">Sobota 18:00 • Paweł Muzyk</div>
                </div>
                <div className="space-y-2 p-3 border rounded-lg">
                  <div className="font-medium text-sm">Historia Witnicy</div>
                  <div className="text-xs text-muted-foreground">Niedziela 16:00 • Krystyna Historyk</div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Streamers */}
            <Card>
              <CardHeader>
                <CardTitle>Populrani streamerzy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Hania Kowalska</div>
                    <div className="text-xs text-muted-foreground">1.2k obserwujących</div>
                  </div>
                  <Button size="sm" variant="outline">Obserwuj</Button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Jan Nowak</div>
                    <div className="text-xs text-muted-foreground">890 obserwujących</div>
                  </div>
                  <Button size="sm" variant="outline">Obserwuj</Button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Paweł Muzyk</div>
                    <div className="text-xs text-muted-foreground">567 obserwujących</div>
                  </div>
                  <Button size="sm" variant="outline">Obserwuj</Button>
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

export default LivePage;
