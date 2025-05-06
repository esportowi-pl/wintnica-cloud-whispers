
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type NewsArticle = {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  author: string;
};

const mockNews: NewsArticle[] = [
  {
    id: 1,
    title: "Remont ulicy Głównej zakończony przed terminem",
    excerpt: "Po trzech miesiącach intensywnych prac, remont ulicy Głównej został zakończony dwa tygodnie przed planowanym terminem.",
    imageUrl: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?q=80&w=500&auto=format&fit=crop",
    category: "Infrastruktura",
    date: "2023-05-05",
    author: "Urząd Miasta"
  },
  {
    id: 2,
    title: "Festiwal Kultury Lokalnej już w ten weekend",
    excerpt: "Zapraszamy wszystkich mieszkańców na doroczny Festiwal Kultury Lokalnej, który odbędzie się w miejskim parku.",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop",
    category: "Wydarzenia",
    date: "2023-05-04",
    author: "Dom Kultury"
  },
  {
    id: 3,
    title: "Nowa ścieżka rowerowa połączy Witnicę z Kostrzynem",
    excerpt: "Rozpoczęły się prace nad budową nowej ścieżki rowerowej, która połączy nasze miasto z Kostrzynem nad Odrą.",
    imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=500&auto=format&fit=crop",
    category: "Infrastruktura",
    date: "2023-05-03",
    author: "Urząd Miasta"
  }
];

const NewsSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Aktualności</h2>
        <Button variant="outline">Wszystkie aktualności</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockNews.map((article) => (
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
                <span className="text-sm text-gray-500">{article.date}</span>
              </div>
              <CardTitle className="text-lg">{article.title}</CardTitle>
              <CardDescription className="text-xs">{article.author}</CardDescription>
            </CardHeader>
            <CardContent className="py-2">
              <p className="text-sm line-clamp-3">{article.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="p-0">Czytaj więcej</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
