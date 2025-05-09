
import React from 'react';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SecuritySettingsProps {
  passwordStrength: string;
  setPasswordStrength: (value: string) => void;
  loginAttempts: string;
  setLoginAttempts: (value: string) => void;
  requireEmailVerification: boolean;
  setRequireEmailVerification: (value: boolean) => void;
}

const SecuritySettingsTab: React.FC<SecuritySettingsProps> = ({
  passwordStrength,
  setPasswordStrength,
  loginAttempts,
  setLoginAttempts,
  requireEmailVerification,
  setRequireEmailVerification
}) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default SecuritySettingsTab;
