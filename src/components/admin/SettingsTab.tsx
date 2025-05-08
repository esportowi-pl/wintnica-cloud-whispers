
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ColorPicker } from '@/components/admin/ColorPicker';
import { toast } from "sonner";
import { Settings, Palette, Shield, Bell, Mail } from 'lucide-react';

const SettingsTab: React.FC = () => {
  const [siteName, setSiteName] = useState("Witnica.info");
  const [siteDescription, setSiteDescription] = useState("Portal miejski dla mieszkańców Witnicy");
  const [contactEmail, setContactEmail] = useState("kontakt@witnica.info");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [passwordStrength, setPasswordStrength] = useState("medium");
  const [loginAttempts, setLoginAttempts] = useState("5");
  const [requireEmailVerification, setRequireEmailVerification] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [commentsRequireApproval, setCommentsRequireApproval] = useState(false);

  const handleSaveSettings = () => {
    // In a real app, this would save settings to a backend
    toast.success("Ustawienia zostały zapisane!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ustawienia portalu</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings size={16} />
              <span>Ogólne</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette size={16} />
              <span>Wygląd</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield size={16} />
              <span>Bezpieczeństwo</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} />
              <span>Powiadomienia</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">Podstawowe informacje</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>Nazwa portalu</div>
                  <div className="col-span-2">
                    <Input 
                      value={siteName} 
                      onChange={(e) => setSiteName(e.target.value)} 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>Opis portalu</div>
                  <div className="col-span-2">
                    <Textarea 
                      value={siteDescription} 
                      onChange={(e) => setSiteDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>Email kontaktowy</div>
                  <div className="col-span-2">
                    <Input 
                      value={contactEmail} 
                      onChange={(e) => setContactEmail(e.target.value)} 
                      type="email"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium mb-2">Moderacja treści</h3>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="comments-approval" 
                    checked={commentsRequireApproval}
                    onCheckedChange={setCommentsRequireApproval}
                  />
                  <Label htmlFor="comments-approval">Komentarze wymagają zatwierdzenia</Label>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">Kolory</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>Kolor podstawowy</div>
                <div className="col-span-2">
                  <ColorPicker 
                    color={primaryColor}
                    onChange={setPrimaryColor} 
                  />
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-2">Czcionki</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>Czcionka nagłówków</div>
                <div className="col-span-2">
                  <Select defaultValue="inter">
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz czcionkę" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                      <SelectItem value="lato">Lato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">Ustawienia kont</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>Wymagana siła hasła</div>
                <div className="col-span-2">
                  <Select 
                    value={passwordStrength} 
                    onValueChange={setPasswordStrength}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz siłę hasła" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Niska</SelectItem>
                      <SelectItem value="medium">Średnia</SelectItem>
                      <SelectItem value="high">Wysoka</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>Limit prób logowania</div>
                <div className="col-span-2">
                  <Input 
                    type="number" 
                    value={loginAttempts}
                    onChange={(e) => setLoginAttempts(e.target.value)}
                    min="1"
                    max="10"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="email-verification" 
                  checked={requireEmailVerification}
                  onCheckedChange={setRequireEmailVerification}
                />
                <Label htmlFor="email-verification">Wymagaj weryfikacji email</Label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">Powiadomienia systemowe</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enable-notifications" 
                  checked={enableNotifications}
                  onCheckedChange={setEnableNotifications}
                />
                <Label htmlFor="enable-notifications">Włącz powiadomienia</Label>
              </div>
              
              <h3 className="text-lg font-medium mb-2">Konfiguracja poczty</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>Serwer SMTP</div>
                <div className="col-span-2">
                  <Input placeholder="smtp.example.com" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>Port</div>
                <div className="col-span-2">
                  <Input placeholder="587" type="number" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>Nazwa użytkownika</div>
                <div className="col-span-2">
                  <Input placeholder="user@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>Hasło</div>
                <div className="col-span-2">
                  <Input placeholder="••••••••" type="password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Testuj połączenie
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-6">
          <Button onClick={handleSaveSettings}>Zapisz ustawienia</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
