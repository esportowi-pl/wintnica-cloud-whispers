
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Users } from "lucide-react";

const NavbarActionIcons = () => {
  return (
    <>
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
    </>
  );
};

export default NavbarActionIcons;
