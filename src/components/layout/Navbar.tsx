
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, User, Bell, Menu, ShoppingCart, Users } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-auto justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Witnica.info
          </Link>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
          
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Informacje</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link to="/news" className="flex flex-col h-full p-6 bg-muted rounded-md hover:bg-muted/80">
                            <div className="text-lg font-medium mb-2">Witnica News</div>
                            <p className="text-sm text-muted-foreground">Najświeższe wiadomości z miasta i okolic.</p>
                            <div className="mt-4 text-sm font-medium">Sprawdź aktualności →</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/wydarzenia" className="block p-3 hover:bg-muted rounded-md">
                            <div className="font-medium mb-1">Wydarzenia</div>
                            <p className="text-sm text-muted-foreground">Kalendarz imprez i wydarzeń lokalnych.</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/ogloszenia" className="block p-3 hover:bg-muted rounded-md">
                            <div className="font-medium mb-1">Ogłoszenia</div>
                            <p className="text-sm text-muted-foreground">Lokalne oferty, kupię/sprzedam.</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/galeria" className="block p-3 hover:bg-muted rounded-md">
                            <div className="font-medium mb-1">Galeria</div>
                            <p className="text-sm text-muted-foreground">Zdjęcia z miasta i wydarzeń.</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Społeczność</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/chat" className="block p-3 hover:bg-muted rounded-md">
                            <div className="font-medium mb-1">Chat miejski</div>
                            <p className="text-sm text-muted-foreground">Porozmawiaj z mieszkańcami Witnicy.</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/randki" className="block p-3 hover:bg-muted rounded-md">
                            <div className="font-medium mb-1">Witnica Randki</div>
                            <p className="text-sm text-muted-foreground">Poznaj interesujące osoby w okolicy.</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/grupy" className="block p-3 hover:bg-muted rounded-md">
                            <div className="font-medium mb-1">Grupy lokalne</div>
                            <p className="text-sm text-muted-foreground">Dołącz do grup zainteresowań.</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/forum" className="block p-3 hover:bg-muted rounded-md">
                            <div className="font-medium mb-1">Forum</div>
                            <p className="text-sm text-muted-foreground">Dyskusje na lokalne tematy.</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Rynek lokalny</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link to="/rynek" className="flex flex-col h-full p-6 bg-muted rounded-md hover:bg-muted/80">
                            <div className="text-lg font-medium mb-2">Rynek lokalny</div>
                            <p className="text-sm text-muted-foreground">Sprzedawaj, kupuj lub wymieniaj towary lokalnie. Stragan online dla mieszkańców Witnicy.</p>
                            <div className="mt-4 text-sm font-medium">Przejdź do rynku →</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/rynek?type=sprzedam" className="block p-3 hover:bg-muted rounded-md">
                            <div className="font-medium mb-1">Sprzedam</div>
                            <p className="text-sm text-muted-foreground">Przeglądaj oferty sprzedaży.</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/rynek?type=oddam" className="block p-3 hover:bg-muted rounded-md">
                            <div className="font-medium mb-1">Oddam</div>
                            <p className="text-sm text-muted-foreground">Zobacz rzeczy do oddania za darmo.</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/rynek?type=zamienie" className="block p-3 hover:bg-muted rounded-md">
                            <div className="font-medium mb-1">Zamienię</div>
                            <p className="text-sm text-muted-foreground">Oferty wymiany.</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/rynek?type=kupie" className="block p-3 hover:bg-muted rounded-md">
                            <div className="font-medium mb-1">Kupię</div>
                            <p className="text-sm text-muted-foreground">Poszukiwane przedmioty.</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/premium" className="font-medium text-sm rounded-md transition-colors flex items-center justify-center h-10 w-max px-4 hover:bg-accent hover:text-accent-foreground">
                    Premium
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="relative flex-grow max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Szukaj..." 
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Link to="/rynek">
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Link to="/grupy">
              <Users size={20} />
            </Link>
          </Button>
          
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
