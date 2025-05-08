
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ShoppingBag, Users, Newspaper, Handshake } from 'lucide-react';
import AdminSearch from '@/components/admin/AdminSearch';
import ContentList from '@/components/dashboard/ContentList';
import GroupsAdminPanel from '@/components/groups/GroupsAdminPanel';
import MarketStats from '@/components/market/MarketStats';
import WeeklyGazette from '@/components/gazette/WeeklyGazette';
import HandmadeShowcase from '@/components/handmade/HandmadeShowcase';

const CmsManagerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('content');

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">System zarządzania treścią</h1>
        
        <AdminSearch 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          placeholder={
            activeTab === 'content' ? "Szukaj treści..." :
            activeTab === 'groups' ? "Szukaj grup..." :
            activeTab === 'market' ? "Szukaj ogłoszeń..." :
            activeTab === 'gazette' ? "Szukaj artykułów gazety..." :
            "Szukaj..."
          }
        />

        <Tabs 
          defaultValue="content" 
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-8">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText size={16} />
              <span>Treści</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users size={16} />
              <span>Grupy lokalne</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2">
              <ShoppingBag size={16} />
              <span>Rynek lokalny</span>
            </TabsTrigger>
            <TabsTrigger value="gazette" className="flex items-center gap-2">
              <Newspaper size={16} />
              <span>Gazeta</span>
            </TabsTrigger>
            <TabsTrigger value="handmade" className="flex items-center gap-2">
              <Handshake size={16} />
              <span>Rękodzieło</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <ContentList />
          </TabsContent>
          
          <TabsContent value="groups">
            <GroupsAdminPanel />
          </TabsContent>
          
          <TabsContent value="market">
            <MarketStats />
          </TabsContent>
          
          <TabsContent value="gazette">
            <WeeklyGazette />
          </TabsContent>
          
          <TabsContent value="handmade">
            <HandmadeShowcase />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CmsManagerPage;
