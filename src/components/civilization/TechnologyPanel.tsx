
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BookOpen, Zap, Shield, Swords, TreePine, Hammer } from 'lucide-react';

interface Technology {
  id: string;
  technology_name: string;
  research_progress: number;
  is_completed: boolean;
  research_start: string | null;
}

interface TechnologyPanelProps {
  civilizationId: string;
}

const TechnologyPanel = ({ civilizationId }: TechnologyPanelProps) => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);

  const techTree = {
    agriculture: { name: 'Rolnictwo', icon: TreePine, description: 'Zwiększa produkcję żywności', cost: 50 },
    metalworking: { name: 'Obróbka Metali', icon: Hammer, description: 'Umożliwia lepsze narzędzia', cost: 100 },
    military_tactics: { name: 'Taktyki Wojskowe', icon: Swords, description: 'Zwiększa siłę jednostek', cost: 150 },
    fortification: { name: 'Fortyfikacje', icon: Shield, description: 'Lepsze obrony miasta', cost: 200 },
    engineering: { name: 'Inżynieria', icon: Zap, description: 'Szybsza budowa', cost: 250 },
    philosophy: { name: 'Filozofia', icon: BookOpen, description: 'Zwiększa szczęście', cost: 300 },
  };

  const fetchTechnologies = async () => {
    try {
      const { data, error } = await supabase
        .from('civilization_technologies')
        .select('*')
        .eq('civilization_id', civilizationId);

      if (error) throw error;
      setTechnologies(data || []);
    } catch (error) {
      console.error('Error fetching technologies:', error);
      toast.error('Błąd podczas ładowania technologii');
    } finally {
      setLoading(false);
    }
  };

  const startResearch = async (techName: string) => {
    try {
      const { error } = await supabase
        .from('civilization_technologies')
        .insert({
          civilization_id: civilizationId,
          technology_name: techName,
          research_progress: 0,
          research_start: new Date().toISOString(),
        });

      if (error) throw error;
      
      toast.success('Rozpoczęto badania!');
      fetchTechnologies();
    } catch (error) {
      console.error('Error starting research:', error);
      toast.error('Błąd podczas rozpoczynania badań');
    }
  };

  const continueResearch = async (techId: string) => {
    try {
      const tech = technologies.find(t => t.id === techId);
      if (!tech) return;

      const newProgress = Math.min(tech.research_progress + 10, 100);
      const isCompleted = newProgress >= 100;

      const { error } = await supabase
        .from('civilization_technologies')
        .update({ 
          research_progress: newProgress,
          is_completed: isCompleted,
          research_end: isCompleted ? new Date().toISOString() : null
        })
        .eq('id', techId);

      if (error) throw error;
      
      if (isCompleted) {
        toast.success('Technologia została ukończona!');
      } else {
        toast.success('Postęp w badaniach!');
      }
      
      fetchTechnologies();
    } catch (error) {
      console.error('Error continuing research:', error);
      toast.error('Błąd podczas badań');
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, [civilizationId]);

  if (loading) {
    return <div className="text-center py-8 text-amber-700">Ładowanie technologii...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Current Research */}
      <Card className="bg-amber-50/90 backdrop-blur-sm border-amber-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-amber-900">Aktywne Badania</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {technologies.filter(t => !t.is_completed).map((tech) => {
              const techInfo = techTree[tech.technology_name as keyof typeof techTree];
              if (!techInfo) return null;

              return (
                <Card key={tech.id} className="bg-white/80 border-amber-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <techInfo.icon className="h-6 w-6 text-amber-600" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-amber-900">{techInfo.name}</h3>
                        <p className="text-sm text-amber-700">{techInfo.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Progress value={tech.research_progress} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-amber-600">
                          {tech.research_progress}% ukończone
                        </span>
                        <Button
                          onClick={() => continueResearch(tech.id)}
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                          disabled={tech.research_progress >= 100}
                        >
                          Kontynuuj Badania
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Available Technologies */}
      <Card className="bg-amber-50/90 backdrop-blur-sm border-amber-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-amber-900">Drzewo Technologii</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(techTree).map(([techName, info]) => {
              const existingTech = technologies.find(t => t.technology_name === techName);
              const isCompleted = existingTech?.is_completed;
              const isInProgress = existingTech && !existingTech.is_completed;

              return (
                <Card key={techName} className={`bg-white/80 border-amber-300 ${isCompleted ? 'bg-green-50' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <info.icon className={`h-6 w-6 ${isCompleted ? 'text-green-600' : 'text-amber-600'}`} />
                      <h3 className="font-semibold text-amber-900">{info.name}</h3>
                    </div>
                    <p className="text-xs text-amber-600 mb-3">{info.description}</p>
                    <p className="text-sm text-amber-700 mb-3">Koszt: {info.cost} punktów nauki</p>
                    
                    {isCompleted ? (
                      <div className="text-center text-green-600 font-semibold">Ukończone</div>
                    ) : isInProgress ? (
                      <div className="text-center text-blue-600 font-semibold">W trakcie badań</div>
                    ) : (
                      <Button
                        onClick={() => startResearch(techName)}
                        size="sm"
                        variant="outline"
                        className="w-full border-amber-300 text-amber-700 hover:bg-amber-100"
                      >
                        Rozpocznij Badania
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnologyPanel;
