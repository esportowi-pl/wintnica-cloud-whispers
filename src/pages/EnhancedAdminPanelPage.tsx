
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

  // Mock data for components that require props
  const mockUsers = [
    {
      id: '1',
      username: 'jan_kowalski',
      email: 'jan@witnica.pl',
      display_name: 'Jan Kowalski',
      created_at: '2024-01-01T00:00:00Z',
      last_login: '2024-01-08T10:00:00Z',
      status: 'active' as const,
      role: 'user' as const
    },
    {
      id: '2',
      username: 'anna_nowak',
      email: 'anna@witnica.pl',
      display_name: 'Anna Nowak',
      created_at: '2024-01-02T00:00:00Z',
      last_login: '2024-01-08T09:30:00Z',
      status: 'active' as const,
      role: 'moderator' as const
    }
  ];

  const mockContent = [
    {
      id: '1',
      title: 'Nowy park w centrum Witnicy',
      author: 'Jan Kowalski',
      status: 'published' as const,
      created_at: '2024-01-08T08:00:00Z',
      updated_at: '2024-01-08T08:00:00Z',
      type: 'article' as const,
      views: 156,
      likes: 23
    },
    {
      id: '2',
      title: 'Festyn miejski już w weekend',
      author: 'Anna Nowak',
      status: 'draft' as const,
      created_at: '2024-01-08T09:00:00Z',
      updated_at: '2024-01-08T09:00:00Z',
      type: 'event' as const,
      views: 89,
      likes: 12
    }
  ];

  const mockNotifications = [
    {
      id: '1',
      type: 'info' as const,
      message: 'Nowy użytkownik zarejestrował się w systemie',
      time: '5 minut temu',
      read: false
    },
    {
      id: '2',
      type: 'warning' as const,
      message: 'Zgłoszono nieodpowiednią treść w komentarzach',
      time: '15 minut temu',
      read: false
    },
    {
      id: '3',
      type: 'success' as const,
      message: 'Backup bazy danych wykonany pomyślnie',
      time: '1 godzinę temu',
      read: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Aktywny</span>;
      case 'inactive':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">Nieaktywny</span>;
      case 'suspended':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Zawieszony</span>;
      case 'published':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Opublikowane</span>;
      case 'draft':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Szkic</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Oczekuje</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">{status}</span>;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <EnhancedAnalyticsTab />;
      case 'users':
        return <UsersTab users={mockUsers} getStatusBadge={getStatusBadge} />;
      case 'content':
        return <ContentTab content={mockContent} getStatusBadge={getStatusBadge} />;
      case 'moderation':
        return <ModerationTab />;
      case 'dating':
        return <DatingPanel />;
      case 'marketplace':
        return <MarketPanel />;
      case 'gazette':
        return <GazettePanel />;
      case 'ads':
        return <NotificationsTab notifications={mockNotifications} getStatusBadge={getStatusBadge} />;
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
