
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";

interface Group {
  id: number;
  name: string;
  description: string;
  members: number;
  category: string;
  image?: string;
  isJoined?: boolean;
}

interface GroupsListProps {
  filter: 'all' | 'my' | 'popular' | 'new';
  searchQuery: string;
}

const mockGroups: Group[] = [
  {
    id: 1,
    name: "Klub rowerowy Witnica",
    description: "Grupa dla miłośników rowerów. Wspólne wyprawy, porady i dyskusje.",
    members: 45,
    category: "Sport",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=300&auto=format&fit=crop",
    isJoined: true
  },
  {
    id: 2,
    name: "Rodzice Szkoły Podstawowej",
    description: "Grupa dla rodziców dzieci uczęszczających do SP w Witnicy.",
    members: 87,
    category: "Edukacja"
  },
  {
    id: 3,
    name: "Miłośnicy ogrodnictwa",
    description: "Wspólne porady, wymiana sadzonek i dyskusje o ogrodnictwie.",
    members: 32,
    category: "Hobby",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Sąsiedzka pomoc",
    description: "Grupa wsparcia i pomocy sąsiedzkiej dla mieszkańców Witnicy.",
    members: 56,
    category: "Społeczność",
    isJoined: true
  },
  {
    id: 5,
    name: "Zwierzaki Witnicy",
    description: "Grupa dla właścicieli zwierząt, porady, zdjęcia i wsparcie.",
    members: 38,
    category: "Zwierzęta",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=300&auto=format&fit=crop"
  }
];

const GroupsList: React.FC<GroupsListProps> = ({ filter, searchQuery }) => {
  // Filter groups based on the selected filter and search query
  const filteredGroups = mockGroups
    .filter(group => {
      if (filter === 'my') return group.isJoined;
      return true;
    })
    .filter(group => {
      if (!searchQuery) return true;
      return group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             group.description.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (filter === 'popular') return b.members - a.members;
      if (filter === 'new') return b.id - a.id;
      return 0;
    });

  if (filteredGroups.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Nie znaleziono grup pasujących do kryteriów.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {filteredGroups.map(group => (
        <Card key={group.id} className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {group.image && (
              <div className="md:w-1/4">
                <img 
                  src={group.image} 
                  alt={group.name} 
                  className="h-48 md:h-full w-full object-cover"
                />
              </div>
            )}
            <div className={`flex-1 flex flex-col ${group.image ? 'md:w-3/4' : 'w-full'}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{group.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Users size={16} className="mr-1" />
                      {group.members} członków
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{group.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{group.description}</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                {group.isJoined ? (
                  <Button variant="outline">Przeglądaj</Button>
                ) : (
                  <Button>Dołącz</Button>
                )}
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default GroupsList;
