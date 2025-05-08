
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ContentValues } from '../ContentEditor';

interface ExcerptCardProps {
  form: UseFormReturn<ContentValues>;
}

const ExcerptCard: React.FC<ExcerptCardProps> = ({ form }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-medium mb-4">Wypis</h3>
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea 
                  placeholder="Krótki opis artykułu, używany jako zajawka na stronie głównej..." 
                  {...field} 
                  rows={3}
                />
              </FormControl>
              <FormDescription>
                Maksymalnie 160 znaków
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ExcerptCard;
