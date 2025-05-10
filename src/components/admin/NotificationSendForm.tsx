
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const NotificationSendForm: React.FC = () => {
  return (
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
  );
};

export default NotificationSendForm;
