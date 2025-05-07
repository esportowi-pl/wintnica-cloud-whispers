
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const NavbarMainMenu = () => {
  return (
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
  );
};

export default NavbarMainMenu;
