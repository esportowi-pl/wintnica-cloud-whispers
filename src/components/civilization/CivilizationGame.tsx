
import React from 'react';
import { useCivilization } from '@/hooks/useCivilization';
import CivilizationSetup from './CivilizationSetup';
import GameDashboard from './GameDashboard';
import { Loader2 } from 'lucide-react';

const CivilizationGame = () => {
  const { civilization, resources, loading, createCivilization } = useCivilization();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-100" />
      </div>
    );
  }

  if (!civilization) {
    return <CivilizationSetup onCreateCivilization={createCivilization} />;
  }

  return <GameDashboard civilization={civilization} resources={resources} />;
};

export default CivilizationGame;
