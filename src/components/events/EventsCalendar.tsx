
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Mock events data
const events = [
  {
    id: 1,
    title: "Festyn Miejski",
    date: new Date(2023, 4, 15), // May 15, 2023
    location: "Park Miejski, Witnica",
    description: "Coroczny festyn z atrakcjami dla całej rodziny, muzyką na żywo i lokalnymi kulinariami.",
    category: "Wydarzenie kulturalne"
  },
  {
    id: 2,
    title: "Mecz piłki nożnej: Witnica vs Kostrzyn",
    date: new Date(2023, 4, 20), // May 20, 2023
    location: "Stadion Miejski, Witnica",
    description: "Mecz lokalnych drużyn w ramach ligi regionalnej.",
    category: "Sport"
  },
  {
    id: 3,
    title: "Warsztaty kulinarne",
    date: new Date(2023, 4, 25), // May 25, 2023
    location: "Centrum Kultury, Witnica",
    description: "Warsztaty gotowania tradycyjnych potraw regionalnych pod okiem lokalnych kucharzy.",
    category: "Edukacja"
  },
  {
    id: 4,
    title: "Wystawa fotograficzna: 'Witnica wczoraj i dziś'",
    date: new Date(2023, 5, 1), // June 1, 2023
    location: "Galeria Miejska, Witnica",
    description: "Wystawa zdjęć pokazujących zmiany w mieście na przestrzeni lat.",
    category: "Wystawa"
  },
  {
    id: 5,
    title: "Piknik rodzinny",
    date: new Date(2023, 5, 10), // June 10, 2023
    location: "Park Miejski, Witnica",
    description: "Piknik z atrakcjami dla dzieci, grami plenerowymi i konkursami.",
    category: "Wydarzenie rodzinne"
  }
];

const EventsCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Filter events for selected date
  const selectedDateEvents = selectedDate 
    ? events.filter(event => 
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];
  
  // Filter events for current month
  const currentMonthEvents = events.filter(event => 
    event.date.getMonth() === currentMonth.getMonth() &&
    event.date.getFullYear() === currentMonth.getFullYear()
  );

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  };

  // Format dates for rendering
  const formatEventDate = (date: Date) => {
    return date.toLocaleDateString('pl-PL', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Kalendarz wydarzeń</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>
            Dzisiaj
          </Button>
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => {
                const newDate = new Date(currentMonth);
                newDate.setMonth(newDate.getMonth() - 1);
                setCurrentMonth(newDate);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {
                const newDate = new Date(currentMonth);
                newDate.setMonth(newDate.getMonth() + 1);
                setCurrentMonth(newDate);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="md:grid md:grid-cols-2 gap-4">
          <div className="p-4 border-r">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={handleMonthChange}
              className="rounded-md border"
              modifiers={{
                event: (date) => 
                  currentMonthEvents.some(
                    event => 
                      event.date.getDate() === date.getDate() && 
                      event.date.getMonth() === date.getMonth() && 
                      event.date.getFullYear() === date.getFullYear()
                  )
              }}
              modifiersClassNames={{
                event: "bg-primary/10 font-bold"
              }}
            />
          </div>
          <div className="p-4">
            {selectedDate ? (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {formatEventDate(selectedDate)}
                </h3>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateEvents.map((event) => (
                      <div key={event.id} className="border-l-4 border-primary pl-3 py-2">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{event.title}</h4>
                          <Badge>{event.category}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{event.location}</div>
                        <p className="text-sm mt-2">{event.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Brak wydarzeń w wybranym dniu
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Wybierz datę, aby zobaczyć wydarzenia
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsCalendar;
