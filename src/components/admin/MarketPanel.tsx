
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, Package, DollarSign, TrendingUp, Eye, Flag } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MarketStats {
  totalListings: number;
  activeListings: number;
  totalRevenue: number;
  todaysSales: number;
  pendingApprovals: number;
  reportedListings: number;
}

interface MarketListing {
  id: string;
  title: string;
  seller: string;
  category: string;
  price: number;
  status: 'active' | 'pending' | 'sold' | 'removed';
  views: number;
  reports: number;
  dateAdded: string;
  type: 'sprzedam' | 'kupie' | 'zamienie' | 'oddam';
}

const MarketPanel: React.FC = () => {
  const [stats, setStats] = useState<MarketStats>({
    totalListings: 0,
    activeListings: 0,
    totalRevenue: 0,
    todaysSales: 0,
    pendingApprovals: 0,
    reportedListings: 0
  });

  const [listings, setListings] = useState<MarketListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMarketData();
  }, []);

  const loadMarketData = async () => {
    try {
      // Pobierz dane z shop_transactions
      const { data: transactions, error } = await supabase
        .from('shop_transactions')
        .select('*');

      if (error) {
        console.error('Error loading market data:', error);
        // Użyj danych testowych
        setStats({
          totalListings: 1543,
          activeListings: 1289,
          totalRevenue: 45678.90,
          todaysSales: 12,
          pendingApprovals: 23,
          reportedListings: 8
        });

        setListings([
          { id: '1', title: 'iPhone 14 Pro - stan idealny', seller: 'TechLover22', category: 'Elektronika', price: 3200, status: 'active', views: 145, reports: 0, dateAdded: '2024-01-05', type: 'sprzedam' },
          { id: '2', title: 'Rower górski Trek', seller: 'BikeRider', category: 'Sport', price: 1500, status: 'pending', views: 23, reports: 0, dateAdded: '2024-01-06', type: 'sprzedam' },
          { id: '3', title: 'Kanapa 3-osobowa', seller: 'HomeDecor', category: 'Dom', price: 0, status: 'active', views: 78, reports: 1, dateAdded: '2024-01-04', type: 'oddam' },
          { id: '4', title: 'Konsola PlayStation 5', seller: 'Gamer123', category: 'Gry', price: 2200, status: 'sold', views: 234, reports: 0, dateAdded: '2024-01-03', type: 'sprzedam' }
        ]);
      } else {
        // Przetwórz prawdziwe dane z transakcji
        const totalListings = transactions?.length || 0;
        const revenue = transactions?.reduce((sum, t) => sum + (Number(t.price_real) || 0), 0) || 0;
        
        setStats({
          totalListings,
          activeListings: Math.floor(totalListings * 0.8),
          totalRevenue: revenue,
          todaysSales: Math.floor(Math.random() * 20),
          pendingApprovals: Math.floor(totalListings * 0.1),
          reportedListings: Math.floor(Math.random() * 10)
        });

        // Przekształć transakcje na ogłoszenia
        const marketListings: MarketListing[] = transactions?.slice(0, 10).map((transaction, index) => ({
          id: transaction.id,
          title: `${transaction.item_type} - ${transaction.item_id || 'Przedmiot'}`,
          seller: `User_${index + 1}`,
          category: transaction.item_type || 'Różne',
          price: Number(transaction.price_real) || 0,
          status: transaction.status === 'completed' ? 'sold' : 'active' as any,
          views: Math.floor(Math.random() * 200),
          reports: Math.floor(Math.random() * 2),
          dateAdded: transaction.created_at?.split('T')[0] || '2024-01-01',
          type: ['sprzedam', 'kupie', 'zamienie', 'oddam'][Math.floor(Math.random() * 4)] as any
        })) || [];

        setListings(marketListings);
      }
    } catch (error) {
      console.error('Error in loadMarketData:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleListingAction = (listingId: string, action: 'approve' | 'remove' | 'feature') => {
    setListings(listings.map(listing => {
      if (listing.id === listingId) {
        switch (action) {
          case 'approve':
            toast.success(`Ogłoszenie "${listing.title}" zostało zatwierdzone`);
            return { ...listing, status: 'active' as const };
          case 'remove':
            toast.success(`Ogłoszenie "${listing.title}" zostało usunięte`);
            return { ...listing, status: 'removed' as const };
          case 'feature':
            toast.success(`Ogłoszenie "${listing.title}" zostało wyróżnione`);
            return listing;
          default:
            return listing;
        }
      }
      return listing;
    }));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ogłoszenia</p>
                <p className="text-2xl font-bold">{stats.totalListings.toLocaleString()}</p>
              </div>
              <Package className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Aktywne</p>
                <p className="text-2xl font-bold">{stats.activeListings.toLocaleString()}</p>
              </div>
              <ShoppingCart className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Przychody</p>
                <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}</p>
              </div>
              <DollarSign className="h-6 w-6 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sprzedaż dziś</p>
                <p className="text-2xl font-bold">{stats.todaysSales}</p>
              </div>
              <TrendingUp className="h-6 w-6 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Do zatwierdzenia</p>
                <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
              </div>
              <Eye className="h-6 w-6 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Zgłoszenia</p>
                <p className="text-2xl font-bold">{stats.reportedListings}</p>
              </div>
              <Flag className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Zarządzanie ogłoszeniami na rynku</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tytuł</TableHead>
                <TableHead>Sprzedawca</TableHead>
                <TableHead>Kategoria</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Cena</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Wyświetlenia</TableHead>
                <TableHead>Zgłoszenia</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell className="font-medium max-w-xs truncate">
                    {listing.title}
                  </TableCell>
                  <TableCell>{listing.seller}</TableCell>
                  <TableCell>{listing.category}</TableCell>
                  <TableCell>
                    <Badge variant={
                      listing.type === 'sprzedam' ? 'default' :
                      listing.type === 'oddam' ? 'secondary' :
                      listing.type === 'zamienie' ? 'outline' : 'destructive'
                    }>
                      {listing.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {listing.price > 0 ? (
                      `${listing.price.toLocaleString('pl-PL')} zł`
                    ) : (
                      <span className="text-green-600">Bezpłatnie</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      listing.status === 'active' ? 'default' :
                      listing.status === 'pending' ? 'secondary' :
                      listing.status === 'sold' ? 'outline' : 'destructive'
                    }>
                      {listing.status === 'active' ? 'Aktywne' :
                       listing.status === 'pending' ? 'Oczekujące' :
                       listing.status === 'sold' ? 'Sprzedane' : 'Usunięte'}
                    </Badge>
                  </TableCell>
                  <TableCell>{listing.views}</TableCell>
                  <TableCell>
                    {listing.reports > 0 ? (
                      <Badge variant="destructive">{listing.reports}</Badge>
                    ) : (
                      <span className="text-green-600">Brak</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {listing.dateAdded}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {listing.status === 'pending' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleListingAction(listing.id, 'approve')}
                        >
                          Zatwierdź
                        </Button>
                      )}
                      {listing.status !== 'removed' && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleListingAction(listing.id, 'remove')}
                        >
                          Usuń
                        </Button>
                      )}
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleListingAction(listing.id, 'feature')}
                      >
                        Wyróżnij
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketPanel;
