
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PhotoAccessibilityFilter from '@/components/gallery/PhotoAccessibilityFilter';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Filter, Grid, Heart } from "lucide-react";

const GaleriaPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  const mockImages = [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506792006437-256b665541e2?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1477414956199-7dafc86a4f1a?q=80&w=400&auto=format&fit=crop'
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Galeria Witnicy</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Odkryj piękno naszego miasta przez obiektywy mieszkańców. 
              Każde zdjęcie opowiada historię Witnicy.
            </p>
          </div>

          {showFilter && selectedImage ? (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Filtr dostępności</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilter(false)}
                >
                  Powrót do galerii
                </Button>
              </div>
              <PhotoAccessibilityFilter imageUrl={selectedImage} />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Grid className="h-4 w-4" />
                    Widok siatki
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Dodaj zdjęcie
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {mockImages.length} zdjęć
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockImages.map((image, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={image} 
                        alt={`Zdjęcie Witnicy ${index + 1}`}
                        className="w-full h-64 object-cover cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/80 backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(image);
                            setShowFilter(true);
                          }}
                        >
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Widok na Witnicę {index + 1}</h3>
                          <p className="text-sm text-muted-foreground">Dodane przez Jana K.</p>
                        </div>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>12</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Dostępność dla wszystkich
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Nasze zdjęcia można dostosować do różnych potrzeb wzrokowych. 
                    Kliknij na ikonę filtra przy dowolnym zdjęciu, aby zobaczyć je 
                    tak, jak widzą inne osoby, lub dostosować do swojego wzroku.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm bg-white px-2 py-1 rounded">👁️ Daltonizm</span>
                    <span className="text-sm bg-white px-2 py-1 rounded">🌞 Jasność</span>
                    <span className="text-sm bg-white px-2 py-1 rounded">🎨 Kontrast</span>
                    <span className="text-sm bg-white px-2 py-1 rounded">💙 Dla wszystkich</span>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GaleriaPage;
