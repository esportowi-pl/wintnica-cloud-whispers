
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { Save } from 'lucide-react';
import { Form, FormField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import EditorMainContent from './EditorMainContent';
import EditorSidebar from './EditorSidebar';

const formSchema = z.object({
  title: z.string().min(5, { message: "Tytuł musi mieć co najmniej 5 znaków" }),
  content: z.string().min(20, { message: "Treść musi mieć co najmniej 20 znaków" }),
  excerpt: z.string().optional(),
  category: z.string(),
  tags: z.string(),
  visibility: z.enum(["public", "premium", "private"]),
  featuredImage: z.string().optional(),
});

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
