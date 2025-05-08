
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { mockContent } from '@/data/mockData';
import ContentListItemCollection from './ContentListItemCollection';

interface ContentListProps {
  limit?: number;
}

const ContentList: React.FC<ContentListProps> = ({ limit }) => {
  const navigate = useNavigate();
  const displayedContent = limit ? mockContent.slice(0, limit) : mockContent;

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
