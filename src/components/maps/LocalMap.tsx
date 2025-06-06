
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Zap, Users, Calendar, ShoppingBag } from 'lucide-react';

interface MapMarker {
  id: string;
  name: string;
  type: 'event' | 'business' | 'landmark' | 'marketplace';
  lat: number;
  lng: number;
  description: string;
  icon: any;
  color: string;
}

export default function LocalMap() {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 52.9045, lng: 14.6386 }); // Współrzędne Witnicy

  // Przykładowe markery dla Witnicy
  const markers: MapMarker[] = [
    {
      id: '1',
      name: 'Rynek Miasta',
      type: 'landmark',
      lat: 52.9045,
      lng: 14.6386,
      description: 'Główny rynek w centrum Witnicy',
      icon: MapPin,
      color: 'blue'
    },
    {
      id: '2',
      name: 'Dom Kultury',
      type: 'event',
      lat: 52.9055,
      lng: 14.6396,
      description: 'Miejsce wydarzeń kulturalnych',
      icon: Calendar,
      color: 'purple'
    },
    {
      id: '3',
      name: 'Park Miejski',
      type: 'landmark',
      lat: 52.9035,
      lng: 14.6376,
      description: 'Zielona przestrzeń rekreacyjna',
      icon: Users,
      color: 'green'
    },
    {
      id: '4',
      name: 'Sklep lokalny "Witnica"',
      type: 'business',
      lat: 52.9040,
      lng: 14.6390,
      description: 'Lokalny sklep spożywczy',
      icon: ShoppingBag,
      color: 'orange'
    },
    {
      id: '5',
      name: 'Punkt ładowania EV',
      type: 'business',
      lat: 52.9050,
      lng: 14.6380,
      description: 'Stacja ładowania pojazdów elektrycznych',
      icon: Zap,
      color: 'yellow'
    }
  ];

  const getMarkerStyle = (marker: MapMarker, isSelected: boolean) => ({
    position: 'absolute' as const,
    left: `${((marker.lng - 14.6300) / 0.02) * 100}%`,
    top: `${((52.9100 - marker.lat) / 0.01) * 100}%`,
    transform: 'translate(-50%, -50%)',
    zIndex: isSelected ? 20 : 10
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-purple-500';
      case 'business': return 'bg-orange-500';
      case 'landmark': return 'bg-blue-500';
      case 'marketplace': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Mapa Witnicy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Mapa bazowa */}
            <div 
              className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-gray-200 relative overflow-hidden"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 20%, rgba(0,100,0,0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 60%, rgba(0,0,100,0.1) 0%, transparent 50%),
                  linear-gradient(45deg, transparent 49%, rgba(0,0,0,0.02) 50%, transparent 51%)
                `
              }}
            >
              {/* Siatka mapy */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(20)].map((_, i) => (
                  <div key={`h-${i}`} className="absolute w-full h-px bg-gray-300" style={{ top: `${i * 5}%` }} />
                ))}
                {[...Array(20)].map((_, i) => (
                  <div key={`v-${i}`} className="absolute h-full w-px bg-gray-300" style={{ left: `${i * 5}%` }} />
                ))}
              </div>

              {/* Rzeka Odra (symulowana) */}
              <div 
                className="absolute bg-blue-300 opacity-60 rounded-full"
                style={{
                  width: '200px',
                  height: '20px',
                  left: '10%',
                  top: '70%',
                  transform: 'rotate(-15deg)'
                }}
              />

              {/* Las (symulowany) */}
              <div 
                className="absolute bg-green-300 opacity-40 rounded-lg"
                style={{
                  width: '150px',
                  height: '100px',
                  right: '15%',
                  top: '10%'
                }}
              />

              {/* Markery */}
              {markers.map((marker) => {
                const IconComponent = marker.icon;
                const isSelected = selectedMarker?.id === marker.id;
                
                return (
                  <div
                    key={marker.id}
                    style={getMarkerStyle(marker, isSelected)}
                    className="cursor-pointer"
                    onClick={() => setSelectedMarker(isSelected ? null : marker)}
                  >
                    <div className={`
                      p-2 rounded-full shadow-lg transition-all duration-200 
                      ${getTypeColor(marker.type)} 
                      ${isSelected ? 'scale-125 shadow-xl' : 'hover:scale-110'}
                    `}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    {isSelected && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-3 rounded-lg shadow-lg border w-48 z-30">
                        <h4 className="font-semibold text-sm">{marker.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">{marker.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {marker.type === 'event' && 'Wydarzenie'}
                          {marker.type === 'business' && 'Biznes'}
                          {marker.type === 'landmark' && 'Punkt orientacyjny'}
                          {marker.type === 'marketplace' && 'Marketplace'}
                        </Badge>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Kompas */}
              <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg">
                <Navigation className="h-4 w-4 text-gray-600" />
              </div>

              {/* Skala */}
              <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded text-xs">
                500m
              </div>
            </div>
          </div>

          {/* Legenda */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className="bg-purple-500">
              <Calendar className="h-3 w-3 mr-1" />
              Wydarzenia
            </Badge>
            <Badge className="bg-orange-500">
              <ShoppingBag className="h-3 w-3 mr-1" />
              Biznes
            </Badge>
            <Badge className="bg-blue-500">
              <MapPin className="h-3 w-3 mr-1" />
              Punkty orientacyjne
            </Badge>
            <Badge className="bg-yellow-500">
              <Zap className="h-3 w-3 mr-1" />
              Usługi
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Lista markerów */}
      <Card>
        <CardHeader>
          <CardTitle>Miejsca w Witnicy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {markers.map((marker) => {
              const IconComponent = marker.icon;
              return (
                <div
                  key={marker.id}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-colors
                    ${selectedMarker?.id === marker.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}
                  `}
                  onClick={() => setSelectedMarker(marker)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${getTypeColor(marker.type)}`}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{marker.name}</h4>
                      <p className="text-sm text-gray-600">{marker.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
