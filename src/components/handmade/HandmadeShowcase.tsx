
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Star } from 'lucide-react';
import { mockHandmadeItems } from '@/data/mockData';

interface HandmadeShowcaseProps {
  limit?: number;
}

const HandmadeShowcase: React.FC<HandmadeShowcaseProps> = ({ limit }) => {
  const displayedItems = limit ? mockHandmadeItems.slice(0, limit) : mockHandmadeItems;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h2 className="text-2xl font-bold">Rękodzieło tygodnia</h2>
          <p className="text-muted-foreground">Odkryj unikalne wyroby lokalnych twórców</p>
        </div>
        <Button variant="outline">Zobacz wszystkie</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <Badge variant="secondary" className="w-fit">{item.category}</Badge>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>przez {item.creator}</CardDescription>
            </CardHeader>
            <CardContent className="py-2">
              <p className="text-sm line-clamp-3">{item.description}</p>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Kontakt
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HandmadeShowcase;
