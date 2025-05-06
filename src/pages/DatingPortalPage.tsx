
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, MessageCircle, Filter, Users, User, Mail, MapPin } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const DatingPortalPage = () => {
  // Mock profiles data
  const profiles = [
    {
      id: 1,
      name: "Anna",
      age: 28,
      location: "Witnica",
      distance: 0,
      interests: ["Książki", "Góry", "Kino", "Gotowanie"],
      description: "Cześć, jestem Anna! Uwielbiam aktywnie spędzać czas na świeżym powietrzu i smacznie gotować.",
      avatar: "",
      initials: "A",
      online: true,
      liked: false
    },
    {
      id: 2,
      name: "Piotr",
      age: 32,
      location: "Kostrzyn nad Odrą",
      distance: 12,
      interests: ["Sport", "Muzyka", "Podróże", "Fotografia"],
      description: "Hej, jestem Piotr. Pasjonuję się fotografią i podróżami. Szukam kogoś do wspólnych wyjazdów!",
      avatar: "",
      initials: "P",
      online: true,
      liked: true
    },
    {
      id: 3,
      name: "Karolina",
      age: 25,
      location: "Gorzów Wielkopolski",
      distance: 25,
      interests: ["Taniec", "Sztuka", "Zwierzęta", "Psychologia"],
      description: "Cześć, jestem Karolina! Jestem instruktorką tańca i kocham sztukę we wszystkich jej formach.",
      avatar: "",
      initials: "K",
      online: false,
      liked: false
    },
    {
      id: 4,
      name: "Michał",
      age: 30,
      location: "Dębno",
      distance: 18,
      interests: ["Gry", "Technologia", "Filmy", "Historia"],
      description: "Hej, jestem Michał. Pracuję jako programista, a w wolnym czasie lubię odkrywać nowe technologie i historyczne miejsca.",
      avatar: "",
      initials: "M",
      online: false,
      liked: false
    }
  ];

  // Mock conversations
  const conversations = [
    {
      id: 1,
      with: "Anna",
      avatar: "",
      initials: "A",
      lastMessage: "Może spotkamy się w ten weekend w parku?",
      time: "14:32",
      unread: true
    },
    {
      id: 2,
      with: "Marek",
      avatar: "",
      initials: "M",
      lastMessage: "Bardzo podobał mi się ten film! Co sądzisz?",
      time: "Wczoraj",
      unread: false
    },
    {
      id: 3,
      with: "Katarzyna",
      avatar: "",
      initials: "K",
      lastMessage: "Dzięki za miłą rozmowę. Do następnego!",
      time: "2 dni temu",
      unread: false
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Witnica Randki</h1>
          <Button>
            <User className="mr-2 h-4 w-4" />
            Mój profil
          </Button>
        </div>

        <Tabs defaultValue="discover">
          <TabsList className="mb-6">
            <TabsTrigger value="discover" className="flex items-center gap-2">
              <Users size={16} />
              <span>Odkrywaj</span>
            </TabsTrigger>
            <TabsTrigger value="matches" className="flex items-center gap-2">
              <Heart size={16} />
              <span>Polubieni</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle size={16} />
              <span>Wiadomości</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input placeholder="Szukaj osób w Witnicy..." className="pl-10" />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtruj
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map((profile) => (
                <Card key={profile.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={profile.avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground">{profile.initials}</AvatarFallback>
                          </Avatar>
                          {profile.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            {profile.name}, {profile.age}
                          </CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin size={12} className="mr-1" />
                            {profile.location}
                            {profile.distance > 0 && (
                              <span className="ml-1">({profile.distance} km)</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant={profile.liked ? "default" : "ghost"}
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Heart size={16} className={profile.liked ? "fill-white" : ""} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-3">{profile.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {profile.interests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="bg-muted/50">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Heart className="mr-2 h-4 w-4" />
                      Polub
                    </Button>
                    <Button size="sm">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Wiadomość
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="matches">
            <Card>
              <CardHeader>
                <CardTitle>Osoby, które polubiłeś</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {profiles
                    .filter(profile => profile.liked)
                    .map(profile => (
                      <div key={profile.id} className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="relative mb-3">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={profile.avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xl">{profile.initials}</AvatarFallback>
                          </Avatar>
                          {profile.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                          )}
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{profile.name}, {profile.age}</div>
                          <div className="text-sm text-muted-foreground mb-2">{profile.location}</div>
                          <Button size="sm">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Wiadomość
                          </Button>
                        </div>
                      </div>
                    ))}
                  {profiles.filter(profile => profile.liked).length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <div className="mb-4">
                        <Heart size={48} className="mx-auto text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Nie masz jeszcze polubień</h3>
                      <p className="text-muted-foreground mb-4">Przeglądaj profile i oznaczaj te, które Cię zainteresowały</p>
                      <Button>
                        <Users className="mr-2 h-4 w-4" />
                        Odkrywaj profile
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Konwersacje</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {conversations.map(conversation => (
                      <div 
                        key={conversation.id}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer ${
                          conversation.id === 1 ? 'bg-muted' : 'hover:bg-muted/50'
                        } transition-colors`}
                      >
                        <Avatar>
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback>{conversation.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <div className="font-medium truncate">{conversation.with}</div>
                            <div className="text-xs text-muted-foreground">{conversation.time}</div>
                          </div>
                          <div className="text-sm truncate text-muted-foreground">{conversation.lastMessage}</div>
                        </div>
                        {conversation.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Anna</CardTitle>
                      <div className="text-xs text-green-500">Online</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        <p>Cześć! Jak się masz? Widziałam, że też lubisz chodzić po górach.</p>
                        <div className="text-xs text-muted-foreground mt-1">14:25</div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                        <p>Hej Anna! Tak, byłem w zeszłym miesiącu w Karkonoszach. A Ty gdzie ostatnio byłaś?</p>
                        <div className="text-xs text-primary-foreground/80 mt-1">14:28</div>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        <p>Ja byłam w Beskidach na długi weekend. Było cudownie! Masz może plany na najbliższe wyjście w góry?</p>
                        <div className="text-xs text-muted-foreground mt-1">14:30</div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                        <p>Myślę o wyjeździe w Tatry za dwa tygodnie. Może chciałabyś się wybrać razem?</p>
                        <div className="text-xs text-primary-foreground/80 mt-1">14:31</div>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        <p>Może spotkamy się w ten weekend w parku? Porozmawialibyśmy o szczegółach.</p>
                        <div className="text-xs text-muted-foreground mt-1">14:32</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <div className="flex w-full gap-2">
                    <Input placeholder="Napisz wiadomość..." className="flex-1" />
                    <Button>
                      <Mail className="mr-2 h-4 w-4" />
                      Wyślij
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DatingPortalPage;
