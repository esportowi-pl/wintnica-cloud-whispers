
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Users, Shield, Send, ThumbsUp } from "lucide-react";

interface SupportPost {
  id: string;
  content: string;
  isAnonymous: boolean;
  timestamp: Date;
  supportCount: number;
  responses: SupportResponse[];
  category: 'emotional' | 'practical' | 'social';
}

interface SupportResponse {
  id: string;
  content: string;
  timestamp: Date;
  isHelpful: boolean;
}

const EmotionalSupportCenter = () => {
  const [newPost, setNewPost] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'emotional' | 'practical' | 'social'>('emotional');

  const mockPosts: SupportPost[] = [
    {
      id: '1',
      content: 'Czuję się bardzo samotny ostatnio. Czy ktoś z Witnicy chciałby się spotkać na kawie?',
      isAnonymous: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      supportCount: 12,
      responses: [
        {
          id: '1',
          content: 'Jestem tutaj dla Ciebie! Może spotkamy się w centrum?',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          isHelpful: true
        }
      ],
      category: 'social'
    },
    {
      id: '2',
      content: 'Mam trudny okres w pracy. Potrzebuję kogoś do rozmowy.',
      isAnonymous: true,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      supportCount: 8,
      responses: [],
      category: 'emotional'
    }
  ];

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;
    
    // Here would be the logic to save the post
    console.log('New support post:', {
      content: newPost,
      isAnonymous,
      category: selectedCategory
    });
    
    setNewPost('');
  };

  const categories = [
    { id: 'emotional', label: 'Wsparcie emocjonalne', icon: Heart, color: 'bg-red-100 text-red-700' },
    { id: 'practical', label: 'Pomoc praktyczna', icon: Users, color: 'bg-blue-100 text-blue-700' },
    { id: 'social', label: 'Kontakty społeczne', icon: MessageCircle, color: 'bg-green-100 text-green-700' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Centrum Wsparcia Witnicy</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Bezpieczna przestrzeń dla mieszkańców Witnicy, gdzie możesz wyrazić swoje emocje, 
          poprosić o wsparcie lub pomóc innym. Razem tworzymy silniejszą społeczność.
        </p>
      </div>

      <Tabs defaultValue="forum" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forum">Forum wsparcia</TabsTrigger>
          <TabsTrigger value="confession">Anonimowy konfesjonał</TabsTrigger>
          <TabsTrigger value="mediation">Mediacja sąsiedzka</TabsTrigger>
        </TabsList>

        <TabsContent value="forum" className="space-y-6">
          {/* New Post Form */}
          <Card>
            <CardHeader>
              <CardTitle>Podziel się swoimi odczuciami</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 mb-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id as any)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {category.label}
                    </Button>
                  );
                })}
              </div>
              
              <Textarea
                placeholder="Opisz swoją sytuację, uczucia lub to czego potrzebujesz..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-24"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant={isAnonymous ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className="flex items-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    {isAnonymous ? 'Anonimowo' : 'Z imieniem'}
                  </Button>
                </div>
                
                <Button onClick={handleSubmitPost} className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Opublikuj
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Support Posts */}
          <div className="space-y-4">
            {mockPosts.map((post) => {
              const categoryInfo = categories.find(c => c.id === post.category);
              const CategoryIcon = categoryInfo?.icon || Heart;
              
              return (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge className={categoryInfo?.color}>
                            <CategoryIcon className="h-3 w-3 mr-1" />
                            {categoryInfo?.label}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {post.isAnonymous ? 'Anonimowy mieszkaniec' : 'Jan K.'}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {post.timestamp.toLocaleTimeString('pl-PL', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                        
                        <p className="text-foreground">{post.content}</p>
                        
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            Wesprzyj ({post.supportCount})
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            Odpowiedz ({post.responses.length})
                          </Button>
                        </div>

                        {/* Responses */}
                        {post.responses.length > 0 && (
                          <div className="ml-6 space-y-2 border-l-2 border-muted pl-4">
                            {post.responses.map((response) => (
                              <div key={response.id} className="bg-muted/50 p-3 rounded-lg">
                                <p className="text-sm">{response.content}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                    <ThumbsUp className="h-3 w-3" />
                                    Pomocne
                                  </Button>
                                  <span className="text-xs text-muted-foreground">
                                    {response.timestamp.toLocaleTimeString('pl-PL', { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="confession">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Anonimowy konfesjonał</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Miejsce gdzie możesz bezpiecznie podzielić się tym, co Cię trapi, 
                  bez obawy o osądzenie. Wszystko jest całkowicie anonimowe.
                </p>
                <Button className="mt-4">Otwórz konfesjonał</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mediation">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Mediacja sąsiedzka</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Pomoc w rozwiązywaniu konfliktów między sąsiadami w Witnicy. 
                  Nasi mediatorzy pomogą znaleźć rozwiązanie korzystne dla wszystkich stron.
                </p>
                <Button className="mt-4">Zgłoś sprawę</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmotionalSupportCenter;
