
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

type Tweet = {
  id: number;
  author: string;
  content: string;
  timestamp: string;
};

const mockTweets: Tweet[] = [
  { id: 1, author: 'JanKowalski', content: 'Dzisiaj piękna pogoda w Witnicy! Warto wybrać się na spacer do parku.', timestamp: '10 min temu' },
  { id: 2, author: 'AnnaW', content: 'Uwaga! Zamknięta droga na ul. Konopnickiej z powodu remontu.', timestamp: '25 min temu' },
  { id: 3, author: 'MariuszT', content: 'Kto się wybiera na jutrzejszy festyn?', timestamp: '1 godz temu' },
  { id: 4, author: 'KasiaZ', content: 'Polecam nową kawiarnię przy rynku - świetne ciasta!', timestamp: '2 godz temu' },
  { id: 5, author: 'PiotrN', content: 'Szukam ekipy do remontu. Macie kogoś do polecenia?', timestamp: '3 godz temu' },
];

const SkyHeader = () => {
  const [visibleTweet, setVisibleTweet] = useState<number | null>(null);

  const pigeonVariants = {
    rest: { y: 0 },
    hover: { y: -10, transition: { duration: 0.3 } }
  };

  return (
    <div className="sky-gradient py-8 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-white text-xl font-bold">Witnica Szeptem</h2>
          <MessageCircle className="ml-2 text-white" size={20} />
        </div>
        
        <div className="flex justify-around">
          {mockTweets.map((tweet, index) => (
            <div key={tweet.id} className="relative">
              <motion.div 
                className="w-12 h-12"
                variants={pigeonVariants}
                initial="rest"
                whileHover="hover"
                onClick={() => setVisibleTweet(visibleTweet === tweet.id ? null : tweet.id)}
              >
                <svg viewBox="0 0 24 24" className="pigeon w-full h-full" fill="white">
                  <path d="M21.34,10.35l-5.03,5.03L15.01,20H9v-6l-4.3-4.3C3.89,8.89,4.07,7.31,5,6.38V6.38c0.93-0.93,2.51-0.75,3.32,0.07 L13,11h2V7.78c0-0.61-0.23-1.2-0.65-1.62l-2-2c-0.44-0.44-0.44-1.16,0-1.6c0.44-0.44,1.16-0.44,1.6,0l2,2 c0.88,0.88,1.37,2.06,1.37,3.32V11h2.52c0.61,0,1.18,0.28,1.56,0.75C21.95,12.46,21.94,9.76,21.34,10.35z"/>
                </svg>
                
                <div className={`pigeon-message ${visibleTweet === tweet.id ? 'visible opacity-100 translate-y-0' : ''}`}>
                  <div className="font-bold text-gray-800">{tweet.author}</div>
                  <p className="text-gray-600 text-sm">{tweet.content}</p>
                  <div className="text-gray-400 text-xs mt-1">{tweet.timestamp}</div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkyHeader;
