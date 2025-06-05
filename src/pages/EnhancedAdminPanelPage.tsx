
import React, { useState } from 'react';
import AdminGuard from '@/components/admin/AdminGuard';
import EnhancedAdminLayout from '@/components/admin/enhanced/EnhancedAdminLayout';
import LiveAnalyticsTab from '@/components/admin/enhanced/LiveAnalyticsTab';
import ModerationTab from '@/components/admin/enhanced/ModerationTab';
import ActivityLogsTab from '@/components/admin/enhanced/ActivityLogsTab';
import EnhancedSettingsTab from '@/components/admin/enhanced/EnhancedSettingsTab';

// Import existing components
import UsersTab from '@/components/admin/UsersTab';
import ContentTab from '@/components/admin/ContentTab';
import StatusBadge from '@/components/admin/StatusBadge';
import DatingPanel from '@/components/admin/DatingPanel';
import MarketPanel from '@/components/admin/MarketPanel';
import GazettePanel from '@/components/admin/GazettePanel';

// Import mock data
import { mockUsers, mockContent } from '@/components/admin/mockData';

const EnhancedAdminPanelPage = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <LiveAnalyticsTab />;
      case 'users':
        return (
          <UsersTab 
            users={mockUsers} 
            getStatusBadge={(status: string) => <StatusBadge status={status} />}
          />
        );
      case 'content':
        return (
          <ContentTab 
            content={mockContent} 
            getStatusBadge={(status: string) => <StatusBadge status={status} />} 
          />
        );
      case 'moderation':
        return <ModerationTab />;
      case 'dating':
        return <DatingPanel />;
      case 'marketplace':
        return <MarketPanel />;
      case 'gazette':
        return <GazettePanel />;
      case 'ads':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Zarządzanie reklamami</h1>
            <p className="text-muted-foreground">Panel zarządzania reklamami będzie dostępny wkrótce.</p>
          </div>
        );
      case 'activity':
        return <ActivityLogsTab />;
      case 'settings':
        return <EnhancedSettingsTab />;
      default:
        return <LiveAnalyticsTab />;
    }
  };

  return (
    <AdminGuard requireAdmin={true}>
      <EnhancedAdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderTabContent()}
      </EnhancedAdminLayout>
    </AdminGuard>
  );
};

export default EnhancedAdminPanelPage;
