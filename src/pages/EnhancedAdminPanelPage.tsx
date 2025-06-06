
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import EnhancedAdminLayout from '@/components/admin/enhanced/EnhancedAdminLayout';
import EnhancedAnalyticsTab from '@/components/admin/enhanced/EnhancedAnalyticsTab';
import LiveAnalyticsTab from '@/components/admin/enhanced/LiveAnalyticsTab';
import UsersTab from '@/components/admin/UsersTab';
import ContentTab from '@/components/admin/ContentTab';
import ModerationTab from '@/components/admin/enhanced/ModerationTab';
import DatingPanel from '@/components/admin/DatingPanel';
import MarketPanel from '@/components/admin/MarketPanel';
import GazettePanel from '@/components/admin/GazettePanel';
import NotificationsTab from '@/components/admin/NotificationsTab';
import ActivityLogsTab from '@/components/admin/enhanced/ActivityLogsTab';
import EnhancedSettingsTab from '@/components/admin/enhanced/EnhancedSettingsTab';

const EnhancedAdminPanelPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Dostęp zabroniony</h1>
          <p className="text-gray-600">Musisz się zalogować, aby uzyskać dostęp do panelu administratora.</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <EnhancedAnalyticsTab />;
      case 'users':
        return <UsersTab />;
      case 'content':
        return <ContentTab />;
      case 'moderation':
        return <ModerationTab />;
      case 'dating':
        return <DatingPanel />;
      case 'marketplace':
        return <MarketPanel />;
      case 'gazette':
        return <GazettePanel />;
      case 'ads':
        return <NotificationsTab />;
      case 'activity':
        return <ActivityLogsTab />;
      case 'settings':
        return <EnhancedSettingsTab />;
      default:
        return <EnhancedAnalyticsTab />;
    }
  };

  return (
    <EnhancedAdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </EnhancedAdminLayout>
  );
};

export default EnhancedAdminPanelPage;
