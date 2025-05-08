
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
  return (
    <>
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
    </>
  );
};

export default ContentListItemCollection;
