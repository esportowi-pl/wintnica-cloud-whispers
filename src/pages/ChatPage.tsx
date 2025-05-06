
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SkyHeader from '@/components/layout/SkyHeader';
import ChatBox from '@/components/chat/ChatBox';
import Footer from '@/components/layout/Footer';

const ChatPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SkyHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Czat Mieszkańców Witnicy</h1>
          <p className="text-gray-600 mb-8 text-center">
            Dołącz do rozmowy z innymi mieszkańcami naszego miasta. 
            Pamiętaj o zachowaniu kultury wypowiedzi!
          </p>
          
          <ChatBox />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatPage;
