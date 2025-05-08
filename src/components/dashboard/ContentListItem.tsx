
import React from 'react';
import { FileText, Eye } from 'lucide-react';
import ContentItemActions from './ContentItemActions';
import ContentStatusBadges from './ContentStatusBadges';

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
        <ContentStatusBadges 
          status={content.status} 
          visibility={content.visibility} 
        />
        
        <ContentItemActions 
          contentId={content.id}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
          onStats={onStats}
        />
      </div>
    </div>
  );
};

export default ContentListItem;
