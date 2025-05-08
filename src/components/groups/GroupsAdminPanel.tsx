
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash, Users } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockGroups } from '@/data/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const GroupsAdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Apply filtering and sorting
  const filteredGroups = mockGroups
    .filter(group => 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } 
      else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      else if (sortBy === 'members') {
        return b.members - a.members;
      }
      else if (sortBy === 'activity') {
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
      }
      return 0;
    });

  const handleEditGroup = (id: number) => {
    toast.info(`Edycja grupy o ID: ${id}`);
  };

  const handleDeleteGroup = (id: number) => {
    toast.success(`Grupa o ID: ${id} została usunięta`);
  };

  const handleViewGroup = (id: number) => {
    toast.info(`Podgląd grupy o ID: ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Zarządzanie grupami lokalnymi</h2>
        <Button>Dodaj nową grupę</Button>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Wyszukaj grupę..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sortuj według" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Najnowsze</SelectItem>
                  <SelectItem value="oldest">Najstarsze</SelectItem>
                  <SelectItem value="members">Liczba członków</SelectItem>
                  <SelectItem value="activity">Ostatnia aktywność</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {filteredGroups.map(group => (
          <Card key={group.id}>
            <div className="flex flex-col md:flex-row">
              {group.image && (
                <div className="md:w-56 h-40 md:h-auto overflow-hidden">
                  <img 
                    src={group.image} 
                    alt={group.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className={`flex-1 ${group.image ? 'md:w-auto' : 'w-full'}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{group.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <Badge variant="outline">{group.category}</Badge>
                      </CardDescription>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-muted-foreground">{group.members} członków</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-sm line-clamp-2">{group.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3 text-xs text-muted-foreground">
                    <div>
                      <span className="font-medium">Utworzono:</span> {new Date(group.createdAt).toLocaleDateString('pl-PL')}
                    </div>
                    <div className="mx-2">•</div>
                    <div>
                      <span className="font-medium">Ostatnia aktywność:</span> {new Date(group.lastActivity).toLocaleDateString('pl-PL')}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 justify-end">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleViewGroup(group.id)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Podgląd
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditGroup(group.id)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edytuj
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewGroup(group.id)}>
                          Pokaż członków
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditGroup(group.id)}>
                          Zmień ustawienia
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteGroup(group.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          <span>Usuń grupę</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
        
        {filteredGroups.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Nie znaleziono grup spełniających kryteria wyszukiwania
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupsAdminPanel;
