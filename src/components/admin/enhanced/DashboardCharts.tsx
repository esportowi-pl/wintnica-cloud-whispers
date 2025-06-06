
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Calendar, ShoppingBag } from 'lucide-react';

export default function DashboardCharts() {
  // Dane do wykresów
  const userGrowthData = [
    { month: 'Sty', users: 120 },
    { month: 'Lut', users: 135 },
    { month: 'Mar', users: 158 },
    { month: 'Kwi', users: 172 },
    { month: 'Maj', users: 190 },
    { month: 'Cze', users: 210 }
  ];

  const activityData = [
    { name: 'Pn', events: 12, ads: 45, messages: 89 },
    { name: 'Wt', events: 19, ads: 52, messages: 76 },
    { name: 'Śr', events: 15, ads: 38, messages: 95 },
    { name: 'Czw', events: 22, ads: 61, messages: 103 },
    { name: 'Pt', events: 18, ads: 55, messages: 87 },
    { name: 'Sb', events: 8, ads: 28, messages: 45 },
    { name: 'Nd', events: 5, ads: 15, messages: 32 }
  ];

  const categoryData = [
    { name: 'Nieruchomości', value: 35, color: '#8884d8' },
    { name: 'Elektronika', value: 25, color: '#82ca9d' },
    { name: 'Sport', value: 20, color: '#ffc658' },
    { name: 'Usługi', value: 15, color: '#ff7300' },
    { name: 'Inne', value: 5, color: '#d084d0' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-0">
      {/* Wzrost użytkowników */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Wzrost użytkowników
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Aktywność tygodniowa */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Aktywność w tygodniu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="events" fill="#8884d8" />
              <Bar dataKey="ads" fill="#82ca9d" />
              <Bar dataKey="messages" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Kategorie ogłoszeń */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Kategorie ogłoszeń
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Kluczowe metryki */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Kluczowe metryki
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">Aktywni użytkownicy (24h)</span>
              <span className="text-2xl font-bold text-blue-600">89</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Nowe ogłoszenia (7 dni)</span>
              <span className="text-2xl font-bold text-green-600">156</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="font-medium">Dopasowania (30 dni)</span>
              <span className="text-2xl font-bold text-purple-600">234</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="font-medium">Wydarzenia (miesiąc)</span>
              <span className="text-2xl font-bold text-orange-600">47</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
