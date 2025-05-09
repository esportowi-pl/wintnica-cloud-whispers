
import React from 'react';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail } from 'lucide-react';

interface NotificationSettingsProps {
  enableNotifications: boolean;
  setEnableNotifications: (value: boolean) => void;
}

const NotificationSettingsTab: React.FC<NotificationSettingsProps> = ({
  enableNotifications,
  setEnableNotifications
}) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default NotificationSettingsTab;
