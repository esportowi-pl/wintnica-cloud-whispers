
import React from 'react';
import NavbarLogo from './navbar/NavbarLogo';
import MobileMenuToggle from './navbar/MobileMenuToggle';
import NavbarMainMenu from './navbar/NavbarMainMenu';
import NavbarSearch from './navbar/NavbarSearch';
import NavbarActionIcons from './navbar/NavbarActionIcons';
import NavbarNotifications from './navbar/NavbarNotifications';
import NavbarUserMenu from './navbar/NavbarUserMenu';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-auto justify-between">
          <NavbarLogo />
          
          <MobileMenuToggle />
          
          <div className="hidden md:flex">
            <NavbarMainMenu />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <NavbarSearch />
          
          <NavbarActionIcons />
          
          <NavbarNotifications />
          
          <NavbarUserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
