
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Home, 
  MessageSquare, 
  Heart, 
  ShoppingBag, 
  Calendar, 
  Users, 
  Newspaper,
  Camera,
  MapPin,
  Coffee,
  Gamepad2,
  Monitor,
  Tv,
  Radio,
  Sparkles,
  Mic
} from 'lucide-react';

const MobileHamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Główna', href: '/', icon: Home },
    { name: 'Desktop Mode', href: '/desktop', icon: Monitor, badge: 'NEW' },
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'Randki', href: '/randki', icon: Heart, badge: 'HOT' },
    { name: 'Rynek', href: '/rynek', icon: ShoppingBag },
    { name: 'Wydarzenia', href: '/wydarzenia', icon: Calendar },
    { name: 'Grupy', href: '/grupy', icon: Users },
    { name: 'Gazeta', href: '/gazeta', icon: Newspaper },
    { name: 'Galeria', href: '/galeria', icon: Camera },
    { name: 'Rekreacja', href: '/rekreacja', icon: Gamepad2 },
    { name: 'Browar', href: '/browar', icon: Coffee },
    { name: 'Mapa', href: '/mapa', icon: MapPin },
    { name: 'TV', href: '/tv', icon: Tv, badge: 'LIVE' },
    { name: 'Live', href: '/live', icon: Radio, badge: 'NEW' },
    { name: 'Gaming', href: '/gaming', icon: Gamepad2 },
    { name: 'Strumyki', href: '/strumyki', icon: Sparkles },
    { name: 'Szepty', href: '/szepty', icon: Mic }
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Otwórz menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 sm:w-96">
        <SheetHeader>
          <SheetTitle className="text-left">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Witnica.info
            </span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-2 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={handleLinkClick}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
            >
              <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="font-medium group-hover:text-foreground transition-colors flex-1">
                {item.name}
              </span>
              {item.badge && (
                <Badge 
                  variant={item.badge === 'HOT' ? 'destructive' : item.badge === 'LIVE' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>
        
        <div className="mt-8 pt-4 border-t">
          <div className="text-xs text-muted-foreground text-center">
            Witnica.info v2.0 - Społeczność przyszłości
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHamburgerMenu;
