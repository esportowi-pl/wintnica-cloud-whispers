
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Settings, FileText, Bell, Search } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const AdminPanelPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active": return <Badge className="bg-green-500">Aktywny</Badge>;
      case "suspended": return <Badge className="bg-red-500">Zawieszony</Badge>;
      case "inactive": return <Badge className="bg-gray-500">Nieaktywny</Badge>;
      case "published": return <Badge className="bg-green-500">Opublikowany</Badge>;
      case "draft": return <Badge variant="outline">Szkic</Badge>;
      case "review": return <Badge variant="secondary">Do weryfikacji</Badge>;
      case "info": return <Badge variant="secondary">Informacja</Badge>;
      case "warning": return <Badge className="bg-yellow-500">Ostrzeżenie</Badge>;
      case "error": return <Badge className="bg-red-500">Błąd</Badge>;
      case "success": return <Badge className="bg-green-500">Sukces</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Panel Administracyjny</h1>
        
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Szukaj użytkowników, treści, ustawień..." 
              className="pl-10 w-full max-w-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Zarządzanie użytkownikami</span>
                  <Button>Dodaj użytkownika</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nazwa użytkownika</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rola</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data dołączenia</TableHead>
                      <TableHead>Akcje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{user.joined}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edytuj</Button>
                            <Button variant="destructive" size="sm">Usuń</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Zarządzanie treściami</span>
                  <Button>Dodaj treść</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tytuł</TableHead>
                      <TableHead>Autor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Wyświetlenia</TableHead>
                      <TableHead>Akcje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockContent.map((content) => (
                      <TableRow key={content.id}>
                        <TableCell>{content.id}</TableCell>
                        <TableCell>{content.title}</TableCell>
                        <TableCell>{content.author}</TableCell>
                        <TableCell>{getStatusBadge(content.status)}</TableCell>
                        <TableCell>{content.date}</TableCell>
                        <TableCell>{content.views}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edytuj</Button>
                            <Button variant="destructive" size="sm">Usuń</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Powiadomienia systemowe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNotifications.map((notification) => (
                    <div key={notification.id} className="flex items-start justify-between border-b pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(notification.type)}
                          <span className="font-medium">{notification.message}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{notification.time}</span>
                      </div>
                      <Button variant="ghost" size="sm">Oznacz jako przeczytane</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Ustawienia portalu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Ogólne</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div>Nazwa portalu</div>
                        <div className="col-span-2">
                          <Input defaultValue="Witnica.info" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>Opis portalu</div>
                        <div className="col-span-2">
                          <Input defaultValue="Portal miejski dla mieszkańców Witnicy" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>Email kontaktowy</div>
                        <div className="col-span-2">
                          <Input defaultValue="kontakt@witnica.info" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Bezpieczeństwo</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div>Wymagana siła hasła</div>
                        <div className="col-span-2">
                          <select className="w-full border rounded-md p-2">
                            <option>Niska</option>
                            <option selected>Średnia</option>
                            <option>Wysoka</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>Limit prób logowania</div>
                        <div className="col-span-2">
                          <Input type="number" defaultValue="5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Zapisz ustawienia</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminPanelPage;
