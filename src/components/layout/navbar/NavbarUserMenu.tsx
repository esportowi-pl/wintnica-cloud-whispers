
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavbarUserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="pl-2 pr-3" size="sm">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground">JK</AvatarFallback>
          </Avatar>
          <span className="hidden sm:block">Jan Kowalski</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/dashboard" className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/user" className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Mój profil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/premium" className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Premium</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/admin" className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Panel administratora</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/logout" className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Wyloguj się</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUserMenu;
