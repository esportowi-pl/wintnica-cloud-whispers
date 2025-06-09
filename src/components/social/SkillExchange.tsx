
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Star, Clock, MapPin, User } from "lucide-react";

interface SkillOffer {
  id: string;
  title: string;
  description: string;
  category: string;
  provider: string;
  location: string;
  timeEstimate: string;
  rating: number;
  price: 'free' | 'barter' | 'paid';
  tags: string[];
}

interface SkillRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  requester: string;
  deadline: string;
  budget: string;
  tags: string[];
}

const SkillExchange = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mockOffers: SkillOffer[] = [
    {
      id: '1',
      title: 'Naprawa rowerów',
      description: 'Naprawiam rowery, wymieniam opony, reguluję hamulce. 15 lat doświadczenia.',
      category: 'Mechanika',
      provider: 'Marek S.',
      location: 'Centrum Witnicy',
      timeEstimate: '1-2 godziny',
      rating: 4.8,
      price: 'paid',
      tags: ['rowery', 'naprawa', 'mechanika']
    },
    {
      id: '2',
      title: 'Korepetycje z matematyki',
      description: 'Pomoc w nauce matematyki dla uczniów szkół podstawowych i średnich.',
      category: 'Edukacja',
      provider: 'Anna K.',
      location: 'Os. Młodych',
      timeEstimate: '60 minut',
      rating: 5.0,
      price: 'barter',
      tags: ['matematyka', 'korepetycje', 'edukacja']
    },
    {
      id: '3',
      title: 'Opieka nad ogrodem',
      description: 'Podlewanie, pielenie, koszenie trawy podczas Twojej nieobecności.',
      category: 'Ogrodnictwo',
      provider: 'Tomasz W.',
      location: 'Stare Miasto',
      timeEstimate: 'Według potrzeb',
      rating: 4.6,
      price: 'free',
      tags: ['ogród', 'opieka', 'podlewanie']
    }
  ];

  const mockRequests: SkillRequest[] = [
    {
      id: '1',
      title: 'Pomoc w przeprowadzce',
      description: 'Potrzebuję 2-3 osób do pomocy w przeprowadzce w sobotę.',
      category: 'Fizyczna',
      requester: 'Katarzyna M.',
      deadline: '2024-01-20',
      budget: 'Poczęstunek + drobna zapłata',
      tags: ['przeprowadzka', 'pomoc', 'sobota']
    },
    {
      id: '2',
      title: 'Tłumaczenie dokumentów',
      description: 'Potrzebuję przetłumaczyć dokumenty z niemieckiego na polski.',
      category: 'Języki',
      requester: 'Paweł D.',
      deadline: '2024-01-15',
      budget: 'Do uzgodnienia',
      tags: ['tłumaczenie', 'niemiecki', 'dokumenty']
    }
  ];

  const categories = [
    'all', 'Mechanika', 'Edukacja', 'Ogrodnictwo', 'Języki', 'IT', 'Kulinaria', 'Rękodzieło', 'Fizyczna'
  ];

  const filteredOffers = mockOffers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriceDisplay = (price: string) => {
    switch (price) {
      case 'free': return <Badge variant="secondary" className="bg-green-100 text-green-700">Bezpłatnie</Badge>;
      case 'barter': return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Wymiana</Badge>;
      case 'paid': return <Badge variant="secondary" className="bg-orange-100 text-orange-700">Płatne</Badge>;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Giełda Umiejętności Witnicy</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Platforma wymiany wiedzy i usług między mieszkańcami. Oferuj swoje umiejętności 
          lub znajdź kogoś, kto pomoże Ci w realizacji projektów.
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Szukaj umiejętności..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-input rounded-md bg-background"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'Wszystkie kategorie' : category}
            </option>
          ))}
        </select>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Dodaj ofertę
        </Button>
      </div>

      <Tabs defaultValue="offers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="offers">Oferuję umiejętności ({mockOffers.length})</TabsTrigger>
          <TabsTrigger value="requests">Szukam pomocy ({mockRequests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="offers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOffers.map((offer) => (
              <Card key={offer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{offer.title}</CardTitle>
                      <Badge variant="outline" className="mt-1">{offer.category}</Badge>
                    </div>
                    {getPriceDisplay(offer.price)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{offer.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{offer.provider}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{offer.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{offer.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{offer.timeEstimate}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {offer.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full mt-4">Skontaktuj się</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{request.title}</CardTitle>
                      <Badge variant="outline" className="mt-1">{request.category}</Badge>
                    </div>
                    <Badge variant="secondary" className="bg-red-100 text-red-700">
                      Do: {new Date(request.deadline).toLocaleDateString('pl-PL')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{request.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{request.requester}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Budżet:</span>
                      <span>{request.budget}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {request.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full mt-4">Zaproponuj pomoc</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillExchange;
