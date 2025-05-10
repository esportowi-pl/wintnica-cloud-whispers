
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import AdminSearch from '@/components/admin/AdminSearch';
import CmsNavigationTree from '@/components/admin/cms/CmsNavigationTree';
import ContentList from '@/components/dashboard/ContentList';
import GroupsAdminPanel from '@/components/groups/GroupsAdminPanel';
import MarketStats from '@/components/market/MarketStats';
import WeeklyGazette from '@/components/gazette/WeeklyGazette';
import HandmadeShowcase from '@/components/handmade/HandmadeShowcase';
import SettingsTab from '@/components/admin/SettingsTab';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';

const CmsManagerPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Extract active section from URL path
  const getActiveSection = () => {
    const path = location.pathname;
    if (path.includes('/cms/groups')) return 'groups';
    if (path.includes('/cms/market')) return 'market';
    if (path.includes('/cms/gazette')) return 'gazette';
    if (path.includes('/cms/handmade')) return 'handmade';
    if (path.includes('/cms/settings')) return 'settings';
    return 'content'; // Default section
  };
  
  const activeSection = getActiveSection();
  
  // Get more specific node ID based on full path
  const getActiveNodeId = () => {
    const path = location.pathname;
    if (path === '/cms/content/articles') return 'content-articles';
    if (path === '/cms/content/pages') return 'content-pages';
    if (path === '/cms/content/media') return 'content-media';
    if (path === '/cms/groups/list') return 'groups-list';
    if (path === '/cms/groups/requests') return 'groups-requests';
    if (path === '/cms/market/listings') return 'market-listings';
    if (path === '/cms/market/categories') return 'market-categories';
    if (path === '/cms/gazette/issues') return 'gazette-issues';
    if (path === '/cms/gazette/subscriptions') return 'gazette-subscriptions';
    if (path === '/cms/handmade/products') return 'handmade-products';
    if (path === '/cms/handmade/creators') return 'handmade-creators';
    if (path === '/cms/settings') return 'settings';
    // Default to parent sections if no specific subpath
    if (path === '/cms/content' || path === '/cms') return 'content';
    if (path === '/cms/groups') return 'groups';
    if (path === '/cms/market') return 'market';
    if (path === '/cms/gazette') return 'gazette';
    if (path === '/cms/handmade') return 'handmade';
    return '';
  };

  // Render content based on active section
  const renderContent = () => {
    const path = location.pathname;
    
    // Content section
    if (path === '/cms' || path === '/cms/content' || path === '/cms/content/articles') {
      return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Artykuły</CardTitle>
            <Button onClick={() => navigate('/editor')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Dodaj nowy
            </Button>
          </CardHeader>
          <CardContent>
            <ContentList />
          </CardContent>
        </Card>
      );
    }
    
    if (path === '/cms/content/pages') {
      return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Strony</CardTitle>
            <Button onClick={() => navigate('/editor?type=page')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Dodaj nową
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Lista stron serwisu.</p>
            <ContentList />
          </CardContent>
        </Card>
      );
    }
    
    if (path === '/cms/content/media') {
      return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Biblioteka mediów</CardTitle>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Dodaj pliki
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Zarządzaj zdjęciami i plikami.</p>
          </CardContent>
        </Card>
      );
    }
    
    // Groups section
    if (path.includes('/cms/groups')) {
      return <GroupsAdminPanel />;
    }
    
    // Market section
    if (path.includes('/cms/market')) {
      return <MarketStats />;
    }
    
    // Gazette section
    if (path.includes('/cms/gazette')) {
      return <WeeklyGazette />;
    }
    
    // Handmade section
    if (path.includes('/cms/handmade')) {
      return <HandmadeShowcase />;
    }
    
    // Settings section
    if (path === '/cms/settings') {
      return <SettingsTab />;
    }
    
    // Default content
    return (
      <div className="text-center py-12">
        <p className="text-xl text-muted-foreground">Wybierz sekcję z menu nawigacyjnego</p>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">System zarządzania treścią</h1>
        
        <AdminSearch 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          placeholder={
            activeSection === 'content' ? "Szukaj treści..." :
            activeSection === 'groups' ? "Szukaj grup..." :
            activeSection === 'market' ? "Szukaj ogłoszeń..." :
            activeSection === 'gazette' ? "Szukaj artykułów gazety..." :
            "Szukaj..."
          }
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-1">
            <CmsNavigationTree activeNodeId={getActiveNodeId()} />
          </div>
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CmsManagerPage;
