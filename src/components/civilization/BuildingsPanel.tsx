import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Home, Castle, Hammer, Wheat, TreePine, Mountain, Swords } from 'lucide-react';

interface Building {
  id: string;
  building_type: string;
  level: number;
  position_x: number;
  position_y: number;
  is_completed: boolean;
}

interface BuildingsPanelProps {
  civilizationId: string;
}

const BuildingsPanel = ({ civilizationId }: BuildingsPanelProps) => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);

  const buildingTypes = {
    town_hall: { name: 'Ratusz', icon: Castle, description: 'Centrum twojej cywilizacji' },
    house: { name: 'Dom', icon: Home, description: 'Zwiększa populację' },
    farm: { name: 'Farma', icon: Wheat, description: 'Produkuje żywność' },
    sawmill: { name: 'Tartak', icon: TreePine, description: 'Produkuje drewno' },
    quarry: { name: 'Kamieniołom', icon: Mountain, description: 'Produkuje kamień' },
    blacksmith: { name: 'Kowal', icon: Hammer, description: 'Produkuje żelazo i ulepszenia' },
    barracks: { name: 'Koszary', icon: Swords, description: 'Trenuje jednostki wojskowe' },
  };

  const fetchBuildings = async () => {
    try {
      const { data, error } = await supabase
        .from('civilization_buildings')
        .select('*')
        .eq('civilization_id', civilizationId)
        .order('created_at');

      if (error) throw error;
      setBuildings(data || []);
    } catch (error) {
      console.error('Error fetching buildings:', error);
      toast.error('Błąd podczas ładowania budynków');
    } finally {
      setLoading(false);
    }
  };

  const buildBuilding = async (buildingType: string) => {
    try {
      const { error } = await supabase
        .from('civilization_buildings')
        .insert({
          civilization_id: civilizationId,
          building_type: buildingType,
          position_x: Math.floor(Math.random() * 10),
          position_y: Math.floor(Math.random() * 10),
        });

      if (error) throw error;
      
      toast.success('Budynek został zbudowany!');
      fetchBuildings();
    } catch (error) {
      console.error('Error building:', error);
      toast.error('Błąd podczas budowy');
    }
  };

  const upgradeBuilding = async (buildingId: string) => {
    try {
      const building = buildings.find(b => b.id === buildingId);
      if (!building) return;

      const { error } = await supabase
        .from('civilization_buildings')
        .update({ level: building.level + 1 })
        .eq('id', buildingId);

      if (error) throw error;
      
      toast.success('Budynek został ulepszony!');
      fetchBuildings();
    } catch (error) {
      console.error('Error upgrading:', error);
      toast.error('Błąd podczas ulepszania');
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, [civilizationId]);

  if (loading) {
    return <div className="text-center py-8 text-amber-700">Ładowanie budynków...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Existing Buildings */}
      <Card className="bg-amber-50/90 backdrop-blur-sm border-amber-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-amber-900">Twoje Budynki</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buildings.map((building) => {
              const buildingInfo = buildingTypes[building.building_type as keyof typeof buildingTypes];
              if (!buildingInfo) return null;

              return (
                <Card key={building.id} className="bg-white/80 border-amber-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <buildingInfo.icon className="h-6 w-6 text-amber-600" />
                      <div>
                        <h3 className="font-semibold text-amber-900">{buildingInfo.name}</h3>
                        <p className="text-sm text-amber-700">Poziom {building.level}</p>
                      </div>
                    </div>
                    <p className="text-xs text-amber-600 mb-3">{buildingInfo.description}</p>
                    <Button
                      onClick={() => upgradeBuilding(building.id)}
                      size="sm"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Ulepsz (Poz. {building.level + 1})
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Build New Buildings */}
      <Card className="bg-amber-50/90 backdrop-blur-sm border-amber-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-amber-900">Buduj Nowe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(buildingTypes).map(([type, info]) => (
              <Card key={type} className="bg-white/80 border-amber-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <info.icon className="h-6 w-6 text-amber-600" />
                    <h3 className="font-semibold text-amber-900">{info.name}</h3>
                  </div>
                  <p className="text-xs text-amber-600 mb-3">{info.description}</p>
                  <Button
                    onClick={() => buildBuilding(type)}
                    size="sm"
                    variant="outline"
                    className="w-full border-amber-300 text-amber-700 hover:bg-amber-100"
                  >
                    Buduj
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildingsPanel;
