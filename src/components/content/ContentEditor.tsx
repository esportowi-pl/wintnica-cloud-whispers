
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import EditorMainContent from './EditorMainContent';
import EditorSidebar from './EditorSidebar';
import { formSchema } from './schemas/contentSchema';

export type ContentValues = z.infer<typeof formSchema>;

interface ContentEditorProps {
  initialValues?: ContentValues;
  isEditing?: boolean;
  onSave?: (data: ContentValues) => Promise<void>;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ 
  initialValues, 
  isEditing = false,
  onSave
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(initialValues?.featuredImage || null);

  const form = useForm<ContentValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      title: "",
      content: "",
      excerpt: "",
      category: "newsy",
      tags: "",
      visibility: "public",
      featuredImage: "",
    },
  });

  const onSubmit = async (data: ContentValues) => {
    setIsSaving(true);
    try {
      if (onSave) {
        await onSave(data);
      }
      toast.success(isEditing ? 'Treść zaktualizowana!' : 'Treść opublikowana!');
    } catch (error) {
      toast.error('Wystąpił błąd podczas zapisywania treści');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <EditorMainContent form={form} />
            </div>
            <div className="space-y-8">
              <EditorSidebar 
                form={form} 
                isSaving={isSaving} 
                isEditing={isEditing} 
                previewImage={previewImage}
                setPreviewImage={setPreviewImage}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContentEditor;
