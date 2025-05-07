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
import { Users, Settings, FileText, Bell, Search, User, Trash2, Edit, ChevronDown, ChevronUp, Database, Globe, Shield, Key, LayoutDashboard, BarChart, Sliders, PlusCircle, AlertCircle, CheckCircle, XCircle, FormInput, CreditCard, GripVertical, Mail, CheckSquare, Loader2, Trash, Sparkles, Heart, MessageCircle, Eye } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import NotificationsMenu from '@/components/notifications/NotificationsMenu';
import ContentGenerator from '@/components/ai/ContentGenerator';

const EnhancedAdminPanelPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomFieldForm, setShowCustomFieldForm] = useState(false);
  const [draggedFieldId, setDraggedFieldId] = useState<number | null>(null);
  const [showAiGenerator, setShowAiGenerator] = useState(false);
  
  // Mock users data
  const mockUsers = [
    { id: 1, username: "jan_kowalski", email: "jan@example.com", role: "user", status: "active", joined: "2023-01-15", lastActive: "2023-06-10", verified: true, posts: 42, premium: false },
    { id: 2, username: "anna_nowak", email: "anna@example.com", role: "editor", status: "active", joined: "2023-02-20", lastActive: "2023-06-12", verified: true, posts: 28, premium: true },
    { id: 3, username: "marek_wisniewski", email: "marek@example.com", role: "user", status: "suspended", joined: "2023-03-10", lastActive: "2023-05-30", verified: false, posts: 13, premium: false },
    { id: 4, username: "katarzyna_zielinska", email: "katarzyna@example.com", role: "admin", status: "active", joined: "2023-01-05", lastActive: "2023-06-12", verified: true, posts: 64, premium: true },
    { id: 5, username: "piotr_adamski", email: "piotr@example.com", role: "user", status: "inactive", joined: "2023-04-18", lastActive: "2023-05-25", verified: true, posts: 7, premium: false },
  ];

  // Mock content data
  const mockContent = [
    { id: 1, title: "Nowy plac zabaw", author: "Anna Nowak", status: "published", date: "2023-05-01", views: 342, likes: 28, comments: 12 },
    { id: 2, title: "Zmiana godzin otwarcia urzędu", author: "Marek Wiśniewski", status: "draft", date: "2023-05-03", views: 0, likes: 0, comments: 0 },
    { id: 3, title: "Festyn miejski - zaproszenie", author: "Katarzyna Zielińska", status: "published", date: "2023-05-02", views: 521, likes: 47, comments: 23 },
    { id: 4, title: "Konkurs fotograficzny", author: "Jan Kowalski", status: "review", date: "2023-05-04", views: 0, likes: 0, comments: 0 },
  ];

  // Mock notifications
  const mockNotifications = [
    { id: 1, message: "Nowy użytkownik zarejestrowany", time: "2 godziny temu", type: "info", read: false },
    { id: 2, message: "Zgłoszono nieodpowiedni komentarz", time: "5 godzin temu", type: "warning", read: false },
    { id: 3, message: "Awaria systemu płatności", time: "1 dzień temu", type: "error", read: true },
    { id: 4, message: "Sukces - backup systemu wykonany", time: "2 dni temu", type: "success", read: true },
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

  const NotificationForm = () => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState('info');
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = () => {
      setLoading(true);
      setTimeout(() => {
        alert(`Wysłano powiadomienie: ${message} (typ: ${type})`);
        setMessage('');
        setType('info');
        setLoading(false);
      }, 1000);
    };
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wyślij powiadomienie</CardTitle>
          <CardDescription>Wyślij powiadomienie do wszystkich użytkowników.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notification-message">Wiadomość</Label>
            <Textarea
              id="notification-message"
              placeholder="Treść powiadomienia"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notification-type">Typ powiadomienia</Label>
            <Select value={type} onValueChange={setType}>
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
        </CardContent>
        <CardFooter className="border-t">
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Wysyłanie...
              </>
            ) : (
              "Wyślij powiadomienie"
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  const AnalyticsStats = () => (
    <Card>
      <CardHeader>
        <CardTitle>Statystyki</CardTitle>
        <CardDescription>Przegląd statystyk platformy.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Użytkownicy online</h3>
                <p className="text-sm text-muted-foreground">Ostatnie 5 minut</p>
              </div>
              <span className="text-2xl font-bold">23</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Nowe komentarze</h3>
                <p className="text-sm text-muted-foreground">Ostatnie 24 godziny</p>
              </div>
              <span className="text-2xl font-bold">126</span>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Aktywność użytkowników</h4>
          <BarChart className="h-32 w-full" />
        </div>
      </CardContent>
    </Card>
  );

  const SettingsNavigation = () => {
    const [activeSetting, setActiveSetting] = useState('general');
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ustawienia</CardTitle>
          <CardDescription>Konfiguracja ustawień portalu.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" active={activeSetting === 'general'} onClick={() => setActiveSetting('general')}>
              <Globe className="mr-2 h-4 w-4" />
              Ogólne
            </Button>
            <Button variant="ghost" className="w-full justify-start" active={activeSetting === 'security'} onClick={() => setActiveSetting('security')}>
              <Shield className="mr-2 h-4 w-4" />
              Bezpieczeństwo
            </Button>
            <Button variant="ghost" className="w-full justify-start" active={activeSetting === 'api'} onClick={() => setActiveSetting('api')}>
              <Key className="mr-2 h-4 w-4" />
              Integracje API
            </Button>
            <Button variant="ghost" className="w-full justify-start" active={activeSetting === 'appearance'} onClick={() => setActiveSetting('appearance')}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Wygląd
            </Button>
            <Button variant="ghost" className="w-full justify-start" active={activeSetting === 'premium'} onClick={() => setActiveSetting('premium')}>
              <CreditCard className="mr-2 h-4 w-4" />
              Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const GeneralSettingsForm = () => {
    const [portalName, setPortalName] = useState('Witnica.info');
    const [portalDescription, setPortalDescription] = useState('Portal miejski dla mieszkańców Witnicy');
    const [contactEmail, setContactEmail] = useState('kontakt@witnica.info');
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = () => {
      setLoading(true);
      setTimeout(() => {
        alert('Zapisano ustawienia ogólne!');
        setLoading(false);
      }, 1000);
    };
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ustawienia ogólne</CardTitle>
          <CardDescription>Konfiguracja podstawowych ustawień portalu.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="portal-name">Nazwa portalu</Label>
            <Input
              id="portal-name"
              placeholder="Nazwa portalu"
              value={portalName}
              onChange={(e) => setPortalName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="portal-description">Opis portalu</Label>
            <Textarea
              id="portal-description"
              placeholder="Opis portalu"
              value={portalDescription}
              onChange={(e) => setPortalDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email kontaktowy</Label>
            <Input
              id="contact-email"
              placeholder="Email kontaktowy"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t">
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Zapisywanie...
              </>
            ) : (
              "Zapisz ustawienia"
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  const SecuritySettingsForm = () => {
    const [passwordStrength, setPasswordStrength] = useState('medium');
    const [loginAttempts, setLoginAttempts] = useState(5);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = () => {
      setLoading(true);
      setTimeout(() => {
        alert('Zapisano ustawienia bezpieczeństwa!');
        setLoading(false);
      }, 1000);
    };
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ustawienia bezpieczeństwa</CardTitle>
          <CardDescription>Konfiguracja ustawień bezpieczeństwa portalu.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password-strength">Wymagana siła hasła</Label>
            <Select value={passwordStrength} onValueChange={setPasswordStrength}>
              <SelectTrigger id="password-strength">
                <SelectValue placeholder="Wybierz siłę hasła" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Niska</SelectItem>
                <SelectItem value="medium">Średnia</SelectItem>
                <SelectItem value="high">Wysoka</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-attempts">Limit prób logowania</Label>
            <Input
              id="login-attempts"
              placeholder="Limit prób logowania"
              type="number"
              value={loginAttempts}
              onChange={(e) => setLoginAttempts(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="two-factor-auth" className="cursor-pointer">Uwierzytelnianie dwuskładnikowe</Label>
            <Switch id="two-factor-auth" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
          </div>
        </CardContent>
        <CardFooter className="border-t">
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Zapisywanie...
              </>
            ) : (
              "Zapisz ustawienia"
            )}
          </Button>
        </CardFooter>
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
            <div className="flex items-center gap-2">
              <NotificationsMenu />
              <Button>
                <Shield className="mr-2 h-4 w-4" />
                Dziennik zdarzeń
              </Button>
            </div>
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
        
        {/* Global Search and Quick Actions */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Szukaj użytkowników, treści, ustawień..." 
              className="pl-10 w-[300px] md:w-[400px]" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <kbd className="absolute top-1/2 transform -translate-y-1/2 right-3 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowAiGenerator(!showAiGenerator)}>
              <Sparkles className="mr-2 h-4 w-4" />
              {showAiGenerator ? 'Ukryj generator AI' : 'Generator AI'}
            </Button>
          </div>
        </div>
        
        {/* AI Content Generator (toggleable) */}
        {showAiGenerator && (
          <div className="mb-8">
            <ContentGenerator isPremium={true} />
          </div>
        )}

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
