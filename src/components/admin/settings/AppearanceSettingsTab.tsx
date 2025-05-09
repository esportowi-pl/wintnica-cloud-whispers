
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColorPicker } from '@/components/admin/ColorPicker';
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface AppearanceSettingsProps {
  primaryColor: string;
  setPrimaryColor: (value: string) => void;
  secondaryColor?: string;
  setSecondaryColor?: (value: string) => void;
  headingFont?: string;
  setHeadingFont?: (value: string) => void;
  bodyFont?: string;
  setBodyFont?: (value: string) => void;
  fontSize?: number;
  setFontSize?: (value: number) => void;
}

const AppearanceSettingsTab: React.FC<AppearanceSettingsProps> = ({
  primaryColor,
  setPrimaryColor,
  secondaryColor = "#64748b",
  setSecondaryColor = () => {},
  headingFont = "inter",
  setHeadingFont = () => {},
  bodyFont = "inter",
  setBodyFont = () => {},
  fontSize = 16,
  setFontSize = () => {}
}) => {
  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="colors">
          <AccordionTrigger className="text-lg font-medium">Kolory</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>Kolor podstawowy</div>
                <div className="col-span-2">
                  <ColorPicker 
                    color={primaryColor}
                    onChange={setPrimaryColor} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>Kolor dodatkowy</div>
                <div className="col-span-2">
                  <ColorPicker 
                    color={secondaryColor}
                    onChange={setSecondaryColor} 
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <div className="h-12 rounded-md overflow-hidden grid grid-cols-2">
                  <div className="flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                    <span className="text-white text-sm font-medium shadow-sm">Podstawowy</span>
                  </div>
                  <div className="flex items-center justify-center" style={{ backgroundColor: secondaryColor }}>
                    <span className="text-white text-sm font-medium shadow-sm">Dodatkowy</span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="typography">
          <AccordionTrigger className="text-lg font-medium">Typografia</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>Czcionka nagłówków</div>
                <div className="col-span-2">
                  <Select value={headingFont} onValueChange={setHeadingFont}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz czcionkę" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                      <SelectItem value="lato">Lato</SelectItem>
                      <SelectItem value="playfair">Playfair Display</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>Czcionka tekstu</div>
                <div className="col-span-2">
                  <Select value={bodyFont} onValueChange={setBodyFont}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz czcionkę" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                      <SelectItem value="lato">Lato</SelectItem>
                      <SelectItem value="sourcesans">Source Sans Pro</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="flex flex-col justify-center">
                  <Label htmlFor="font-size">Rozmiar tekstu</Label>
                  <span className="text-sm text-muted-foreground">{fontSize}px</span>
                </div>
                <div className="col-span-2">
                  <Slider 
                    id="font-size"
                    value={[fontSize]} 
                    min={12} 
                    max={24} 
                    step={1} 
                    onValueChange={(value) => setFontSize(value[0])} 
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <div className="rounded-md border p-4">
                  <h3 className={`font-${headingFont} text-xl mb-2`}>Przykładowy nagłówek</h3>
                  <p className={`font-${bodyFont}`} style={{ fontSize: `${fontSize}px` }}>
                    To jest przykładowy tekst pokazujący wybrane czcionki i ich rozmiary na stronie.
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="advanced">
          <AccordionTrigger className="text-lg font-medium">Zaawansowane</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>Zaokrąglenie rogów</div>
                <div className="col-span-2">
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz zaokrąglenie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Brak</SelectItem>
                      <SelectItem value="small">Małe</SelectItem>
                      <SelectItem value="medium">Średnie</SelectItem>
                      <SelectItem value="large">Duże</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>Animacje</div>
                <div className="col-span-2">
                  <Select defaultValue="subtle">
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz styl animacji" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Brak</SelectItem>
                      <SelectItem value="subtle">Subtelne</SelectItem>
                      <SelectItem value="medium">Średnie</SelectItem>
                      <SelectItem value="pronounced">Wyraźne</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AppearanceSettingsTab;
