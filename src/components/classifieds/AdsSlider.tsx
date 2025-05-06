
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Ad = {
  id: number;
  title: string;
  description: string;
  price?: string;
  category: string;
  author: string;
  date: string;
  image?: string;
};

// Mock ads data
const mockAds: Ad[] = [
  {
    id: 1,
    title: "Sprzedam mieszkanie 60m²",
    description: "Przestronne mieszkanie w centrum Witnicy. 3 pokoje, kuchnia, łazienka. Po remoncie.",
    price: "350 000 zł",
    category: "Nieruchomości",
    author: "Jan Kowalski",
    date: "2023-05-04",
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Praca w sklepie spożywczym",
    description: "Zatrudnię sprzedawcę do sklepu spożywczego. Pełen etat, umowa o pracę.",
    category: "Praca",
    author: "Anna Nowak",
    date: "2023-05-03",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Wykończenia wnętrz",
    description: "Oferuję usługi wykończenia wnętrz. Malowanie, tapetowanie, panele, glazura.",
    category: "Usługi",
    author: "Piotr Wiśniewski",
    date: "2023-05-02",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Toyota Corolla 2018",
    description: "Sprzedam Toyotę Corollę, rok 2018, przebieg 75 000 km, benzyna, stan bardzo dobry.",
    price: "59 900 zł",
    category: "Motoryzacja",
    author: "Magdalena K.",
    date: "2023-05-01",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Laptop Dell Inspiron",
    description: "Sprzedam laptop Dell Inspiron, i5, 16GB RAM, 512 SSD, stan dobry.",
    price: "2 200 zł",
    category: "Elektronika",
    author: "Tomasz M.",
    date: "2023-04-30",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=500&auto=format&fit=crop"
  }
];

const AdsSlider = () => {
  const [ads, setAds] = useState<Ad[]>(mockAds);
  
  // Function to simulate refreshing data every 10 seconds
  useEffect(() => {
    const refreshTimer = setInterval(() => {
      // In a real app, you would fetch new data here
      console.log("Refreshing ads data...");
      
      // For demo purposes, we're just shuffling the existing ads
      setAds([...ads].sort(() => Math.random() - 0.5));
    }, 10000);
    
    return () => clearInterval(refreshTimer);
  }, [ads]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Ogłoszenia lokalne</h2>
        <Button>Dodaj ogłoszenie</Button>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {ads.map((ad) => (
            <CarouselItem key={ad.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden h-full">
                {ad.image && (
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={ad.image} 
                      alt={ad.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{ad.title}</h3>
                    {ad.price && (
                      <span className="font-bold text-primary">{ad.price}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{ad.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <Badge variant="outline">{ad.category}</Badge>
                    <Button variant="outline" size="sm">Zobacz</Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end mt-4 space-x-2">
          <CarouselPrevious className="relative static" />
          <CarouselNext className="relative static" />
        </div>
      </Carousel>
    </div>
  );
};

export default AdsSlider;
