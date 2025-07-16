
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MapPin, Swords, Shield, Crown } from 'lucide-react';

interface Territory {
  id: string;
  territory_name: string;
  position_x: number;
  position_y: number;
  owner_id: string | null;
  territory_type: string;
  resource_bonus: any;
}

interface WorldMapPanelProps {
  civilizationId: string;
}

const WorldMapPanel = ({ civilizationId }: WorldMapPanelProps) => {
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTerritories = async () => {
    try {
      const { data, error } = await supabase
        .from('world_territories')
        .select('*')
        .order('position_x, position_y');

      if (error) throw error;
      setTerritories(data || []);
    } catch (error) {
      console.error('Error fetching territories:', error);
      toast.error('Błąd podczas ładowania mapy świata');
    } finally {
      setLoading(false);
    }
  };

  const conquerTerritory = async (territoryId: string) => {
    try {
      const { error } = await supabase
        .from('world_territories')
        .update({ owner_id: civilizationId })
        .eq('id', territoryId)
        .is('owner_id', null);

      if (error) throw error;
      
      toast.success('Terytorium zostało zdobyte!');
      fetchTerritories();
    } catch (error) {
      console.error('Error conquering territory:', error);
      toast.error('Błąd podczas zdobywania terytorium');
    }
  };

  const attackTerritory = async (territoryId: string, defenderId: string) => {
    try {
      // Create battle log
      const battleResult = {
        attacker_units: Math.floor(Math.random() * 100) + 50,
        defender_units: Math.floor(Math.random() * 100) + 50,
        winner: Math.random() > 0.5 ? 'attacker' : 'defender'
      };

      const { error } = await supabase
        .from('battle_logs')
        .insert({
          attacker_id: civilizationId,
          defender_id: defenderId,
          territory_id: territoryId,
          battle_result: battleResult,
          winner_id: battleResult.winner === 'attacker' ? civilizationId : defenderId
        });

      if (error) throw error;

      if (battleResult.winner === 'attacker') {
        await supabase
          .from('world_territories')
          .update({ owner_id: civilizationId })
          .eq('id', territoryId);
      }
      
      toast.success(
        battleResult.winner === 'attacker' 
          ? 'Bitwa wygrana! Terytorium zostało zdobyte!' 
          : 'Bitwa przegrana. Spróbuj ponownie później.'
      );
      
      fetchTerritories();
    } catch (error) {
      console.error('Error attacking territory:', error);
      toast.error('Błąd podczas ataku');
    }
  };

  useEffect(() => {
    fetchTerritories();
  }, [civilizationId]);

  if (loading) {
    return <div className="text-center py-8 text-amber-700">Ładowanie mapy świata...</div>;
  }

  return (
    <Card className="bg-amber-50/90 backdrop-blur-sm border-amber-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-amber-900 flex items-center gap-2">
          <MapPin className="h-6 w-6" />
          Mapa Świata
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-8 gap-2 p-4 bg-green-100 rounded-lg min-h-96">
          {Array.from({ length: 64 }, (_, i) => {
            const x = i % 8;
            const y = Math.floor(i / 8);
            const territory = territories.find(t => t.position_x === x && t.position_y === y);
            
            return (
              <div
                key={i}
                className={`
                  aspect-square border-2 rounded flex items-center justify-center text-xs font-bold
                  ${territory 
                    ? territory.owner_id === civilizationId
                      ? 'bg-blue-400 border-blue-600 text-white'
                      : territory.owner_id
                        ? 'bg-red-400 border-red-600 text-white'
                        : 'bg-gray-300 border-gray-500 text-gray-700'
                    : 'bg-green-200 border-green-400'
                  }
                `}
              >
                {territory ? (
                  <div className="text-center">
                    {territory.owner_id === civilizationId ? (
                      <Crown className="h-4 w-4 mx-auto" />
                    ) : territory.owner_id ? (
                      <Shield className="h-4 w-4 mx-auto" />
                    ) : (
                      <div className="space-y-1">
                        <MapPin className="h-3 w-3 mx-auto" />
                        <Button
                          onClick={() => conquerTerritory(territory.id)}
                          size="sm"
                          className="text-xs p-1 h-5 bg-green-600 hover:bg-green-700"
                        >
                          Zajmij
                        </Button>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400 border border-blue-600 rounded"></div>
              <span className="text-amber-900">Twoje terytorium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 border border-red-600 rounded"></div>
              <span className="text-amber-900">Wrogie terytorium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 border border-gray-500 rounded"></div>
              <span className="text-amber-900">Neutralne terytorium</span>
            </div>
          </div>
        </div>

        {/* Territory List */}
        <div className="mt-6 space-y-2">
          <h3 className="font-semibold text-amber-900">Dostępne terytoria</h3>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {territories.filter(t => t.owner_id && t.owner_id !== civilizationId).map((territory) => (
              <div key={territory.id} className="flex items-center justify-between p-2 bg-white/60 rounded">
                <span className="text-sm text-amber-900">{territory.territory_name}</span>
                <Button
                  onClick={() => attackTerritory(territory.id, territory.owner_id!)}
                  size="sm"
                  variant="destructive"
                  className="flex items-center gap-1"
                >
                  <Swords className="h-3 w-3" />
                  Atakuj
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorldMapPanel;
