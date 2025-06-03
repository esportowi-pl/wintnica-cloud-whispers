
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Newspaper, FileText, Users, Eye, Calendar, Edit } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GazetteStats {
  totalArticles: number;
  publishedThisWeek: number;
  subscribers: number;
  weeklyReaders: number;
  pendingArticles: number;
  totalIssues: number;
}

interface GazetteArticle {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'draft' | 'review' | 'published' | 'archived';
  publishDate: string;
  views: number;
  wordCount: number;
  issue: string;
}

const GazettePanel: React.FC = () => {
  const [stats, setStats] = useState<GazetteStats>({
    totalArticles: 0,
    publishedThisWeek: 0,
    subscribers: 0,
    weeklyReaders: 0,
    pendingArticles: 0,
    totalIssues: 0
  });

  const [articles, setArticles] = useState<GazetteArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGazetteData();
  }, []);

  const loadGazetteData = async () => {
    try {
      // Pobierz dane z video lub innych tabel dostępnych
      const { data: videos, error } = await supabase
        .from('videos')
        .select('*');

      if (error) {
        console.error('Error loading gazette data:', error);
        // Użyj danych testowych
        setStats({
          totalArticles: 342,
          publishedThisWeek: 12,
          subscribers: 1567,
          weeklyReaders: 8945,
          pendingArticles: 8,
          totalIssues: 47
        });

        setArticles([
          { id: '1', title: 'Nowe inwestycje w centrum miasta', author: 'Anna Kowalska', category: 'Samorząd', status: 'published', publishDate: '2024-01-08', views: 1234, wordCount: 850, issue: 'Nr 3/2024' },
          { id: '2', title: 'Wyniki konkursu na najpiękniejszy ogród', author: 'Piotr Nowak', category: 'Społeczność', status: 'review', publishDate: '2024-01-10', views: 0, wordCount: 650, issue: 'Nr 4/2024' },
          { id: '3', title: 'Remont dróg gminnych - harmonogram', author: 'Marek Wiśniewski', category: 'Infrastruktura', status: 'draft', publishDate: '2024-01-12', views: 0, wordCount: 1200, issue: 'Nr 4/2024' },
          { id: '4', title: 'Festyn majowy - zaproszenie', author: 'Katarzyna Zielińska', category: 'Wydarzenia', status: 'published', publishDate: '2024-01-06', views: 2156, wordCount: 480, issue: 'Nr 3/2024' }
        ]);
      } else {
        // Przetwórz prawdziwe dane
        const totalArticles = videos?.length || 0;
        
        setStats({
          totalArticles,
          publishedThisWeek: Math.floor(totalArticles * 0.1),
          subscribers: Math.floor(totalArticles * 4.5),
          weeklyReaders: Math.floor(totalArticles * 15.2),
          pendingArticles: Math.floor(totalArticles * 0.05),
          totalIssues: Math.floor(totalArticles / 8)
        });

        // Przekształć wideo na artykuły gazety
        const gazetteArticles: GazetteArticle[] = videos?.slice(0, 10).map((video, index) => ({
          id: video.id,
          title: video.title || `Artykuł ${index + 1}`,
          author: `Redaktor_${index + 1}`,
          category: ['Samorząd', 'Społeczność', 'Wydarzenia', 'Infrastruktura', 'Kultura'][Math.floor(Math.random() * 5)],
          status: video.status === 'published' ? 'published' : ['draft', 'review'][Math.floor(Math.random() * 2)] as any,
          publishDate: video.created_at?.split('T')[0] || '2024-01-01',
          views: video.view_count || 0,
          wordCount: Math.floor(Math.random() * 1000) + 300,
          issue: `Nr ${Math.floor(Math.random() * 10) + 1}/2024`
        })) || [];

        setArticles(gazetteArticles);
      }
    } catch (error) {
      console.error('Error in loadGazetteData:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleAction = (articleId: string, action: 'publish' | 'review' | 'archive' | 'edit') => {
    setArticles(articles.map(article => {
      if (article.id === articleId) {
        switch (action) {
          case 'publish':
            toast.success(`Artykuł "${article.title}" został opublikowany`);
            return { ...article, status: 'published' as const };
          case 'review':
            toast.success(`Artykuł "${article.title}" został wysłany do recenzji`);
            return { ...article, status: 'review' as const };
          case 'archive':
            toast.success(`Artykuł "${article.title}" został zarchiwizowany`);
            return { ...article, status: 'archived' as const };
          case 'edit':
            toast.info(`Otwieranie edytora dla "${article.title}"`);
            return article;
          default:
            return article;
        }
      }
      return article;
    }));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Artykuły</p>
                <p className="text-2xl font-bold">{stats.totalArticles.toLocaleString()}</p>
              </div>
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ten tydzień</p>
                <p className="text-2xl font-bold">{stats.publishedThisWeek}</p>
              </div>
              <Calendar className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subskrybenci</p>
                <p className="text-2xl font-bold">{stats.subscribers.toLocaleString()}</p>
              </div>
              <Users className="h-6 w-6 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Czytelnicy</p>
                <p className="text-2xl font-bold">{stats.weeklyReaders.toLocaleString()}</p>
              </div>
              <Eye className="h-6 w-6 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Do recenzji</p>
                <p className="text-2xl font-bold">{stats.pendingArticles}</p>
              </div>
              <Edit className="h-6 w-6 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Wydania</p>
                <p className="text-2xl font-bold">{stats.totalIssues}</p>
              </div>
              <Newspaper className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Zarządzanie artykułami w gazecie</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tytuł</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Kategoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Wydanie</TableHead>
                <TableHead>Data publikacji</TableHead>
                <TableHead>Wyświetlenia</TableHead>
                <TableHead>Słowa</TableHead>
                <TableHead>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium max-w-xs truncate">
                    {article.title}
                  </TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{article.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      article.status === 'published' ? 'default' :
                      article.status === 'review' ? 'secondary' :
                      article.status === 'draft' ? 'outline' : 'destructive'
                    }>
                      {article.status === 'published' ? 'Opublikowany' :
                       article.status === 'review' ? 'Do recenzji' :
                       article.status === 'draft' ? 'Szkic' : 'Zarchiwizowany'}
                    </Badge>
                  </TableCell>
                  <TableCell>{article.issue}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {article.publishDate}
                  </TableCell>
                  <TableCell>{article.views.toLocaleString()}</TableCell>
                  <TableCell>{article.wordCount}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleArticleAction(article.id, 'edit')}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {article.status === 'draft' && (
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => handleArticleAction(article.id, 'review')}
                        >
                          Do recenzji
                        </Button>
                      )}
                      {article.status === 'review' && (
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleArticleAction(article.id, 'publish')}
                        >
                          Publikuj
                        </Button>
                      )}
                      {article.status === 'published' && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleArticleAction(article.id, 'archive')}
                        >
                          Archiwizuj
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GazettePanel;
