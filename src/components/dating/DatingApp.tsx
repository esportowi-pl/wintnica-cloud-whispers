
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, User, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import TinderCard from "./TinderCard";
import { AnimatePresence } from "framer-motion";

interface DatingProfile {
  id: string;
  user_id: string;
  display_name: string;
  age: number;
  bio?: string;
  location?: string;
  photos: string[];
  verified: boolean;
  interests?: string[];
}

interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  matched_at: string;
  profile: DatingProfile;
}

const DatingApp: React.FC = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<DatingProfile[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<DatingProfile | null>(null);

  useEffect(() => {
    if (user) {
      loadProfiles();
      loadMatches();
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('dating_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading user profile:', error);
      } else if (data) {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
    }
  };

  const loadProfiles = async () => {
    if (!user) return;

    try {
      // Pobierz profile, które użytkownik jeszcze nie ocenił
      const { data: swipedProfiles } = await supabase
        .from('dating_swipes')
        .select('swiped_id')
        .eq('swiper_id', user.id);

      const swipedIds = swipedProfiles?.map(s => s.swiped_id) || [];

      const { data, error } = await supabase
        .from('dating_profiles')
        .select('*')
        .eq('active', true)
        .neq('user_id', user.id)
        .not('user_id', 'in', `(${swipedIds.join(',') || 'null'})`);

      if (error) {
        console.error('Error loading profiles:', error);
        // Fallback to mock data
        setProfiles([
          {
            id: '1',
            user_id: 'mock1',
            display_name: 'Anna',
            age: 25,
            bio: 'Uwielbiam podróże, dobrą kawę i wieczorne spacery. Szukam kogoś, kto dzieli moje pasje! ✨',
            location: 'Witnicy, 2 km stąd',
            photos: ['/placeholder.svg'],
            verified: true,
            interests: ['Podróże', 'Kawa', 'Fotografia', 'Książki']
          },
          {
            id: '2',
            user_id: 'mock2',
            display_name: 'Michał',
            age: 28,
            bio: 'Programista, miłośnik gór i dobrej muzyki. W weekendy można mnie znaleźć na szlaku lub koncercie 🎵',
            location: 'Witnicy, 1 km stąd',
            photos: ['/placeholder.svg'],
            verified: false,
            interests: ['Programowanie', 'Góry', 'Muzyka', 'Gaming']
          }
        ]);
      } else {
        setProfiles(data || []);
      }
    } catch (error) {
      console.error('Error in loadProfiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMatches = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('dating_matches')
        .select(`
          *,
          profile:dating_profiles(*)
        `)
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .eq('is_active', true);

      if (error) {
        console.error('Error loading matches:', error);
        setMatches([]);
      } else {
        setMatches(data || []);
      }
    } catch (error) {
      console.error('Error in loadMatches:', error);
    }
  };

  const handleSwipe = async (profileId: string, liked: boolean) => {
    if (!user) return;

    try {
      // Zapisz swipe do bazy
      const { error } = await supabase
        .from('dating_swipes')
        .insert({
          swiper_id: user.id,
          swiped_id: profileId,
          is_like: liked
        });

      if (error) {
        console.error('Error saving swipe:', error);
      }

      // Sprawdź czy to match (trigger w bazie automatycznie to obsłuży)
      if (liked) {
        // Sprawdź czy drugą osoba też nas polubiła
        const { data: mutualLike } = await supabase
          .from('dating_swipes')
          .select('*')
          .eq('swiper_id', profileId)
          .eq('swiped_id', user.id)
          .eq('is_like', true)
          .single();

        if (mutualLike) {
          toast.success("To dopasowanie! 💕");
          loadMatches(); // Odśwież listę dopasowań
        }
      }

      // Przejdź do następnego profilu
      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error('Error in handleSwipe:', error);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <p>Musisz się zalogować, aby korzystać z aplikacji randkowej.</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="max-w-md mx-auto p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold">Utwórz swój profil randkowy</h2>
        <p>Aby zacząć poznawać ludzi, musisz najpierw utworzyć swój profil.</p>
        <Button onClick={() => toast.info("Funkcja tworzenia profilu będzie dostępna wkrótce")}>
          Utwórz profil
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto h-screen bg-gradient-to-br from-pink-50 to-red-50">
      <Tabs defaultValue="discover" className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
          <TabsContent value="discover" className="h-full p-4">
            <div className="h-full relative">
              {loading ? (
                <Card className="h-full flex items-center justify-center">
                  <p>Ładowanie profili...</p>
                </Card>
              ) : currentIndex >= profiles.length ? (
                <Card className="h-full flex flex-col items-center justify-center text-center p-6">
                  <Heart className="h-16 w-16 text-pink-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Koniec profili na dziś!</h3>
                  <p className="text-muted-foreground">
                    Wróć jutro, aby zobaczyć nowe profile w okolicy.
                  </p>
                  <Button 
                    className="mt-4" 
                    onClick={() => {
                      setCurrentIndex(0);
                      loadProfiles();
                    }}
                  >
                    Odśwież
                  </Button>
                </Card>
              ) : (
                <div className="h-full relative">
                  <AnimatePresence>
                    {profiles.slice(currentIndex, currentIndex + 2).map((profile, index) => (
                      <TinderCard
                        key={profile.id}
                        profile={profile}
                        onSwipe={handleSwipe}
                        zIndex={profiles.length - index}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="matches" className="h-full p-4">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center">Twoje dopasowania</h2>
              {matches.length === 0 ? (
                <Card className="p-6 text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p>Brak dopasowań</p>
                  <p className="text-sm text-muted-foreground">
                    Zacznij przeglądać profile, aby znaleźć dopasowania!
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {matches.map((match) => (
                    <Card key={match.id} className="p-4 text-center cursor-pointer hover:shadow-lg transition-shadow">
                      <img
                        src={match.profile?.photos?.[0] || '/placeholder.svg'}
                        alt={match.profile?.display_name}
                        className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                      />
                      <h3 className="font-medium">{match.profile?.display_name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        Dopasowanie
                      </Badge>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="h-full p-4">
            <Card className="p-6 text-center">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Twój profil</h3>
              <p className="text-muted-foreground mb-4">
                {userProfile.display_name}, {userProfile.age}
              </p>
              <Button onClick={() => toast.info("Edycja profilu będzie dostępna wkrótce")}>
                Edytuj profil
              </Button>
            </Card>
          </TabsContent>
        </div>

        <TabsList className="grid w-full grid-cols-3 h-16">
          <TabsTrigger value="discover" className="flex flex-col gap-1">
            <Heart className="h-5 w-5" />
            <span className="text-xs">Odkrywaj</span>
          </TabsTrigger>
          <TabsTrigger value="matches" className="flex flex-col gap-1">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">Dopasowania</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex flex-col gap-1">
            <User className="h-5 w-5" />
            <span className="text-xs">Profil</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default DatingApp;
