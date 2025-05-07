
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Users, Calendar, MessageSquare } from "lucide-react";
import GroupsList from '@/components/groups/GroupsList';
import CreateGroupForm from '@/components/groups/CreateGroupForm';

const LocalGroupsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Grupy lokalne</h1>
            <p className="text-muted-foreground mt-2">
              Dołącz do grup lokalnych lub stwórz własną grupę dla mieszkańców Witnicy
            </p>
          </div>
          
          <Button onClick={() => setIsCreateFormVisible(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Stwórz grupę
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-2">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Szukaj grup..." 
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Wszystkie grupy</TabsTrigger>
                <TabsTrigger value="my">Moje grupy</TabsTrigger>
                <TabsTrigger value="popular">Popularne</TabsTrigger>
                <TabsTrigger value="new">Nowe</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <GroupsList filter="all" searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="my">
                <GroupsList filter="my" searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="popular">
                <GroupsList filter="popular" searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="new">
                <GroupsList filter="new" searchQuery={searchQuery} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            {isCreateFormVisible ? (
              <Card>
                <CardHeader>
                  <CardTitle>Stwórz nową grupę</CardTitle>
                </CardHeader>
                <CardContent>
                  <CreateGroupForm onCancel={() => setIsCreateFormVisible(false)} />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Popularne kategorie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Społeczność
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Wydarzenia
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Dyskusje
                  </Button>
                </CardContent>
              </Card>
            )}
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Najnowsze aktywności</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start space-x-3 pb-3 border-b last:border-b-0">
                    <Avatar>
                      <AvatarFallback>{`U${i}`}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Użytkownik {i} dodał post w grupie</p>
                      <p className="text-sm text-muted-foreground">Klub rowerowy Witnica</p>
                      <p className="text-xs text-muted-foreground mt-1">2 godziny temu</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LocalGroupsPage;
