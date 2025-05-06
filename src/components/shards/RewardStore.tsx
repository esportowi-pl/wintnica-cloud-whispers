
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Shield, Award, Tag, Gift, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Mock data for rewards
const mockRewards = {
  badges: [
    {
      id: 'b1',
      name: 'Lokalny Reporter',
      description: 'Odznaka dla aktywnych twórców treści lokalnych.',
      price: 100,
      image: '/placeholder.svg',
      owned: false,
      premium: false
    },
    {
      id: 'b2',
      name: 'Ekspert Witnicy',
      description: 'Dla osób z szeroką wiedzą o mieście i regionie.',
      price: 250,
      image: '/placeholder.svg',
      owned: false,
      premium: false
    },
    {
      id: 'b3',
      name: 'Platynowy Autor',
      description: 'Prestiżowa odznaka dla najlepszych autorów.',
      price: 500,
      image: '/placeholder.svg',
      owned: false,
      premium: true
    },
    {
      id: 'b4',
      name: 'Miejski Obserwator',
      description: 'Dla osób aktywnie komentujących wydarzenia miejskie.',
      price: 150,
      image: '/placeholder.svg',
      owned: true,
      premium: false
    }
  ],
  avatars: [
    {
      id: 'a1',
      name: 'Bohater Witnicy',
      description: 'Specjalna ramka do zdjęcia profilowego.',
      price: 75,
      image: '/placeholder.svg',
      owned: false,
      premium: false
    },
    {
      id: 'a2',
      name: 'VIP',
      description: 'Złota ramka podkreślająca Twój status.',
      price: 200,
      image: '/placeholder.svg',
      owned: false,
      premium: true
    },
    {
      id: 'a3',
      name: 'Witniczanin',
      description: 'Ramka z motywami lokalnymi miasta.',
      price: 50,
      image: '/placeholder.svg',
      owned: true,
      premium: false
    }
  ],
  features: [
    {
      id: 'f1',
      name: 'Publikacja Premium (1 miesiąc)',
      description: 'Możliwość publikacji treści Premium przez miesiąc.',
      price: 300,
      image: '/placeholder.svg',
      owned: false,
      premium: true
    },
    {
      id: 'f2',
      name: 'Podświetlone komentarze',
      description: 'Twoje komentarze będą wyróżnione na 30 dni.',
      price: 100,
      image: '/placeholder.svg',
      owned: false,
      premium: false
    },
    {
      id: 'f3',
      name: 'Wyróżniony artykuł',
      description: 'Wyróżnienie jednego wybranego artykułu na stronie głównej.',
      price: 200,
      image: '/placeholder.svg',
      owned: false,
      premium: false
    }
  ]
};

interface RewardStoreProps {
  currentShards?: number;
}

const RewardStore: React.FC<RewardStoreProps> = ({ currentShards = 238 }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('badges');
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  const handleBuyReward = (reward: any) => {
    if (reward.price > currentShards) {
      toast.error('Niewystarczająca liczba shardów!');
      return;
    }
    
    setSelectedReward(reward);
    setConfirmDialogOpen(true);
  };
  
  const confirmPurchase = () => {
    // Here we would call an API to complete the purchase
    toast.success(`Zakupiono: ${selectedReward.name}`);
    setConfirmDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sklep nagród</h1>
          <p className="text-muted-foreground">Wydawaj zarobione shardy na nagrody i funkcje specjalne</p>
        </div>
        <Card className="border-primary">
          <CardContent className="p-4 flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-medium">Twoje shardy</p>
              <p className="text-2xl font-bold">{currentShards}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/dashboard/earn')}
              className="ml-2"
            >
              Zdobądź więcej
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="badges" className="flex gap-2 items-center">
            <Award className="h-4 w-4" />
            Odznaki
          </TabsTrigger>
          <TabsTrigger value="avatars" className="flex gap-2 items-center">
            <Shield className="h-4 w-4" />
            Avatary
          </TabsTrigger>
          <TabsTrigger value="features" className="flex gap-2 items-center">
            <Tag className="h-4 w-4" />
            Funkcje
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="badges">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockRewards.badges.map((badge) => (
              <RewardCard
                key={badge.id}
                reward={badge}
                onBuy={handleBuyReward}
                currentShards={currentShards}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="avatars">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockRewards.avatars.map((avatar) => (
              <RewardCard
                key={avatar.id}
                reward={avatar}
                onBuy={handleBuyReward}
                currentShards={currentShards}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="features">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockRewards.features.map((feature) => (
              <RewardCard
                key={feature.id}
                reward={feature}
                onBuy={handleBuyReward}
                currentShards={currentShards}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Purchase Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Potwierdź zakup</DialogTitle>
            <DialogDescription>
              Czy na pewno chcesz kupić tę nagrodę za {selectedReward?.price} shardów?
            </DialogDescription>
          </DialogHeader>
          
          {selectedReward && (
            <div className="flex items-center gap-4 py-4">
              <div className="bg-muted rounded-md p-2">
                <img
                  src={selectedReward.image}
                  alt={selectedReward.name}
                  className="w-16 h-16 object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold">{selectedReward.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedReward.description}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>Anuluj</Button>
            <Button onClick={confirmPurchase}>
              <Check className="mr-2 h-4 w-4" />
              Potwierdź zakup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Reward Card Component
interface RewardCardProps {
  reward: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    owned: boolean;
    premium: boolean;
  };
  onBuy: (reward: any) => void;
  currentShards: number;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, onBuy, currentShards }) => {
  const isAffordable = currentShards >= reward.price;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`h-full flex flex-col overflow-hidden ${reward.premium ? 'border-primary/50' : ''}`}>
        <div className="relative">
          <img 
            src={reward.image} 
            alt={reward.name} 
            className="w-full h-40 object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            {reward.premium && (
              <Badge variant="default" className="bg-primary text-primary-foreground">
                Premium
              </Badge>
            )}
            {reward.owned && (
              <Badge variant="outline" className="bg-background/80">
                Posiadasz
              </Badge>
            )}
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{reward.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {reward.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow pb-0">
          <div className="flex items-center gap-1 text-primary">
            <CreditCard className="h-4 w-4" />
            <span className="font-bold">{reward.price}</span>
            <span className="text-sm text-muted-foreground">shardów</span>
          </div>
        </CardContent>
        
        <CardFooter className="pt-4">
          {reward.owned ? (
            <Button variant="outline" className="w-full" disabled>
              <Check className="mr-2 h-4 w-4" />
              W posiadaniu
            </Button>
          ) : (
            <Button 
              className="w-full" 
              disabled={!isAffordable}
              onClick={() => onBuy(reward)}
            >
              {isAffordable ? (
                <>
                  <Gift className="mr-2 h-4 w-4" />
                  Kup teraz
                </>
              ) : (
                <>
                  <Info className="mr-2 h-4 w-4" />
                  Za mało shardów
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RewardStore;
