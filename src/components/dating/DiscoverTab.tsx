
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import TinderCard from "./TinderCard";
import { AnimatePresence } from "framer-motion";
import { DatingProfile } from './types';

interface DiscoverTabProps {
  profiles: DatingProfile[];
  currentIndex: number;
  loading: boolean;
  onSwipe: (profileId: string, liked: boolean) => void;
  onRefresh: () => void;
}

const DiscoverTab: React.FC<DiscoverTabProps> = ({
  profiles,
  currentIndex,
  loading,
  onSwipe,
  onRefresh
}) => {
  if (loading) {
    return (
      <Card className="h-full flex items-center justify-center">
        <p>Ładowanie profili...</p>
      </Card>
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <Card className="h-full flex flex-col items-center justify-center text-center p-6">
        <Heart className="h-16 w-16 text-pink-400 mb-4" />
        <h3 className="text-xl font-bold mb-2">Koniec profili na dziś!</h3>
        <p className="text-muted-foreground">
          Wróć jutro, aby zobaczyć nowe profile w okolicy.
        </p>
        <Button className="mt-4" onClick={onRefresh}>
          Odśwież
        </Button>
      </Card>
    );
  }

  return (
    <div className="h-full relative">
      <AnimatePresence>
        {profiles.slice(currentIndex, currentIndex + 2).map((profile, index) => (
          <TinderCard
            key={profile.id}
            profile={profile}
            onSwipe={onSwipe}
            zIndex={profiles.length - index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default DiscoverTab;
