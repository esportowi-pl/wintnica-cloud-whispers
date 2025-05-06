
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from "lucide-react";

type Event = {
  id: number;
  title: string;
  date: Date;
  location: string;
  description: string;
  url?: string;
};

// Mock events data
const mockEvents: Event[] = [
  {
    id: 1,
    title: "Festyn Miejski",
    date: new Date(2025, 4, 15), // May 15, 2025
    location: "Rynek Miasta",
    description: "Doroczny festyn z atrakcjami dla całej rodziny.",
    url: "/wydarzenie/festyn-miejski"
  },
  {
    id: 2,
    title: "Koncert Orkiestry Dętej",
    date: new Date(2025, 4, 20), // May 20, 2025
    location: "Dom Kultury",
    description: "Występ naszej lokalnej orkiestry dętej.",
    url: "/wydarzenie/koncert-orkiestry"
  },
  {
    id: 3,
    title: "Zawody Wędkarskie",
    date: new Date(2025, 4, 22), // May 22, 2025
    location: "Jezioro Miejskie",
    description: "Coroczne zawody wędkarskie z nagrodami.",
    url: "/wydarzenie/zawody-wedkarskie"
  },
  {
    id: 4,
    title: "Dzień Dziecka",
    date: new Date(2025, 5, 1), // June 1, 2025
    location: "Park Miejski",
    description: "Atrakcje z okazji Dnia Dziecka.",
    url: "/wydarzenie/dzien-dziecka"
  }
];

const EventsCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  
  // Find events for the selected date
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    
    if (newDate) {
      const events = mockEvents.filter(event => 
        event.date.getFullYear() === newDate.getFullYear() &&
        event.date.getMonth() === newDate.getMonth() &&
        event.date.getDate() === newDate.getDate()
      );
      setSelectedEvents(events);
    } else {
      setSelectedEvents([]);
    }
  };
  
  // Find dates with events for highlighting in calendar
  const getDaysWithEvents = () => {
    return mockEvents.map(event => event.date);
  };

  return (
    <Card className="bg-white overflow-hidden">
      <CardHeader className="bg-primary/10 pb-2">
        <CardTitle className="text-lg flex items-center">
          <CalendarIcon className="mr-2" size={18} />
          <span>Kalendarz wydarzeń</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-7/12">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="border rounded-md"
              modifiersStyles={{
                today: { fontWeight: 'bold', color: '#1E40AF' }
              }}
              modifiers={{
                event: getDaysWithEvents()
              }}
              styles={{
                day_event: { 
                  border: '2px solid #2563eb',
                  borderRadius: '50%',
                }
              }}
            />
          </div>
          
          <div className="md:w-5/12 border-l pl-4">
            <h3 className="font-medium text-lg mb-2">
              {date ? date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Wybierz datę'}
            </h3>
            
            {selectedEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedEvents.map((event) => (
                  <div key={event.id} className="border-b pb-3">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-500 mb-1">
                      <Badge variant="outline" className="mr-1">{event.location}</Badge>
                    </div>
                    <p className="text-sm mb-2">{event.description}</p>
                    {event.url && (
                      <Button variant="link" className="px-0 h-auto" asChild>
                        <a href={event.url}>Szczegóły wydarzenia</a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Brak wydarzeń w wybranym dniu</p>
            )}
            
            <Button variant="outline" className="mt-4 w-full">
              Wszystkie wydarzenia
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsCalendar;
