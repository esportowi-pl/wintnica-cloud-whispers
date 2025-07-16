
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Handshake, Send, TreePine, Mountain, Coins, Wheat, Pickaxe } from 'lucide-react';

interface TradeOffer {
  id: string;
  sender_id: string;
  receiver_id: string;
  offered_resources: any;
  requested_resources: any;
  status: string;
  expires_at: string;
  sender_civilization?: { civilization_name: string };
  receiver_civilization?: { civilization_name: string };
}

interface TradePanelProps {
  civilizationId: string;
}

const TradePanel = ({ civilizationId }: TradePanelProps) => {
  const [tradeOffers, setTradeOffers] = useState<TradeOffer[]>([]);
  const [civilizations, setCivilizations] = useState<any[]>([]);
  const [newOffer, setNewOffer] = useState({
    receiver_id: '',
    offered: { wood: 0, stone: 0, gold: 0, food: 0, iron: 0 },
    requested: { wood: 0, stone: 0, gold: 0, food: 0, iron: 0 }
  });
  const [loading, setLoading] = useState(true);

  const resourceIcons = {
    wood: TreePine,
    stone: Mountain,
    gold: Coins,
    food: Wheat,
    iron: Pickaxe
  };

  const fetchTradeOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('trade_offers')
        .select(`
          *,
          sender_civilization:sender_id(civilization_name),
          receiver_civilization:receiver_id(civilization_name)
        `)
        .or(`sender_id.eq.${civilizationId},receiver_id.eq.${civilizationId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTradeOffers(data || []);
    } catch (error) {
      console.error('Error fetching trade offers:', error);
      toast.error('Błąd podczas ładowania ofert handlowych');
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

  const createTradeOffer = async () => {
    if (!newOffer.receiver_id) {
      toast.error('Wybierz odbiorcę oferty');
      return;
    }

    try {
      const { error } = await supabase
        .from('trade_offers')
        .insert({
          sender_id: civilizationId,
          receiver_id: newOffer.receiver_id,
          offered_resources: newOffer.offered,
          requested_resources: newOffer.requested
        });

      if (error) throw error;
      
      toast.success('Oferta handlowa została wysłana!');
      setNewOffer({
        receiver_id: '',
        offered: { wood: 0, stone: 0, gold: 0, food: 0, iron: 0 },
        requested: { wood: 0, stone: 0, gold: 0, food: 0, iron: 0 }
      });
      fetchTradeOffers();
    } catch (error) {
      console.error('Error creating trade offer:', error);
      toast.error('Błąd podczas tworzenia oferty');
    }
  };

  const acceptTradeOffer = async (offerId: string) => {
    try {
      const { error } = await supabase
        .from('trade_offers')
        .update({ status: 'accepted' })
        .eq('id', offerId);

      if (error) throw error;
      
      toast.success('Oferta handlowa została zaakceptowana!');
      fetchTradeOffers();
    } catch (error) {
      console.error('Error accepting trade offer:', error);
      toast.error('Błąd podczas akceptacji oferty');
    }
  };

  const rejectTradeOffer = async (offerId: string) => {
    try {
      const { error } = await supabase
        .from('trade_offers')
        .update({ status: 'rejected' })
        .eq('id', offerId);

      if (error) throw error;
      
      toast.success('Oferta handlowa została odrzucona');
      fetchTradeOffers();
    } catch (error) {
      console.error('Error rejecting trade offer:', error);
      toast.error('Błąd podczas odrzucania oferty');
    }
  };

  useEffect(() => {
    fetchTradeOffers();
    fetchCivilizations();
  }, [civilizationId]);

  if (loading) {
    return <div className="text-center py-8 text-amber-700">Ładowanie handlu...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Create New Trade Offer */}
      <Card className="bg-amber-50/90 backdrop-blur-sm border-amber-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-amber-900 flex items-center gap-2">
            <Send className="h-6 w-6" />
            Utwórz ofertę handlową
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">
              Wybierz odbiorcę
            </label>
            <Select value={newOffer.receiver_id} onValueChange={(value) => 
              setNewOffer(prev => ({ ...prev, receiver_id: value }))
            }>
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

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-amber-900 mb-3">Oferujesz:</h3>
              <div className="space-y-2">
                {Object.entries(resourceIcons).map(([resource, Icon]) => (
                  <div key={resource} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-amber-900 w-16">{resource}</span>
                    <Input
                      type="number"
                      min="0"
                      value={newOffer.offered[resource as keyof typeof newOffer.offered]}
                      onChange={(e) => setNewOffer(prev => ({
                        ...prev,
                        offered: { ...prev.offered, [resource]: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-20 h-8 bg-white border-amber-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-amber-900 mb-3">Żądasz:</h3>
              <div className="space-y-2">
                {Object.entries(resourceIcons).map(([resource, Icon]) => (
                  <div key={resource} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-amber-900 w-16">{resource}</span>
                    <Input
                      type="number"
                      min="0"
                      value={newOffer.requested[resource as keyof typeof newOffer.requested]}
                      onChange={(e) => setNewOffer(prev => ({
                        ...prev,
                        requested: { ...prev.requested, [resource]: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-20 h-8 bg-white border-amber-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button onClick={createTradeOffer} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
            Wyślij ofertę
          </Button>
        </CardContent>
      </Card>

      {/* Trade Offers */}
      <Card className="bg-amber-50/90 backdrop-blur-sm border-amber-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-amber-900 flex items-center gap-2">
            <Handshake className="h-6 w-6" />
            Oferty handlowe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tradeOffers.map((offer) => (
              <Card key={offer.id} className="bg-white/80 border-amber-300">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-amber-900">
                        {offer.sender_id === civilizationId 
                          ? `Do: ${offer.receiver_civilization?.civilization_name}`
                          : `Od: ${offer.sender_civilization?.civilization_name}`
                        }
                      </p>
                      <p className="text-sm text-amber-600">Status: {offer.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-amber-600">
                        Wygasa: {new Date(offer.expires_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-amber-900 mb-2">Oferowane:</h4>
                      <div className="space-y-1">
                        {Object.entries(offer.offered_resources).map(([resource, amount]) => {
                          if (!amount) return null;
                          const Icon = resourceIcons[resource as keyof typeof resourceIcons];
                          return (
                            <div key={resource} className="flex items-center gap-2 text-sm">
                              <Icon className="h-3 w-3 text-amber-600" />
                              <span className="text-amber-900">{resource}: {amount as number}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-amber-900 mb-2">Żądane:</h4>
                      <div className="space-y-1">
                        {Object.entries(offer.requested_resources).map(([resource, amount]) => {
                          if (!amount) return null;
                          const Icon = resourceIcons[resource as keyof typeof resourceIcons];
                          return (
                            <div key={resource} className="flex items-center gap-2 text-sm">
                              <Icon className="h-3 w-3 text-amber-600" />
                              <span className="text-amber-900">{resource}: {amount as number}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {offer.receiver_id === civilizationId && offer.status === 'pending' && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => acceptTradeOffer(offer.id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Akceptuj
                      </Button>
                      <Button
                        onClick={() => rejectTradeOffer(offer.id)}
                        size="sm"
                        variant="destructive"
                      >
                        Odrzuć
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradePanel;
