
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Globe, Lock, Tag } from 'lucide-react';

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
