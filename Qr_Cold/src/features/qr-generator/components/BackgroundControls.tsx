import React from 'react';
import { Label } from '../../../shared/components/ui/label';
import { Input } from '../../../shared/components/ui/input';
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
    <div className="space-y-6 pt-2">
      <div className="space-y-3">
        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Background Color</Label>
        <div className="flex gap-3">
          <Input
            type="color"
            value={options.backgroundOptions?.color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-14 h-12 p-1 cursor-pointer bg-white/5 border-white/10 rounded-2xl"
          />
          <Input
            type="text"
            value={options.backgroundOptions?.color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="h-12 text-sm font-mono bg-white/5 border-white/10 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};
