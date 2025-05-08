
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Save, Globe, Tag, Lock } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { ContentValues } from '../ContentEditor';

interface PublicationCardProps {
  form: UseFormReturn<ContentValues>;
  isSaving: boolean;
  isEditing: boolean;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ form, isSaving, isEditing }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="font-medium">Publikacja</h3>
          
          <div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSaving}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Zapisywanie...' : (isEditing ? 'Zaktualizuj' : 'Opublikuj')}
            </Button>
          </div>
          
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Widoczność</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <label htmlFor="public" className="flex items-center cursor-pointer">
                        <Globe className="h-4 w-4 mr-2" />
                        <span>Publiczny</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="premium" id="premium" />
                      <label htmlFor="premium" className="flex items-center cursor-pointer">
                        <Tag className="h-4 w-4 mr-2" />
                        <span>Premium</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <label htmlFor="private" className="flex items-center cursor-pointer">
                        <Lock className="h-4 w-4 mr-2" />
                        <span>Prywatny</span>
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicationCard;
