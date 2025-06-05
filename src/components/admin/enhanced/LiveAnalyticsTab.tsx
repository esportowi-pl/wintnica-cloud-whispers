
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRealTimeAnalytics } from '@/hooks/useRealTimeAnalytics';
import { 
  Users, 
  FileText, 
  Heart, 
  ShoppingCart, 
  TrendingUp, 
  Activity,
  Calendar,
  Eye
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function LiveAnalyticsTab() {
  const { analytics, loading } = useRealTimeAnalytics();

  const stats = [
    {
      title: 'Łączna liczba użytkowników',
      value: analytics.totalUsers,
      icon: Users,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Aktywni użytkownicy',
      value: analytics.activeUsers,
      icon: Activity,
      color: 'green',
      change: '+8%'
    },
    {
      title: 'Profile randkowe',
      value: analytics.totalDatingProfiles,
      icon: Heart,
      color: 'pink',
      change: '+25%'
    },
    {
      title: 'Produkty w marketplace',
      value: analytics.totalMarketplaceItems,
      icon: ShoppingCart,
      color: 'purple',
      change: '+15%'
    },
    {
      title: 'Nowi użytkownicy dzisiaj',
      value: analytics.todaySignups,
      icon: Calendar,
      color: 'orange',
      change: 'dzisiaj'
    },
    {
      title: 'Oczekuje moderacji',
      value: analytics.pendingModeration,
      icon: Eye,
      color: 'red',
      change: 'pilne'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analityka na żywo</h1>
        <Badge variant="outline" className="text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Live
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <Badge 
                      variant={stat.change.includes('+') ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aktywność użytkowników</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Nowi użytkownicy</span>
                  <span>{analytics.todaySignups} dzisiaj</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Aktywni użytkownicy</span>
                  <span>{Math.round((analytics.activeUsers / analytics.totalUsers) * 100)}%</span>
                </div>
                <Progress value={(analytics.activeUsers / analytics.totalUsers) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status moderacji</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Oczekuje zatwierdzenia</span>
                <Badge variant="destructive">{analytics.pendingModeration}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Zatwierdzone dzisiaj</span>
                <Badge variant="default">12</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Odrzucone dzisiaj</span>
                <Badge variant="secondary">3</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
