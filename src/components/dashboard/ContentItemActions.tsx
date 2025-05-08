
import React from 'react';
import { Edit, Trash2, Eye, BarChart2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface ContentItemActionsProps {
  contentId: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  onStats: (id: number) => void;
}

const ContentItemActions: React.FC<ContentItemActionsProps> = ({
  contentId,
  onEdit,
  onDelete,
  onView,
  onStats
}) => {
  return (
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
        <DropdownMenuItem onClick={() => onEdit(contentId)}>
          <Edit className="h-4 w-4 mr-2" />
          <span>Edytuj</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onView(contentId)}>
          <Eye className="h-4 w-4 mr-2" />
          <span>Podgląd</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStats(contentId)}>
          <BarChart2 className="h-4 w-4 mr-2" />
          <span>Statystyki</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onDelete(contentId)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          <span>Usuń</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ContentItemActions;
