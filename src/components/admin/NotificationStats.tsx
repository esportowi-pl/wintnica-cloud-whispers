
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const NotificationStats: React.FC = () => {
  return (
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
  );
};

export default NotificationStats;
