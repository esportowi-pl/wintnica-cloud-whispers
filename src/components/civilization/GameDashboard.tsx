
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResourcesPanel from './ResourcesPanel';
import BuildingsPanel from './BuildingsPanel';
import UnitsPanel from './UnitsPanel';
import TechnologyPanel from './TechnologyPanel';
import WorldMapPanel from './WorldMapPanel';
import TradePanel from './TradePanel';
import AlliancePanel from './AlliancePanel';
import ChatPanel from './ChatPanel';
import { Crown, Hammer, Shield, BookOpen, Globe, Handshake, Users, MessageSquare } from 'lucide-react';

interface GameDashboardProps {
  civilization: {
    id: string;
    civilization_name: string;
    level: number;
    experience: number;
    population: number;
    happiness: number;
    culture_points: number;
  };
  resources: {
    wood: number;
    stone: number;
    gold: number;
    food: number;
    iron: number;
  } | null;
}

const GameDashboard = ({ civilization, resources }: GameDashboardProps) => {
  const [activeTab, setActiveTab] = useState('city');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-amber-50/90 backdrop-blur-sm border-amber-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold text-amber-900 flex items-center gap-2">
                  <Crown className="h-6 w-6" />
                  {civilization.civilization_name}
                </CardTitle>
                <p className="text-amber-700">
                  Poziom {civilization.level} • Populacja: {civilization.population} • 
                  Szczęście: {civilization.happiness}% • Kultura: {civilization.culture_points}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-amber-600">Doświadczenie</p>
                <p className="text-lg font-semibold text-amber-900">{civilization.experience} XP</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Resources */}
        {resources && <ResourcesPanel resources={resources} />}

        {/* Main Game Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-amber-100/90 backdrop-blur-sm">
            <TabsTrigger value="city" className="flex items-center gap-1">
              <Hammer className="h-4 w-4" />
              Miasto
            </TabsTrigger>
            <TabsTrigger value="units" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Jednostki
            </TabsTrigger>
            <TabsTrigger value="technology" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Nauka
            </TabsTrigger>
            <TabsTrigger value="world" className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              Świat
            </TabsTrigger>
            <TabsTrigger value="trade" className="flex items-center gap-1">
              <Handshake className="h-4 w-4" />
              Handel
            </TabsTrigger>
            <TabsTrigger value="alliance" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Sojusze
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="city">
            <BuildingsPanel civilizationId={civilization.id} />
          </TabsContent>

          <TabsContent value="units">
            <UnitsPanel civilizationId={civilization.id} />
          </TabsContent>

          <TabsContent value="technology">
            <TechnologyPanel civilizationId={civilization.id} />
          </TabsContent>

          <TabsContent value="world">
            <WorldMapPanel civilizationId={civilization.id} />
          </TabsContent>

          <TabsContent value="trade">
            <TradePanel civilizationId={civilization.id} />
          </TabsContent>

          <TabsContent value="alliance">
            <AlliancePanel civilizationId={civilization.id} />
          </TabsContent>

          <TabsContent value="chat">
            <ChatPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GameDashboard;
