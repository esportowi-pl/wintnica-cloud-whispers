
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SkyHeader from '@/components/layout/SkyHeader';
import NewsSection from '@/components/news/NewsSection';
import ClassifiedList from '@/components/classifieds/ClassifiedList';
import TweetForm from '@/components/social/TweetForm';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SkyHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <NewsSection />
            <ClassifiedList />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <TweetForm />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">O Witnicy.info</h3>
              <p className="text-gray-600">
                Portal informacyjny dla mieszkańców miasta i gminy Witnica.
                Aktualności, ogłoszenia, wydarzenia, galeria i społeczność.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Kontakt</h3>
              <p className="text-gray-600">
                Email: kontakt@witnica.info<br />
                Tel: 123 456 789<br />
                Adres: ul. Przykładowa 1, Witnica
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Śledź nas</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-primary">Facebook</a>
                <a href="#" className="text-gray-600 hover:text-primary">Twitter</a>
                <a href="#" className="text-gray-600 hover:text-primary">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
            &copy; 2025 Witnica.info - Wszelkie prawa zastrzeżone
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
