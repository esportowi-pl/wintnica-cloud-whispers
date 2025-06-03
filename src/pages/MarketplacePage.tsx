
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnhancedMarketplace from '@/components/marketplace/EnhancedMarketplace';

const MarketplacePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <EnhancedMarketplace />
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketplacePage;
