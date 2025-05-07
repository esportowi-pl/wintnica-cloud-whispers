
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter,
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from 'sonner';
import { Image, Plus } from 'lucide-react';

interface CreateListingDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  title: z.string().min(5, 'Tytuł musi mieć co najmniej 5 znaków'),
  description: z.string().min(10, 'Opis musi mieć co najmniej 10 znaków'),
  price: z.string().optional(),
  category: z.string().min(1, 'Wybierz kategorię'),
  type: z.string().min(1, 'Wybierz rodzaj ogłoszenia'),
  location: z.string().min(3, 'Podaj lokalizację'),
});

type FormData = z.infer<typeof formSchema>;

const CreateListingDialog: React.FC<CreateListingDialogProps> = ({ isOpen, onClose }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      type: '',
      location: 'Witnica',
    },
  });

  const watchType = form.watch('type');

  const onSubmit = (data: FormData) => {
    toast.success('Ogłoszenie zostało dodane!');
    console.log('Form data:', data);
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Dodaj nowe ogłoszenie</DialogTitle>
          <DialogDescription>
            Wypełnij formularz, aby dodać nowe ogłoszenie na rynek lokalny
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tytuł ogłoszenia</FormLabel>
                  <FormControl>
                    <Input placeholder="Np. Rower górski marki Trek" {...field} />
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
                      placeholder="Opisz przedmiot, jego stan, itp..." 
                      className="resize-none h-24" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rodzaj ogłoszenia</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sprzedam">Sprzedam</SelectItem>
                        <SelectItem value="kupie">Kupię</SelectItem>
                        <SelectItem value="zamienie">Zamienię</SelectItem>
                        <SelectItem value="oddam">Oddam</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {(watchType === 'sprzedam') && (
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cena</FormLabel>
                      <FormControl>
                        <Input placeholder="Np. 100 zł" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
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
                        <SelectItem value="elektronika">Elektronika</SelectItem>
                        <SelectItem value="dom">Dom i ogród</SelectItem>
                        <SelectItem value="moda">Ubrania</SelectItem>
                        <SelectItem value="sport">Sport i hobby</SelectItem>
                        <SelectItem value="dla_dzieci">Dla dzieci</SelectItem>
                        <SelectItem value="motoryzacja">Motoryzacja</SelectItem>
                        <SelectItem value="zwierzeta">Zwierzęta</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lokalizacja</FormLabel>
                    <FormControl>
                      <Input placeholder="Np. Witnica, ul. Kwiatowa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center">
                <Image className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Przeciągnij zdjęcia lub kliknij, aby dodać</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG do 5MB</p>
                <Button type="button" variant="ghost" size="sm" className="mt-4">
                  <Plus className="h-4 w-4 mr-1" />
                  Dodaj zdjęcia
                </Button>
              </div>
            </div>
            
            <DialogFooter className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Anuluj
              </Button>
              <Button type="submit">
                Dodaj ogłoszenie
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateListingDialog;
