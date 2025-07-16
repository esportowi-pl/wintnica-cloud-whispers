
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Users, UserPlus, Shield, Crown } from 'lucide-react';

interface Alliance {
  id: string;
  civilization1_id: string;
  civilization2_id: string;
  status: string;
  created_at: string;
  civilization1_name?: string;
  civilization2_name?: string;
}

interface AlliancePanelProps {
  civilizationId: string;
}

const AlliancePanel = ({ civilizationId }: AlliancePanelProps) => {
  const [alliances, setAlliances] = useState<Alliance[]>([]);
  const [civilizations, setCivilizations] = useState<any[]>([]);
  const [selectedCivilization, setSelectedCivilization] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAlliances = async () => {
    try {
      // First get alliances
      const { data: allianceData, error: allianceError } = await supabase
        .from('civilization_alliances')
        .select('*')
        .or(`civilization1_id.eq.${civilizationId},civilization2_id.eq.${civilizationId}`)
        .order('created_at', { ascending: false });

      if (allianceError) throw allianceError;

      // Then get civilization names separately
      const civilizationIds = new Set<string>();
      allianceData?.forEach(alliance => {
        civilizationIds.add(alliance.civilization1_id);
        civilizationIds.add(alliance.civilization2_id);
      });

      const { data: civData, error: civError } = await supabase
        .from('player_civilizations')
        .select('id, civilization_name')
        .in('id', Array.from(civilizationIds));

      if (civError) throw civError;

      // Combine the data
      const enrichedAlliances = allianceData?.map(alliance => ({
        ...alliance,
        civilization1_name: civData?.find(c => c.id === alliance.civilization1_id)?.civilization_name,
        civilization2_name: civData?.find(c => c.id === alliance.civilization2_id)?.civilization_name,
      })) || [];

      setAlliances(enrichedAlliances);
    } catch (error) {
      console.error('Error fetching alliances:', error);
      toast.error('Błąd podczas ładowania sojuszy');
    }
  };

  const fetchCivilizations = async () => {
    try {
      const { data, error } = await supabase
        .from('player_civilizations')
        .select('id, civilization_name')
        .neq('id', civilizationId);

      if (error) throw error;
      setCivilizations(data || []);
    } catch (error) {
      console.error('Error fetching civilizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const proposeAlliance = async () => {
    if (!selectedCivilization) {
      toast.error('Wybierz cywilizację do sojuszu');
      return;
    }

    try {
      const { error } = await supabase
        .from('civilization_alliances')
        .insert({
          civilization1_id: civilizationId,
          civilization2_id: selectedCivilization,
          status: 'pending'
        });

      if (error) throw error;
      
      toast.success('Propozycja sojuszu została wysłana!');
      setSelectedCivilization('');
      fetchAlliances();
    } catch (error) {
      console.error('Error proposing alliance:', error);
      toast.error('Błąd podczas tworzenia propozycji sojuszu');
    }
  };

  const acceptAlliance = async (allianceId: string) => {
    try {
      const { error } = await supabase
        .from('civilization_alliances')
        .update({ status: 'accepted' })
        .eq('id', allianceId);

      if (error) throw error;
      
      toast.success('Sojusz został zaakceptowany!');
      fetchAlliances();
    } catch (error) {
      console.error('Error accepting alliance:', error);
      toast.error('Błąd podczas akceptacji sojuszu');
    }
  };

  const rejectAlliance = async (allianceId: string) => {
    try {
      const { error } = await supabase
        .from('civilization_alliances')
        .update({ status: 'rejected' })
        .eq('id', allianceId);

      if (error) throw error;
      
      toast.success('Sojusz został odrzucony');
      fetchAlliances();
    } catch (error) {
      console.error('Error rejecting alliance:', error);
      toast.error('Błąd podczas odrzucania sojuszu');
    }
  };

  const breakAlliance = async (allianceId: string) => {
    try {
      const { error } = await supabase
        .from('civilization_alliances')
        .update({ status: 'broken' })
        .eq('id', allianceId);

      if (error) throw error;
      
      toast.success('Sojusz został zerwany');
      fetchAlliances();
    } catch (error) {
      console.error('Error breaking alliance:', error);
      toast.error('Błąd podczas zrywania sojuszu');
    }
  };

  useEffect(() => {
    fetchAlliances();
    fetchCivilizations();
  }, [civilizationId]);

  if (loading) {
    return <div className="text-center py-8 text-amber-700">Ładowanie sojuszy...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Propose Alliance */}
      <Card className="bg-amber-50/90 backdrop-blur-sm border-amber-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-amber-900 flex items-center gap-2">
            <UserPlus className="h-6 w-6" />
            Zaproś do sojuszu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">
              Wybierz cywilizację
            </label>
            <Select value={selectedCivilization} onValueChange={setSelectedCivilization}>
              <SelectTrigger className="bg-white border-amber-300">
                <SelectValue placeholder="Wybierz cywilizację" />
              </SelectTrigger>
              <SelectContent>
                {civilizations.map((civ) => (
                  <SelectItem key={civ.id} value={civ.id}>
                    {civ.civilization_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={proposeAlliance} 
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            disabled={!selectedCivilization}
          >
            Wyślij propozycję sojuszu
          </Button>
        </CardContent>
      </Card>

      {/* Current Alliances */}
      <Card className="bg-amber-50/90 backdrop-blur-sm border-amber-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-amber-900 flex items-center gap-2">
            <Users className="h-6 w-6" />
            Sojusze
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alliances.map((alliance) => {
              const isProposer = alliance.civilization1_id === civilizationId;
              const partnerName = isProposer 
                ? alliance.civilization2_name 
                : alliance.civilization1_name;
              
              return (
                <Card key={alliance.id} className="bg-white/80 border-amber-300">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {alliance.status === 'accepted' ? (
                            <Shield className="h-5 w-5 text-green-600" />
                          ) : alliance.status === 'pending' ? (
                            <Crown className="h-5 w-5 text-yellow-600" />
                          ) : (
                            <Users className="h-5 w-5 text-gray-600" />
                          )}
                          <div>
                            <h3 className="font-semibold text-amber-900">
                              Sojusz z: {partnerName}
                            </h3>
                            <p className="text-sm text-amber-600">
                              Status: {
                                alliance.status === 'accepted' ? 'Aktywny' :
                                alliance.status === 'pending' ? 'Oczekujący' :
                                alliance.status === 'rejected' ? 'Odrzucony' :
                                'Zerwany'
                              }
                            </p>
                            {!isProposer && alliance.status === 'pending' && (
                              <p className="text-xs text-blue-600">Otrzymałeś propozycję sojuszu</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {!isProposer && alliance.status === 'pending' && (
                          <>
                            <Button
                              onClick={() => acceptAlliance(alliance.id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              Akceptuj
                            </Button>
                            <Button
                              onClick={() => rejectAlliance(alliance.id)}
                              size="sm"
                              variant="destructive"
                            >
                              Odrzuć
                            </Button>
                          </>
                        )}
                        
                        {alliance.status === 'accepted' && (
                          <Button
                            onClick={() => breakAlliance(alliance.id)}
                            size="sm"
                            variant="destructive"
                          >
                            Zerwij sojusz
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-amber-600">
                      Utworzony: {new Date(alliance.created_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {alliances.length === 0 && (
              <div className="text-center py-8 text-amber-700">
                Nie masz jeszcze żadnych sojuszy
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlliancePanel;
