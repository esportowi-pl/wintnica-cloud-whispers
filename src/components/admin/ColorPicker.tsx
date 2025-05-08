
import React from 'react';
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <div 
        className="w-10 h-10 rounded-md border cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => document.getElementById('color-picker-input')?.click()}
      />
      <Input
        id="color-picker-input"
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-0 h-0 opacity-0 absolute"
      />
      <Input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-28"
      />
    </div>
  );
};
