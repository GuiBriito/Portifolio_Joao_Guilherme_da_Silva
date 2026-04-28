import React from 'react';
import { Label } from '../../../shared/components/ui/label';
import { Input } from '../../../shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/ui/select';
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
    <div className="space-y-6 pt-2">
      <div className="space-y-3">
        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Type</Label>
        <Select value={options.cornersSquareOptions?.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="h-12 text-sm bg-white/5 border-white/10 rounded-2xl">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1B23] border-white/10 text-white rounded-2xl">
            <SelectItem value="square" className="rounded-xl">Square</SelectItem>
            <SelectItem value="dot" className="rounded-xl">Dot</SelectItem>
            <SelectItem value="extra-rounded" className="rounded-xl">Extra Rounded</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-3">
        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Color</Label>
        <div className="flex gap-3">
          <Input
            type="color"
            value={options.cornersSquareOptions?.color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-14 h-12 p-1 cursor-pointer bg-white/5 border-white/10 rounded-2xl"
          />
          <Input
            type="text"
            value={options.cornersSquareOptions?.color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="h-12 text-sm font-mono bg-white/5 border-white/10 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};
