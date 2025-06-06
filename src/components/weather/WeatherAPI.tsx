
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cloud, Sun, CloudRain, Snow, Wind, Thermometer, Droplets, Eye } from 'lucide-react';

interface WeatherData {
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    icon: any;
  };
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: any;
  }>;
  alerts?: Array<{
    type: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

export default function WeatherAPI() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Symulacja danych pogodowych - w rzeczywistości używałbyś API jak OpenWeatherMap
    const loadWeatherData = async () => {
      setLoading(true);
      
      // Symulacja opóźnienia API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockWeather: WeatherData = {
        current: {
          temp: 18,
          condition: 'Pochmurno z przejaśnieniami',
          humidity: 65,
          windSpeed: 12,
          visibility: 10,
          icon: Cloud
        },
        forecast: [
          {
            day: 'Dziś',
            high: 20,
            low: 12,
            condition: 'Pochmurno',
            icon: Cloud
          },
          {
            day: 'Jutro',
            high: 23,
            low: 15,
            condition: 'Słonecznie',
            icon: Sun
          },
          {
            day: 'Śr',
            high: 19,
            low: 11,
            condition: 'Deszcz',
            icon: CloudRain
          },
          {
            day: 'Czw',
            high: 22,
            low: 14,
            condition: 'Słonecznie',
            icon: Sun
          },
          {
            day: 'Pt',
            high: 17,
            low: 9,
            condition: 'Burze',
            icon: CloudRain
          },
          {
            day: 'Sb',
            high: 25,
            low: 16,
            condition: 'Słonecznie',
            icon: Sun
          },
          {
            day: 'Nd',
            high: 21,
            low: 13,
            condition: 'Pochmurno',
            icon: Cloud
          }
        ],
        alerts: [
          {
            type: 'Ostrzeżenie przed wiatrem',
            message: 'Silny wiatr do 50 km/h w godzinach popołudniowych',
            severity: 'medium'
          }
        ]
      };
      
      setWeather(mockWeather);
      setLoading(false);
    };

    loadWeatherData();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">Nie można załadować danych pogodowych</p>
          <Button className="mt-2" onClick={() => window.location.reload()}>
            Spróbuj ponownie
          </Button>
        </CardContent>
      </Card>
    );
  }

  const CurrentIcon = weather.current.icon;

  return (
    <div className="space-y-4">
      {/* Alerty pogodowe */}
      {weather.alerts && weather.alerts.length > 0 && (
        <Card>
          <CardContent className="p-4">
            {weather.alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3">
                <Wind className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <Badge variant={getSeverityColor(alert.severity)} className="mb-1">
                    {alert.type}
                  </Badge>
                  <p className="text-sm text-gray-700">{alert.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Aktualna pogoda */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CurrentIcon className="h-5 w-5" />
            Pogoda w Witnicy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">{weather.current.temp}°C</span>
                <CurrentIcon className="h-8 w-8 text-gray-500" />
              </div>
              <p className="text-gray-600 mt-1">{weather.current.condition}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span>Wilgotność: {weather.current.humidity}%</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Wind className="h-4 w-4 text-gray-500" />
                <span>Wiatr: {weather.current.windSpeed} km/h</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Eye className="h-4 w-4 text-gray-500" />
                <span>Widoczność: {weather.current.visibility} km</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prognoza 7-dniowa */}
      <Card>
        <CardHeader>
          <CardTitle>Prognoza na 7 dni</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {weather.forecast.map((day, index) => {
              const DayIcon = day.icon;
              return (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-sm font-medium">{day.day}</span>
                    <DayIcon className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">{day.condition}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{day.high}°</span>
                    <span className="text-gray-500">{day.low}°</span>
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
