
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

// Mock data
const mockArticles = [
  {
    id: 1,
    title: "Nowy park w centrum Witnicy już otwarty!",
    excerpt: "Mieszkańcy mogą już korzystać z odnowionego parku miejskiego w centrum Witnicy.",
    image: "/placeholder.svg",
    category: "Wydarzenia",
    isPremium: false,
    author: "Jan Kowalski",
    date: "2023-05-01"
  },
  {
    id: 2,
    title: "Wyniki lokalnych zawodów sportowych",
    excerpt: "Reprezentacja Witnicy zdobyła pierwsze miejsce w wojewódzkich zawodach.",
    image: "/placeholder.svg",
    category: "Sport",
    isPremium: false,
    author: "Anna Nowak",
    date: "2023-05-02"
  },
  {
    id: 3,
    title: "Nowa inwestycja w strefie przemysłowej",
    excerpt: "Niemiecka firma otworzy fabrykę w Witnicy. Powstanie 200 miejsc pracy.",
    image: "/placeholder.svg",
    category: "Biznes",
    isPremium: true,
    author: "Tomasz Wiśniewski",
    date: "2023-05-03"
  },
  {
    id: 4,
    title: "Festiwal Kultury już w przyszły weekend",
    excerpt: "Trzydniowy festiwal z udziałem lokalnych artystów i twórców.",
    image: "/placeholder.svg",
    category: "Kultura",
    isPremium: false,
    author: "Magdalena Kowalczyk",
    date: "2023-05-04"
  },
  {
    id: 5,
    title: "Aktualizacja planu rozwoju miasta",
    excerpt: "Rada Miasta przyjęła nowy plan rozwoju na lata 2023-2030.",
    image: "/placeholder.svg",
    category: "Newsy",
    isPremium: true,
    author: "Paweł Adamski",
    date: "2023-05-05"
  }
];

const ContentSlider = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const articlesPerPage = 3;
  const totalPages = Math.ceil(mockArticles.length / articlesPerPage);
  
  const nextSlide = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to first page
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(totalPages - 1); // Loop to last page
    }
  };
  
  const currentArticles = mockArticles.slice(
    currentIndex * articlesPerPage, 
    (currentIndex + 1) * articlesPerPage
  );

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
              }`}
              aria-label={`Przejdź do strony ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={prevSlide} aria-label="Poprzednia strona">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} aria-label="Następna strona">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentArticles.map((article) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <Badge variant="secondary" className="bg-background/80 text-foreground">
                    {article.category}
                  </Badge>
                  {article.isPremium && (
                    <Badge variant="default" className="bg-primary text-primary-foreground">
                      <Tag className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
              </div>
              
              <CardContent className="py-4 flex-grow">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-4 text-sm text-muted-foreground">
                  <span>{article.author}</span>
                  <span className="mx-2">•</span>
                  <time>{new Date(article.date).toLocaleDateString('pl-PL')}</time>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/content/${article.id}`)}
                >
                  Czytaj więcej
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContentSlider;
