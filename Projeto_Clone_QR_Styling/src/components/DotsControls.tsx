import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQRStore } from '../store/useQRStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const DotsControls: React.FC = () => {
  const { options, setOptions } = useQRStore();

  const handleTypeChange = (value: string) => {
    setOptions({
      dotsOptions: {
        ...options.dotsOptions,
        type: value as any,
      },
    });
  };

  const handleColorChange = (value: string) => {
    setOptions({
      dotsOptions: {
        ...options.dotsOptions,
        color: value,
        gradient: undefined,
      },
    });
  };

  const handleGradientChange = (newGradient: any) => {
    setOptions({
      dotsOptions: {
        ...options.dotsOptions,
        color: undefined,
        gradient: {
          ...options.dotsOptions?.gradient,
          ...newGradient,
        },
      },
    });
  };

  const isGradient = !!options.dotsOptions?.gradient;

  return (
    <div className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-600 uppercase">Dots Type</Label>
        <Select value={options.dotsOptions?.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="h-9 text-sm">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rounded">Rounded</SelectItem>
            <SelectItem value="dots">Dots</SelectItem>
            <SelectItem value="classy">Classy</SelectItem>
            <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
            <SelectItem value="square">Square</SelectItem>
            <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-600 uppercase">Color / Gradient</Label>
        <Tabs defaultValue={isGradient ? "gradient" : "single"} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-8">
            <TabsTrigger value="single" className="text-[10px] uppercase" onClick={() => handleColorChange('#000000')}>Solid</TabsTrigger>
            <TabsTrigger value="gradient" className="text-[10px] uppercase" onClick={() => handleGradientChange({ type: 'linear', rotation: 0, colorStops: [{ offset: 0, color: '#000000' }, { offset: 1, color: '#3b82f6' }] })}>Gradient</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="pt-2">
            <div className="flex gap-2">
              <Input
                type="color"
                value={options.dotsOptions?.color || '#000000'}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-12 h-9 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={options.dotsOptions?.color || '#000000'}
                onChange={(e) => handleColorChange(e.target.value)}
                className="h-9 text-sm font-mono"
              />
            </div>
          </TabsContent>

          <TabsContent value="gradient" className="pt-2 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-[10px] text-slate-400 uppercase">Tipo</Label>
                <Select 
                  value={options.dotsOptions?.gradient?.type || 'linear'} 
                  onValueChange={(v) => handleGradientChange({ type: v })}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="radial">Radial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] text-slate-400 uppercase">Rotação</Label>
                <Input
                  type="number"
                  value={options.dotsOptions?.gradient?.rotation || 0}
                  onChange={(e) => handleGradientChange({ rotation: Number(e.target.value) })}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] text-slate-400 uppercase">Colors</Label>
              {options.dotsOptions?.gradient?.colorStops.map((stop, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input
                    type="color"
                    value={stop.color}
                    onChange={(e) => {
                      const newStops = [...(options.dotsOptions?.gradient?.colorStops || [])];
                      newStops[idx] = { ...stop, color: e.target.value };
                      handleGradientChange({ colorStops: newStops });
                    }}
                    className="w-8 h-8 p-1 cursor-pointer"
                  />
                  <Input
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={stop.offset}
                    onChange={(e) => {
                      const newStops = [...(options.dotsOptions?.gradient?.colorStops || [])];
                      newStops[idx] = { ...stop, offset: Number(e.target.value) };
                      handleGradientChange({ colorStops: newStops });
                    }}
                    className="h-8 text-xs w-16"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

