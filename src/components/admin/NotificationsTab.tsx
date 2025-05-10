
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, AlertCircle, XCircle, CheckCircle } from 'lucide-react';
import { Notification } from './types/notification';

interface NotificationsTabProps {
  notifications: Notification[];
  getStatusBadge: (status: string) => React.ReactNode;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({ notifications, getStatusBadge }) => {
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

  return (
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
            {notifications.map((notification) => (
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
  );
};

export default NotificationsTab;
