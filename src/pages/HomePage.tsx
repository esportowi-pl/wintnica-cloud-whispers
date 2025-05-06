
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Users, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ContentSlider from '@/components/content/ContentSlider';
import ActivityFeed from '@/components/social/ActivityFeed';
import MainLayout from '@/components/layout/MainLayout';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/80 to-primary py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Witnica.info - Twoja społeczność online
              </h1>
              <p className="mt-6 text-white/90 text-xl">
                Twórz, publikuj i zarabiaj w jednym miejscu. Dołącz do społeczności lokalnych twórców i mieszkańców.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/register')}
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Dołącz teraz <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/content')}
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Przeglądaj treści
                </Button>
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-xl p-6">
                <img 
                  src="/placeholder.svg" 
                  alt="Witnica.info platforma" 
                  className="w-full h-64 object-cover rounded-lg" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Dlaczego Witnica.info?</h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Nasza platforma łączy lokalną społeczność, informacje i możliwości zarabiania w jednym miejscu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Star className="h-8 w-8 text-primary" />}
              title="Wysokiej jakości treści"
              description="Sprawdzone informacje i atrakcyjne treści przygotowane przez lokalnych autorów."
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="Bezpieczeństwo"
              description="Chronimy Twoje dane i zapewniamy bezpieczne środowisko dla całej społeczności."
            />
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-primary" />}
              title="Społeczność"
              description="Łączymy mieszkańców Witnicy i okolic, tworząc lokalną sieć wsparcia."
            />
            <FeatureCard 
              icon={<BarChart className="h-8 w-8 text-primary" />}
              title="Zarabiaj"
              description="Twórz wartościowe treści i zarabiaj dzięki naszemu systemowi shardsów."
            />
          </div>
        </div>
      </section>

      {/* Content Slider */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Najnowsze artykuły</h2>
          <ContentSlider />
        </div>
      </section>

      {/* Activity Feed */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-8">Co się dzieje w Witnicy?</h2>
              <ActivityFeed />
            </div>
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Dołącz do Premium</CardTitle>
                  <CardDescription>
                    Odblokuj wszystkie możliwości platformy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="bg-primary/20 p-1 rounded-full mr-2">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      Nieograniczony dostęp do treści
                    </li>
                    <li className="flex items-center">
                      <div className="bg-primary/20 p-1 rounded-full mr-2">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      Monetyzacja własnych publikacji
                    </li>
                    <li className="flex items-center">
                      <div className="bg-primary/20 p-1 rounded-full mr-2">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      Szablony treści i grafik
                    </li>
                    <li className="flex items-center">
                      <div className="bg-primary/20 p-1 rounded-full mr-2">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      Analityka czytelnictwa
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate('/premium')}>
                    Rozpocznij za 19.99zł/mies
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

// Feature Card component
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

// Missing Check icon import
const Check = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6L9 17L4 12" />
  </svg>
);

export default HomePage;
