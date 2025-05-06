
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold text-primary">
            Witnica.info
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/aktualnosci" className="hover:text-primary">Aktualności</Link>
            <Link to="/ogloszenia" className="hover:text-primary">Ogłoszenia</Link>
            <Link to="/wydarzenia" className="hover:text-primary">Wydarzenia</Link>
            <Link to="/galeria" className="hover:text-primary">Galeria</Link>
            <Link to="/chat" className="hover:text-primary">Chat</Link>
          </div>
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="relative flex-grow">
            <Input 
              placeholder="Szukaj..." 
              className="pl-10 pr-4 py-2 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <Button variant="outline">Logowanie</Button>
          <Button>Rejestracja</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
