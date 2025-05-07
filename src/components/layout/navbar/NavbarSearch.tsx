
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const NavbarSearch = () => {
  return (
    <div className="relative flex-grow max-w-xs">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <Input 
        placeholder="Szukaj..." 
        className="pl-10 pr-4 py-2 w-full"
      />
    </div>
  );
};

export default NavbarSearch;
