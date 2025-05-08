
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockGazetteArticles } from '@/data/mockData';
import { Link } from 'react-router-dom';
import HandmadeShowcase from '@/components/handmade/HandmadeShowcase';

const GazettePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const filteredArticles = mockGazetteArticles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(mockGazetteArticles.map(article => article.category)))];
  
  // Get featured and most recent article
  const featuredArticle = mockGazetteArticles.find(article => article.featured);
  const recentArticles = [...mockGazetteArticles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Featured Article Hero */}
        {featuredArticle && (
          <div className="relative h-80 overflow-hidden mb-10">
            <img 
              src={featuredArticle.imageUrl} 
              alt={featuredArticle.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex items-end">
              <div className="container mx-auto px-4 py-8 text-white">
                <Badge className="mb-3 bg-primary text-white">{featuredArticle.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{featuredArticle.title}</h1>
                <p className="text-lg opacity-90 max-w-3xl mb-3">{featuredArticle.excerpt}</p>
                <div className="flex items-center text-sm opacity-80">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{new Date(featuredArticle.date).toLocaleDateString('pl-PL')}</span>
                  <span className="mx-2">•</span>
                  <span>{featuredArticle.author}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="md:w-3/4 space-y-8">
              {/* Search and Filter */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        placeholder="Szukaj w artykułach..." 
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="w-full sm:w-48">
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Kategoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie kategorie</SelectItem>
                          {categories.filter(c => c !== 'all').map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Articles List */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Wszystkie artykuły</h2>
                
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Nie znaleziono artykułów pasujących do kryteriów.</p>
                  </div>
                ) : (
                  filteredArticles.map(article => (
                    <Link key={article.id} to={`/gazeta/artykul/${article.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row">
                          {article.imageUrl && (
                            <div className="md:w-1/4 h-48 md:h-auto overflow-hidden">
                              <img 
                                src={article.imageUrl} 
                                alt={article.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className={`flex-1 p-6 ${article.imageUrl ? 'md:w-3/4' : 'w-full'}`}>
                            <div className="flex justify-between items-start mb-2">
                              <Badge variant="outline">{article.category}</Badge>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-4 w-4" />
                                <span>{new Date(article.date).toLocaleDateString('pl-PL')}</span>
                              </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                            <p className="text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">{article.author}</span>
                              <Button variant="link" className="p-0">Czytaj więcej</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
              
              {/* Handmade Items */}
              <div className="mt-12">
                <HandmadeShowcase limit={4} />
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="md:w-1/4 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-4">Najnowsze artykuły</h3>
                  <div className="space-y-4">
                    {recentArticles.map(article => (
                      <Link key={article.id} to={`/gazeta/artykul/${article.id}`} className="block">
                        <div className="flex gap-3 hover:bg-muted/30 p-2 rounded-md -mx-2">
                          {article.imageUrl && (
                            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={article.imageUrl} 
                                alt={article.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <h4 className="font-medium line-clamp-2">{article.title}</h4>
                            <div className="text-xs text-muted-foreground mt-1">
                              {new Date(article.date).toLocaleDateString('pl-PL')}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-4">Kategorie</h3>
                  <div className="space-y-2">
                    {categories.filter(c => c !== 'all').map(category => (
                      <Button 
                        key={category} 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => setCategoryFilter(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-4">Archiwum</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Maj 2023
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Kwiecień 2023
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Marzec 2023
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GazettePage;
