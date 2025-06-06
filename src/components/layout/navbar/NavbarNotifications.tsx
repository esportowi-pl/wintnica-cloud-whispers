
import React, { useState, useEffect } from 'react';
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from 'react-router-dom';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
  link?: string;
}

const NavbarNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Mock notifications - w rzeczywistości pobierałbyś z API/Supabase
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Nowy artykuł',
        message: 'Dodano nowy artykuł "Remont placu zabaw"',
        time: '2 godziny temu',
        read: false,
        type: 'info',
        link: '/article/1'
      },
      {
        id: '2',
        title: 'Nowe wydarzenie',
        message: 'Dodano wydarzenie "Festyn miejski" w Twoim kalendarzu',
        time: 'wczoraj',
        read: false,
        type: 'success',
        link: '/events'
      },
      {
        id: '3',
        title: 'Nowa wiadomość',
        message: 'Otrzymałeś wiadomość od użytkownika Anna',
        time: '2 dni temu',
        read: true,
        type: 'info',
        link: '/chat'
      },
      {
        id: '4',
        title: 'Dopasowanie randkowe',
        message: 'Masz nowe dopasowanie! Sprawdź swój profil.',
        time: '3 dni temu',
        read: false,
        type: 'success',
        link: '/dating'
      },
      {
        id: '5',
        title: 'Nowe ogłoszenie',
        message: 'Ktoś dodał ogłoszenie w Twojej okolicy',
        time: '5 dni temu',
        read: true,
        type: 'info',
        link: '/rynek'
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'info':
      default: return 'ℹ️';
    }
  };

  const formatTime = (time: string) => {
    // W rzeczywistości używałbyś biblioteki date-fns lub podobnej
    return time;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-3">
          <DropdownMenuLabel className="p-0">Powiadomienia</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs h-auto p-1"
            >
              Oznacz wszystkie
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        
        <ScrollArea className="max-h-80">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                className="p-0 cursor-pointer focus:bg-muted"
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <div className={`w-full p-3 ${!notification.read ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium text-sm ${!notification.read ? 'text-blue-900' : 'text-gray-900'}`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {formatTime(notification.time)}
                        </span>
                        {notification.link && (
                          <Link 
                            to={notification.link}
                            className="text-xs text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Zobacz więcej
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-6 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Brak powiadomień
              </p>
            </div>
          )}
        </ScrollArea>
        
        <DropdownMenuSeparator />
        <div className="p-2 text-center">
          <Link to="/notifications" className="text-sm text-primary hover:underline">
            Zobacz wszystkie powiadomienia
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarNotifications;
