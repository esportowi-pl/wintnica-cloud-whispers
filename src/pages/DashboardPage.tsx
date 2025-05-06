
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, BarChart2, CreditCard, Settings, List } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import UserStatsCard from '@/components/dashboard/UserStatsCard';
import ContentList from '@/components/dashboard/ContentList';
import ShardHistory from '@/components/dashboard/ShardHistory';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState("overview");
  
  const mockUserStats = {
    shards: 238,
    subscribers: 47,
    articleViews: 1289,
    comments: 32
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Zarządzaj treściami i śledź swoje wyniki</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/dashboard/new-content')}>
              <PlusCircle className="mr-2 h-4 w-4" /> Nowa treść
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard/settings')}>
              <Settings className="mr-2 h-4 w-4" /> Ustawienia
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={tabValue} onValueChange={setTabValue} className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-4 lg:w-[600px] mb-8">
            <TabsTrigger value="overview">Przegląd</TabsTrigger>
            <TabsTrigger value="content">Treści</TabsTrigger>
            <TabsTrigger value="earnings">Zarobki</TabsTrigger>
            <TabsTrigger value="analytics">Analityka</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <UserStatsCard 
                title="Shardy" 
                value={mockUserStats.shards} 
                icon={<CreditCard className="h-8 w-8" />} 
                description="Łączna liczba shardów"
                trend={+12}
              />
              <UserStatsCard 
                title="Subskrybenci" 
                value={mockUserStats.subscribers} 
                icon={<List className="h-8 w-8" />} 
                description="Czytelnicy Twoich treści"
                trend={+5}
              />
              <UserStatsCard 
                title="Wyświetlenia" 
                value={mockUserStats.articleViews} 
                icon={<BarChart2 className="h-8 w-8" />} 
                description="Łączne wyświetlenia artykułów"
                trend={+124}
              />
              <UserStatsCard 
                title="Komentarze" 
                value={mockUserStats.comments} 
                icon={<Edit className="h-8 w-8" />} 
                description="Pod Twoimi artykułami"
                trend={+8}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Ostatnie treści</CardTitle>
                  <CardDescription>
                    Zarządzaj swoimi publikacjami
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContentList limit={5} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Historia shardów</CardTitle>
                  <CardDescription>
                    Ostatnie transakcje i zarobki
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ShardHistory limit={5} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Wszystkie treści</CardTitle>
                <CardDescription>
                  Zarządzaj wszystkimi swoimi publikacjami
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContentList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Zarobki i transakcje</CardTitle>
                <CardDescription>
                  Śledź swoje zarobki i wymień shardy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ShardHistory />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analityka treści</CardTitle>
                <CardDescription>
                  Szczegółowe statystyki dotyczące Twoich publikacji
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Moduł analityki będzie dostępny wkrótce...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
