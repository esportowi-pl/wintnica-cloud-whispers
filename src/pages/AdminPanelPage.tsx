
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Settings, FileText, Bell } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import UsersTab from '@/components/admin/UsersTab';
import ContentTab from '@/components/admin/ContentTab';
import NotificationsTab from '@/components/admin/NotificationsTab';
import SettingsTab from '@/components/admin/SettingsTab';
import AdminSearch from '@/components/admin/AdminSearch';
import { getStatusBadge } from '@/utils/statusBadges';

// Mock data
const mockUsers = [
  { id: 1, username: "jan_kowalski", email: "jan@example.com", role: "user", status: "active", joined: "2023-01-15" },
  { id: 2, username: "anna_nowak", email: "anna@example.com", role: "editor", status: "active", joined: "2023-02-20" },
  { id: 3, username: "marek_wisniewski", email: "marek@example.com", role: "user", status: "suspended", joined: "2023-03-10" },
  { id: 4, username: "katarzyna_zielinska", email: "katarzyna@example.com", role: "admin", status: "active", joined: "2023-01-05" },
  { id: 5, username: "piotr_adamski", email: "piotr@example.com", role: "user", status: "inactive", joined: "2023-04-18" },
];

const mockContent = [
  { id: 1, title: "Nowy plac zabaw", author: "Anna Nowak", status: "published", date: "2023-05-01", views: 342 },
  { id: 2, title: "Zmiana godzin otwarcia urzędu", author: "Marek Wiśniewski", status: "draft", date: "2023-05-03", views: 0 },
  { id: 3, title: "Festyn miejski - zaproszenie", author: "Katarzyna Zielińska", status: "published", date: "2023-05-02", views: 521 },
  { id: 4, title: "Konkurs fotograficzny", author: "Jan Kowalski", status: "review", date: "2023-05-04", views: 0 },
];

const mockNotifications = [
  { id: 1, message: "Nowy użytkownik zarejestrowany", time: "2 godziny temu", type: "info" },
  { id: 2, message: "Zgłoszono nieodpowiedni komentarz", time: "5 godzin temu", type: "warning" },
  { id: 3, message: "Awaria systemu płatności", time: "1 dzień temu", type: "error" },
  { id: 4, message: "Sukces - backup systemu wykonany", time: "2 dni temu", type: "success" },
];

const AdminPanelPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Panel Administracyjny</h1>
        
        <AdminSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} />
              <span>Powiadomienia</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              <span>Ustawienia</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <UsersTab users={mockUsers} getStatusBadge={getStatusBadge} />
          </TabsContent>
          
          <TabsContent value="content">
            <ContentTab content={mockContent} getStatusBadge={getStatusBadge} />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationsTab notifications={mockNotifications} getStatusBadge={getStatusBadge} />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminPanelPage;
