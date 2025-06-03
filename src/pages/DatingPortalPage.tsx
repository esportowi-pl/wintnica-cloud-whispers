
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DatingApp from '@/components/dating/DatingApp';

const DatingPortalPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-red-50">
      <Navbar />
      
      <main className="flex-grow">
        <DatingApp />
      </main>
      
      <Footer />
    </div>
  );
};

export default DatingPortalPage;
