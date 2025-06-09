
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAccessibility, ColorBlindnessType } from "@/contexts/AccessibilityContext";
import { Eye, Download, RotateCcw, Palette } from "lucide-react";

interface PhotoFilterProps {
  imageUrl: string;
  onFilteredImage?: (filteredImageUrl: string) => void;
}

const PhotoAccessibilityFilter: React.FC<PhotoFilterProps> = ({ imageUrl, onFilteredImage }) => {
  const { settings, applyColorBlindnessFilter } = useAccessibility();
  const [filteredImageUrl, setFilteredImageUrl] = useState<string>(imageUrl);
  const [customSettings, setCustomSettings] = useState({
    colorBlindness: settings.colorBlindness,
    contrast: 100,
    brightness: 100,
    saturation: 100
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const applyFilters = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Apply CSS filters for contrast, brightness, and saturation
      ctx.filter = `contrast(${customSettings.contrast}%) brightness(${customSettings.brightness}%) saturate(${customSettings.saturation}%)`;
      ctx.drawImage(img, 0, 0);
      
      // Apply color blindness simulation
      if (customSettings.colorBlindness !== 'none') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
          let [newR, newG, newB] = [r, g, b];
          
          switch (customSettings.colorBlindness) {
            case 'protanopia':
              newR = 0.567 * r + 0.433 * g;
              newG = 0.558 * r + 0.442 * g;
              newB = 0.242 * g + 0.758 * b;
              break;
            case 'deuteranopia':
              newR = 0.625 * r + 0.375 * g;
              newG = 0.7 * r + 0.3 * g;
              newB = 0.3 * g + 0.7 * b;
              break;
            case 'tritanopia':
              newR = 0.95 * r + 0.05 * g;
              newG = 0.433 * g + 0.567 * b;
              newB = 0.475 * g + 0.525 * b;
              break;
            case 'achromatopsia':
              const gray = 0.299 * r + 0.587 * g + 0.114 * b;
              newR = newG = newB = gray;
              break;
          }
          
          data[i] = Math.min(255, Math.max(0, newR));
          data[i + 1] = Math.min(255, Math.max(0, newG));
          data[i + 2] = Math.min(255, Math.max(0, newB));
        }
        
        ctx.putImageData(imageData, 0, 0);
      }
      
      const filteredUrl = canvas.toDataURL('image/png');
      setFilteredImageUrl(filteredUrl);
      onFilteredImage?.(filteredUrl);
    };
    
    img.src = imageUrl;
  };

  const downloadFiltered = () => {
    const link = document.createElement('a');
    link.download = 'filtered-photo.png';
    link.href = filteredImageUrl;
    link.click();
  };

  const resetFilters = () => {
    setCustomSettings({
      colorBlindness: 'none',
      contrast: 100,
      brightness: 100,
      saturation: 100
    });
    setFilteredImageUrl(imageUrl);
  };

  const colorBlindnessOptions = [
    { value: 'none', label: 'Normalny wzrok' },
    { value: 'protanopia', label: 'Protanopia (brak czerwieni)' },
    { value: 'deuteranopia', label: 'Deuteranopia (brak zieleni)' },
    { value: 'tritanopia', label: 'Tritanopia (brak błękitu)' },
    { value: 'achromatopsia', label: 'Achromatyzm (czarno-białe)' }
  ];

  React.useEffect(() => {
    applyFilters();
  }, [customSettings, imageUrl]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Filtr dostępności zdjęć
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Dostosuj zdjęcie do swoich potrzeb wzrokowych lub zobacz, jak widzą je inne osoby.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Original vs Filtered Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Oryginał</h4>
              <img 
                src={imageUrl} 
                alt="Oryginalne zdjęcie" 
                className="w-full h-48 object-cover rounded-lg border"
              />
            </div>
            <div>
              <h4 className="font-medium mb-2">Po filtrach</h4>
              <img 
                src={filteredImageUrl} 
                alt="Zdjęcie po filtrach" 
                className="w-full h-48 object-cover rounded-lg border"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Typ daltonizmu</label>
              <Select 
                value={customSettings.colorBlindness} 
                onValueChange={(value) => setCustomSettings(prev => ({ ...prev, colorBlindness: value as ColorBlindnessType }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorBlindnessOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Kontrast: {customSettings.contrast}%
              </label>
              <Slider
                value={[customSettings.contrast]}
                onValueChange={([value]) => setCustomSettings(prev => ({ ...prev, contrast: value }))}
                min={50}
                max={200}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Jasność: {customSettings.brightness}%
              </label>
              <Slider
                value={[customSettings.brightness]}
                onValueChange={([value]) => setCustomSettings(prev => ({ ...prev, brightness: value }))}
                min={50}
                max={150}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Nasycenie: {customSettings.saturation}%
              </label>
              <Slider
                value={[customSettings.saturation]}
                onValueChange={([value]) => setCustomSettings(prev => ({ ...prev, saturation: value }))}
                min={0}
                max={200}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {customSettings.colorBlindness !== 'none' && (
              <Badge variant="secondary">
                <Palette className="h-3 w-3 mr-1" />
                {colorBlindnessOptions.find(o => o.value === customSettings.colorBlindness)?.label}
              </Badge>
            )}
            {customSettings.contrast !== 100 && (
              <Badge variant="secondary">Kontrast: {customSettings.contrast}%</Badge>
            )}
            {customSettings.brightness !== 100 && (
              <Badge variant="secondary">Jasność: {customSettings.brightness}%</Badge>
            )}
            {customSettings.saturation !== 100 && (
              <Badge variant="secondary">Nasycenie: {customSettings.saturation}%</Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={downloadFiltered} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Pobierz
            </Button>
            <Button variant="outline" onClick={resetFilters} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Resetuj
            </Button>
          </div>

          {/* Info Box */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>💙 Misja Witnicy:</strong> Chcemy, aby każdy mieszkaniec mógł zobaczyć 
              nasze piękne miasto w tych samych kolorach. Te filtry pomagają osobom z wadami 
              wzroku lepiej odbierać zdjęcia z galerii Witnicy.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default PhotoAccessibilityFilter;
