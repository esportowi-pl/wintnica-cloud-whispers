
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, Send, User, Settings } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ChatBox from '@/components/chat/ChatBox';

const ChatPage = () => {
  // Active chat state
  const [activeChat, setActiveChat] = useState('public');
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <MessageCircle className="mr-2" size={28} />
          Czat Witnica.info
        </h1>
        
        <Tabs defaultValue="public" onValueChange={setActiveChat} value={activeChat}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <div className="sticky top-4">
                <TabsList className="flex flex-col w-full h-auto gap-2 bg-transparent">
                  <TabsTrigger 
                    value="public" 
                    className="justify-between w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <div className="flex items-center">
                      <Users className="mr-2" size={16} />
                      <span>Czat publiczny</span>
                    </div>
                    <Badge className="bg-primary-foreground text-primary data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">
                      24
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="neighborhood" 
                    className="justify-between w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <div className="flex items-center">
                      <MessageCircle className="mr-2" size={16} />
                      <span>Sąsiedzi</span>
                    </div>
                    <Badge className="bg-primary-foreground text-primary data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">
                      8
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="events" 
                    className="justify-between w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <div className="flex items-center">
                      <MessageCircle className="mr-2" size={16} />
                      <span>Wydarzenia</span>
                    </div>
                    <Badge className="bg-primary-foreground text-primary data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">
                      3
                    </Badge>
                  </TabsTrigger>
                </TabsList>
                
                <div className="mt-8">
                  <h3 className="text-sm font-medium mb-3">Prywatne wiadomości</h3>
                  <div className="space-y-2">
                    {['Anna Kowalska', 'Piotr Nowak', 'Katarzyna Wiśniewska'].map((name, index) => (
                      <Button 
                        key={index}
                        variant="ghost" 
                        className="w-full justify-start gap-3"
                        onClick={() => setActiveChat(`private-${index}`)}
                      >
                        <User size={16} />
                        <span>{name}</span>
                        {index === 0 && (
                          <span className="w-2 h-2 ml-auto bg-primary rounded-full"></span>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="mr-2" size={16} />
                    Nowa konwersacja
                  </Button>
                </div>
                
                <div className="mt-8">
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                    <Settings size={14} />
                    <span>Ustawienia czatu</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="md:w-3/4">
              <TabsContent value="public" className="m-0">
                <ChatBox />
              </TabsContent>
              
              <TabsContent value="neighborhood" className="m-0">
                <Card className="p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">Czat sąsiedzki</h2>
                  <p className="text-muted-foreground mb-6">
                    Rozmawiaj z sąsiadami o lokalnych sprawach, szukaj pomocy i znajomości.
                  </p>
                  <ChatBox />
                </Card>
              </TabsContent>
              
              <TabsContent value="events" className="m-0">
                <Card className="p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">Czat wydarzeń</h2>
                  <p className="text-muted-foreground mb-6">
                    Dyskutuj o nadchodzących i trwających wydarzeniach w Witnicy.
                  </p>
                  <ChatBox />
                </Card>
              </TabsContent>
              
              {['private-0', 'private-1', 'private-2'].map((chat, index) => (
                <TabsContent key={chat} value={chat} className="m-0">
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-4 border-b pb-4">
                      <User size={24} />
                      <div>
                        <h3 className="font-medium">
                          {index === 0 ? 'Anna Kowalska' : index === 1 ? 'Piotr Nowak' : 'Katarzyna Wiśniewska'}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {index === 0 ? 'Online' : index === 1 ? 'Ostatnio: wczoraj' : 'Ostatnio: 3 dni temu'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="h-[400px] overflow-y-auto mb-4 p-2">
                      <div className="space-y-4">
                        <div className="flex justify-start">
                          <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                            <p>Cześć! Jak się masz?</p>
                            <p className="text-xs text-muted-foreground mt-1">14:30</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
                            <p>Hej! Wszystko w porządku, a u Ciebie?</p>
                            <p className="text-xs text-primary-foreground/80 mt-1">14:32</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-start">
                          <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                            <p>Też dobrze. Co słychać w mieście?</p>
                            <p className="text-xs text-muted-foreground mt-1">14:35</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Input placeholder="Napisz wiadomość..." className="flex-1" />
                      <Button>
                        <Send size={16} />
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ChatPage;
