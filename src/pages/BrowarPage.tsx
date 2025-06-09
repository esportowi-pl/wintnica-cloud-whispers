
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EmotionalSupportCenter from '@/components/social/EmotionalSupportCenter';

const BrowarPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Browar Witnicy</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Miejsce spotkań, rozmów i budowania więzi społecznych. 
              Tutaj mieszkańcy mogą się poznać, porozmawiać i wspólnie spędzić czas.
            </p>
          </div>
          <EmotionalSupportCenter />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrowarPage;
