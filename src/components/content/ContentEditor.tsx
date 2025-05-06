
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { Save, Image, Paperclip, Calendar, Tag, Lock, Globe } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  title: z.string().min(5, { message: "Tytuł musi mieć co najmniej 5 znaków" }),
  content: z.string().min(20, { message: "Treść musi mieć co najmniej 20 znaków" }),
  excerpt: z.string().optional(),
  category: z.string(),
  tags: z.string(),
  visibility: z.enum(["public", "premium", "private"]),
  featuredImage: z.string().optional(),
});

type ContentValues = z.infer<typeof formSchema>;

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
  const [isUploading, setIsUploading] = useState(false);
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

  const handleImageUpload = async () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setPreviewImage('/placeholder.svg');
      form.setValue('featuredImage', '/placeholder.svg');
      setIsUploading(false);
      toast.success('Zdjęcie zostało przesłane pomyślnie!');
    }, 1500);
  };

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
            </div>

            <div className="space-y-8">
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

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Zdjęcie wyróżniające</h3>
                  
                  <div className="text-center space-y-4">
                    {previewImage ? (
                      <div className="relative rounded-md overflow-hidden">
                        <img 
                          src={previewImage} 
                          alt="Featured" 
                          className="w-full h-40 object-cover"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          className="absolute right-2 top-2 bg-background/80"
                          onClick={() => {
                            setPreviewImage(null);
                            form.setValue('featuredImage', '');
                          }}
                        >
                          Usuń
                        </Button>
                      </div>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full" disabled={isUploading}>
                            <Image className="mr-2 h-4 w-4" />
                            {isUploading ? 'Przesyłanie...' : 'Wybierz zdjęcie'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Wybierz zdjęcie wyróżniające</DialogTitle>
                            <DialogDescription>
                              Prześlij zdjęcie, które będzie wyświetlane jako miniatura artykułu.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="border-2 border-dashed border-input rounded-md p-8 text-center">
                              <Paperclip className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground mb-2">
                                Przeciągnij i upuść zdjęcie lub kliknij, aby wybrać
                              </p>
                              <Button onClick={handleImageUpload} disabled={isUploading}>
                                {isUploading ? 'Przesyłanie...' : 'Wybierz plik'}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardContent>
              </Card>

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
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContentEditor;
