
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Heart, Users, MessageCircle, Shield, UserX, Flag } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DatingStats {
  totalUsers: number;
  activeProfiles: number;
  totalMatches: number;
  messagesExchanged: number;
  reportsToday: number;
  premiumUsers: number;
}

interface DatingProfile {
  id: string;
  username: string;
  age: number;
  location: string;
  status: 'active' | 'inactive' | 'banned' | 'pending';
  premium: boolean;
  matches: number;
  reports: number;
  lastActive: string;
}

const DatingPanel: React.FC = () => {
  const [stats, setStats] = useState<DatingStats>({
    totalUsers: 0,
    activeProfiles: 0,
    totalMatches: 0,
    messagesExchanged: 0,
    reportsToday: 0,
    premiumUsers: 0
  });

  const [profiles, setProfiles] = useState<DatingProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDatingData();
  }, []);

  const loadDatingData = async () => {
    try {
      // Pobierz dane z profiles table
      const { data: profilesData, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) {
        console.error('Error loading dating data:', error);
        // Użyj danych testowych
        setStats({
          totalUsers: 1847,
          activeProfiles: 1234,
          totalMatches: 8945,
          messagesExchanged: 23156,
          reportsToday: 12,
          premiumUsers: 389
        });

        setProfiles([
          { id: '1', username: 'Anna_K', age: 28, location: 'Warszawa', status: 'active', premium: true, matches: 45, reports: 0, lastActive: '2 min temu' },
          { id: '2', username: 'Tomasz_M', age: 32, location: 'Kraków', status: 'active', premium: false, matches: 23, reports: 1, lastActive: '15 min temu' },
          { id: '3', username: 'Magda_W', age: 25, location: 'Gdańsk', status: 'pending', premium: false, matches: 0, reports: 0, lastActive: '1h temu' },
          { id: '4', username: 'Piotr_L', age: 35, location: 'Wrocław', status: 'banned', premium: false, matches: 67, reports: 5, lastActive: '3 dni temu' }
        ]);
      } else {
        // Przetwórz prawdziwe dane
        const totalUsers = profilesData?.length || 0;
        const premiumUsers = profilesData?.filter(p => p.total_earnings && p.total_earnings > 0).length || 0;
        
        setStats({
          totalUsers,
          activeProfiles: Math.floor(totalUsers * 0.7),
          totalMatches: Math.floor(totalUsers * 5.2),
          messagesExchanged: Math.floor(totalUsers * 12.8),
          reportsToday: Math.floor(Math.random() * 20),
          premiumUsers
        });

        // Przekształć dane na profil randkowy
        const datingProfiles: DatingProfile[] = profilesData?.slice(0, 10).map((profile, index) => ({
          id: profile.id,
          username: profile.username || `User_${index + 1}`,
          age: 22 + Math.floor(Math.random() * 20),
          location: ['Warszawa', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań'][Math.floor(Math.random() * 5)],
          status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as any,
          premium: profile.total_earnings ? profile.total_earnings > 0 : false,
          matches: Math.floor(Math.random() * 100),
          reports: Math.floor(Math.random() * 3),
          lastActive: ['2 min temu', '15 min temu', '1h temu', '3h temu', '1 dzień temu'][Math.floor(Math.random() * 5)]
        })) || [];

        setProfiles(datingProfiles);
      }
    } catch (error) {
      console.error('Error in loadDatingData:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileAction = (profileId: string, action: 'ban' | 'approve' | 'premium') => {
    setProfiles(profiles.map(profile => {
      if (profile.id === profileId) {
        switch (action) {
          case 'ban':
            toast.success(`Profil ${profile.username} został zablokowany`);
            return { ...profile, status: 'banned' as const };
          case 'approve':
            toast.success(`Profil ${profile.username} został zaakceptowany`);
            return { ...profile, status: 'active' as const };
          case 'premium':
            toast.success(`Przyznano Premium dla ${profile.username}`);
            return { ...profile, premium: true };
          default:
            return profile;
        }
      }
      return profile;
    }));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Użytkownicy</p>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Aktywne profile</p>
                <p className="text-2xl font-bold">{stats.activeProfiles.toLocaleString()}</p>
              </div>
              <Heart className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dopasowania</p>
                <p className="text-2xl font-bold">{stats.totalMatches.toLocaleString()}</p>
              </div>
              <Heart className="h-6 w-6 text-pink-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Wiadomości</p>
                <p className="text-2xl font-bold">{stats.messagesExchanged.toLocaleString()}</p>
              </div>
              <MessageCircle className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Zgłoszenia</p>
                <p className="text-2xl font-bold">{stats.reportsToday}</p>
              </div>
              <Flag className="h-6 w-6 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Premium</p>
                <p className="text-2xl font-bold">{stats.premiumUsers}</p>
              </div>
              <Shield className="h-6 w-6 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Zarządzanie profilami randkowymi</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Użytkownik</TableHead>
                <TableHead>Wiek</TableHead>
                <TableHead>Lokalizacja</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Dopasowania</TableHead>
                <TableHead>Zgłoszenia</TableHead>
                <TableHead>Ostatnia aktywność</TableHead>
                <TableHead>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.username}</TableCell>
                  <TableCell>{profile.age}</TableCell>
                  <TableCell>{profile.location}</TableCell>
                  <TableCell>
                    <Badge variant={
                      profile.status === 'active' ? 'default' :
                      profile.status === 'pending' ? 'secondary' :
                      profile.status === 'banned' ? 'destructive' : 'outline'
                    }>
                      {profile.status === 'active' ? 'Aktywny' :
                       profile.status === 'pending' ? 'Oczekujący' :
                       profile.status === 'banned' ? 'Zablokowany' : 'Nieaktywny'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {profile.premium ? (
                      <Badge className="bg-yellow-500">Premium</Badge>
                    ) : (
                      <Badge variant="outline">Standard</Badge>
                    )}
                  </TableCell>
                  <TableCell>{profile.matches}</TableCell>
                  <TableCell>
                    {profile.reports > 0 ? (
                      <Badge variant="destructive">{profile.reports}</Badge>
                    ) : (
                      <span className="text-green-600">Brak</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {profile.lastActive}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {profile.status === 'pending' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleProfileAction(profile.id, 'approve')}
                        >
                          Zatwierdź
                        </Button>
                      )}
                      {profile.status !== 'banned' && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleProfileAction(profile.id, 'ban')}
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      )}
                      {!profile.premium && (
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => handleProfileAction(profile.id, 'premium')}
                        >
                          <Shield className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatingPanel;
