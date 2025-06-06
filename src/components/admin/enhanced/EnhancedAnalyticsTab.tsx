
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, TrendingUp, Users, Download, RefreshCw } from 'lucide-react';
import DashboardCharts from './DashboardCharts';

export default function EnhancedAnalyticsTab() {
  const quickStats = [
    {
      label: 'Całkowita liczba użytkowników',
      value: '1,247',
      change: '+12%',
      changeType: 'positive' as const,
      period: 'vs. poprzedni miesiąc'
    },
    {
      label: 'Aktywni użytkownicy (30 dni)',
      value: '892',
      change: '+8%',
      changeType: 'positive' as const,
      period: 'vs. poprzedni miesiąc'
    },
    {
      label: 'Nowe rejestracje',
      value: '67',
      change: '-3%',
      changeType: 'negative' as const,
      period: 'vs. poprzedni tydzień'
    },
    {
      label: 'Wskaźnik retencji',
      value: '78%',
      change: '+5%',
      changeType: 'positive' as const,
      period: 'vs. poprzedni miesiąc'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analityka i statystyki</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Odśwież
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Eksportuj
          </Button>
        </div>
      </div>

      {/* Szybkie statystyki */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <Badge variant={stat.changeType === 'positive' ? 'default' : 'destructive'}>
                  {stat.change}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Wykresy i analityka */}
      <DashboardCharts />

      {/* Dodatkowe metryki */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top lokalizacje użytkowników
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { city: 'Witnica Centrum', users: 234, percentage: 45 },
                { city: 'Witnica Północ', users: 189, percentage: 36 },
                { city: 'Witnica Południe', users: 98, percentage: 19 }
              ].map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{location.city}</span>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${location.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">{location.users}</span>
                    <p className="text-xs text-gray-500">{location.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Popularne funkcje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { feature: 'Portal randkowy', usage: 89, growth: '+15%' },
                { feature: 'Marketplace', usage: 76, growth: '+8%' },
                { feature: 'Wydarzenia', usage: 65, growth: '+12%' },
                { feature: 'Chat', usage: 54, growth: '+5%' },
                { feature: 'Ogłoszenia', usage: 43, growth: '+3%' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <span className="font-medium">{feature.feature}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{feature.usage}%</span>
                    <Badge variant="outline" className="text-xs">
                      {feature.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
