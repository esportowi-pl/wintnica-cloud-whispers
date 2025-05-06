
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SkyHeader from '@/components/layout/SkyHeader';
import NewsSection from '@/components/news/NewsSection';
import ClassifiedList from '@/components/classifieds/ClassifiedList';
import TweetForm from '@/components/social/TweetForm';
import WeatherWidget from '@/components/weather/WeatherWidget';
import EventsCalendar from '@/components/events/EventsCalendar';
import AdsSlider from '@/components/classifieds/AdsSlider';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SkyHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Top Section - News with Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <NewsSection />
          </div>
          <div className="lg:col-span-1">
            <WeatherWidget />
          </div>
        </div>
        
        {/* Middle Section - Ads Slider */}
        <div className="mb-10">
          <AdsSlider />
        </div>
        
        {/* Bottom Section - Calendar and Social */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EventsCalendar />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <TweetForm />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
