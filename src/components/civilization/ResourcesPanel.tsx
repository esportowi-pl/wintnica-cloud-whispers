
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TreePine, Mountain, Coins, Wheat, Pickaxe } from 'lucide-react';

interface ResourcesPanelProps {
  resources: {
    wood: number;
    stone: number;
    gold: number;
    food: number;
    iron: number;
  };
}

const ResourcesPanel = ({ resources }: ResourcesPanelProps) => {
  const resourceItems = [
    { name: 'Drewno', value: resources.wood, icon: TreePine, color: 'text-green-600' },
    { name: 'Kamień', value: resources.stone, icon: Mountain, color: 'text-gray-600' },
    { name: 'Złoto', value: resources.gold, icon: Coins, color: 'text-yellow-600' },
    { name: 'Żywność', value: resources.food, icon: Wheat, color: 'text-orange-600' },
    { name: 'Żelazo', value: resources.iron, icon: Pickaxe, color: 'text-blue-600' },
  ];

  return (
    <Card className="mb-6 bg-amber-50/90 backdrop-blur-sm border-amber-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-amber-900">Surowce</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          {resourceItems.map((resource) => (
            <div key={resource.name} className="text-center">
              <resource.icon className={`h-8 w-8 mx-auto mb-2 ${resource.color}`} />
              <p className="text-sm font-medium text-amber-900">{resource.name}</p>
              <p className="text-lg font-bold text-amber-800">{resource.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourcesPanel;
