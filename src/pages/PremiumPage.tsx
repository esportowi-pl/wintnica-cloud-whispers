
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MainLayout from '@/components/layout/MainLayout';

const PremiumPage = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 'basic',
      name: 'Podstawowy',
      price: 0,
      features: [
        'Czytanie treści publicznych',
        'Dodawanie komentarzy',
        'Udział w dyskusjach',
        'Podstawowe statystyki',
      ],
      cta: 'Zaloguj się',
      popular: false,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19.99,
      features: [
        'Wszystko z planu Podstawowego',
        'Dostęp do treści Premium',
        'Tworzenie własnych artykułów',
        'Zarabianie shardów za treści',
        'Odznaki i osiągnięcia',
        'Szczegółowa analityka treści',
        'Priorytetowe wsparcie',
      ],
      cta: 'Wybierz Premium',
      popular: true,
    },
    {
      id: 'business',
      name: 'Business',
      price: 49.99,
      features: [
        'Wszystko z planu Premium',
        'Własny profil biznesowy',
        'Publikacje bez limitu',
        'Reklama w serwisie',
        'Dostęp do API',
        'Wsparcie priorytetowe 24/7',
        'Niestandardowe odznaki',
      ],
      cta: 'Wybierz Business',
      popular: false,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Wybierz swój plan</h1>
          <p className="text-lg text-muted-foreground">
            Wybierz odpowiedni plan i zyskaj dostęp do wszystkich funkcji naszej platformy. Twórz, publikuj i zarabiaj w jednym miejscu.
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan) => (
            <motion.div key={plan.id} variants={itemVariants}>
              <Card className={`h-full flex flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription className="mt-2">
                        {plan.price === 0 ? (
                          <span>Darmowy</span>
                        ) : (
                          <span>
                            <span className="text-3xl font-bold">{plan.price.toString().replace('.', ',')} zł</span>
                            <span className="text-muted-foreground"> / miesięcznie</span>
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    {plan.popular && (
                      <Badge className="bg-primary text-primary-foreground">Najpopularniejszy</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => {
                      if (plan.id === 'basic') {
                        navigate('/login');
                      } else {
                        navigate('/subscribe/' + plan.id);
                      }
                    }}
                  >
                    {plan.id !== 'basic' && <CreditCard className="mr-2 h-4 w-4" />}
                    {plan.cta}
                    {plan.popular && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Często zadawane pytania</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Czy mogę zmienić swój plan w dowolnym momencie?</h3>
              <p className="text-muted-foreground">
                Tak, możesz w dowolnym momencie zmienić swój plan. Zmiana zostanie uwzględniona przy kolejnym okresie rozliczeniowym.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Jak mogę anulować subskrypcję?</h3>
              <p className="text-muted-foreground">
                Możesz anulować subskrypcję w dowolnym momencie w ustawieniach konta. Będziesz mieć dostęp do wszystkich funkcji do końca okresu rozliczeniowego.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Czy mogę zarobić realne pieniądze za pomocą shardów?</h3>
              <p className="text-muted-foreground">
                Tak, po zgromadzeniu odpowiedniej liczby shardów możesz je wymienić na prawdziwe pieniądze, które zostaną przelane na Twoje konto.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Jakie są warunki publikowania treści Premium?</h3>
              <p className="text-muted-foreground">
                Treści Premium muszą spełniać nasze standardy jakości. Każda treść jest weryfikowana przez moderatorów przed publikacją.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PremiumPage;
