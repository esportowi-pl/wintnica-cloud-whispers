
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import SkyHeader from '@/components/layout/SkyHeader';
import ClassifiedList from '@/components/classifieds/ClassifiedList';
import AdsSlider from '@/components/classifieds/AdsSlider';
import Footer from '@/components/layout/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ClassifiedsPage = () => {
  const [category, setCategory] = useState<string>('all');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SkyHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Ogłoszenia lokalne</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Filtruj ogłoszenia</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Szukaj w ogłoszeniach..." />
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie kategorie</SelectItem>
                <SelectItem value="nieruchomosci">Nieruchomości</SelectItem>
                <SelectItem value="praca">Praca</SelectItem>
                <SelectItem value="uslugi">Usługi</SelectItem>
                <SelectItem value="motoryzacja">Motoryzacja</SelectItem>
                <SelectItem value="dom">Dom i Ogród</SelectItem>
                <SelectItem value="elektronika">Elektronika</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="w-full">Szukaj</Button>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline">Dodaj ogłoszenie</Button>
          </div>
        </div>
        
        <div className="mb-10">
          <AdsSlider />
        </div>
        
        <ClassifiedList />
      </main>
      
      <Footer />
    </div>
  );
};

export default ClassifiedsPage;
