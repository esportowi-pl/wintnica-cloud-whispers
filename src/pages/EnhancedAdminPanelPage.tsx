
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Settings, FileText, Bell, Heart, ShoppingCart, Newspaper, BarChart } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

// Import components
import PageHeader from '@/components/admin/PageHeader';
import GlobalSearch from '@/components/admin/GlobalSearch';
import AnalyticsOverview from '@/components/admin/AnalyticsOverview';
import StatusBadge from '@/components/admin/StatusBadge';
import UsersTab from '@/components/admin/UsersTab';
import ContentTab from '@/components/admin/ContentTab';
import CustomFieldsTab from '@/components/admin/CustomFieldsTab';
import NotificationSendForm from '@/components/admin/NotificationSendForm';
import NotificationStats from '@/components/admin/NotificationStats';
import NotificationsTab from '@/components/admin/NotificationsTab';
import SettingsTab from '@/components/admin/SettingsTab';
import VisitsStatsPanel from '@/components/admin/VisitsStatsPanel';
import DatingPanel from '@/components/admin/DatingPanel';
import MarketPanel from '@/components/admin/MarketPanel';
import GazettePanel from '@/components/admin/GazettePanel';

// Import mock data
import { mockUsers, mockContent, mockNotifications, initialCustomFields, mockAnalytics } from '@/components/admin/mockData';

const EnhancedAdminPanelPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MainLayout>
      <motion.div 
        className="container mx-auto py-8 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with breadcrumbs */}
        <PageHeader />
        
        {/* Analytics overview cards */}
        <AnalyticsOverview analytics={mockAnalytics} />
        
        {/* Global Search */}
        <GlobalSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <Tabs defaultValue="users" className="mt-8">
          <TabsList className="mb-8 bg-white shadow-lg border rounded-lg p-1">
            <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Users size={16} />
              <span>Użytkownicy</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <FileText size={16} />
              <span>Treści</span>
            </TabsTrigger>
            <TabsTrigger value="visits" className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <BarChart size={16} />
              <span>Statystyki odwiedzin</span>
            </TabsTrigger>
            <TabsTrigger value="dating" className="flex items-center gap-2 data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Heart size={16} />
              <span>Portal randkowy</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <ShoppingCart size={16} />
              <span>Rynek lokalny</span>
            </TabsTrigger>
            <TabsTrigger value="gazette" className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Newspaper size={16} />
              <span>Gazeta</span>
            </TabsTrigger>
            <TabsTrigger value="custom-fields" className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <FileText size={16} />
              <span>Pola niestandardowe</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white">
              <Bell size={16} />
              <span>Powiadomienia</span>
              <div className="ml-1 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs">
                {mockNotifications.filter(n => !n.read).length}
              </div>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-gray-500 data-[state=active]:text-white">
              <Settings size={16} />
              <span>Ustawienia</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <UsersTab 
              users={mockUsers} 
              getStatusBadge={(status: string) => <StatusBadge status={status} />}
            />
          </TabsContent>
          
          {/* Content Tab */}
          <TabsContent value="content">
            <ContentTab 
              content={mockContent} 
              getStatusBadge={(status: string) => <StatusBadge status={status} />} 
            />
          </TabsContent>
          
          {/* Visits Stats Tab */}
          <TabsContent value="visits">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <VisitsStatsPanel />
            </motion.div>
          </TabsContent>
          
          {/* Dating Tab */}
          <TabsContent value="dating">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <DatingPanel />
            </motion.div>
          </TabsContent>
          
          {/* Market Tab */}
          <TabsContent value="market">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MarketPanel />
            </motion.div>
          </TabsContent>
          
          {/* Gazette Tab */}
          <TabsContent value="gazette">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <GazettePanel />
            </motion.div>
          </TabsContent>
          
          {/* Custom Fields Tab */}
          <TabsContent value="custom-fields">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CustomFieldsTab initialCustomFields={initialCustomFields} />
            </motion.div>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="md:col-span-2">
                <NotificationsTab 
                  notifications={mockNotifications}
                  getStatusBadge={(status: string) => <StatusBadge status={status} />}
                />
              </div>
              
              <div className="md:col-span-1 space-y-6">
                <NotificationSendForm />
                <NotificationStats />
              </div>
            </motion.div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SettingsTab />
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
};

export default EnhancedAdminPanelPage;
