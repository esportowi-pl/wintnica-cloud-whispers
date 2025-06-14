
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SkyHeader from '@/components/layout/SkyHeader';
import Footer from '@/components/layout/Footer';
import NewsSection from '@/components/news/NewsSection';
import WeatherWidget from '@/components/weather/WeatherWidget';
import WeatherAPI from '@/components/weather/WeatherAPI';
import CityStatsWidget from '@/components/home/CityStatsWidget';
import RecentClassifieds from '@/components/home/RecentClassifieds';
import RecommendedUsers from '@/components/home/RecommendedUsers';
import LocalMap from '@/components/maps/LocalMap';
import ActivityFeed from '@/components/social/ActivityFeed';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Calendar, ShoppingBag, Users, MapPin, Monitor, Camera, Coffee, Palette } from "lucide-react";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SkyHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Witaj w Witnica.info!</h1>
          <p className="text-xl text-gray-600 mb-8">Twoje lokalne centrum społecznościowe</p>
          
          {/* Desktop Mode Button */}
          <div className="mb-6">
            <Link to="/desktop">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Monitor className="h-5 w-5 mr-2" />
                Przejdź do trybu Desktop
              </Button>
            </Link>
          </div>

          {/* Test Homepage Variants */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
              <Palette className="h-5 w-5" />
              Testowe warianty strony głównej
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Link to="/test-home-v1">
                <Button variant="outline" size="sm" className="w-full">
                  Minimal
                </Button>
              </Link>
              <Link to="/test-home-v2">
                <Button variant="outline" size="sm" className="w-full">
                  Glass
                </Button>
              </Link>
              <Link to="/test-home-v3">
                <Button variant="outline" size="sm" className="w-full">
                  3D
                </Button>
              </Link>
              <Link to="/test-home-v4">
                <Button variant="outline" size="sm" className="w-full">
                  Mobile
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link to="/randki">
              <Button className="w-full h-20 flex flex-col gap-2">
                <Heart className="h-6 w-6" />
                <span className="text-sm">Randki</span>
              </Button>
            </Link>
            <Link to="/chat">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <MessageCircle className="h-6 w-6" />
                <span className="text-sm">Chat</span>
              </Button>
            </Link>
            <Link to="/wydarzenia">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Wydarzenia</span>
              </Button>
            </Link>
            <Link to="/rynek">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <ShoppingBag className="h-6 w-6" />
                <span className="text-sm">Rynek</span>
              </Button>
            </Link>
            <Link to="/galeria">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Camera className="h-6 w-6" />
                <span className="text-sm">Galeria</span>
              </Button>
            </Link>
            <Link to="/rekreacja">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Users className="h-6 w-6" />
                <span className="text-sm">Rekreacja</span>
              </Button>
            </Link>
            <Link to="/browar">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Coffee className="h-6 w-6" />
                <span className="text-sm">Browar</span>
              </Button>
            </Link>
            <Link to="/grupy">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Users className="h-6 w-6" />
                <span className="text-sm">Grupy</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Aktualności */}
            <NewsSection />
            
            {/* Mapa lokalna */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Mapa Witnicy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LocalMap />
              </CardContent>
            </Card>
            
            {/* Feed aktywności */}
            <ActivityFeed />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Pogoda */}
            <WeatherAPI />
            
            {/* Statystyki miasta */}
            <CityStatsWidget />
            
            {/* Najnowsze ogłoszenia */}
            <RecentClassifieds />
            
            {/* Polecani użytkownicy */}
            <RecommendedUsers />
            
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Szybkie linki</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/groups">
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Grupy lokalne
                  </Button>
                </Link>
                <Link to="/gazeta">
                  <Button variant="ghost" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Gazeta miejska
                  </Button>
                </Link>
                <Link to="/premium">
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    Premium
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
