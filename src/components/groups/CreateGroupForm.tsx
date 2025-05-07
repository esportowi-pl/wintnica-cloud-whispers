
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from 'sonner';

interface CreateGroupFormProps {
  onCancel: () => void;
}

const formSchema = z.object({
  name: z.string().min(3, 'Nazwa grupy musi mieć co najmniej 3 znaki'),
  description: z.string().min(10, 'Opis musi mieć co najmniej 10 znaków'),
  category: z.string().min(1, 'Wybierz kategorię'),
  isPrivate: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ onCancel }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      isPrivate: false,
    },
  });

  const onSubmit = (data: FormData) => {
    toast.success('Grupa została utworzona!');
    console.log('Form data:', data);
    onCancel();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa grupy</FormLabel>
              <FormControl>
                <Input placeholder="Np. Klub rowerowy Witnica" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Opisz czego dotyczy grupa..." 
                  className="resize-none h-24" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz kategorię" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sport">Sport</SelectItem>
                  <SelectItem value="edukacja">Edukacja</SelectItem>
                  <SelectItem value="hobby">Hobby</SelectItem>
                  <SelectItem value="społeczność">Społeczność</SelectItem>
                  <SelectItem value="zwierzęta">Zwierzęta</SelectItem>
                  <SelectItem value="kultura">Kultura</SelectItem>
                  <SelectItem value="inne">Inne</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Anuluj
          </Button>
          <Button type="submit">
            Utwórz grupę
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateGroupForm;
