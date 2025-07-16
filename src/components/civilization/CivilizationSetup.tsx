
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CivilizationSetupProps {
  onCreateCivilization: (name: string) => void;
}

const CivilizationSetup = ({ onCreateCivilization }: CivilizationSetupProps) => {
  const [civilizationName, setCivilizationName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (civilizationName.trim()) {
      onCreateCivilization(civilizationName.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-amber-50/90 backdrop-blur-sm border-amber-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-amber-900">
            Cywilizacja Witnica
          </CardTitle>
          <CardDescription className="text-amber-700">
            Stwórz swoją cywilizację i rozpocznij przygodę
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="civilizationName" className="block text-sm font-medium text-amber-900 mb-2">
                Nazwa Cywilizacji
              </label>
              <Input
                id="civilizationName"
                type="text"
                value={civilizationName}
                onChange={(e) => setCivilizationName(e.target.value)}
                placeholder="Wprowadź nazwę swojej cywilizacji"
                className="bg-white border-amber-300 focus:border-amber-500"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              disabled={!civilizationName.trim()}
            >
              Stwórz Cywilizację
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CivilizationSetup;
