
import React from 'react';
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

interface Content {
  id: number;
  title: string;
  status: string;
  visibility: string;
  date: string;
  category: string;
  views: number;
}

interface ContentListItemProps {
  content: Content;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  onStats: (id: number) => void;
}

const ContentListItem: React.FC<ContentListItemProps> = ({
  content,
  onEdit,
  onDelete,
  onView,
  onStats
}) => {
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
        return <Badge className="bg-green-500">Opublikowany</Badge>;
      case 'draft':
        return <Badge variant="outline">Szkic</Badge>;
      case 'review':
        return <Badge variant="secondary">Do recenzji</Badge>;
      case 'archived':
        return <Badge variant="destructive">Zarchiwizowany</Badge>;
      default:
        return <Badge variant="secondary">Inny</Badge>;
    }
  };

  return (
    <div 
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
            <DropdownMenuItem onClick={() => onEdit(content.id)}>
              <Edit className="h-4 w-4 mr-2" />
              <span>Edytuj</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onView(content.id)}>
              <Eye className="h-4 w-4 mr-2" />
              <span>Podgląd</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStats(content.id)}>
              <BarChart2 className="h-4 w-4 mr-2" />
              <span>Statystyki</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(content.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              <span>Usuń</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ContentListItem;
