
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
import Star from "@/components/ui/star";

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
    { value: 'kultura', label: 'Kultura' },
    { value: 'sport', label: 'Sport' },
    { value: 'biznes', label: 'Biznes' }
  ];
  
  // Content types
  const contentTypes = [
    { value: 'post', label: 'Post społecznościowy' },
    { value: 'artykul', label: 'Artykuł' },
    { value: 'komentarz', label: 'Komentarz' },
    { value: 'pytanie', label: 'Pytanie do społeczności' }
  ];
  
  // Tone options
  const toneOptions = [
    { value: 'informacyjny', label: 'Informacyjny' },
    { value: 'formalny', label: 'Formalny' },
    { value: 'przyjazny', label: 'Przyjazny' },
    { value: 'humorystyczny', label: 'Humorystyczny' },
    { value: 'poważny', label: 'Poważny' }
  ];

  // Mock function to generate content
  const generateContent = async () => {
    if (!prompt && !category) {
      toast.error('Wprowadź temat lub wybierz kategorię');
      return;
    }
    
    if (!isPremium && contentType === 'artykul') {
      setIsPremiumDialogOpen(true);
      return;
    }
    
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response based on inputs
    let mockTitle = '';
    let mockContent = '';
    
    if (category === 'lokalne') {
      mockTitle = 'Co nowego w Witnicy?';
      mockContent = 'Witnica to piękne miasto z bogatą historią i aktywną społecznością. Dzisiaj warto zwrócić uwagę na nowe inicjatywy mieszkańców, które zmieniają oblicze naszego miasta. Jak możemy się zaangażować w lokalne projekty i wspólnie budować lepszą przyszłość dla wszystkich mieszkańców?';
    } else if (category === 'wydarzenia') {
      mockTitle = 'Nadchodzące wydarzenia w naszej okolicy';
      mockContent = 'Już w najbliższy weekend w parku miejskim odbędzie się festyn rodzinny. W programie liczne atrakcje dla dzieci, koncerty lokalnych zespołów oraz stoiska z regionalnymi przysmakami. Wydarzenie rozpocznie się o godzinie 12:00 i potrwa do późnych godzin wieczornych. Wstęp wolny dla wszystkich mieszkańców!';
    } else if (prompt) {
      mockTitle = `Moje przemyślenia: ${prompt}`;
      mockContent = `${prompt} to temat, który zasługuje na głębszą analizę. Warto zastanowić się nad różnymi aspektami tej kwestii i podzielić się swoimi przemyśleniami z innymi mieszkańcami Witnicy. Co Wy o tym sądzicie?`;
    }
    
    const newContent: GeneratedContent = {
      title: mockTitle,
      content: mockContent,
      type: contentType,
      tags: [category, 'witnica', 'społeczność'],
      date: new Date()
    };
    
    setGeneratedContent(newContent);
    setGenerationHistory(prev => [newContent, ...prev].slice(0, 5));
    setLoading(false);
  };

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Skopiowano do schowka');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 text-primary mr-2" />
            <CardTitle>Generator treści AI</CardTitle>
          </div>
          {isPremium && (
            <Badge className="bg-amber-500">
              <Star className="h-4 w-4 mr-1" />
              Premium
            </Badge>
          )}
        </div>
        <CardDescription>
          Pozwól AI pomóc Ci w tworzeniu angażujących treści lokalnych.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generate">
          <TabsList className="mb-4">
            <TabsTrigger value="generate" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              Generuj
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Historia
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Ustawienia
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate">
            <div className="space-y-4">
              <div>
                <Label htmlFor="prompt">Co Cię interesuje?</Label>
                <Textarea 
                  id="prompt"
                  placeholder="Np. 'Co dziś ciekawego w Witnicy?' lub 'Napisz o historii naszego miasta'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="mt-1.5 min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Kategoria</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-1.5">
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
                <div>
                  <Label>Typ treści</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Wybierz typ" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                          {type.value === 'artykul' && !isPremium && (
                            <span className="ml-1 text-amber-500 text-xs">Premium</span>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Ton wypowiedzi</Label>
                <RadioGroup 
                  value={tone}
                  onValueChange={setTone}
                  className="flex flex-wrap gap-x-6 gap-y-2 mt-1.5"
                >
                  {toneOptions.map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={opt.value} />
                      <Label htmlFor={opt.value}>{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <Button 
                className="w-full" 
                onClick={generateContent}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generuję...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {prompt ? 'Zainspiruj mnie' : 'Wygeneruj treść'}
                  </>
                )}
              </Button>
            </div>
            
            {generatedContent && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 border rounded-md p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold">{generatedContent.title}</h3>
                  <div className="flex space-x-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 text-xs"
                      onClick={() => copyToClipboard(generatedContent.title)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Kopiuj tytuł
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 text-xs"
                      onClick={() => copyToClipboard(generatedContent.content)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Kopiuj treść
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm mb-4 whitespace-pre-line">
                  {generatedContent.content}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {generatedContent.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={generateContent}>
                      <RefreshCcw className="h-3 w-3 mr-1" />
                      Regeneruj
                    </Button>
                    <Button variant="outline" size="sm">
                      <Pencil className="h-3 w-3 mr-1" />
                      Edytuj
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            {generationHistory.length > 0 ? (
              <div className="space-y-4">
                {generationHistory.map((item, index) => (
                  <Card key={index}>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{item.title}</CardTitle>
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
                      <div className="flex justify-end mt-2">
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(item.content)}>
                          <Copy className="h-3 w-3 mr-1" />
                          Kopiuj
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium">Brak historii generowania</h3>
                <p className="text-muted-foreground mb-4">
                  Historia wygenerowanych treści pojawi się tutaj
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Poziom kreatywności</Label>
                  <span className="text-sm">{creativityLevel}%</span>
                </div>
                <Slider 
                  value={[creativityLevel]} 
                  onValueChange={(value) => setCreativityLevel(value[0])} 
                  min={0} 
                  max={100} 
                  step={5}
                />
                <p className="text-xs text-muted-foreground">
                  Niższe wartości generują bardziej przewidywalne treści, wyższe wartości zwiększają kreatywność, ale mogą być mniej spójne.
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Włącz sugestie AI</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Automatyczne sugestie tematów</div>
                    <div className="text-sm text-muted-foreground">
                      Otrzymuj sugestie tematów na podstawie lokalnych trendów
                    </div>
                  </div>
                  <Switch checked={isPremium} disabled={!isPremium} />
                </div>
                {!isPremium && (
                  <div className="text-xs text-amber-500 flex items-center">
                    <Lock className="h-3 w-3 mr-1" /> 
                    Funkcja dostępna tylko dla użytkowników Premium
                  </div>
                )}
              </div>
              
              <Separator />
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Informacja o przetwarzaniu treści</AlertTitle>
                <AlertDescription>
                  Wszystkie Twoje zapytania i wygenerowane treści są przetwarzane zgodnie z naszą polityką prywatności. 
                  Nie udostępniamy tych danych stronom trzecim.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 text-sm text-muted-foreground">
        <div>
          Powered by Witnica.info AI
        </div>
        {!isPremium && (
          <Button variant="link" size="sm" className="h-auto p-0" onClick={() => setIsPremiumDialogOpen(true)}>
            <Star className="h-3 w-3 mr-1 text-amber-500" />
            Odblokuj wszystkie funkcje
          </Button>
        )}
      </CardFooter>
      
      {/* Premium upgrade dialog */}
      <Dialog open={isPremiumDialogOpen} onOpenChange={setIsPremiumDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Star className="h-5 w-5 text-amber-500 mr-2" />
              Odblokuj pełne możliwości AI
            </DialogTitle>
            <DialogDescription>
              Ulepsz do konta Premium, aby korzystać z zaawansowanych funkcji generatora treści AI.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-amber-100">
                <CheckCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium">Generowanie artykułów</h4>
                <p className="text-sm text-muted-foreground">
                  Twórz pełne artykuły z leadem, akapitami i podsumowaniem
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-amber-100">
                <CheckCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium">Nieograniczone generowanie</h4>
                <p className="text-sm text-muted-foreground">
                  Brak limitów dziennych na generowanie treści
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-amber-100">
                <CheckCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium">Sugestie tematów</h4>
                <p className="text-sm text-muted-foreground">
                  Automatyczne sugestie tematów na podstawie lokalnych trendów
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPremiumDialogOpen(false)}>
              Później
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600">
              <Star className="h-4 w-4 mr-2" />
              Przejdź na Premium
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

// Missing components
const Clock = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const Settings = ({ className }: { className?: string }) => (
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
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Switch = ({ checked, disabled }: { checked?: boolean; disabled?: boolean }) => (
  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-input'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
    <span className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
  </div>
);

export default ContentGenerator;
