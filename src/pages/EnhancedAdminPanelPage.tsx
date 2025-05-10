
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Settings, FileText, Bell } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

// Import mock data
import { mockUsers, mockContent, mockNotifications, initialCustomFields, mockAnalytics } from '@/components/admin/mockData';

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

const EnhancedAdminPanelPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        {/* Header with breadcrumbs */}
        <PageHeader />
        
        {/* Analytics overview cards */}
        <AnalyticsOverview analytics={mockAnalytics} />
        
        {/* Global Search */}
        <GlobalSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <Tabs defaultValue="users">
          <TabsList className="mb-8">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users size={16} />
              <span>Użytkownicy</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText size={16} />
              <span>Treści</span>
            </TabsTrigger>
            <TabsTrigger value="custom-fields" className="flex items-center gap-2">
              <FileText size={16} />
              <span>Pola niestandardowe</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} />
              <span>Powiadomienia</span>
              <div className="ml-1 bg-primary px-1.5 py-0.5 rounded-full text-xs text-white">
                {mockNotifications.filter(n => !n.read).length}
              </div>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              <span>Ustawienia</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <UsersTab 
              users={mockUsers} 
              getStatusBadge={StatusBadge}
            />
          </TabsContent>
          
          {/* Content Tab */}
          <TabsContent value="content">
            <ContentTab 
              content={mockContent} 
              getStatusBadge={StatusBadge} 
            />
          </TabsContent>
          
          {/* Custom Fields Tab */}
          <TabsContent value="custom-fields">
            <CustomFieldsTab initialCustomFields={initialCustomFields} />
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <NotificationsTab 
                  notifications={mockNotifications}
                  getStatusBadge={StatusBadge}
                />
              </div>
              
              <div className="md:col-span-1 space-y-6">
                <NotificationSendForm />
                <NotificationStats />
              </div>
            </div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default EnhancedAdminPanelPage;
