import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useQRStore } from '../store/useQRStore';

export const MainContentControls: React.FC = () => {
  const { options, setOptions } = useQRStore();

  return (
    <div className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label htmlFor="qr-data" className="text-xs font-semibold text-slate-600 uppercase">
          Data / URL
        </Label>
        <Input
          id="qr-data"
          value={options.data}
          onChange={(e) => setOptions({ data: e.target.value })}
          placeholder="https://example.com"
          className="h-9 text-sm border-slate-200 focus:border-blue-400 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="qr-width" className="text-xs font-semibold text-slate-600 uppercase">
            Width
          </Label>
          <Input
            id="qr-width"
            type="number"
            value={options.width}
            onChange={(e) => setOptions({ width: Number(e.target.value) })}
            className="h-9 text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="qr-height" className="text-xs font-semibold text-slate-600 uppercase">
            Height
          </Label>
          <Input
            id="qr-height"
            type="number"
            value={options.height}
            onChange={(e) => setOptions({ height: Number(e.target.value) })}
            className="h-9 text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="qr-margin" className="text-xs font-semibold text-slate-600 uppercase">
          Margin ({options.margin}px)
        </Label>
        <Input
          id="qr-margin"
          type="range"
          min="0"
          max="100"
          value={options.margin}
          onChange={(e) => setOptions({ margin: Number(e.target.value) })}
          className="h-4"
        />
      </div>
    </div>
  );
};
