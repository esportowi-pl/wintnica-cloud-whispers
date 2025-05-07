
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users, Settings, FileText, Bell, Search, User, Trash2, Edit, ChevronDown, ChevronUp, Database, Globe, Shield, Key, LayoutDashboard, BarChart, Sliders, PlusCircle, AlertCircle, CheckCircle, XCircle, FormInput, CreditCard, GripVertical, Mail, CheckSquare, Loader2, Trash, Star } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

// Mock users data
const mockUsers = [
  { id: 1, username: "jan_kowalski", email: "jan@example.com", role: "user", status: "active", joined: "2023-01-15", lastActive: "2023-06-10", verified: true, posts: 42, premium: false },
  { id: 2, username: "anna_nowak", email: "anna@example.com", role: "editor", status: "active", joined: "2023-02-20", lastActive: "2023-06-12", verified: true, posts: 28, premium: true },
  { id: 3, username: "marek_wisniewski", email: "marek@example.com", role: "user", status: "suspended", joined: "2023-03-10", lastActive: "2023-05-30", verified: false, posts: 13, premium: false },
  { id: 4, username: "katarzyna_zielinska", email: "katarzyna@example.com", role: "admin", status: "active", joined: "2023-01-05", lastActive: "2023-06-12", verified: true, posts: 64, premium: true },
  { id: 5, username: "piotr_adamski", email: "piotr@example.com", role: "user", status: "inactive", joined: "2023-04-18", lastActive: "2023-05-25", verified: true, posts: 7, premium: false },
  { id: 6, username: "aleksandra_kowal", email: "aleksandra@example.com", role: "user", status: "active", joined: "2023-05-01", lastActive: "2023-06-11", verified: true, posts: 19, premium: false },
  { id: 7, username: "tomasz_lis", email: "tomasz@example.com", role: "editor", status: "active", joined: "2023-03-22", lastActive: "2023-06-10", verified: true, posts: 31, premium: true },
  { id: 8, username: "monika_kaczmarek", email: "monika@example.com", role: "user", status: "active", joined: "2023-05-10", lastActive: "2023-06-05", verified: false, posts: 4, premium: false }
];

const EnhancedAdminPanelPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomFieldForm, setShowCustomFieldForm] = useState(false);
  const [draggedFieldId, setDraggedFieldId] = useState<number | null>(null);
  
  // Mock content data
  const mockContent = [
    { id: 1, title: "Nowy plac zabaw", author: "Anna Nowak", status: "published", date: "2023-05-01", views: 342, likes: 28, comments: 12 },
    { id: 2, title: "Zmiana godzin otwarcia urzędu", author: "Marek Wiśniewski", status: "draft", date: "2023-05-03", views: 0, likes: 0, comments: 0 },
    { id: 3, title: "Festyn miejski - zaproszenie", author: "Katarzyna Zielińska", status: "published", date: "2023-05-02", views: 521, likes: 47, comments: 23 },
    { id: 4, title: "Konkurs fotograficzny", author: "Jan Kowalski", status: "review", date: "2023-05-04", views: 0, likes: 0, comments: 0 },
    { id: 5, title: "Historia Witnicy - część 1", author: "Piotr Adamski", status: "published", date: "2023-04-28", views: 256, likes: 31, comments: 14 },
    { id: 6, title: "Nowa ścieżka rowerowa", author: "Aleksandra Kowal", status: "published", date: "2023-05-06", views: 189, likes: 17, comments: 5 },
    { id: 7, title: "Wywiad z burmistrzem", author: "Tomasz Lis", status: "review", date: "2023-05-07", views: 0, likes: 0, comments: 0 },
    { id: 8, title: "Przepisy kulinarne z Witnicy", author: "Monika Kaczmarek", status: "draft", date: "2023-05-08", views: 0, likes: 0, comments: 0 }
  ];

  // Mock notifications
  const mockNotifications = [
    { id: 1, message: "Nowy użytkownik zarejestrowany", time: "2 godziny temu", type: "info", read: false },
    { id: 2, message: "Zgłoszono nieodpowiedni komentarz", time: "5 godzin temu", type: "warning", read: false },
    { id: 3, message: "Awaria systemu płatności", time: "1 dzień temu", type: "error", read: true },
    { id: 4, message: "Sukces - backup systemu wykonany", time: "2 dni temu", type: "success", read: true },
    { id: 5, message: "Tomasz Lis przesłał nowy artykuł do recenzji", time: "3 godziny temu", type: "info", read: false },
    { id: 6, message: "Jan Kowalski zgłosił problem techniczny", time: "1 dzień temu", type: "warning", read: true },
    { id: 7, message: "10 nowych rejestracji w ciągu ostatnich 24 godzin", time: "1 dzień temu", type: "success", read: false },
    { id: 8, message: "Nowa recenzja platformy w serwisie zewnętrznym", time: "3 dni temu", type: "info", read: true }
  ];

  // Mock custom fields
  const [customFields, setCustomFields] = useState([
    { id: 1, name: "Wiek", type: "number", required: true, enabled: true, visibleToUsers: true, defaultValue: "", description: "Wiek użytkownika", order: 1 },
    { id: 2, name: "Zawód", type: "text", required: false, enabled: true, visibleToUsers: true, defaultValue: "", description: "Profesja użytkownika", order: 2 },
    { id: 3, name: "Ulubiona restauracja", type: "text", required: false, enabled: true, visibleToUsers: true, defaultValue: "", description: "Ulubiona restauracja w Witnicy", order: 3 },
    { id: 4, name: "Ulubione miejsce w Witnicy", type: "text", required: false, enabled: true, visibleToUsers: true, defaultValue: "Park Miejski", description: "Miejsce, które użytkownik lubi najbardziej", order: 4 },
    { id: 5, name: "Hobby", type: "textarea", required: false, enabled: true, visibleToUsers: true, defaultValue: "", description: "Hobby i zainteresowania", order: 5 }
  ]);

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

  // Render badge for status
  const getStatusBadge = (status: string, type: string = '') => {
    switch(status) {
      // User statuses
      case "active": return <Badge className="bg-green-500">Aktywny</Badge>;
      case "suspended": return <Badge className="bg-red-500">Zawieszony</Badge>;
      case "inactive": return <Badge className="bg-gray-500">Nieaktywny</Badge>;
      
      // Content statuses
      case "published": return <Badge className="bg-green-500">Opublikowany</Badge>;
      case "draft": return <Badge variant="outline">Szkic</Badge>;
      case "review": return <Badge variant="secondary">Do weryfikacji</Badge>;
      
      // Notification types
      case "info": return <Badge variant="secondary">Informacja</Badge>;
      case "warning": return <Badge className="bg-yellow-500">Ostrzeżenie</Badge>;
      case "error": return <Badge className="bg-red-500">Błąd</Badge>;
      case "success": return <Badge className="bg-green-500">Sukces</Badge>;
      
      // Field types
      case "text": return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Tekst</Badge>;
      case "textarea": return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Długi tekst</Badge>;
      case "number": return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Liczba</Badge>;
      case "date": return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Data</Badge>;
      case "select": return <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-300">Lista</Badge>;
      case "checkbox": return <Badge variant="outline" className="bg-pink-100 text-pink-800 border-pink-300">Checkbox</Badge>;
      
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Handle field reordering
  const moveField = (direction: 'up' | 'down', id: number) => {
    const fieldIndex = customFields.findIndex(field => field.id === id);
    if (
      (direction === 'up' && fieldIndex === 0) || 
      (direction === 'down' && fieldIndex === customFields.length - 1)
    ) return;
    
    const newFields = [...customFields];
    const fieldToMove = newFields[fieldIndex];
    
    if (direction === 'up') {
      newFields[fieldIndex] = newFields[fieldIndex - 1];
      newFields[fieldIndex - 1] = fieldToMove;
    } else {
      newFields[fieldIndex] = newFields[fieldIndex + 1];
      newFields[fieldIndex + 1] = fieldToMove;
    }
    
    // Update order numbers
    const reorderedFields = newFields.map((field, index) => ({
      ...field,
      order: index + 1
    }));
    
    setCustomFields(reorderedFields);
  };
  
  // Handle field deletion
  const deleteField = (id: number) => {
    setCustomFields(customFields.filter(field => field.id !== id));
  };

  // Handle field drag start
  const handleFieldDragStart = (id: number) => {
    setDraggedFieldId(id);
  };

  // Handle field drag over
  const handleFieldDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    if (draggedFieldId === null || draggedFieldId === id) return;
    
    const draggedIndex = customFields.findIndex(field => field.id === draggedFieldId);
    const targetIndex = customFields.findIndex(field => field.id === id);
    
    if (draggedIndex === targetIndex) return;
    
    const newFields = [...customFields];
    const fieldToMove = newFields[draggedIndex];
    newFields.splice(draggedIndex, 1);
    newFields.splice(targetIndex, 0, fieldToMove);
    
    // Update order numbers
    const reorderedFields = newFields.map((field, index) => ({
      ...field,
      order: index + 1
    }));
    
    setCustomFields(reorderedFields);
  };

  // Handle field drag end
  const handleFieldDragEnd = () => {
    setDraggedFieldId(null);
  };

  // Form to add a new custom field
  const CustomFieldForm = () => (
    <Dialog open={showCustomFieldForm} onOpenChange={setShowCustomFieldForm}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Dodaj nowe pole niestandardowe</DialogTitle>
          <DialogDescription>
            Twórz własne pola dla profili użytkowników. Te pola będą widoczne podczas rejestracji i edycji profilu.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="field-name">Nazwa pola</Label>
              <Input id="field-name" placeholder="np. Ulubiona restauracja" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="field-type">Typ pola</Label>
              <Select>
                <SelectTrigger id="field-type">
                  <SelectValue placeholder="Wybierz typ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Tekst</SelectItem>
                  <SelectItem value="textarea">Długi tekst</SelectItem>
                  <SelectItem value="number">Liczba</SelectItem>
                  <SelectItem value="date">Data</SelectItem>
                  <SelectItem value="select">Lista wyboru</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="field-description">Opis (podpowiedź dla użytkownika)</Label>
            <Input id="field-description" placeholder="np. Podaj swoją ulubioną restaurację w Witnicy" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="field-default">Wartość domyślna (opcjonalnie)</Label>
            <Input id="field-default" placeholder="np. Park Miejski" />
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="field-required" className="cursor-pointer">Pole wymagane</Label>
              <Switch id="field-required" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="field-visible" className="cursor-pointer">Widoczne dla innych użytkowników</Label>
              <Switch id="field-visible" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="field-enabled" className="cursor-pointer">Pole aktywne</Label>
              <Switch id="field-enabled" defaultChecked />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowCustomFieldForm(false)}>Anuluj</Button>
          <Button onClick={() => {
            const newField = {
              id: customFields.length + 1,
              name: "Nowe pole",
              type: "text",
              required: false,
              enabled: true,
              visibleToUsers: true,
              defaultValue: "",
              description: "Opis pola",
              order: customFields.length + 1
            };
            setCustomFields([...customFields, newField]);
            setShowCustomFieldForm(false);
          }}>
            Dodaj pole
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
            <Button>
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
              <FormInput size={16} />
              <span>Pola niestandardowe</span>
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
                    <Button variant="outline">
                      Eksportuj
                    </Button>
                    <Button>
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
                      {mockUsers.map((user) => (
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
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edytuj</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Mail className="h-4 w-4" />
                                <span className="sr-only">Email</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
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
                    Pokazuje 8 z 1,248 użytkowników
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
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Zarządzanie treściami</CardTitle>
                    <CardDescription>Przeglądaj, edytuj i zarządzaj treściami na platformie.</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      Wsadowa edycja
                    </Button>
                    <Button>
                      <FileText className="mr-2 h-4 w-4" />
                      Dodaj treść
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <div className="flex items-center">
                    <Label htmlFor="content-status-filter" className="mr-2">Status:</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="content-status-filter" className="w-[150px]">
                        <SelectValue placeholder="Wszystkie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Wszystkie</SelectItem>
                        <SelectItem value="published">Opublikowane</SelectItem>
                        <SelectItem value="draft">Szkice</SelectItem>
                        <SelectItem value="review">Do weryfikacji</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="relative ml-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    <Input 
                      placeholder="Szukaj w treściach" 
                      className="pl-9 w-[220px]" 
                    />
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
                        <TableHead>Tytuł</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Wyświetlenia</TableHead>
                        <TableHead>Reakcje</TableHead>
                        <TableHead>Akcje</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockContent.map((content) => (
                        <motion.tr key={content.id} variants={itemVariants}>
                          <TableCell>{content.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{content.title}</div>
                          </TableCell>
                          <TableCell>{content.author}</TableCell>
                          <TableCell>{getStatusBadge(content.status)}</TableCell>
                          <TableCell>{content.date}</TableCell>
                          <TableCell>{content.views}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center">
                                <Heart className="h-4 w-4 text-red-500 mr-1" />
                                <span>{content.likes}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="h-4 w-4 text-blue-500 mr-1" />
                                <span>{content.comments}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edytuj</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Podgląd</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
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
                    Pokazuje 8 z 842 treści
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
          
          {/* Custom Fields Tab */}
          <TabsContent value="custom-fields">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Pola niestandardowe profilu</CardTitle>
                    <CardDescription>Zarządzaj dodatkowymi polami widocznymi w profilach użytkowników.</CardDescription>
                  </div>
                  <Button onClick={() => setShowCustomFieldForm(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Dodaj nowe pole
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Informacja o polach niestandardowych</AlertTitle>
                  <AlertDescription>
                    Pola niestandardowe pozwalają na zbieranie dodatkowych informacji od użytkowników. 
                    Będą one widoczne podczas rejestracji i edycji profilu. 
                    Przeciągnij i upuść pola, aby zmienić ich kolejność.
                  </AlertDescription>
                </Alert>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {customFields.map((field) => (
                    <motion.div 
                      key={field.id} 
                      variants={itemVariants}
                      draggable
                      onDragStart={() => handleFieldDragStart(field.id)}
                      onDragOver={(e) => handleFieldDragOver(e, field.id)}
                      onDragEnd={handleFieldDragEnd}
                      className={`border rounded-lg p-4 ${
                        draggedFieldId === field.id ? 'border-primary bg-primary/5' : ''
                      } hover:shadow-sm transition-shadow`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="cursor-move p-1 hover:bg-muted rounded">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium flex items-center gap-2">
                              {field.name}
                              {getStatusBadge(field.type)}
                              {field.required && <Badge variant="outline" className="text-xs">Wymagane</Badge>}
                            </h3>
                            <p className="text-sm text-muted-foreground">{field.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center mr-4 space-x-4">
                            <div className="flex items-center space-x-1">
                              <Label htmlFor={`visible-${field.id}`} className="text-sm text-muted-foreground">Widoczne</Label>
                              <Switch id={`visible-${field.id}`} checked={field.visibleToUsers} />
                            </div>
                            <div className="flex items-center space-x-1">
                              <Label htmlFor={`enabled-${field.id}`} className="text-sm text-muted-foreground">Aktywne</Label>
                              <Switch id={`enabled-${field.id}`} checked={field.enabled} />
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Button variant="ghost" size="sm" onClick={() => moveField('up', field.id)} disabled={field.order === 1}>
                              <ChevronUp className="h-4 w-4" />
                              <span className="sr-only">W górę</span>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => moveField('down', field.id)} disabled={field.order === customFields.length}>
                              <ChevronDown className="h-4 w-4" />
                              <span className="sr-only">W dół</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edytuj</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteField(field.id)}>
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Usuń</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {field.defaultValue && (
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Domyślna wartość:</span> {field.defaultValue}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
                
                {customFields.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <FormInput className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">Brak pól niestandardowych</h3>
                    <p className="text-muted-foreground mb-4">
                      Dodaj pola niestandardowe, aby zbierać dodatkowe informacje od użytkowników.
                    </p>
                    <Button onClick={() => setShowCustomFieldForm(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Dodaj pierwsze pole
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {customFields.length} {customFields.length === 1 ? 'pole niestandardowe' : 
                   customFields.length < 5 ? 'pola niestandardowe' : 'pól niestandardowych'}
                </div>
                <div>
                  <Button variant="outline" disabled={customFields.length === 0}>
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Zapisz zmiany
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            {/* Custom Field Form Dialog */}
            <CustomFieldForm />
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
                        <Button variant="outline" size="sm">Oznacz wszystkie jako przeczytane</Button>
                        <Button size="sm">Wyślij powiadomienie</Button>
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
                    <ScrollArea className="h-[500px]">
                      <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-2"
                      >
                        {mockNotifications.map((notification) => (
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
                                {notification.type === 'info' && <Info className={`h-4 w-4 text-blue-600`} />}
                                {notification.type === 'warning' && <AlertCircle className={`h-4 w-4 text-yellow-600`} />}
                                {notification.type === 'error' && <XCircle className={`h-4 w-4 text-red-600`} />}
                                {notification.type === 'success' && <CheckCircle className={`h-4 w-4 text-green-600`} />}
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
                              <Button variant="ghost" size="sm">
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
              
              <div className="md:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Wysyłanie powiadomień</CardTitle>
                    <CardDescription>
                      Wyślij powiadomienie do wszystkich lub wybranych użytkowników.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="notification-title">Tytuł powiadomienia</Label>
                        <Input id="notification-title" placeholder="np. Ważna aktualizacja systemu" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notification-message">Treść powiadomienia</Label>
                        <Textarea 
                          id="notification-message" 
                          placeholder="Wprowadź treść powiadomienia" 
                          className="min-h-[100px]"
                        />
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
                      
                      <Button className="w-full">
                        Wyślij powiadomienie
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Statystyki powiadomień</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Wysłane dzisiaj:</span>
                        <span className="font-medium">24</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Odczytane (%):</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interakcje (%):</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Średni czas odczytu:</span>
                        <span className="font-medium">2.4 min</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="bg-muted p-3 rounded-md">
                        <div className="font-medium mb-1">Najpopularniejszy dzień:</div>
                        <div className="flex justify-between text-sm">
                          <span>Wtorek</span>
                          <span>82% odczytów</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Ustawienia portalu</CardTitle>
                    <CardDescription>
                      Zarządzaj globalnymi ustawieniami platformy.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <nav className="flex flex-col">
                      <a href="#general" className="flex items-center px-4 py-3 border-l-2 border-primary bg-primary/5 text-primary">
                        <Globe className="h-5 w-5 mr-3" />
                        <span>Ogólne</span>
                      </a>
                      <a href="#security" className="flex items-center px-4 py-3 border-l-2 border-transparent hover:bg-muted/50 transition-colors">
                        <Shield className="h-5 w-5 mr-3" />
                        <span>Bezpieczeństwo</span>
                      </a>
                      <a href="#api" className="flex items-center px-4 py-3 border-l-2 border-transparent hover:bg-muted/50 transition-colors">
                        <Key className="h-5 w-5 mr-3" />
                        <span>API i integracje</span>
                      </a>
                      <a href="#analytics" className="flex items-center px-4 py-3 border-l-2 border-transparent hover:bg-muted/50 transition-colors">
                        <BarChart className="h-5 w-5 mr-3" />
                        <span>Analityka</span>
                      </a>
                      <a href="#database" className="flex items-center px-4 py-3 border-l-2 border-transparent hover:bg-muted/50 transition-colors">
                        <Database className="h-5 w-5 mr-3" />
                        <span>Baza danych</span>
                      </a>
                      <a href="#premium" className="flex items-center px-4 py-3 border-l-2 border-transparent hover:bg-muted/50 transition-colors">
                        <CreditCard className="h-5 w-5 mr-3" />
                        <span>Premium i płatności</span>
                      </a>
                    </nav>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2 space-y-6">
                <Card id="general">
                  <CardHeader>
                    <CardTitle>Ustawienia ogólne</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="site-name">Nazwa portalu</Label>
                        <Input id="site-name" defaultValue="Witnica.info" />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="site-description">Opis portalu</Label>
                        <Input id="site-description" defaultValue="Portal miejski dla mieszkańców Witnicy" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="site-email">Email kontaktowy</Label>
                        <Input id="site-email" defaultValue="kontakt@witnica.info" />
                      </div>
                      <div>
                        <Label htmlFor="site-language">Język domyślny</Label>
                        <Select defaultValue="pl">
                          <SelectTrigger id="site-language">
                            <SelectValue placeholder="Wybierz język" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pl">Polski</SelectItem>
                            <SelectItem value="en">Angielski</SelectItem>
                            <SelectItem value="de">Niemiecki</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="logo-upload">Logo portalu</Label>
                      <div className="flex items-center gap-4 mt-1.5">
                        <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-md">
                          <Globe className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <Button variant="outline">Przeglądaj...</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Zezwalaj na rejestrację użytkowników</h3>
                      <div className="flex items-center space-x-2">
                        <Switch id="allow-registration" defaultChecked />
                        <Label htmlFor="allow-registration">Rejestracja otwarta</Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Funkcje społecznościowe</h3>
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="allow-comments" defaultChecked />
                          <Label htmlFor="allow-comments">Komentarze</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="allow-likes" defaultChecked />
                          <Label htmlFor="allow-likes">Polubienia</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="allow-sharing" defaultChecked />
                          <Label htmlFor="allow-sharing">Udostępnianie</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="allow-user-content" defaultChecked />
                          <Label htmlFor="allow-user-content">Treści użytkowników</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t flex justify-end">
                    <Button>Zapisz ustawienia</Button>
                  </CardFooter>
                </Card>
                
                <Card id="security">
                  <CardHeader>
                    <CardTitle>Bezpieczeństwo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="password-strength">Wymagana siła hasła</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger id="password-strength">
                          <SelectValue placeholder="Wybierz wymaganą siłę" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Niska</SelectItem>
                          <SelectItem value="medium">Średnia</SelectItem>
                          <SelectItem value="high">Wysoka</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-attempts">Limit prób logowania</Label>
                        <Input id="login-attempts" type="number" defaultValue="5" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lockout-time">Czas blokady (minuty)</Label>
                        <Input id="lockout-time" type="number" defaultValue="30" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Weryfikacja dwustopniowa (2FA)</h3>
                      <div className="flex items-center space-x-2">
                        <Switch id="enable-2fa" defaultChecked />
                        <Label htmlFor="enable-2fa">Włącz 2FA dla kont administracyjnych</Label>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Filtrowanie treści</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div>Automatyczna moderacja komentarzy</div>
                            <div className="text-sm text-muted-foreground">
                              Filtruj wulgarne słowa i potencjalny spam
                            </div>
                          </div>
                          <Switch id="auto-moderation" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div>Weryfikacja treści użytkowników</div>
                            <div className="text-sm text-muted-foreground">
                              Wymagaj zatwierdzenia nowych postów przez moderatora
                            </div>
                          </div>
                          <Switch id="content-verification" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t flex justify-end">
                    <Button>Zapisz ustawienia</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Define missing icons
const Heart = ({ className }: { className?: string }) => (
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
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const MessageCircle = ({ className }: { className?: string }) => (
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
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
  </svg>
);

const Eye = ({ className }: { className?: string }) => (
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
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Info = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export default EnhancedAdminPanelPage;
