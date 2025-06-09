
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SkillExchange from '@/components/social/SkillExchange';

const RekreacjaPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <SkillExchange />
      </main>
      
      <Footer />
    </div>
  );
};

export default RekreacjaPage;
