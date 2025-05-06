
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Eye, BarChart2, FileText, Lock, Globe, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

// Mock data
const mockContents = [
  {
    id: 1,
    title: "Nowy park w centrum Witnicy już otwarty!",
    status: "published",
    visibility: "public",
    date: "2023-05-01",
    category: "Wydarzenia",
    views: 246
  },
  {
    id: 2,
    title: "Wyniki lokalnych zawodów sportowych",
    status: "published",
    visibility: "public",
    date: "2023-05-02",
    category: "Sport",
    views: 128
  },
  {
    id: 3,
    title: "Nowa inwestycja w strefie przemysłowej",
    status: "published",
    visibility: "premium",
    date: "2023-05-03",
    category: "Biznes",
    views: 422
  },
  {
    id: 4,
    title: "Festiwal Kultury już w przyszły weekend",
    status: "draft",
    visibility: "public",
    date: "2023-05-04",
    category: "Kultura",
    views: 0
  },
  {
    id: 5,
    title: "Aktualizacja planu rozwoju miasta",
    status: "published",
    visibility: "premium",
    date: "2023-05-05",
    category: "Newsy",
    views: 187
  },
  {
    id: 6,
    title: "Wywiad z burmistrzem Witnicy",
    status: "draft",
    visibility: "private",
    date: "2023-05-06",
    category: "Polityka",
    views: 0
  },
  {
    id: 7,
    title: "Historia miasta w pigułce",
    status: "published",
    visibility: "public",
    date: "2023-05-07",
    category: "Historia",
    views: 95
  }
];

interface ContentListProps {
  limit?: number;
}

const ContentList: React.FC<ContentListProps> = ({ limit }) => {
  const navigate = useNavigate();
  const displayedContent = limit ? mockContents.slice(0, limit) : mockContents;

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

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return <Globe className="h-4 w-4" />;
      case 'premium':
        return <Tag className="h-4 w-4" />;
      case 'private':
        return <Lock className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="success" className="bg-green-500">Opublikowany</Badge>;
      case 'draft':
        return <Badge variant="outline">Szkic</Badge>;
      default:
        return <Badge variant="secondary">Inny</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {displayedContent.map((content) => (
        <div 
          key={content.id} 
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-start flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <div className="font-medium">{content.title}</div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span>{content.category}</span>
                  <span>•</span>
                  <span>{new Date(content.date).toLocaleDateString('pl-PL')}</span>
                  {content.views > 0 && (
                    <>
                      <span>•</span>
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {content.views}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden sm:flex items-center gap-2">
              {getStatusBadge(content.status)}
              <Badge 
                variant="outline" 
                className="flex items-center gap-1"
              >
                {getVisibilityIcon(content.visibility)}
                <span className="capitalize">{content.visibility}</span>
              </Badge>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
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
                <DropdownMenuItem onClick={() => handleEdit(content.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  <span>Edytuj</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleView(content.id)}>
                  <Eye className="h-4 w-4 mr-2" />
                  <span>Podgląd</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStats(content.id)}>
                  <BarChart2 className="h-4 w-4 mr-2" />
                  <span>Statystyki</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleDelete(content.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  <span>Usuń</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}

      {limit && mockContents.length > limit && (
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
