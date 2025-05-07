
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Notification {
  id: number;
  message: string;
  time: string;
  type: string;
}

interface NotificationsTabProps {
  notifications: Notification[];
  getStatusBadge: (status: string) => React.ReactNode;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({ notifications, getStatusBadge }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Powiadomienia systemowe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
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
  );
};

export default NotificationsTab;
