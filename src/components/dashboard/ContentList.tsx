
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { mockContent } from '@/data/mockData';
import ContentListItemCollection from './ContentListItemCollection';
import { Search, Filter } from 'lucide-react';

interface ContentListProps {
  limit?: number;
}

const ContentList: React.FC<ContentListProps> = ({ limit }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort content
  let filteredContent = [...mockContent];
  
  // Apply status filter
  if (statusFilter !== 'all') {
    filteredContent = filteredContent.filter(item => item.status === statusFilter);
  }
  
  // Apply search filter
  if (searchQuery) {
    filteredContent = filteredContent.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Apply sorting
  filteredContent.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'mostViews':
        return b.views - a.views;
      case 'leastViews':
        return a.views - b.views;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
  
  // Apply limit if specified
  const displayedContent = limit ? filteredContent.slice(0, limit) : filteredContent;

  const handleEdit = (id: number) => {
    navigate(`/dashboard/edit-content/${id}`);
  };

  const handleDelete = (id: number) => {
    toast.success(`Usunięto treść o ID: ${id}`);
  };

  const handleView = (id: number) => {
    navigate(`/content/${id}`);
  };

  const handleStats = (id: number) => {
    navigate(`/dashboard/stats/${id}`);
  };

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Szukaj treści..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <div className="w-40">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  <SelectItem value="published">Opublikowane</SelectItem>
                  <SelectItem value="draft">Szkice</SelectItem>
                  <SelectItem value="review">Do weryfikacji</SelectItem>
                  <SelectItem value="archived">Zarchiwizowane</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sortuj" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Najnowsze</SelectItem>
                  <SelectItem value="oldest">Najstarsze</SelectItem>
                  <SelectItem value="mostViews">Najwięcej wyświetleń</SelectItem>
                  <SelectItem value="leastViews">Najmniej wyświetleń</SelectItem>
                  <SelectItem value="alphabetical">Alfabetycznie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      <ContentListItemCollection 
        contentItems={displayedContent}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onStats={handleStats}
      />

      {limit && mockContent.length > limit && (
        <Button 
          variant="outline" 
          className="w-full mt-2"
          onClick={() => navigate('/dashboard/content')}
        >
          Zobacz wszystkie
        </Button>
      )}
    </div>
  );
};

export default ContentList;
