
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users, Settings, FileText, Bell, Search, User, Trash2, Edit, BarChart, Globe, Shield, Key, Database, CreditCard, PlusCircle, AlertCircle, Mail } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import UsersTab from '@/components/admin/UsersTab';
import ContentTab from '@/components/admin/ContentTab';
import NotificationsTab from '@/components/admin/NotificationsTab';
import SettingsTab from '@/components/admin/SettingsTab';
import DebuggerPanel from '@/components/admin/DebuggerPanel';
import AdminSearch from '@/components/admin/AdminSearch';
import { getStatusBadge } from '@/utils/statusBadges';
import { toast } from "sonner";

// Mock data
const mockUsers = [
  { id: 1, username: "jan_kowalski", email: "jan@example.com", role: "user", status: "active", joined: "2023-01-15", lastActive: "2023-06-10", verified: true, posts: 42, premium: false },
  { id: 2, username: "anna_nowak", email: "anna@example.com", role: "editor", status: "active", joined: "2023-02-20", lastActive: "2023-06-12", verified: true, posts: 28, premium: true },
  { id: 3, username: "marek_wisniewski", email: "marek@example.com", role: "user", status: "suspended", joined: "2023-03-10", lastActive: "2023-05-30", verified: false, posts: 13, premium: false },
  { id: 4, username: "katarzyna_zielinska", email: "katarzyna@example.com", role: "admin", status: "active", joined: "2023-01-05", lastActive: "2023-06-12", verified: true, posts: 64, premium: true },
  { id: 5, username: "piotr_adamski", email: "piotr@example.com", role: "user", status: "inactive", joined: "2023-04-18", lastActive: "2023-05-25", verified: true, posts: 7, premium: false },
];

const mockContent = [
  { id: 1, title: "Nowy plac zabaw", author: "Anna Nowak", status: "published", date: "2023-05-01", views: 342, likes: 28, comments: 12 },
  { id: 2, title: "Zmiana godzin otwarcia urzędu", author: "Marek Wiśniewski", status: "draft", date: "2023-05-03", views: 0, likes: 0, comments: 0 },
  { id: 3, title: "Festyn miejski - zaproszenie", author: "Katarzyna Zielińska", status: "published", date: "2023-05-02", views: 521, likes: 47, comments: 23 },
  { id: 4, title: "Konkurs fotograficzny", author: "Jan Kowalski", status: "review", date: "2023-05-04", views: 0, likes: 0, comments: 0 },
];

const mockNotifications = [
  { id: 1, message: "Nowy użytkownik zarejestrowany", time: "2 godziny temu", type: "info", read: false },
  { id: 2, message: "Zgłoszono nieodpowiedni komentarz", time: "5 godzin temu", type: "warning", read: false },
  { id: 3, message: "Awaria systemu płatności", time: "1 dzień temu", type: "error", read: true },
  { id: 4, message: "Sukces - backup systemu wykonany", time: "2 dni temu", type: "success", read: true },
];

// Mock analytics data
const mockAnalytics = {
  usersTotal: 1248,
  usersTrend: "+12%",
  activeToday: 387,
  activeTodayTrend: "+5%",
  newLast7Days: 63,
  newLast7DaysTrend: "+28%",
  contentTotal: 842,
  contentTrend: "+8%",
  viewsToday: 1856,
  viewsTrend: "+15%",
  commentsToday: 126,
  commentsTrend: "-3%"
};

const AdminPanelPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('users');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  // Filter data based on search query
  const filteredUsers = mockUsers.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredContent = mockContent.filter(content => 
    content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredNotifications = mockNotifications.filter(notification => 
    notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Analytics card component
  const AnalyticsCard = ({ title, value, trend, icon: Icon }: { title: string, value: string | number, trend: string, icon: React.ElementType }) => {
    const isPositive = trend.startsWith('+');
    
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <h3 className="text-2xl font-bold mt-1">{value}</h3>
              <div className={`flex items-center mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                <span>{trend}</span>
                {isPositive ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
            </div>
            <div className="p-3 rounded-full bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const handleEditUser = (userId: number) => {
    toast.info(`Edytowanie użytkownika ID: ${userId}`);
    // In a real app, this would open a modal or navigate to edit page
  };

  const handleContactUser = (userId: number) => {
    toast.info(`Kontakt z użytkownikiem ID: ${userId}`);
    // In a real app, this would open email form or messaging interface
  };

  const handleDeleteUser = (userId: number) => {
    toast.warning(`Usuwanie użytkownika ID: ${userId}`);
    // In a real app, this would show confirmation and then delete
  };

  const markNotificationAsRead = (id: number) => {
    toast.success(`Oznaczono powiadomienie ${id} jako przeczytane`);
    // In a real app, this would update the notification status
  };

  const sendNotification = (formData: React.FormEvent<HTMLFormElement>) => {
    formData.preventDefault();
    toast.success("Powiadomienie wysłane!");
    // In a real app, this would send the notification
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        {/* Header with breadcrumbs */}
        <div className="flex flex-col mb-8">
          <div className="text-sm text-muted-foreground mb-2">
            <a href="/" className="hover:underline">Strona główna</a> &gt; <span>Panel administratora</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Panel Administracyjny</h1>
            <Button onClick={() => toast.info("Otwieranie dziennika zdarzeń")}>
              <Shield className="mr-2 h-4 w-4" />
              Dziennik zdarzeń
            </Button>
          </div>
        </div>
        
        {/* Analytics overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <AnalyticsCard 
            title="Łączna liczba użytkowników" 
            value={mockAnalytics.usersTotal} 
            trend={mockAnalytics.usersTrend} 
            icon={Users} 
          />
          <AnalyticsCard 
            title="Aktywni dzisiaj" 
            value={mockAnalytics.activeToday} 
            trend={mockAnalytics.activeTodayTrend} 
            icon={User} 
          />
          <AnalyticsCard 
            title="Treści" 
            value={mockAnalytics.contentTotal} 
            trend={mockAnalytics.contentTrend} 
            icon={FileText} 
          />
          <AnalyticsCard 
            title="Wyświetlenia dzisiaj" 
            value={mockAnalytics.viewsToday} 
            trend={mockAnalytics.viewsTrend} 
            icon={BarChart} 
          />
        </div>
        
        {/* Global Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Szukaj użytkowników, treści, ustawień..." 
              className="pl-10 pr-16" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <kbd className="absolute top-1/2 transform -translate-y-1/2 right-3 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        <Tabs 
          defaultValue="users" 
          value={activeTab}
          onValueChange={setActiveTab}
        >
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
              <Badge className="ml-1 bg-primary">{mockNotifications.filter(n => !n.read).length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              <span>Ustawienia</span>
            </TabsTrigger>
            <TabsTrigger value="debugger" className="flex items-center gap-2">
              <AlertCircle size={16} />
              <span>Debugger</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Zarządzanie użytkownikami</CardTitle>
                    <CardDescription>Przeglądaj, edytuj i zarządzaj użytkownikami platformy.</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => toast.info("Eksportowanie listy użytkowników")}>
                      Eksportuj
                    </Button>
                    <Button onClick={() => toast.info("Dodawanie nowego użytkownika")}>
                      <User className="mr-2 h-4 w-4" />
                      Dodaj użytkownika
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <div className="flex items-center">
                    <Label htmlFor="role-filter" className="mr-2">Rola:</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="role-filter" className="w-[150px]">
                        <SelectValue placeholder="Wszystkie role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Wszystkie role</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="editor">Redaktor</SelectItem>
                        <SelectItem value="user">Użytkownik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center ml-4">
                    <Label htmlFor="status-filter" className="mr-2">Status:</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="status-filter" className="w-[150px]">
                        <SelectValue placeholder="Wszystkie statusy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Wszystkie statusy</SelectItem>
                        <SelectItem value="active">Aktywny</SelectItem>
                        <SelectItem value="suspended">Zawieszony</SelectItem>
                        <SelectItem value="inactive">Nieaktywny</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center ml-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified-filter" />
                      <Label htmlFor="verified-filter">Tylko zweryfikowani</Label>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Użytkownik</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rola</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Posty</TableHead>
                        <TableHead>Premium</TableHead>
                        <TableHead>Ostatnia aktywność</TableHead>
                        <TableHead>Akcje</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <motion.tr key={user.id} variants={itemVariants}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-medium">{user.username}</div>
                                <div className="text-xs text-muted-foreground">Od {user.joined}</div>
                              </div>
                              {user.verified && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              user.role === 'admin' ? 'bg-red-100 text-red-800 border-red-300' :
                              user.role === 'editor' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                              'bg-gray-100 text-gray-800 border-gray-300'
                            }>
                              {user.role === 'admin' ? 'Administrator' : 
                               user.role === 'editor' ? 'Redaktor' : 'Użytkownik'}
                            </Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>{user.posts}</TableCell>
                          <TableCell>
                            {user.premium ? (
                              <Badge className="bg-amber-500">
                                <Star className="h-3 w-3 mr-1" />
                                Premium
                              </Badge>
                            ) : (
                              <Badge variant="outline">Podstawowy</Badge>
                            )}
                          </TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditUser(user.id)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edytuj</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleContactUser(user.id)}>
                                <Mail className="h-4 w-4" />
                                <span className="sr-only">Email</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500" onClick={() => handleDeleteUser(user.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Usuń</span>
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </motion.div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Pokazuje {filteredUsers.length} z {mockAnalytics.usersTotal} użytkowników
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Poprzednia
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Następna
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Content Tab */}
          <TabsContent value="content">
            <ContentTab content={filteredContent} getStatusBadge={getStatusBadge} />
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle>Powiadomienia systemowe</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => toast.success("Oznaczono wszystkie jako przeczytane")}>
                          Oznacz wszystkie jako przeczytane
                        </Button>
                        <Button size="sm" onClick={() => toast.info("Otwieranie formularza powiadomień")}>
                          Wyślij powiadomienie
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="outline" className="cursor-pointer">Wszystkie</Badge>
                      <Badge variant="outline" className="cursor-pointer">Nieprzeczytane</Badge>
                      <Badge variant="secondary" className="cursor-pointer">System</Badge>
                      <Badge variant="outline" className="cursor-pointer">Użytkownicy</Badge>
                      <Badge variant="outline" className="cursor-pointer">Treści</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-2"
                      >
                        {filteredNotifications.map((notification) => (
                          <motion.div 
                            key={notification.id} 
                            variants={itemVariants}
                            className={`border rounded-lg p-3 mb-2 flex items-start justify-between ${
                              notification.read ? '' : 'bg-primary/5 border-primary/20'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-full flex-shrink-0 ${
                                notification.type === 'info' ? 'bg-blue-100' :
                                notification.type === 'warning' ? 'bg-yellow-100' :
                                notification.type === 'error' ? 'bg-red-100' :
                                'bg-green-100'
                              }`}>
                                <AlertCircle className={`h-4 w-4 ${
                                  notification.type === 'info' ? 'text-blue-600' :
                                  notification.type === 'warning' ? 'text-yellow-600' :
                                  notification.type === 'error' ? 'text-red-600' :
                                  'text-green-600'
                                }`} />
                              </div>
                              <div>
                                <p className={`${notification.read ? '' : 'font-medium'}`}>
                                  {notification.message}
                                </p>
                                <span className="text-sm text-muted-foreground">{notification.time}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                  Nowe
                                </Badge>
                              )}
                              <Button variant="ghost" size="sm" onClick={() => markNotificationAsRead(notification.id)}>
                                {notification.read ? "Oznacz jako nieprzeczytane" : "Oznacz jako przeczytane"}
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Wysyłanie powiadomień</CardTitle>
                    <CardDescription>
                      Wyślij powiadomienie do wszystkich lub wybranych użytkowników.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={sendNotification}>
                      <div className="space-y-2">
                        <Label htmlFor="notification-title">Tytuł powiadomienia</Label>
                        <Input id="notification-title" placeholder="np. Ważna aktualizacja systemu" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notification-message">Treść powiadomienia</Label>
                        <textarea 
                          id="notification-message" 
                          placeholder="Wprowadź treść powiadomienia" 
                          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        ></textarea>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notification-type">Typ powiadomienia</Label>
                        <Select defaultValue="info">
                          <SelectTrigger id="notification-type">
                            <SelectValue placeholder="Wybierz typ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="info">Informacja</SelectItem>
                            <SelectItem value="warning">Ostrzeżenie</SelectItem>
                            <SelectItem value="error">Błąd</SelectItem>
                            <SelectItem value="success">Sukces</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notification-recipients">Odbiorcy</Label>
                        <Select defaultValue="all">
                          <SelectTrigger id="notification-recipients">
                            <SelectValue placeholder="Wybierz odbiorców" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Wszyscy użytkownicy</SelectItem>
                            <SelectItem value="admins">Tylko administratorzy</SelectItem>
                            <SelectItem value="editors">Tylko redaktorzy</SelectItem>
                            <SelectItem value="premium">Użytkownicy Premium</SelectItem>
                            <SelectItem value="custom">Wybrani użytkownicy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notification-email" />
                        <Label htmlFor="notification-email">Wyślij również e-mailem</Label>
                      </div>
                      
                      <Button className="w-full" type="submit">
                        Wyślij powiadomienie
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
          
          {/* Debugger Tab */}
          <TabsContent value="debugger">
            <DebuggerPanel />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Star icon component 
const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default AdminPanelPage;
