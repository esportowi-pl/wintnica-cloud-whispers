
import React from 'react';
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileMenuToggle = () => {
  return (
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu />
    </Button>
  );
};

export default MobileMenuToggle;
