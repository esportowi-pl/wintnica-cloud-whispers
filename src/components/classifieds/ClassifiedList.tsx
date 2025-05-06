
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Classified = {
  id: number;
  title: string;
  description: string;
  price?: string;
  category: string;
  author: string;
  date: string;
  image?: string;
};

const mockClassifieds: Classified[] = [
  {
    id: 1,
    title: "Sprzedam rower górski",
    description: "Rower w bardzo dobrym stanie, używany tylko kilka razy. Model XYZ, hamulce tarczowe.",
    price: "800 zł",
    category: "Sport",
    author: "Jan Kowalski",
    date: "2023-05-04",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Korepetycje z matematyki",
    description: "Oferuję korepetycje z matematyki dla uczniów szkoły podstawowej i liceum. Wieloletnie doświadczenie.",
    price: "50 zł/h",
    category: "Edukacja",
    author: "Anna Nowak",
    date: "2023-05-03"
  },
  {
    id: 3,
    title: "Oddam za darmo meble ogrodowe",
    description: "Oddam za darmo zestaw mebli ogrodowych (stół + 4 krzesła). Do odbioru osobistego w Witnicy.",
    category: "Dom i Ogród",
    author: "Piotr Wiśniewski",
    date: "2023-05-02",
    image: "https://images.unsplash.com/photo-1533127321739-d5dc53c221c8?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Szukam pracy - sprzątanie",
    description: "Szukam pracy dorywczej - sprzątanie domów/mieszkań. Posiadam referencje i doświadczenie.",
    category: "Praca",
    author: "Magdalena K.",
    date: "2023-05-01"
  }
];

const ClassifiedList = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ogłoszenia lokalne</h2>
        <Button>Dodaj ogłoszenie</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClassifieds.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {item.image && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                {item.price && (
                  <span className="font-bold text-primary">{item.price}</span>
                )}
              </div>
              <CardDescription>{item.author} • {item.date}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm line-clamp-2">{item.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Badge variant="outline">{item.category}</Badge>
              <Button variant="outline" size="sm">Zobacz</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button variant="outline">Zobacz więcej ogłoszeń</Button>
      </div>
    </div>
  );
};

export default ClassifiedList;
