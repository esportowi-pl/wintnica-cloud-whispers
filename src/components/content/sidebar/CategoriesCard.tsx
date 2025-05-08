
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContentValues } from '../ContentEditor';

interface CategoriesCardProps {
  form: UseFormReturn<ContentValues>;
}

const CategoriesCard: React.FC<CategoriesCardProps> = ({ form }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="font-medium">Kategorie i tagi</h3>
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategoria</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="newsy">Newsy</SelectItem>
                    <SelectItem value="wydarzenia">Wydarzenia</SelectItem>
                    <SelectItem value="sport">Sport</SelectItem>
                    <SelectItem value="kultura">Kultura</SelectItem>
                    <SelectItem value="biznes">Biznes</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagi</FormLabel>
                <FormControl>
                  <Input placeholder="np. wydarzenia, sport, kultura" {...field} />
                </FormControl>
                <FormDescription>
                  Oddziel tagi przecinkami
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoriesCard;
