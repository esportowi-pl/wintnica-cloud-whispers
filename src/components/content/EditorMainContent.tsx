
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentValues } from './ContentEditor';

interface EditorMainContentProps {
  form: UseFormReturn<ContentValues>;
}

const EditorMainContent: React.FC<EditorMainContentProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tytuł</FormLabel>
            <FormControl>
              <Input placeholder="Wpisz tytuł..." {...field} className="text-lg" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Tabs defaultValue="write">
        <TabsList>
          <TabsTrigger value="write">Pisz</TabsTrigger>
          <TabsTrigger value="preview">Podgląd</TabsTrigger>
        </TabsList>
        <TabsContent value="write">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Treść</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Wpisz treść artykułu..." 
                    {...field} 
                    className="min-h-[300px] resize-y"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TabsContent>
        <TabsContent value="preview">
          <Card>
            <CardContent className="pt-6">
              <h1 className="text-2xl font-bold mb-4">{form.watch("title")}</h1>
              <div className="prose max-w-none">
                {form.watch("content").split("\n").map((p, i) => (
                  <p key={i} className="mb-4">{p}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default EditorMainContent;
