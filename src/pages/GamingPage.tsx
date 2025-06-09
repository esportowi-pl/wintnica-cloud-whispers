
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Trophy, Users, Zap, Target, Clock } from "lucide-react";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const GamingPage = () => {
  const activeGames = [
    {
      id: '1',
      name: 'Witnicki Quiz',
      players: 23,
      type: 'Trivia',
      difficulty: 'Łatwy',
      duration: '15 min'
    },
    {
      id: '2', 
      name: 'Skarbiec Witnicy',
      players: 8,
      type: 'Przygoda',
      difficulty: 'Średni',
      duration: '45 min'
    }
  ];

  const tournaments = [
    {
      id: '1',
      name: 'Mistrzostwa Witnicy w Szachy',
      startDate: '2024-01-15',
      prize: '500 PLN',
      participants: 32,
      status: 'Rejestracja'
    },
    {
      id: '2',
      name: 'Turniej Wiedzy o Mieście',
      startDate: '2024-01-20',
      prize: 'Vouchery lokalne',
      participants: 16,
      status: 'W trakcie'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Gracz123', points: 1250, badge: '🏆' },
    { rank: 2, name: 'WitniaePro', points: 1100, badge: '🥈' },
    { rank: 3, name: 'QuizMaster', points: 950, badge: '🥉' },
    { rank: 4, name: 'LocalHero', points: 800, badge: '' },
    { rank: 5, name: 'Sąsiad2024', points: 750, badge: '' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Gamepad2 className="h-10 w-10" />
            Gaming Center Witnicy
          </h1>
          <p className="text-xl text-muted-foreground">
            Graj, rywalizuj i poznawaj innych mieszkańców przez zabawę!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Gaming Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Games */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Szybkie gry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeGames.map((game) => (
                    <Card key={game.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold">{game.name}</h3>
                            <Badge variant="outline">{game.type}</Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                Gracze online
                              </span>
                              <span className="font-medium">{game.players}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                Poziom
                              </span>
                              <span>{game.difficulty}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Czas gry
                              </span>
                              <span>{game.duration}</span>
                            </div>
                          </div>
                          
                          <Button className="w-full">
                            Dołącz do gry
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Game Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Kategorie gier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    🧩 Logiczne
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    ❓ Quizy
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    ♟️ Strategiczne
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    🎯 Arcade
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    🃏 Karciane
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    🎲 Planszowe
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    🏃 Sportowe
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    🧠 Edukacyjne
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tournaments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Turnieje i wydarzenia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tournaments.map((tournament) => (
                  <Card key={tournament.id} className="border-2 border-dashed border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold">{tournament.name}</h3>
                        <Badge variant={tournament.status === 'W trakcie' ? 'destructive' : 'secondary'}>
                          {tournament.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Start:</span>
                          <div className="font-medium">{tournament.startDate}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Nagroda:</span>
                          <div className="font-medium">{tournament.prize}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Uczestnicy:</span>
                          <div className="font-medium">{tournament.participants}</div>
                        </div>
                        <div className="flex items-end">
                          <Button size="sm" className="w-full">
                            {tournament.status === 'Rejestracja' ? 'Zapisz się' : 'Zobacz'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Ranking graczy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.map((player) => (
                  <div key={player.rank} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {player.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{player.name} {player.badge}</div>
                      <div className="text-xs text-muted-foreground">{player.points} pkt</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Osiągnięcia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🏆</div>
                    <div>
                      <div className="font-medium text-sm">Pierwszy zwycięzca</div>
                      <div className="text-xs text-muted-foreground">Wygraj pierwszą grę</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🧠</div>
                    <div>
                      <div className="font-medium text-sm">Ekspert wiedzy</div>
                      <div className="text-xs text-muted-foreground">Odpowiedz na 100 pytań</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">👥</div>
                    <div>
                      <div className="font-medium text-sm">Społeczny gracz</div>
                      <div className="text-xs text-muted-foreground">Zagraj z 10 różnymi osobami</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Game Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Twoje statystyki</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Rozegrane gry:</span>
                  <span className="font-bold">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Wygrane:</span>
                  <span className="font-bold text-green-600">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Współczynnik wygranych:</span>
                  <span className="font-bold">66.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Ulubiona kategoria:</span>
                  <span className="font-bold">Quizy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Czas gry dziś:</span>
                  <span className="font-bold">2h 15min</span>
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

export default GamingPage;
