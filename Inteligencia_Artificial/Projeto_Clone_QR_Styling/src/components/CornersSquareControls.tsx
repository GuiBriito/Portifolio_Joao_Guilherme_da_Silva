import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQRStore } from '../store/useQRStore';

export const CornersSquareControls: React.FC = () => {
  const { options, setOptions } = useQRStore();

  const handleTypeChange = (value: string) => {
    setOptions({
      cornersSquareOptions: {
        ...options.cornersSquareOptions,
        type: value as any,
      },
    });
  };

  const handleColorChange = (value: string) => {
    setOptions({
      cornersSquareOptions: {
        ...options.cornersSquareOptions,
        color: value,
      },
    });
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-600 uppercase">Type</Label>
        <Select value={options.cornersSquareOptions?.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="h-9 text-sm">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="square">Square</SelectItem>
            <SelectItem value="dot">Dot</SelectItem>
            <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-600 uppercase">Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={options.cornersSquareOptions?.color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-12 h-9 p-1 cursor-pointer"
          />
          <Input
            type="text"
            value={options.cornersSquareOptions?.color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="h-9 text-sm font-mono"
          />
        </div>
      </div>
    </div>
  );
};
