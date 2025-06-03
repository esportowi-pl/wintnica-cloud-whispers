
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  Home, 
  MessageSquare, 
  Heart, 
  ShoppingBag, 
  Calendar, 
  Users, 
  Newspaper,
  User,
  LogOut,
  LogIn
} from 'lucide-react';
import { useAuth } from "@/components/auth/AuthProvider";
import AuthModal from "@/components/auth/AuthModal";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Wylogowano pomyślnie");
  };

  const navigation = [
    { name: 'Główna', href: '/', icon: Home },
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'Randki', href: '/dating', icon: Heart, badge: 'HOT' },
    { name: 'Rynek', href: '/rynek', icon: ShoppingBag },
    { name: 'Wydarzenia', href: '/events', icon: Calendar },
    { name: 'Grupy', href: '/groups', icon: Users },
    { name: 'Gazeta', href: '/gazeta', icon: Newspaper },
  ];

  return (
    <>
      <nav className="bg-white shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Witnicy
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link key={item.name} to={item.href}>
                  <Button 
                    variant="ghost" 
                    className="relative flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
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

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-40">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                  {item.badge && (
                    <Badge className="bg-red-500 text-white text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
              
              <div className="border-t pt-4 mt-4">
                {user ? (
                  <>
                    <p className="px-3 py-2 text-sm text-gray-600">
                      Zalogowany jako: {user.email?.split('@')[0]}
                    </p>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      Profil
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 w-full"
                    >
                      <LogOut className="h-5 w-5" />
                      Wyloguj się
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50 w-full"
                  >
                    <LogIn className="h-5 w-5" />
                    Zaloguj się
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
