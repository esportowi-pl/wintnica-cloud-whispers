
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import SkyHeader from '@/components/layout/SkyHeader';
import EventsCalendar from '@/components/events/EventsCalendar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin } from "lucide-react";

type Event = {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  organizer: string;
  image?: string;
  category: string;
};

// Mock events data
const mockEvents: Event[] = [
  {
    id: 1,
    title: "Festyn Miejski",
    date: new Date(2025, 4, 15), // May 15, 2025
    time: "15:00 - 21:00",
    location: "Rynek Miasta, Witnica",
    description: "Doroczny festyn z atrakcjami dla całej rodziny. W programie: występy artystyczne, konkursy z nagrodami, stoiska z jedzeniem i napojami.",
    organizer: "Urząd Miasta Witnica",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop",
    category: "Rozrywka"
  },
  {
    id: 2,
    title: "Koncert Orkiestry Dętej",
    date: new Date(2025, 4, 20), // May 20, 2025
    time: "18:00 - 19:30",
    location: "Dom Kultury, ul. Kulturalna 5, Witnica",
    description: "Występ naszej lokalnej orkiestry dętej. W repertuarze utwory klasyczne i współczesne.",
    organizer: "Dom Kultury w Witnicy",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=500&auto=format&fit=crop",
    category: "Kultura"
  },
  {
    id: 3,
    title: "Zawody Wędkarskie",
    date: new Date(2025, 4, 22), // May 22, 2025
    time: "07:00 - 12:00",
    location: "Jezioro Miejskie, Witnica",
    description: "Coroczne zawody wędkarskie z nagrodami. Zgłoszenia przyjmowane są do 20 maja.",
    organizer: "Koło Wędkarskie Witnica",
    category: "Sport"
  },
  {
    id: 4,
    title: "Dzień Dziecka",
    date: new Date(2025, 5, 1), // June 1, 2025
    time: "10:00 - 16:00",
    location: "Park Miejski, Witnica",
    description: "Atrakcje z okazji Dnia Dziecka. Dmuchańce, animacje, konkursy, malowanie twarzy i wiele więcej!",
    organizer: "Urząd Miasta Witnica",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=500&auto=format&fit=crop",
    category: "Dla dzieci"
  },
  {
    id: 5,
    title: "Zebranie Rady Miasta",
    date: new Date(2025, 5, 10), // June 10, 2025
    time: "17:00 - 19:00",
    location: "Urząd Miasta, sala konferencyjna, Witnica",
    description: "Zebranie Rady Miasta. Porządek obrad dostępny na stronie internetowej miasta.",
    organizer: "Urząd Miasta Witnica",
    category: "Samorząd"
  }
];

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter events based on search term and category
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories
  const categories = ['all', ...new Set(mockEvents.map(event => event.category))];
  
  // Format date function
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SkyHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Wydarzenia w Witnicy</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input 
                    placeholder="Szukaj wydarzeń..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Button>Szukaj</Button>
                </div>
                
                <Tabs defaultValue="all" className="mt-4" value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="grid grid-cols-3 md:grid-cols-6">
                    {categories.map(category => (
                      <TabsTrigger key={category} value={category}>
                        {category === 'all' ? 'Wszystkie' : category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {event.image && (
                        <div className="md:w-1/3">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover"
                            style={{ maxHeight: '200px' }}
                          />
                        </div>
                      )}
                      <div className={`p-6 ${event.image ? 'md:w-2/3' : 'w-full'}`}>
                        <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                        
                        <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2" />
                            <span>{formatDate(event.date)}, {event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-2" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{event.description}</p>
                        
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-sm text-gray-500">Organizator: {event.organizer}</span>
                          <Button>Szczegóły</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">Nie znaleziono wydarzeń spełniających kryteria.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <EventsCalendar />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dodaj wydarzenie</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-sm mb-4">
                    Masz informację o wydarzeniu, które powinno być dodane do kalendarza?
                  </p>
                  <Button className="w-full">Zgłoś wydarzenie</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsPage;
