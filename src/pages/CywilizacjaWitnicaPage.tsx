
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import CivilizationGame from '@/components/civilization/CivilizationGame';
import AuthModal from '@/components/auth/AuthModal';

const CywilizacjaWitnicaPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-100 mb-8">Cywilizacja Witnica</h1>
          <p className="text-amber-200 mb-8">Zaloguj się, aby rozpocząć swoją przygodę</p>
          <AuthModal />
        </div>
      </div>
    );
  }

  return <CivilizationGame />;
};

export default CywilizacjaWitnicaPage;
