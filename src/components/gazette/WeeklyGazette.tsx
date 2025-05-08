
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockGazetteArticles } from '@/data/mockData';

interface WeeklyGazetteProps {
  limit?: number;
}

const WeeklyGazette: React.FC<WeeklyGazetteProps> = ({ limit }) => {
  const displayedArticles = limit ? mockGazetteArticles.slice(0, limit) : mockGazetteArticles;
  
  // Get the featured article
  const featuredArticle = mockGazetteArticles.find(article => article.featured);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gazeta Witnicka</h2>
        <Link to="/gazeta">
          <Button variant="outline" className="flex items-center">
            Wszystkie wydania
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      {featuredArticle && (
        <Card className="overflow-hidden mb-6">
          <div className="md:flex">
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img 
                src={featuredArticle.imageUrl} 
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <Badge className="mb-2">{featuredArticle.category}</Badge>
              <h3 className="text-2xl font-bold mb-2">{featuredArticle.title}</h3>
              <p className="text-muted-foreground mb-4">{featuredArticle.excerpt}</p>
              <div className="flex items-center text-sm text-muted-foreground mb-6">
                <Calendar className="mr-1 h-4 w-4" />
                <span>{new Date(featuredArticle.date).toLocaleDateString('pl-PL')}</span>
                <span className="mx-2">•</span>
                <span>{featuredArticle.author}</span>
              </div>
              <Button as={Link} to={`/gazeta/artykul/${featuredArticle.id}`}>
                Czytaj więcej
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedArticles.filter(article => !article.featured).map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline">{article.category}</Badge>
                <span className="text-sm text-muted-foreground">{new Date(article.date).toLocaleDateString('pl-PL')}</span>
              </div>
              <CardTitle className="text-lg">{article.title}</CardTitle>
              <CardDescription className="text-xs">{article.author}</CardDescription>
            </CardHeader>
            <CardContent className="py-2">
              <p className="text-sm line-clamp-3">{article.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Link to={`/gazeta/artykul/${article.id}`}>
                <Button variant="link" className="p-0">Czytaj więcej</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeeklyGazette;
