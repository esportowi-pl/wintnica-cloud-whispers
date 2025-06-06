
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecommendedUser {
  id: string;
  name: string;
  age: number;
  avatar: string;
  bio: string;
  interests: string[];
  location: string;
  lastActive: string;
  verified: boolean;
}

export default function RecommendedUsers() {
  const [users, setUsers] = useState<RecommendedUser[]>([]);

  useEffect(() => {
    // Symulacja danych - w rzeczywistości pobierałbyś z Supabase
    const mockUsers: RecommendedUser[] = [
      {
        id: '1',
        name: 'Anna',
        age: 28,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop',
        bio: 'Miłośniczka książek i podróży',
        interests: ['Książki', 'Podróże', 'Fotografia'],
        location: 'Witnica, 2 km',
        lastActive: 'online',
        verified: true
      },
      {
        id: '2',
        name: 'Marcin',
        age: 32,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        bio: 'Programista i miłośnik sportu',
        interests: ['IT', 'Fitness', 'Gry'],
        location: 'Witnica, 1 km',
        lastActive: '5 min temu',
        verified: false
      },
      {
        id: '3',
        name: 'Kasia',
        age: 26,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        bio: 'Artystka i miłośniczka natury',
        interests: ['Sztuka', 'Natura', 'Muzyka'],
        location: 'Witnica, 3 km',
        lastActive: '1 godz. temu',
        verified: true
      }
    ];

    setUsers(mockUsers);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            Polecani użytkownicy
          </CardTitle>
          <Link to="/dating">
            <Button variant="ghost" size="sm">
              Zobacz więcej
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                {user.verified && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  user.lastActive === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{user.name}, {user.age}</h4>
                  <span className="text-xs text-gray-500">{user.location}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 truncate">{user.bio}</p>
                <div className="flex gap-1 mt-2">
                  {user.interests.slice(0, 2).map((interest, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                  {user.interests.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{user.interests.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/dating">
            <Button className="w-full" variant="outline">
              Dołącz do portalu randkowego
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
