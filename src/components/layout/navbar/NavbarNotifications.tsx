
import React from 'react';
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';

const NavbarNotifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Powiadomienia</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          <DropdownMenuItem className="p-3 cursor-pointer">
            <div>
              <div className="font-medium">Nowy artykuł</div>
              <p className="text-sm text-muted-foreground">Dodano nowy artykuł "Remont placu zabaw"</p>
              <div className="text-xs text-muted-foreground mt-1">2 godziny temu</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-3 cursor-pointer">
            <div>
              <div className="font-medium">Nowe wydarzenie</div>
              <p className="text-sm text-muted-foreground">Dodano wydarzenie "Festyn miejski" w Twoim kalendarzu</p>
              <div className="text-xs text-muted-foreground mt-1">wczoraj</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-3 cursor-pointer">
            <div>
              <div className="font-medium">Nowa wiadomość</div>
              <p className="text-sm text-muted-foreground">Otrzymałeś wiadomość od użytkownika Anna</p>
              <div className="text-xs text-muted-foreground mt-1">2 dni temu</div>
            </div>
          </DropdownMenuItem>
        </div>
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
