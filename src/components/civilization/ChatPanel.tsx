
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { MessageSquare, Send, Users } from 'lucide-react';

interface Message {
  id: string;
  message: string;
  user_id: string;
  created_at: string;
  profiles?: { username: string };
}

const ChatPanel = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [gameRoom, setGameRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrCreateGameRoom = async () => {
    try {
      // Check if game room exists
      let { data: room, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .eq('name', 'Cywilizacja Witnica - Sala Główna')
        .eq('type', 'game')
        .single();

      if (error && error.code === 'PGRST116') {
        // Room doesn't exist, create it
        const { data: newRoom, error: createError } = await supabase
          .from('chat_rooms')
          .insert({
            name: 'Cywilizacja Witnica - Sala Główna',
            description: 'Główna sala czatu dla wszystkich graczy',
            type: 'game',
            created_by: user?.id || ''
          })
          .select()
          .single();

        if (createError) throw createError;
        room = newRoom;
      } else if (error) {
        throw error;
      }

      setGameRoom(room);
      return room;
    } catch (error) {
      console.error('Error fetching/creating game room:', error);
      toast.error('Błąd podczas ładowania czatu');
    }
  };

  const fetchMessages = async (roomId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          profiles(username)
        `)
        .eq('room_id', roomId)
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Błąd podczas ładowania wiadomości');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !gameRoom || !user) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          room_id: gameRoom.id,
          user_id: user.id,
          message: newMessage.trim(),
          message_type: 'text'
        });

      if (error) throw error;
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Błąd podczas wysyłania wiadomości');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (!user) return;

    const initializeChat = async () => {
      const room = await fetchOrCreateGameRoom();
      if (room) {
        await fetchMessages(room.id);
      }
    };

    initializeChat();
  }, [user]);

  // Set up real-time subscription
  useEffect(() => {
    if (!gameRoom) return;

    const channel = supabase
      .channel('game-chat')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `room_id=eq.${gameRoom.id}`
      }, async (payload) => {
        // Fetch user info for the new message
        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', payload.new.user_id)
          .single();

        const newMessage = {
          ...payload.new,
          profiles: profile
        } as Message;

        setMessages(prev => [...prev, newMessage]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameRoom]);

  if (loading) {
    return <div className="text-center py-8 text-amber-700">Ładowanie czatu...</div>;
  }

  return (
    <Card className="bg-amber-50/90 backdrop-blur-sm border-amber-200 h-96">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-amber-900 flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Chat Globalny
          <Users className="h-4 w-4 ml-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex flex-col h-80">
        {/* Messages */}
        <ScrollArea className="flex-1 mb-4 p-2 bg-white/60 rounded border border-amber-200">
          <div className="space-y-2">
            {messages.map((message) => (
              <div key={message.id} className="text-sm">
                <span className="font-semibold text-amber-900">
                  {message.profiles?.username || 'Gracz'}:
                </span>
                <span className="ml-2 text-amber-800">{message.message}</span>
                <span className="ml-2 text-xs text-amber-600">
                  {new Date(message.created_at).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Napisz wiadomość..."
            className="bg-white border-amber-300 focus:border-amber-500"
            maxLength={500}
          />
          <Button
            onClick={sendMessage}
            className="bg-amber-600 hover:bg-amber-700 text-white"
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatPanel;
