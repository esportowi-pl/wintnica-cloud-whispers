
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Heart } from "lucide-react";
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  description: string;
  price?: string;
  category: string;
  type: 'sprzedam' | 'kupie' | 'zamienie' | 'oddam';
  location: string;
  author: string;
  authorInitials: string;
  date: string;
  image?: string;
}

interface ProductListProps {
  viewMode: 'grid' | 'list';
  searchQuery: string;
  category: string;
  listingType: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Rower górski Trek",
    description: "Sprzedam rower górski marki Trek, model XYZ, używany przez 2 lata. Stan bardzo dobry, wszystko działa jak należy.",
    price: "800 zł",
    category: "sport",
    type: "sprzedam",
    location: "Witnica, ul. Sportowa",
    author: "Jan Kowalski",
    authorInitials: "JK",
    date: "2023-05-02",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Oddam za darmo meble ogrodowe",
    description: "Oddam za darmo zestaw mebli ogrodowych (stół + 4 krzesła). Do odbioru osobistego w Witnicy.",
    category: "dom",
    type: "oddam",
    location: "Witnica, os. Słoneczne",
    author: "Anna Nowak",
    authorInitials: "AN",
    date: "2023-05-03",
    image: "https://images.unsplash.com/photo-1533127321739-d5dc53c221c8?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Zamienię konsolę Xbox na PlayStation",
    description: "Mam konsolę Xbox One, stan idealny. Chętnie zamienię na PlayStation 4 lub 5 z ewentualną dopłatą.",
    category: "elektronika",
    type: "zamienie",
    location: "Witnica, ul. Gorzowska",
    author: "Piotr Wiśniewski",
    authorInitials: "PW",
    date: "2023-05-04"
  },
  {
    id: 4,
    title: "Kurtka zimowa, rozmiar L",
    description: "Sprzedam kurtkę zimową, kolor czarny, rozmiar L, firmy XYZ. Noszona przez jeden sezon.",
    price: "150 zł",
    category: "moda",
    type: "sprzedam",
    location: "Witnica, ul. Kwiatowa",
    author: "Katarzyna Zielińska",
    authorInitials: "KZ",
    date: "2023-05-05",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Kupię tanio kosiarkę elektryczną",
    description: "Kupię używaną kosiarkę elektryczną w dobrym stanie, najlepiej z koszem na trawę.",
    category: "dom",
    type: "kupie",
    location: "Witnica",
    author: "Marek Adamski",
    authorInitials: "MA",
    date: "2023-05-06"
  },
  {
    id: 6,
    title: "Oddam kocięta do dobrego domu",
    description: "Oddam trzy małe kocięta (2 miesięczne) do dobrego domu. Kocięta są odrobaczone i zdrowe.",
    category: "zwierzeta",
    type: "oddam",
    location: "Witnica, ul. Polna",
    author: "Magdalena K.",
    authorInitials: "MK",
    date: "2023-05-07",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=300&auto=format&fit=crop"
  }
];

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'sprzedam': return 'Sprzedam';
    case 'kupie': return 'Kupię';
    case 'zamienie': return 'Zamienię';
    case 'oddam': return 'Oddam';
    default: return type;
  }
};

const getTypeBadgeVariant = (type: string) => {
  switch (type) {
    case 'sprzedam': return 'default';
    case 'kupie': return 'secondary';
    case 'zamienie': return 'outline';
    case 'oddam': return 'destructive';
    default: return 'default';
  }
};

const ProductList: React.FC<ProductListProps> = ({ viewMode, searchQuery, category, listingType }) => {
  // Filter products based on search query, category and listing type
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = category === 'all' || product.category === category;
    const matchesType = listingType === 'all' || product.type === listingType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Nie znaleziono ogłoszeń pasujących do kryteriów.</p>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden flex flex-col h-full">
            {product.image && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                <Badge variant={getTypeBadgeVariant(product.type)}>
                  {getTypeLabel(product.type)}
                </Badge>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-muted-foreground">{product.location}</div>
                {product.price && (
                  <div className="font-bold text-primary">{product.price}</div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <p className="text-sm line-clamp-3">{product.description}</p>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{product.authorInitials}</AvatarFallback>
                </Avatar>
                <span className="text-xs">{product.date}</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  } else {
    return (
      <div className="space-y-4">
        {filteredProducts.map(product => (
          <Card key={product.id}>
            <div className="flex flex-col sm:flex-row">
              {product.image && (
                <div className="sm:w-1/4 max-w-[200px]">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-48 sm:h-full object-cover"
                  />
                </div>
              )}
              <div className={`flex-1 flex flex-col ${product.image ? 'sm:w-3/4' : 'w-full'}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{product.title}</CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">{product.location}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant={getTypeBadgeVariant(product.type)}>
                        {getTypeLabel(product.type)}
                      </Badge>
                      {product.price && (
                        <div className="font-bold text-primary mt-2">{product.price}</div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="py-2 flex-grow">
                  <p className="text-sm">{product.description}</p>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{product.authorInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">
                      {product.author}, <span className="text-xs text-muted-foreground">{product.date}</span>
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Zapisz
                    </Button>
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Kontakt
                    </Button>
                  </div>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
};

export default ProductList;
