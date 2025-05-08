
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const NavbarLogo: React.FC = () => {
  // This query would normally fetch from your backend
  // Currently using a static value until connected to a real backend
  const { data: siteSettings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      // Placeholder for actual API call
      return { siteName: "Witnica.info" };
    },
    // Disable refetching to prevent unnecessary requests during development
    staleTime: Infinity,
  });

  return (
    <Link to="/" className="text-2xl font-bold text-primary">
      {siteSettings?.siteName || "Witnica.info"}
    </Link>
  );
};

export default NavbarLogo;
