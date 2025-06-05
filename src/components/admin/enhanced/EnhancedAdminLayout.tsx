
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { 
  Users, 
  FileText, 
  BarChart, 
  Settings, 
  Shield, 
  Ad,
  Moon,
  Sun,
  LogOut,
  Heart,
  ShoppingCart,
  Newspaper,
  Bell,
  Activity
} from 'lucide-react';

interface EnhancedAdminLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const menuItems = [
  { id: 'analytics', label: 'Analityka', icon: BarChart, color: 'blue' },
  { id: 'users', label: 'Użytkownicy', icon: Users, color: 'green' },
  { id: 'content', label: 'Treści', icon: FileText, color: 'purple' },
  { id: 'moderation', label: 'Moderacja', icon: Shield, color: 'orange' },
  { id: 'dating', label: 'Portal randkowy', icon: Heart, color: 'pink' },
  { id: 'marketplace', label: 'Rynek lokalny', icon: ShoppingCart, color: 'emerald' },
  { id: 'gazette', label: 'Gazeta', icon: Newspaper, color: 'amber' },
  { id: 'ads', label: 'Reklamy', icon: Ad, color: 'red' },
  { id: 'activity', label: 'Logi aktywności', icon: Activity, color: 'gray' },
  { id: 'settings', label: 'Ustawienia', icon: Settings, color: 'slate' }
];

export default function EnhancedAdminLayout({ children, activeTab, onTabChange }: EnhancedAdminLayoutProps) {
  const { user, signOut } = useAuth();
  const { settings } = useSiteSettings();
  const [darkMode, setDarkMode] = useState(settings.dark_mode_enabled);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-3">
              {settings.logo_url ? (
                <img src={settings.logo_url} alt="Logo" className="h-8 w-8" />
              ) : (
                <div className="h-8 w-8 bg-primary rounded flex items-center justify-center text-white font-bold">
                  E
                </div>
              )}
              <div>
                <h2 className="font-bold text-lg">{settings.site_name}</h2>
                <p className="text-sm text-muted-foreground">Panel Admina</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeTab === item.id}
                    onClick={() => onTabChange?.(item.id)}
                    className="w-full"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.id === 'moderation' && (
                      <Badge variant="destructive" className="ml-auto">
                        3
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                  {user?.email?.[0]?.toUpperCase()}
                </div>
                <div className="text-sm">
                  <p className="font-medium">{user?.email}</p>
                  <p className="text-muted-foreground">Administrator</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={signOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center gap-4 border-b px-6">
            <SidebarTrigger />
            <div className="flex items-center gap-4 ml-auto">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
