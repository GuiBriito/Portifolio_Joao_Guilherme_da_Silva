import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useQRStore } from '../store/useQRStore';

export const BackgroundControls: React.FC = () => {
  const { options, setOptions } = useQRStore();

  const handleColorChange = (value: string) => {
    setOptions({
      backgroundOptions: {
        ...options.backgroundOptions,
        color: value,
      },
    });
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-600 uppercase">Background Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={options.backgroundOptions?.color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-12 h-9 p-1 cursor-pointer"
          />
          <Input
            type="text"
            value={options.backgroundOptions?.color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="h-9 text-sm font-mono"
          />
        </div>
      </div>
    </div>
  );
};
