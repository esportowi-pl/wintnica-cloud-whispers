
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, CloudSun, Snowflake } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

type WeatherData = {
  current: {
    temp_c: number;
    condition: {
      text: string;
      code: number;
    };
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          code: number;
        };
      };
    }>;
  };
  location: {
    name: string;
    region: string;
  };
};

// Mock weather data for initial development
const mockWeatherData: WeatherData = {
  current: {
    temp_c: 15,
    condition: {
      text: "Partly cloudy",
      code: 1003
    }
  },
  forecast: {
    forecastday: [
      {
        date: "2025-05-06",
        day: {
          maxtemp_c: 17,
          mintemp_c: 8,
          condition: {
            text: "Sunny",
            code: 1000
          }
        }
      },
      {
        date: "2025-05-07",
        day: {
          maxtemp_c: 16,
          mintemp_c: 7,
          condition: {
            text: "Cloudy",
            code: 1003
          }
        }
      },
      {
        date: "2025-05-08",
        day: {
          maxtemp_c: 15,
          mintemp_c: 9,
          condition: {
            text: "Light rain",
            code: 1183
          }
        }
      }
    ]
  },
  location: {
    name: "Witnica",
    region: "Lubuskie"
  }
};

const getWeatherIcon = (code: number) => {
  if (code < 1003) return <Sun className="text-yellow-500" size={24} />;
  if (code < 1030) return <CloudSun className="text-gray-400" size={24} />;
  if (code < 1100) return <Cloud className="text-gray-500" size={24} />;
  if (code < 1200) return <CloudRain className="text-blue-400" size={24} />;
  return <Snowflake className="text-blue-300" size={24} />;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric' });
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, fetch from an actual API
    // Example: 
    // const fetchWeather = async () => {
    //   try {
    //     const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=Witnica&days=3&lang=pl');
    //     const data = await response.json();
    //     setWeather(data);
    //   } catch (err) {
    //     setError('Nie udało się pobrać danych pogodowych.');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchWeather();

    // For demo purposes, use mock data
    setTimeout(() => {
      setWeather(mockWeatherData);
      setLoading(false);
    }, 1000);
  }, []);

  if (error) {
    return (
      <Card className="bg-white">
        <CardContent className="p-4">
          <p className="text-red-500 text-center">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white overflow-hidden">
      <CardHeader className="bg-primary/10 pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Pogoda</span>
          {!loading && weather && <span className="text-sm">{weather.location.name}</span>}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        {loading ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Skeleton className="h-12 w-1/3" />
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          </div>
        ) : weather ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-3xl font-bold">{weather.current.temp_c}°C</div>
                <div className="text-gray-500">{weather.current.condition.text}</div>
              </div>
              <div>
                {getWeatherIcon(weather.current.condition.code)}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-4 border-t pt-4">
              {weather.forecast.forecastday.map((day) => (
                <div key={day.date} className="text-center p-2 bg-gray-50 rounded-md">
                  <div className="font-medium">{formatDate(day.date)}</div>
                  <div className="flex justify-center my-1">
                    {getWeatherIcon(day.day.condition.code)}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{Math.round(day.day.maxtemp_c)}°</span>
                    <span className="text-gray-500 ml-1">{Math.round(day.day.mintemp_c)}°</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
