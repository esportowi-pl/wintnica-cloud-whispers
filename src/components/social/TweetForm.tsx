
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle } from 'lucide-react';

const TweetForm = () => {
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      // In a real app, we'd send this to an API
      toast({
        title: "Wiadomość wysłana!",
        description: "Twój tweet pojawi się wkrótce na niebie Witnicy!",
      });
      setMessage('');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium flex items-center">
        <MessageCircle className="mr-2" size={18} />
        Dodaj wiadomość do chmurki
      </h3>
      <p className="text-sm text-gray-500 mt-1 mb-4">
        Podziel się swoją myślą z mieszkańcami Witnicy
      </p>
      <form onSubmit={handleSubmit}>
        <Textarea
          placeholder="Co słychać w Witnicy?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[100px] mb-4"
          maxLength={280}
        />
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {message.length}/280 znaków
          </div>
          <Button type="submit" disabled={!message.trim()}>
            Wyślij
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetForm;
