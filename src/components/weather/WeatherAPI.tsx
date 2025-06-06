
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cloud, Sun, CloudRain, Wind, Eye, Droplets, AlertTriangle, RefreshCw } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
    icon: string;
  }>;
  alerts: Array<{
    type: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

export default function WeatherAPI() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock weather data - w rzeczywistości pobierałbyś z API
  const mockWeatherData: WeatherData = {
    location: 'Witnica, Polska',
    temperature: 18,
    condition: 'Częściowo zachmurzenie',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    forecast: [
      { day: 'Dziś', temp: 18, condition: 'Częściowo zachmurzenie', icon: 'cloud' },
      { day: 'Jutro', temp: 20, condition: 'Słonecznie', icon: 'sun' },
      { day: 'Czw', temp: 16, condition: 'Deszcz', icon: 'rain' },
      { day: 'Pt', temp: 19, condition: 'Słonecznie', icon: 'sun' },
      { day: 'Sob', temp: 22, condition: 'Słonecznie', icon: 'sun' },
      { day: 'Nd', temp: 17, condition: 'Zachmurzenie', icon: 'cloud' },
      { day: 'Pon', temp: 15, condition: 'Deszcz', icon: 'rain' }
    ],
    alerts: [
      {
        type: 'Ostrzeżenie meteorologiczne',
        message: 'Możliwe opady deszczu w godzinach popołudniowych',
        severity: 'medium'
      }
    ]
  };

  const loadWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Symulacja opóźnienia API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWeather(mockWeatherData);
    } catch (err) {
      setError('Nie udało się pobrać danych pogodowych');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sun':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'rain':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'cloud':
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadWeather} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Spróbuj ponownie
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Pogoda
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={loadWeather}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        ) : weather ? (
          <div className="space-y-4">
            {/* Aktualna pogoda */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {getWeatherIcon('cloud')}
                <span className="text-3xl font-bold ml-2">{weather.temperature}°C</span>
              </div>
              <p className="text-sm text-gray-600">{weather.condition}</p>
              <p className="text-xs text-gray-500">{weather.location}</p>
            </div>

            {/* Szczegóły */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span>{weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="h-4 w-4 text-gray-500" />
                <span>{weather.windSpeed}km/h</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4 text-gray-500" />
                <span>{weather.visibility}km</span>
              </div>
            </div>

            {/* Alerty */}
            {weather.alerts.length > 0 && (
              <div className="space-y-2">
                {weather.alerts.map((alert, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{alert.type}</p>
                        <p className="text-xs mt-1">{alert.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Prognoza 7-dniowa */}
            <div>
              <h4 className="font-medium text-sm mb-3">Prognoza 7-dniowa</h4>
              <div className="space-y-2">
                {weather.forecast.map((day, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <span className="text-sm font-medium w-12">{day.day}</span>
                    <div className="flex items-center gap-2 flex-1">
                      {getWeatherIcon(day.icon)}
                      <span className="text-xs text-gray-600 flex-1">{day.condition}</span>
                    </div>
                    <span className="text-sm font-bold w-12 text-right">{day.temp}°C</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
