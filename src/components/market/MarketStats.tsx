
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, Eye, Heart, MessageSquare, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { mockProducts } from '@/data/mockData';

interface MarketStatsProps {
  userId?: number;  // To filter by specific user if provided
}

const MarketStats: React.FC<MarketStatsProps> = ({ userId }) => {
  // Filter products by user if userId is provided
  const userProducts = userId 
    ? mockProducts.filter(product => product.authorId === userId)
    : mockProducts;
  
  // Calculate statistics
  const totalViews = userProducts.reduce((sum, product) => sum + product.views, 0);
  const totalLikes = userProducts.reduce((sum, product) => sum + (product.likes || 0), 0);
  const totalMessages = userProducts.reduce((sum, product) => sum + (product.messages || 0), 0);
  
  // Get most viewed product
  const mostViewedProduct = [...userProducts].sort((a, b) => b.views - a.views)[0];
  
  // Count by type
  const typeCount = userProducts.reduce((acc, product) => {
    acc[product.type] = (acc[product.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Statystyki ogłoszeń</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Łączne wyświetlenia</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
            <p className="text-xs text-muted-foreground">
              {userProducts.length > 0 
                ? `Średnio ${Math.round(totalViews / userProducts.length)} na ogłoszenie`
                : 'Brak danych'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Otrzymane polubienia</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLikes}</div>
            <p className="text-xs text-muted-foreground">
              {userProducts.length > 0 && totalLikes > 0
                ? `Współczynnik polubień: ${Math.round((totalLikes / userProducts.length) * 100) / 100}`
                : 'Brak polubień'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wiadomości</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              {totalMessages > 0 
                ? `${Math.round((totalMessages / userProducts.length) * 100) / 100} na ogłoszenie`
                : 'Brak wiadomości'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktywne ogłoszenia</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              {Object.entries(typeCount).map(([type, count]) => (
                <span key={type} className="mr-2">{type}: {count}</span>
              ))}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {userProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Najpopularniejsze ogłoszenie</CardTitle>
              <CardDescription>
                Ogłoszenie z największą liczbą wyświetleń
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {mostViewedProduct && (
                <>
                  <div className="font-medium">{mostViewedProduct.title}</div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{mostViewedProduct.views} wyświetleń</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>Data dodania: {mostViewedProduct.date}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Trendy oglądalności</CardTitle>
              <CardDescription>
                Oglądalność Twoich ogłoszeń
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart className="h-8 w-8 mx-auto mb-2" />
                <p>Wykresy trendu oglądalności będą dostępne wkrótce</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MarketStats;
