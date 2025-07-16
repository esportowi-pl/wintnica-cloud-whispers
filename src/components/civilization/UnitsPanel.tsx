import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Users, Shield, Swords, Bow, Hammer } from 'lucide-react';

interface Unit {
  id: string;
  unit_type: string;
  quantity: number;
  experience: number;
  health: number;
}

interface UnitsPanelProps {
  civilizationId: string;
}

const UnitsPanel = ({ civilizationId }: UnitsPanelProps) => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  const unitTypes = {
    worker: { name: 'Pracownik', icon: Hammer, cost: { gold: 10, food: 5 } },
    warrior: { name: 'Wojownik', icon: Swords, cost: { gold: 25, iron: 10 } },
    archer: { name: 'Łucznik', icon: Bow, cost: { gold: 20, wood: 15 } },
    guardian: { name: 'Strażnik', icon: Shield, cost: { gold: 30, iron: 15 } },
  };

  const fetchUnits = async () => {
    try {
      const { data, error } = await supabase
        .from('civilization_units')
        .select('*')
        .eq('civilization_id', civilizationId);

      if (error) throw error;
      setUnits(data || []);
    } catch (error) {
      console.error('Error fetching units:', error);
      toast.error('Błąd podczas ładowania jednostek');
    } finally {
      setLoading(false);
    }
  };

  const recruitUnit = async (unitType: string) => {
    try {
      const existingUnit = units.find(u => u.unit_type === unitType);
      
      if (existingUnit) {
        const { error } = await supabase
          .from('civilization_units')
          .update({ quantity: existingUnit.quantity + 1 })
          .eq('id', existingUnit.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('civilization_units')
          .insert({
            civilization_id: civilizationId,
            unit_type: unitType,
            quantity: 1,
          });

        if (error) throw error;
      }
      
      toast.success('Jednostka została zrekrutowana!');
      fetchUnits();
    } catch (error) {
      console.error('Error recruiting unit:', error);
      toast.error('Błąd podczas rekrutacji');
    }
  };

  useEffect(() => {
    fetchUnits();
  }, [civilizationId]);

  if (loading) {
    return <div className="text-center py-8 text-amber-700">Ładowanie jednostek...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Existing Units */}
      <Card className="bg-amber-50/90 backdrop-blur-sm border-amber-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-amber-900">Twoje Jednostki</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {units.map((unit) => {
              const unitInfo = unitTypes[unit.unit_type as keyof typeof unitTypes];
              if (!unitInfo) return null;

              return (
                <Card key={unit.id} className="bg-white/80 border-amber-300">
                  <CardContent className="p-4 text-center">
                    <unitInfo.icon className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                    <h3 className="font-semibold text-amber-900">{unitInfo.name}</h3>
                    <p className="text-2xl font-bold text-amber-800">{unit.quantity}</p>
                    <div className="text-xs text-amber-600 mt-2">
                      <p>Doświadczenie: {unit.experience}</p>
                      <p>Zdrowie: {unit.health}%</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recruit Units */}
      <Card className="bg-amber-50/90 backdrop-blur-sm border-amber-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-amber-900">Rekrutacja</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(unitTypes).map(([type, info]) => (
              <Card key={type} className="bg-white/80 border-amber-300">
                <CardContent className="p-4 text-center">
                  <info.icon className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                  <h3 className="font-semibold text-amber-900 mb-2">{info.name}</h3>
                  <div className="text-xs text-amber-600 mb-3">
                    {Object.entries(info.cost).map(([resource, amount]) => (
                      <p key={resource}>{resource}: {amount}</p>
                    ))}
                  </div>
                  <Button
                    onClick={() => recruitUnit(type)}
                    size="sm"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Rekrutuj
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

export default UnitsPanel;
