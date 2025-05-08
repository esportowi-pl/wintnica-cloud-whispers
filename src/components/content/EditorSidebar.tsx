
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ContentValues } from './ContentEditor';
import PublicationCard from './sidebar/PublicationCard';
import FeaturedImageCard from './sidebar/FeaturedImageCard';
import CategoriesCard from './sidebar/CategoriesCard';
import ExcerptCard from './sidebar/ExcerptCard';

interface EditorSidebarProps {
  form: UseFormReturn<ContentValues>;
  isSaving: boolean;
  isEditing: boolean;
  previewImage: string | null;
  setPreviewImage: (image: string | null) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ 
  form, 
  isSaving, 
  isEditing,
  previewImage,
  setPreviewImage
}) => {
  return (
    <>
      <PublicationCard 
        form={form} 
        isSaving={isSaving} 
        isEditing={isEditing} 
      />

      <FeaturedImageCard 
        form={form} 
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />

      <CategoriesCard form={form} />

      <ExcerptCard form={form} />
    </>
  );
};

export default EditorSidebar;
