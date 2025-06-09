
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, Play, Plus, Zap, TrendingUp, Clock } from "lucide-react";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const StrumykiPage = () => {
  const [likedVideos, setLikedVideos] = useState<string[]>([]);

  const shortVideos = [
    {
      id: '1',
      title: 'Zachód słońca nad Witnicą',
      creator: 'Anna Kowalska',
      views: 1200,
      likes: 89,
      duration: '0:15',
      category: 'Natura',
      trending: true
    },
    {
      id: '2',
      title: 'Szybki przepis na placki ziemniaczane',
      creator: 'Babcia Hania',
      views: 2300,
      likes: 156,
      duration: '0:45',
      category: 'Kulinaria',
      trending: false
    },
    {
      id: '3',
      title: 'Koteczek z ul. Długiej',
      creator: 'Piotr Nowak',
      views: 850,
      likes: 234,
      duration: '0:20',
      category: 'Zwierzęta',
      trending: true
    },
    {
      id: '4',
      title: 'Historia starego młyna',
      creator: 'Muzeum Witnicy',
      views: 567,
      likes: 67,
      duration: '0:30',
      category: 'Historia',
      trending: false
    },
    {
      id: '5',
      title: 'Poranne ćwiczenia w parku',
      creator: 'Fitness Witnica',
      views: 934,
      likes: 98,
      duration: '0:25',
      category: 'Sport',
      trending: false
    },
    {
      id: '6',
      title: 'Malowanie po numerach - relaks',
      creator: 'Kreatywna Marta',
      views: 445,
      likes: 76,
      duration: '0:35',
      category: 'Sztuka',
      trending: false
    }
  ];

  const categories = [
    { name: 'Trending', icon: '🔥', count: 23 },
    { name: 'Kulinaria', icon: '🍳', count: 45 },
    { name: 'Natura', icon: '🌿', count: 67 },
    { name: 'Zwierzęta', icon: '🐱', count: 34 },
    { name: 'Historia', icon: '📚', count: 28 },
    { name: 'Sport', icon: '🏃', count: 39 },
    { name: 'Sztuka', icon: '🎨', count: 52 },
    { name: 'DIY', icon: '🔨', count: 41 }
  ];

  const handleLike = (videoId: string) => {
    setLikedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Zap className="h-10 w-10" />
            Strumyki Witnicy
          </h1>
          <p className="text-xl text-muted-foreground">
            Krótkie filmy od mieszkańców - chwile, historie, inspiracje
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Video Feed */}
          <div className="lg:col-span-3">
            {/* Create Button */}
            <div className="mb-6">
              <Button size="lg" className="w-full md:w-auto">
                <Plus className="h-5 w-5 mr-2" />
                Stwórz swój strumyk
              </Button>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shortVideos.map((video) => (
                <Card key={video.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-0">
                    {/* Video Thumbnail */}
                    <div className="aspect-[9/16] bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-12 w-12 text-white group-hover:scale-110 transition-transform" />
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="absolute bottom-2 right-2">
                        <Badge className="bg-black/70 text-white">
                          <Clock className="h-3 w-3 mr-1" />
                          {video.duration}
                        </Badge>
                      </div>
                      
                      {/* Trending Badge */}
                      {video.trending && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-600 text-white">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    {/* Video Info */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-sm leading-tight mb-1">{video.title}</h3>
                        <p className="text-xs text-muted-foreground">{video.creator}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{video.views.toLocaleString()} wyświetleń</span>
                        <Badge variant="outline" className="text-xs">
                          {video.category}
                        </Badge>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`flex items-center gap-1 ${likedVideos.includes(video.id) ? 'text-red-500' : ''}`}
                          onClick={() => handleLike(video.id)}
                        >
                          <Heart className={`h-3 w-3 ${likedVideos.includes(video.id) ? 'fill-current' : ''}`} />
                          <span className="text-xs">{video.likes}</span>
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          <span className="text-xs">12</span>
                        </Button>
                        
                        <Button variant="ghost" size="sm">
                          <Share className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Załaduj więcej strumyków
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Kategorie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button 
                    key={category.name}
                    variant="ghost" 
                    className="w-full justify-between hover:bg-muted"
                  >
                    <span className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Trending Creators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Populární twórcy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    B
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Babcia Hania</div>
                    <div className="text-xs text-muted-foreground">2.3k obserwujących</div>
                  </div>
                  <Button size="sm" variant="outline">Obserwuj</Button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Anna Kowalska</div>
                    <div className="text-xs text-muted-foreground">1.8k obserwujących</div>
                  </div>
                  <Button size="sm" variant="outline">Obserwuj</Button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Kreatywna Marta</div>
                    <div className="text-xs text-muted-foreground">1.5k obserwujących</div>
                  </div>
                  <Button size="sm" variant="outline">Obserwuj</Button>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Challenge */}
            <Card className="border-2 border-dashed border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🏆 Wyzwanie tygodnia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h3 className="font-bold text-sm">"Zimowe piękno Witnicy"</h3>
                  <p className="text-xs text-muted-foreground">
                    Pokaż najpiękniejsze zimowe miejsce w naszym mieście. 
                    Najlepszy film wygrywa voucher do lokalnej restauracji!
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Zostało: 3 dni
                  </div>
                  <Button size="sm" className="w-full">
                    Weź udział
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips for Creators */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Wskazówki dla twórców</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="p-2 bg-muted/50 rounded">
                  📱 Filmuj pionowo dla lepszego efektu
                </div>
                <div className="p-2 bg-muted/50 rounded">
                  ⏱️ Idealna długość: 15-30 sekund
                </div>
                <div className="p-2 bg-muted/50 rounded">
                  🔊 Pamiętaj o dobrej jakości dźwięku
                </div>
                <div className="p-2 bg-muted/50 rounded">
                  #️⃣ Używaj lokalnych hashtagów
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

export default StrumykiPage;
