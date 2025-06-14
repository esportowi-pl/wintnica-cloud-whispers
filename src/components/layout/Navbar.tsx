
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  MessageSquare, 
  Heart, 
  ShoppingBag, 
  Calendar, 
  Users, 
  Newspaper,
  User,
  LogOut,
  LogIn,
  Camera,
  MapPin,
  Coffee,
  Gamepad2
} from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/auth/AuthModal";
import NavbarNotifications from "@/components/layout/navbar/NavbarNotifications";
import MobileHamburgerMenu from "@/components/layout/navbar/MobileHamburgerMenu";
import { toast } from "sonner";

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Wylogowano pomyślnie");
  };

  const navigation = [
    { name: 'Główna', href: '/', icon: Home },
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'Randki', href: '/randki', icon: Heart, badge: 'HOT' },
    { name: 'Rynek', href: '/rynek', icon: ShoppingBag },
    { name: 'Wydarzenia', href: '/wydarzenia', icon: Calendar },
    { name: 'Grupy', href: '/grupy', icon: Users },
    { name: 'Gazeta', href: '/gazeta', icon: Newspaper },
    { name: 'Galeria', href: '/galeria', icon: Camera },
    { name: 'Rekreacja', href: '/rekreacja', icon: Gamepad2 },
    { name: 'Browar', href: '/browar', icon: Coffee },
    { name: 'Mapa', href: '/mapa', icon: MapPin }
  ];

  return (
    <>
      <nav className="bg-white shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              {/* Mobile Hamburger Menu */}
              <MobileHamburgerMenu />
              
              {/* Logo */}
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Witnica.info
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 overflow-x-auto">
              {navigation.slice(0, 8).map((item) => (
                <Link key={item.name} to={item.href}>
                  <Button 
                    variant="ghost" 
                    className="relative flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors whitespace-nowrap"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                    {item.badge && (
                      <Badge className="ml-1 bg-red-500 text-white text-xs px-1 py-0">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <NavbarNotifications />
                  <span className="text-sm font-medium text-gray-700">
                    Witaj, {user.email?.split('@')[0]}!
                  </span>
                  <Link to="/profile">
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Profil
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Wyloguj
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsAuthModalOpen(true)}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Zaloguj się
                </Button>
              )}
            </div>

            {/* Mobile Auth Button */}
            <div className="md:hidden flex items-center">
              {user ? (
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setIsAuthModalOpen(true)}>
                  <LogIn className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
