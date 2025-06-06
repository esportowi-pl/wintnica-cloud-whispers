
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Eye, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ClassifiedItem {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  location: string;
  postedAt: string;
  views: number;
  favorites: number;
}

export default function RecentClassifieds() {
  const [classifieds, setClassifieds] = useState<ClassifiedItem[]>([]);

  useEffect(() => {
    // Symulacja danych - w rzeczywistości pobierałbyś z Supabase
    const mockClassifieds: ClassifiedItem[] = [
      {
        id: '1',
        title: 'Sprzedam rower górski Trek',
        price: 1200,
        category: 'Sport',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop',
        location: 'Witnica Centrum',
        postedAt: '2 godz. temu',
        views: 45,
        favorites: 8
      },
      {
        id: '2',
        title: 'Mieszkanie 2-pokojowe do wynajęcia',
        price: 1800,
        category: 'Nieruchomości',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&h=150&fit=crop',
        location: 'Witnica Północ',
        postedAt: '5 godz. temu',
        views: 123,
        favorites: 15
      },
      {
        id: '3',
        title: 'Laptop Dell Inspiron',
        price: 2500,
        category: 'Elektronika',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop',
        location: 'Witnica Centrum',
        postedAt: '1 dzień temu',
        views: 67,
        favorites: 12
      },
      {
        id: '4',
        title: 'Szukam korepetytora z matematyki',
        price: 50,
        category: 'Usługi',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=150&h=150&fit=crop',
        location: 'Witnica',
        postedAt: '2 dni temu',
        views: 29,
        favorites: 5
      }
    ];

    setClassifieds(mockClassifieds);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="h-5 w-5" />
            Najnowsze ogłoszenia
          </CardTitle>
          <Link to="/classifieds">
            <Button variant="ghost" size="sm">
              Zobacz wszystkie
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {classifieds.map((item) => (
            <div key={item.id} className="flex gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-green-600">{item.price} zł</span>
                  <Badge variant="outline" className="text-xs">{item.category}</Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>{item.location}</span>
                  <span>{item.postedAt}</span>
                  <div className="flex items-center gap-2">
                    <Eye className="h-3 w-3" />
                    {item.views}
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-3 w-3" />
                    {item.favorites}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/classifieds">
            <Button className="w-full">
              Dodaj ogłoszenie
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
