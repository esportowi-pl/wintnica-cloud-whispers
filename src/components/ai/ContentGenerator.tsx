
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, Loader2, ThumbsUp, ThumbsDown, RefreshCcw, Copy, FileText, Pencil, MessageSquare, Check, BookOpen, Image, AlertCircle, Lock, CheckCircle, Info } from 'lucide-react';
import { toast } from 'sonner';

// Types for our generator
interface GeneratorProps {
  isPremium?: boolean;
}

// Mock AI response data
interface GeneratedContent {
  title: string;
  content: string;
  type: string;
  tags: string[];
  date: Date;
}

const ContentGenerator: React.FC<GeneratorProps> = ({ isPremium = false }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [category, setCategory] = useState<string>('lokalne');
  const [contentType, setContentType] = useState<string>('post');
  const [tone, setTone] = useState<string>('informacyjny');
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [generationHistory, setGenerationHistory] = useState<GeneratedContent[]>([]);
  const [creativityLevel, setCreativityLevel] = useState<number>(50);
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState<boolean>(false);
  
  // Categories for content generation
  const categories = [
    { value: 'lokalne', label: 'Newsy lokalne' },
    { value: 'wydarzenia', label: 'Wydarzenia' },
    { value: 'historia', label: 'Historia' },
    { value: 'biznes', label: 'Biznes' },
    { value: 'kultura', label: 'Kultura' },
    { value: 'sport', label: 'Sport' },
    { value: 'poradniki', label: 'Poradniki' }
  ];
  
  // Content types
  const contentTypes = [
    { value: 'post', label: 'Krótki post (do 300 znaków)' },
    { value: 'article', label: 'Artykuł (500-1000 znaków)' },
    { value: 'news', label: 'News lokalny' },
    { value: 'event', label: 'Opis wydarzenia' },
    { value: 'review', label: 'Recenzja miejsca' },
    { value: 'profile', label: 'Profil osoby', premiumOnly: true },
    { value: 'interview', label: 'Wywiad', premiumOnly: true }
  ];
  
  // Tone options
  const toneOptions = [
    { value: 'informacyjny', label: 'Informacyjny' },
    { value: 'nieformalny', label: 'Nieformalny' },
    { value: 'entuzjastyczny', label: 'Entuzjastyczny' },
    { value: 'profesjonalny', label: 'Profesjonalny' },
    { value: 'humorystyczny', label: 'Humorystyczny', premiumOnly: true }
  ];
  
  // Example prompts for inspiration
  const examplePrompts = [
    "Co nowego w parku miejskim w Witnicy?",
    "Jak przebiegają przygotowania do festynu w centrum miasta?",
    "Historia starej fabryki w Witnicy",
    "Nowa kawiarnia przy rynku - pierwsze wrażenia",
    "Lokalne tradycje i zwyczaje w Witnicy"
  ];
  
  // Handle generate content
  const handleGenerateContent = () => {
    // Check if this is a premium feature and user is not premium
    const selectedContentType = contentTypes.find(ct => ct.value === contentType);
    const selectedTone = toneOptions.find(t => t.value === tone);
    
    if ((selectedContentType?.premiumOnly || selectedTone?.premiumOnly) && !isPremium) {
      setIsPremiumDialogOpen(true);
      return;
    }
    
    if (!prompt) {
      toast.error("Proszę wprowadzić opis treści do wygenerowania");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const mockTitles = [
        "Nowe atrakcje w parku miejskim Witnicy już dostępne!",
        "Historia Witnicy: Od małej osady do lokalnego centrum",
        "Festyn miejski w Witnicy: Co nas czeka w ten weekend?",
        "Nowa kawiarnia 'Aromat' przyciąga mieszkańców Witnicy",
        "Lokalne rzemiosło kwitnie - wywiad z Janem Kowalskim"
      ];
      
      const mockContent = `
      ${contentType === 'post' ? 'Hej! ' : ''}Dziś chcemy podzielić się z Wami wyjątkową informacją dotyczącą naszego miasta. ${
        category === 'lokalne' ? 'W samym centrum Witnicy ' :
        category === 'wydarzenia' ? 'Podczas nadchodzącego weekendu w Witnicy ' :
        category === 'historia' ? 'Historia naszej Witnicy jest fascynująca, szczególnie gdy przyjrzymy się ' :
        'W Witnicy '
      }${
        tone === 'informacyjny' ? 'informujemy o ważnych zmianach i nowościach. ' :
        tone === 'nieformalny' ? 'mamy dla Was super wieści! ' :
        tone === 'entuzjastyczny' ? 'nie możemy się doczekać, by podzielić się WSPANIAŁYMI wiadomościami! ' :
        tone === 'profesjonalny' ? 'pragniemy przekazać istotne informacje dotyczące rozwoju naszej społeczności. ' :
        'hahaha, mamy coś, co rozbawi Was do łez! '
      }
      
      ${prompt.substring(0, 30)}... ${
        contentType === 'article' || contentType === 'news' ? 
        'Ten temat jest szczególnie ważny dla naszej lokalnej społeczności ze względu na jego wpływ na codzienne życie mieszkańców. Warto śledzić rozwój tej sytuacji i angażować się w działania na rzecz miasta.' :
        ''
      }
      
      Zapraszamy do komentowania i udostępniania tych informacji wśród znajomych!
      `;
      
      const mockTags = ['Witnica', 
        category === 'lokalne' ? 'lokalne' : category, 
        contentType === 'post' ? 'post' : 'artykuł',
        'społeczność'
      ];
      
      const newContent: GeneratedContent = {
        title: mockTitles[Math.floor(Math.random() * mockTitles.length)],
        content: mockContent.trim(),
        type: contentType,
        tags: mockTags,
        date: new Date()
      };
      
      setGeneratedContent(newContent);
      setGenerationHistory(prev => [newContent, ...prev].slice(0, 5));
      setLoading(false);
      
      toast.success("Treść została wygenerowana");
    }, 2000);
  };
  
  // Handle copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Skopiowano do schowka");
  };
  
  // Get an example prompt
  const getRandomPrompt = () => {
    const randomPrompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    setPrompt(randomPrompt);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="container mx-auto py-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-6">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Generator treści AI</h2>
              <p className="text-muted-foreground">Stwórz wpisy, artykuły i inne treści za pomocą sztucznej inteligencji</p>
            </div>
          </div>

          {!isPremium && (
            <Alert className="mb-6">
              <Info className="h-4 w-4" />
              <AlertTitle>Dostępna wersja podstawowa</AlertTitle>
              <AlertDescription>
                Korzystasz z podstawowej wersji generatora. <a href="/premium" className="text-primary underline">Przejdź na Premium</a> by odblokować wszystkie funkcje.
              </AlertDescription>
            </Alert>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Co chcesz wygenerować?</CardTitle>
                  <CardDescription>
                    Opisz o czym ma być Twoja treść, a AI pomoże Ci ją stworzyć
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt">Twój opis treści</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Opisz temat, o którym chcesz napisać, np. 'Nowy plac zabaw w parku miejskim w Witnicy'"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Min. 10 znaków</span>
                      <Button variant="ghost" size="sm" onClick={getRandomPrompt}>
                        <RefreshCcw className="h-3 w-3 mr-1" />
                        Zainspiruj mnie
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategoria</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Wybierz kategorię" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content-type">Typ treści</Label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger id="content-type">
                          <SelectValue placeholder="Wybierz typ" />
                        </SelectTrigger>
                        <SelectContent>
                          {contentTypes.map((type) => (
                            <SelectItem 
                              key={type.value} 
                              value={type.value}
                              disabled={type.premiumOnly && !isPremium}
                            >
                              {type.label}
                              {type.premiumOnly && !isPremium && (
                                <Lock className="h-3 w-3 ml-1 inline" />
                              )}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ton wypowiedzi</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                      {toneOptions.map((option) => (
                        <div key={option.value}>
                          <input
                            type="radio"
                            id={option.value}
                            value={option.value}
                            checked={tone === option.value}
                            onChange={() => setTone(option.value)}
                            className="sr-only peer"
                            disabled={option.premiumOnly && !isPremium}
                          />
                          <label
                            htmlFor={option.value}
                            className={`
                              flex items-center justify-center px-3 py-2 text-sm rounded-md border cursor-pointer
                              peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary
                              ${option.premiumOnly && !isPremium ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted'}
                            `}
                          >
                            {option.label}
                            {option.premiumOnly && !isPremium && (
                              <Lock className="h-3 w-3 ml-1" />
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {isPremium && (
                    <div className="space-y-2 border-t pt-4">
                      <div className="flex justify-between">
                        <Label>Poziom kreatywności</Label>
                        <span className="text-sm text-muted-foreground">
                          {creativityLevel < 30 ? 'Zachowawczy' : 
                           creativityLevel < 70 ? 'Zrównoważony' : 'Kreatywny'}
                        </span>
                      </div>
                      <Slider
                        min={0}
                        max={100}
                        step={10}
                        value={[creativityLevel]}
                        onValueChange={(values) => setCreativityLevel(values[0])}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Zachowawczy</span>
                        <span>Kreatywny</span>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button
                    onClick={handleGenerateContent}
                    disabled={loading || prompt.length < 10}
                    className="w-full md:w-auto"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generuję treść...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generuj treść
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Generated content result */}
            {generatedContent && (
              <motion.div 
                variants={itemVariants} 
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <Badge className="mr-2 bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Wygenerowano
                          </Badge>
                          <Badge variant="outline">
                            {contentTypes.find(ct => ct.value === generatedContent.type)?.label || generatedContent.type}
                          </Badge>
                        </div>
                        <CardTitle className="mt-2">{generatedContent.title}</CardTitle>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleCopy(generatedContent.title + "\n\n" + generatedContent.content)}>
                        <Copy className="h-4 w-4 mr-1" />
                        Kopiuj całość
                      </Button>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="py-4">
                    <pre className="whitespace-pre-wrap font-sans">{generatedContent.content}</pre>

                    <div className="flex flex-wrap gap-1 mt-4">
                      {generatedContent.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Dobry wynik
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        Słaby wynik
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleGenerateContent}>
                        <RefreshCcw className="h-4 w-4 mr-1" />
                        Regeneruj
                      </Button>
                      <Button size="sm">
                        <Pencil className="h-4 w-4 mr-1" />
                        Edytuj i użyj
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </div>

          <div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Historia generowania</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {generationHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                      <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                      <h3 className="font-medium">Brak historii</h3>
                      <p className="text-sm text-muted-foreground">
                        Twoja historia generowanych treści pojawi się tutaj
                      </p>
                    </div>
                  ) : (
                    <div>
                      {generationHistory.map((item, index) => (
                        <div 
                          key={index} 
                          className="border-b last:border-b-0 hover:bg-muted/50 px-4 py-3 cursor-pointer transition-colors"
                          onClick={() => setGeneratedContent(item)}
                        >
                          <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {item.content.substring(0, 100)}...
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <Badge variant="outline" className="text-xs">{item.type}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {item.date.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t">
                  {generationHistory.length > 0 && (
                    <Button variant="ghost" size="sm" className="w-full">
                      Pobierz historię
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Wskazówki</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="min-w-[24px]">
                      <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs">1</span>
                    </div>
                    <p className="text-sm">Podaj konkretny temat i kontekst dla lepszych wyników.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="min-w-[24px]">
                      <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs">2</span>
                    </div>
                    <p className="text-sm">Wybierz odpowiedni ton wypowiedzi dopasowany do Twojej marki.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="min-w-[24px]">
                      <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs">3</span>
                    </div>
                    <p className="text-sm">Zawsze sprawdź i edytuj wygenerowaną treść przed publikacją.</p>
                  </div>
                  {isPremium ? (
                    <div className="flex items-start gap-2">
                      <div className="min-w-[24px]">
                        <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs">4</span>
                      </div>
                      <p className="text-sm">Dostosuj poziom kreatywności dla uzyskania różnorodnych wyników.</p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <div className="min-w-[24px]">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <a href="/premium" className="text-primary underline">Przejdź na Premium</a> by zyskać dostęp do zaawansowanych funkcji.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Premium Feature Dialog */}
      <Dialog open={isPremiumDialogOpen} onOpenChange={setIsPremiumDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Funkcja dostępna w Premium
            </DialogTitle>
            <DialogDescription>
              Ta funkcja jest dostępna tylko dla użytkowników z planem Premium.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Star className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium">Korzyści Premium</h4>
                <p className="text-sm text-muted-foreground">
                  Odblokuj wszystkie możliwości generatora treści.
                </p>
              </div>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-sm">Wszystkie typy treści, w tym wywiady i recenzje</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-sm">Dodatkowe tona wypowiedzi, w tym humorystyczny</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-sm">Regulacja poziomu kreatywności AI</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-sm">Nielimitowane generowanie treści</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <a href="/premium">Przejdź na Premium</a>
            </Button>
            <Button variant="outline" onClick={() => setIsPremiumDialogOpen(false)}>
              Może później
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentGenerator;
