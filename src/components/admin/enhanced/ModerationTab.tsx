
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Check, X, Eye, Clock } from 'lucide-react';

interface ModerationItem {
  id: string;
  content_type: string;
  content_id: string;
  status: string;
  created_at: string;
  reason?: string;
}

export default function ModerationTab() {
  const [items, setItems] = useState<ModerationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  const loadModerationItems = async () => {
    try {
      const { data, error } = await supabase
        .from('content_moderation')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading moderation items:', error);
      toast.error('Błąd ładowania elementów do moderacji');
    } finally {
      setLoading(false);
    }
  };

  const handleModeration = async (itemId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('content_moderation')
        .update({
          status,
          moderator_id: (await supabase.auth.getUser()).data.user?.id,
          reason: status === 'rejected' ? reason : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId);

      if (error) throw error;

      // Log admin activity
      await supabase.rpc('log_admin_activity', {
        _action: `${status === 'approved' ? 'Approved' : 'Rejected'} content`,
        _target_type: 'content_moderation',
        _target_id: itemId,
        _details: { reason: reason || null }
      });

      toast.success(`Element ${status === 'approved' ? 'zatwierdzony' : 'odrzucony'}`);
      setSelectedItem(null);
      setReason('');
      loadModerationItems();
    } catch (error) {
      console.error('Error updating moderation status:', error);
      toast.error('Błąd podczas moderacji');
    }
  };

  useEffect(() => {
    loadModerationItems();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Moderacja treści</h1>
        <Badge variant="destructive">
          {items.filter(item => item.status === 'pending').length} oczekuje
        </Badge>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {item.content_type.charAt(0).toUpperCase() + item.content_type.slice(1)}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    item.status === 'approved' ? 'default' :
                    item.status === 'rejected' ? 'destructive' : 'secondary'
                  }>
                    {item.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                    {item.status === 'approved' && <Check className="h-3 w-3 mr-1" />}
                    {item.status === 'rejected' && <X className="h-3 w-3 mr-1" />}
                    {item.status === 'pending' ? 'Oczekuje' :
                     item.status === 'approved' ? 'Zatwierdzone' : 'Odrzucone'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  ID treści: {item.content_id}
                </div>
                <div className="text-sm text-muted-foreground">
                  Utworzono: {new Date(item.created_at).toLocaleString('pl-PL')}
                </div>
                
                {item.reason && (
                  <div className="p-3 bg-red-50 rounded border border-red-200">
                    <p className="text-sm font-medium text-red-800">Powód odrzucenia:</p>
                    <p className="text-sm text-red-700">{item.reason}</p>
                  </div>
                )}

                {item.status === 'pending' && (
                  <div className="space-y-3">
                    {selectedItem === item.id && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Powód odrzucenia (opcjonalny)"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          rows={3}
                        />
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleModeration(item.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Zatwierdź
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (selectedItem === item.id) {
                            handleModeration(item.id, 'rejected');
                          } else {
                            setSelectedItem(item.id);
                          }
                        }}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Odrzuć
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Podgląd
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {items.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Brak elementów do moderacji</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
