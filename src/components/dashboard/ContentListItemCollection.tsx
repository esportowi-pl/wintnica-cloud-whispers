
import React from 'react';
import ContentListItem from './ContentListItem';

interface Content {
  id: number;
  title: string;
  status: string;
  visibility: string;
  date: string;
  category: string;
  views: number;
}

interface ContentListItemCollectionProps {
  contentItems: Content[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  onStats: (id: number) => void;
}

const ContentListItemCollection: React.FC<ContentListItemCollectionProps> = ({
  contentItems,
  onEdit,
  onDelete,
  onView,
  onStats
}) => {
  if (contentItems.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Brak treści do wyświetlenia
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {contentItems.map((content) => (
        <ContentListItem 
          key={content.id}
          content={content}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
          onStats={onStats}
        />
      ))}
    </div>
  );
};

export default ContentListItemCollection;
