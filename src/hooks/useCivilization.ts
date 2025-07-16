
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Civilization {
  id: string;
  civilization_name: string;
  level: number;
  experience: number;
  population: number;
  happiness: number;
  culture_points: number;
}

interface Resources {
  wood: number;
  stone: number;
  gold: number;
  food: number;
  iron: number;
}

export const useCivilization = () => {
  const { user } = useAuth();
  const [civilization, setCivilization] = useState<Civilization | null>(null);
  const [resources, setResources] = useState<Resources | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCivilization = async () => {
    if (!user) return;

    try {
      const { data: civData, error: civError } = await supabase
        .from('player_civilizations')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (civError && civError.code !== 'PGRST116') {
        throw civError;
      }

      if (civData) {
        setCivilization(civData);
        
        // Fetch resources
        const { data: resourceData, error: resourceError } = await supabase
          .from('civilization_resources')
          .select('*')
          .eq('civilization_id', civData.id)
          .single();

        if (resourceError) {
          throw resourceError;
        }

        setResources(resourceData);
      }
    } catch (error) {
      console.error('Error fetching civilization:', error);
      toast.error('Błąd podczas ładowania cywilizacji');
    } finally {
      setLoading(false);
    }
  };

  const createCivilization = async (name: string) => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('create_initial_civilization', {
        p_user_id: user.id,
        p_civilization_name: name
      });

      if (error) throw error;

      toast.success('Cywilizacja została utworzona!');
      await fetchCivilization();
    } catch (error) {
      console.error('Error creating civilization:', error);
      toast.error('Błąd podczas tworzenia cywilizacji');
    }
  };

  const updateResources = async (newResources: Partial<Resources>) => {
    if (!civilization) return;

    try {
      const { error } = await supabase
        .from('civilization_resources')
        .update(newResources)
        .eq('civilization_id', civilization.id);

      if (error) throw error;

      setResources(prev => prev ? { ...prev, ...newResources } : null);
    } catch (error) {
      console.error('Error updating resources:', error);
      toast.error('Błąd podczas aktualizacji surowców');
    }
  };

  useEffect(() => {
    fetchCivilization();
  }, [user]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!civilization) return;

    const resourcesChannel = supabase
      .channel('civilization-resources')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'civilization_resources',
        filter: `civilization_id=eq.${civilization.id}`
      }, (payload) => {
        setResources(payload.new as Resources);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(resourcesChannel);
    };
  }, [civilization]);

  return {
    civilization,
    resources,
    loading,
    createCivilization,
    updateResources,
    refetch: fetchCivilization
  };
};
