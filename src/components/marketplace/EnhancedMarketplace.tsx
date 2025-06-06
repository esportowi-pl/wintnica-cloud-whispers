import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Heart, MapPin, Eye, MessageCircle, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface MarketplaceProduct {
  id: string;
  seller_id: string;
  title: string;
  description?: string;
  price: number;
  category: string;
  condition: string;
  location?: string;
  images: string[];
  status: string;
  views_count: number;
  favorites_count: number;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

const EnhancedMarketplace: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'used',
    location: ''
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_categories')
        .select('*')
        .eq('active', true)
        .order('order_index');

      if (error) {
        console.error('Error loading categories:', error);
        // Fallback categories
        setCategories([
          { id: '1', name: 'Elektronika', icon: 'smartphone' },
          { id: '2', name: 'Dom i ogród', icon: 'home' },
          { id: '3', name: 'Moda', icon: 'shirt' },
          { id: '4', name: 'Motoryzacja', icon: 'car' },
          { id: '5', name: 'Sport i hobby', icon: 'dumbbell' },
          { id: '6', name: 'Dla dzieci', icon: 'baby' }
        ]);
      } else {
        setCategories(data || []);
      }
    } catch (error) {
      console.error('Error in loadCategories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_products')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading products:', error);
        // Fallback data
        setProducts([
          {
            id: '1',
            seller_id: 'mock1',
            title: 'iPhone 14 Pro Max 256GB',
            description: 'Sprzedam iPhone 14 Pro Max w idealnym stanie. Telefon był używany tylko przez 6 miesięcy, zawsze z etui i szkłem hartowanym.',
            price: 4200.00,
            category: 'Elektronika',
            condition: 'jak_nowy',
            location: 'Witnicy',
            images: ['/placeholder.svg'],
            status: 'active',
            views_count: 245,
            favorites_count: 12,
            created_at: '2024-01-08T10:00:00Z'
          },
          {
            id: '2',
            seller_id: 'mock2',
            title: 'Sofa 3-osobowa, beżowa',
            description: 'Wygodna sofa w bardzo dobrym stanie. Sprzedaję z powodu przeprowadzki. Możliwość obejrzenia na miejscu.',
            price: 800.00,
            category: 'Dom i ogród',
            condition: 'dobre',
            location: 'Witnicy',
            images: ['/placeholder.svg'],
            status: 'active',
            views_count: 89,
            favorites_count: 5,
            created_at: '2024-01-07T15:30:00Z'
          }
        ]);
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error('Error in loadProducts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async () => {
    if (!user) {
      toast.error("Musisz się zalogować, aby dodać ogłoszenie");
      return;
    }

    if (!newProduct.title || !newProduct.price || !newProduct.category) {
      toast.error("Wypełnij wszystkie wymagane pola");
      return;
    }

    try {
      const { error } = await supabase
        .from('marketplace_products')
        .insert({
          seller_id: user.id,
          title: newProduct.title,
          description: newProduct.description,
          price: parseFloat(newProduct.price),
          category: newProduct.category,
          condition: newProduct.condition,
          location: newProduct.location,
          images: ['/placeholder.svg'], // Placeholder image
          status: 'active'
        });

      if (error) {
        console.error('Error creating product:', error);
        toast.error("Błąd podczas dodawania ogłoszenia");
      } else {
        toast.success("Ogłoszenie zostało dodane!");
        setIsCreateDialogOpen(false);
        setNewProduct({
          title: '',
          description: '',
          price: '',
          category: '',
          condition: 'used',
          location: ''
        });
        loadProducts();
      }
    } catch (error) {
      console.error('Error in handleCreateProduct:', error);
      toast.error("Wystąpił nieoczekiwany błąd");
    }
  };

  const handleFavorite = async (productId: string) => {
    if (!user) {
      toast.error("Musisz się zalogować");
      return;
    }

    try {
      const { error } = await supabase
        .from('marketplace_favorites')
        .insert({
          user_id: user.id,
          product_id: productId
        });

      if (error) {
        console.error('Error adding to favorites:', error);
      } else {
        toast.success("Dodano do ulubionych!");
      }
    } catch (error) {
      console.error('Error in handleFavorite:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && product.price < 100) ||
                        (priceRange === 'medium' && product.price >= 100 && product.price <= 1000) ||
                        (priceRange === 'high' && product.price > 1000);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case 'nowy': return 'Nowy';
      case 'jak_nowy': return 'Jak nowy';
      case 'dobre': return 'Dobre';
      case 'zadowalajace': return 'Zadowalające';
      case 'used': return 'Używane';
      default: return condition;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Rynek lokalny Witnicy
          </h1>
          <p className="text-muted-foreground">Kupuj, sprzedawaj i wymieniaj w swojej okolicy</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-gradient-to-r from-blue-500 to-purple-500">
          <Plus className="mr-2 h-4 w-4" />
          Dodaj ogłoszenie
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Szukaj produktów..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie kategorie</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Zakres cen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie ceny</SelectItem>
                <SelectItem value="low">Do 100 zł</SelectItem>
                <SelectItem value="medium">100 - 1000 zł</SelectItem>
                <SelectItem value="high">Powyżej 1000 zł</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Więcej filtrów
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className="relative">
                <img
                  src={product.images[0] || '/placeholder.svg'}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleFavorite(product.id)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Badge className="absolute top-2 left-2 bg-blue-500">
                  {product.category}
                </Badge>
              </div>

              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {product.price.toLocaleString('pl-PL')} zł
                  </p>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {getConditionLabel(product.condition)}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {product.location}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {product.views_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {product.favorites_count}
                    </span>
                  </div>
                  <Button size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Kontakt
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <Card className="p-12 text-center">
          <h3 className="text-xl font-semibold mb-2">Brak ogłoszeń</h3>
          <p className="text-muted-foreground">
            Nie znaleziono ogłoszeń spełniających kryteria wyszukiwania.
          </p>
        </Card>
      )}

      {/* Create Product Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Dodaj nowe ogłoszenie</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tytuł *</Label>
              <Input
                id="title"
                placeholder="Tytuł ogłoszenia"
                value={newProduct.title}
                onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Opis</Label>
              <Textarea
                id="description"
                placeholder="Opisz swój przedmiot..."
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Cena (zł) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategoria *</Label>
                <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="condition">Stan</Label>
                <Select value={newProduct.condition} onValueChange={(value) => setNewProduct({...newProduct, condition: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nowy">Nowy</SelectItem>
                    <SelectItem value="jak_nowy">Jak nowy</SelectItem>
                    <SelectItem value="dobre">Dobre</SelectItem>
                    <SelectItem value="zadowalajace">Zadowalające</SelectItem>
                    <SelectItem value="used">Używane</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Lokalizacja</Label>
                <Input
                  id="location"
                  placeholder="Miasto"
                  value={newProduct.location}
                  onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                Anuluj
              </Button>
              <Button onClick={handleCreateProduct} className="flex-1">
                Dodaj ogłoszenie
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedMarketplace;
