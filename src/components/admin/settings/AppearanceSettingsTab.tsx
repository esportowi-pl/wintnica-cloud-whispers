
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColorPicker } from '@/components/admin/ColorPicker';

interface AppearanceSettingsProps {
  primaryColor: string;
  setPrimaryColor: (value: string) => void;
}

const AppearanceSettingsTab: React.FC<AppearanceSettingsProps> = ({
  primaryColor,
  setPrimaryColor
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-2">Kolory</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>Kolor podstawowy</div>
          <div className="col-span-2">
            <ColorPicker 
              color={primaryColor}
              onChange={setPrimaryColor} 
            />
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-2">Czcionki</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>Czcionka nagłówków</div>
          <div className="col-span-2">
            <Select defaultValue="inter">
              <SelectTrigger>
                <SelectValue placeholder="Wybierz czcionkę" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
                <SelectItem value="opensans">Open Sans</SelectItem>
                <SelectItem value="lato">Lato</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettingsTab;
