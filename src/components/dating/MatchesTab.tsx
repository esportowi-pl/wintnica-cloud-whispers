
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { Match } from './types';

interface MatchesTabProps {
  matches: Match[];
}

const MatchesTab: React.FC<MatchesTabProps> = ({ matches }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Twoje dopasowania</h2>
      {matches.length === 0 ? (
        <Card className="p-6 text-center">
          <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p>Brak dopasowań</p>
          <p className="text-sm text-muted-foreground">
            Zacznij przeglądać profile, aby znaleźć dopasowania!
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {matches.map((match) => (
            <Card key={match.id} className="p-4 text-center cursor-pointer hover:shadow-lg transition-shadow">
              <img
                src={match.profile?.photos?.[0] || '/placeholder.svg'}
                alt={match.profile?.display_name}
                className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
              />
              <h3 className="font-medium">{match.profile?.display_name}</h3>
              <Badge variant="secondary" className="text-xs">
                Dopasowanie
              </Badge>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchesTab;
