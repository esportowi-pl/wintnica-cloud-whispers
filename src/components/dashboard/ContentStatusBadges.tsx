
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Globe, Lock, Tag, Archive, Pencil, Check, Clock } from 'lucide-react';

interface ContentStatusBadgesProps {
  status: string;
  visibility: string;
}

const ContentStatusBadges: React.FC<ContentStatusBadgesProps> = ({
  status,
  visibility
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <Check className="h-4 w-4" />;
      case 'draft':
        return <Pencil className="h-4 w-4" />;
      case 'review':
        return <Clock className="h-4 w-4" />;
      case 'archived':
        return <Archive className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <Badge className="bg-green-500 flex items-center gap-1">
            {getStatusIcon(status)}
            <span>Opublikowany</span>
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            {getStatusIcon(status)}
            <span>Szkic</span>
          </Badge>
        );
      case 'review':
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            {getStatusIcon(status)}
            <span>Do recenzji</span>
          </Badge>
        );
      case 'archived':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            {getStatusIcon(status)}
            <span>Zarchiwizowany</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <span>Inny</span>
          </Badge>
        );
    }
  };

  return (
    <div className="hidden sm:flex items-center gap-2">
      {getStatusBadge(status)}
      <Badge 
        variant="outline" 
        className="flex items-center gap-1"
      >
        {getVisibilityIcon(visibility)}
        <span className="capitalize">{visibility}</span>
      </Badge>
    </div>
  );
};

export default ContentStatusBadges;
