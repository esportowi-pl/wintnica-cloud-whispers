
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Tag } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductList from '@/components/marketplace/ProductList';
import CreateListingDialog from '@/components/marketplace/CreateListingDialog';

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [listingType, setListingType] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Rynek lokalny</h1>
            <p className="text-muted-foreground mt-2">
              Przeglądaj, sprzedawaj, kupuj lub wymieniaj towary lokalnie w Witnicy
            </p>
          </div>
          
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj ogłoszenie
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Szukaj na rynku..." 
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie kategorie</SelectItem>
                  <SelectItem value="elektronika">Elektronika</SelectItem>
                  <SelectItem value="dom">Dom i ogród</SelectItem>
                  <SelectItem value="moda">Ubrania</SelectItem>
                  <SelectItem value="sport">Sport i hobby</SelectItem>
                  <SelectItem value="dla_dzieci">Dla dzieci</SelectItem>
                  <SelectItem value="motoryzacja">Motoryzacja</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={listingType} onValueChange={setListingType}>
                <SelectTrigger>
                  <SelectValue placeholder="Rodzaj ogłoszenia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  <SelectItem value="sprzedam">Sprzedam</SelectItem>
                  <SelectItem value="oddam">Oddam</SelectItem>
                  <SelectItem value="zamienie">Zamienię</SelectItem>
                  <SelectItem value="kupie">Kupię</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="grid">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Tag size={18} />
              <span className="font-semibold">
                Znaleziono 42 ogłoszenia
              </span>
            </div>
            <TabsList>
              <TabsTrigger value="grid">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid"><rect width="7" height="7" x="3" y="3"/><rect width="7" height="7" x="14" y="3"/><rect width="7" height="7" x="14" y="14"/><rect width="7" height="7" x="3" y="14"/></svg>
              </TabsTrigger>
              <TabsTrigger value="list">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="grid">
            <ProductList 
              viewMode="grid" 
              searchQuery={searchQuery} 
              category={category} 
              listingType={listingType}
            />
          </TabsContent>
          
          <TabsContent value="list">
            <ProductList 
              viewMode="list" 
              searchQuery={searchQuery} 
              category={category} 
              listingType={listingType}
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <CreateListingDialog 
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
      
      <Footer />
    </div>
  );
};

export default MarketplacePage;
