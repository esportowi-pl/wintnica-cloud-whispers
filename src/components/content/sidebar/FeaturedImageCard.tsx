
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Image, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { ContentValues } from '../ContentEditor';

interface FeaturedImageCardProps {
  form: UseFormReturn<ContentValues>;
  previewImage: string | null;
  setPreviewImage: (image: string | null) => void;
}

const FeaturedImageCard: React.FC<FeaturedImageCardProps> = ({ form, previewImage, setPreviewImage }) => {
  const [isUploading, setIsUploading] = useState(false);

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

  return (
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
  );
};

export default FeaturedImageCard;
