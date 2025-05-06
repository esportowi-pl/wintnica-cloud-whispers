
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  avatar?: string;
};

// Mock initial messages
const initialMessages: Message[] = [
  {
    id: 1, 
    sender: "Jan Kowalski", 
    content: "Cześć wszystkim! Jak tam przygotowania do weekendowego festynu?", 
    timestamp: "14:32",
    avatar: "JK"
  },
  {
    id: 2, 
    sender: "Anna Nowak", 
    content: "Hej! Wszystko idzie zgodnie z planem. Będą food trucki i występy lokalnych zespołów.", 
    timestamp: "14:35",
    avatar: "AN"
  },
  {
    id: 3, 
    sender: "Piotr Wiśniewski", 
    content: "Czy ktoś wie o której godzinie zaczyna się występ zespołu 'Witnickie Słowiki'?", 
    timestamp: "14:40",
    avatar: "PW"
  },
  {
    id: 4, 
    sender: "Magdalena Kowalczyk", 
    content: "Witnickie Słowiki występują o 16:00 na głównej scenie.", 
    timestamp: "14:42",
    avatar: "MK"
  },
  {
    id: 5, 
    sender: "System", 
    content: "Przypominamy o zachowaniu kultury wypowiedzi w czacie. Dziękujemy!", 
    timestamp: "14:45",
    avatar: "S"
  }
];

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "Użytkownik",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        avatar: "U"
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="bg-primary text-white">
        <CardTitle className="flex items-center">
          <MessageCircle className="mr-2" size={18} />
          Czat Miasta Witnica
        </CardTitle>
      </CardHeader>
      <ScrollArea className="h-[400px] p-4">
        <CardContent className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <Avatar>
                <AvatarImage src={message.avatar ? undefined : undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {message.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex gap-2 items-baseline">
                  <span className="font-medium">{message.sender}</span>
                  <span className="text-xs text-gray-400">{message.timestamp}</span>
                </div>
                <p className="text-gray-700">{message.content}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2 w-full">
          <Input 
            placeholder="Napisz wiadomość..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!newMessage.trim()}>
            Wyślij
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatBox;
