
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import { DatingProfile, Match } from '../types';

export const useDatingData = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<DatingProfile[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<DatingProfile | null>(null);

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
      // Pobierz dopasowania
      const { data: matchesData, error: matchesError } = await supabase
        .from('dating_matches')
        .select('*')
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .eq('is_active', true);

      if (matchesError) {
        console.error('Error loading matches:', matchesError);
        setMatches([]);
        return;
      }

      if (!matchesData || matchesData.length === 0) {
        setMatches([]);
        return;
      }

      // Dla każdego dopasowania, pobierz profil drugiej osoby
      const matchesWithProfiles = await Promise.all(
        matchesData.map(async (match) => {
          const otherUserId = match.user1_id === user.id ? match.user2_id : match.user1_id;
          
          const { data: profileData } = await supabase
            .from('dating_profiles')
            .select('*')
            .eq('user_id', otherUserId)
            .single();

          return {
            ...match,
            profile: profileData || {
              id: '',
              user_id: otherUserId,
              display_name: 'Nieznany użytkownik',
              age: 0,
              photos: ['/placeholder.svg'],
              verified: false
            }
          };
        })
      );

      setMatches(matchesWithProfiles);
    } catch (error) {
      console.error('Error in loadMatches:', error);
      setMatches([]);
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

  useEffect(() => {
    if (user) {
      loadProfiles();
      loadMatches();
      loadUserProfile();
    }
  }, [user]);

  return {
    profiles,
    matches,
    currentIndex,
    loading,
    userProfile,
    setCurrentIndex,
    handleSwipe,
    loadProfiles,
    loadMatches
  };
};
