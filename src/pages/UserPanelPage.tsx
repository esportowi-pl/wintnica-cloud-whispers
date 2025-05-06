
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, Settings, FileText, CreditCard, MessageCircle, Award } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ContentList from '@/components/dashboard/ContentList';
import ShardHistory from '@/components/dashboard/ShardHistory';

const UserPanelPage = () => {
  // Mock user data
  const user = {
    id: 1,
    name: "Jan Kowalski",
    email: "jan.kowalski@example.com",
    avatar: "",
    initials: "JK",
    role: "Użytkownik",
    joined: "15.01.2023",
    shards: 250,
    level: 3,
    xp: 75,
    badges: [
      { id: 1, name: "Nowy", description: "Dołączył do społeczności", icon: "🌟" },
      { id: 2, name: "Komentator", description: "Dodał 10 komentarzy", icon: "💬" },
      { id: 3, name: "Czytelnik", description: "Przeczytał 30 artykułów", icon: "📚" }
    ]
  };

  // Mock messages
  const messages = [
    { id: 1, from: "System", content: "Witamy w portalu Witnica.info! Zapoznaj się z regulaminem.", date: "15.01.2023", read: true },
    { id: 2, from: "Administrator", content: "Twój artykuł został zaakceptowany i opublikowany.", date: "20.03.2023", read: true },
    { id: 3, from: "Moderator", content: "Prosimy o uzupełnienie profilu.", date: "05.04.2023", read: false },
    { id: 4, from: "System", content: "Otrzymałeś 10 shardów za aktywność w tym tygodniu!", date: "12.05.2023", read: false }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <Card className="lg:w-1/3">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-xl">{user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.role} • Dołączył: {user.joined}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Poziom {user.level}</span>
                    <span className="text-sm text-muted-foreground">{user.xp}%</span>
                  </div>
                  <Progress value={user.xp} className="h-2" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Shardy</div>
                    <div className="text-2xl font-bold">{user.shards}</div>
                  </div>
                  <Button size="sm">Kup więcej</Button>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Odznaki</div>
                  <div className="flex flex-wrap gap-2">
                    {user.badges.map((badge) => (
                      <div 
                        key={badge.id}
                        className="flex items-center bg-muted p-2 rounded-lg"
                        title={badge.description}
                      >
                        <span className="mr-1">{badge.icon}</span>
                        <span className="text-sm">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Edytuj profil
              </Button>
              <Button variant="outline" size="sm">
                <User className="mr-2 h-4 w-4" />
                Publiczny profil
              </Button>
            </CardFooter>
          </Card>
          
          <div className="lg:w-2/3">
            <Tabs defaultValue="content">
              <TabsList className="mb-6">
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <FileText size={16} />
                  <span>Moje treści</span>
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-2">
                  <MessageCircle size={16} />
                  <span>Wiadomości</span>
                </TabsTrigger>
                <TabsTrigger value="shards" className="flex items-center gap-2">
                  <Award size={16} />
                  <span>Historia shardów</span>
                </TabsTrigger>
                <TabsTrigger value="billing" className="flex items-center gap-2">
                  <CreditCard size={16} />
                  <span>Płatności</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Moje artykuły</span>
                      <Button>Nowy artykuł</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ContentList limit={5} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <CardTitle>Wiadomości</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className="flex items-start justify-between border-b pb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{message.from}</span>
                              {!message.read && (
                                <Badge className="bg-blue-500">Nowa</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{message.content}</p>
                            <span className="text-xs text-muted-foreground">{message.date}</span>
                          </div>
                          <Button variant="ghost" size="sm">Odpowiedz</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="shards">
                <Card>
                  <CardHeader>
                    <CardTitle>Historia shardów</CardTitle>
                    <CardDescription>
                      Twoje transakcje i zmiany stanu shardów
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ShardHistory />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>Płatności i subskrypcje</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Aktywne subskrypcje</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">Plan Premium</div>
                              <div className="text-sm text-muted-foreground">19,99 zł miesięcznie</div>
                              <div className="text-sm text-muted-foreground">Odnowienie: 15.06.2023</div>
                            </div>
                            <Button variant="outline" size="sm">Anuluj</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Historia płatności</h3>
                        <div className="space-y-2">
                          <div className="bg-muted p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Plan Premium - odnowienie</div>
                                <div className="text-sm text-muted-foreground">15.05.2023</div>
                              </div>
                              <div className="font-medium">19,99 zł</div>
                            </div>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Zakup 200 shardów</div>
                                <div className="text-sm text-muted-foreground">02.05.2023</div>
                              </div>
                              <div className="font-medium">15,00 zł</div>
                            </div>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Plan Premium - aktywacja</div>
                                <div className="text-sm text-muted-foreground">15.04.2023</div>
                              </div>
                              <div className="font-medium">19,99 zł</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserPanelPage;
