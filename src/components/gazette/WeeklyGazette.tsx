
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const WeeklyGazette: React.FC = () => {
  // Mock data for gazette articles
  const gazetteIssues = [
    {
      id: 1,
      week: "20-26 kwietnia 2024",
      articles: [
        { id: 1, title: "Nowa inwestycja w centrum miasta", author: "Jan Kowalski", status: "published" },
        { id: 2, title: "Wyniki wyborów samorządowych", author: "Anna Nowak", status: "published" },
        { id: 3, title: "Festiwal kultury regionalnej już w maju", author: "Piotr Wiśniewski", status: "draft" }
      ]
    },
    {
      id: 2,
      week: "13-19 kwietnia 2024",
      articles: [
        { id: 4, title: "Remont drogi wojewódzkiej", author: "Tomasz Adamczyk", status: "published" },
        { id: 5, title: "Otwarcie nowego przedszkola", author: "Monika Lewandowska", status: "published" },
        { id: 6, title: "Konkurs na najpiękniejszy ogród", author: "Barbara Kaczmarek", status: "archived" }
      ]
    },
    {
      id: 3,
      week: "6-12 kwietnia 2024",
      articles: [
        { id: 7, title: "Podwyżka cen wody i ścieków", author: "Krzysztof Kowal", status: "published" },
        { id: 8, title: "Nowy autobus miejski już kursuje", author: "Magdalena Jabłońska", status: "published" },
        { id: 9, title: "Program obchodów Dnia Miasta", author: "Robert Zieliński", status: "review" }
      ]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tygodnik Gazette</CardTitle>
        <CardDescription>
          Zarządzaj artykułami i wydaniami tygodnika
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Button>
            <Link to="/gazeta/nowy-artykul">Dodaj nowy artykuł</Link>
          </Button>
        </div>

        <Tabs defaultValue="current">
          <TabsList>
            <TabsTrigger value="current">Bieżący tydzień</TabsTrigger>
            <TabsTrigger value="archive">Archiwum</TabsTrigger>
            <TabsTrigger value="planning">Planowanie</TabsTrigger>
          </TabsList>
          <TabsContent value="current" className="mt-4">
            <h3 className="text-lg font-medium mb-4">Wydanie: 20-26 kwietnia 2024</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tytuł</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gazetteIssues[0].articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>{article.status}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edytuj</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="archive" className="mt-4">
            <div className="space-y-4">
              {gazetteIssues.slice(1).map((issue) => (
                <div key={issue.id}>
                  <h3 className="text-lg font-medium mb-2">Wydanie: {issue.week}</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tytuł</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Akcje</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {issue.articles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium">{article.title}</TableCell>
                          <TableCell>{article.author}</TableCell>
                          <TableCell>{article.status}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Podgląd</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="planning" className="mt-4">
            <h3 className="text-lg font-medium mb-4">Planowanie wydania: 27 kwietnia - 3 maja 2024</h3>
            <div className="p-4 border border-dashed rounded-lg text-center">
              <p className="text-muted-foreground mb-4">
                Dodaj artykuły do następnego wydania tygodnika
              </p>
              <Button>Dodaj artykuł</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeeklyGazette;
