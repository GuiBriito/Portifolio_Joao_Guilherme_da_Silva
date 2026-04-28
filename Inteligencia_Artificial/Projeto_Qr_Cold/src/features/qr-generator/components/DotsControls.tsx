import React from 'react';
import { Label } from '../../../shared/components/ui/label';
import { Input } from '../../../shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/ui/select';
import { useQRStore } from '../store/useQRStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../shared/components/ui/tabs';

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
        gradient: null as any,
      },
    });
  };

  const handleGradientChange = (newGradient: any) => {
    setOptions({
      dotsOptions: {
        ...options.dotsOptions,
        color: null as any,
        gradient: {
          ...options.dotsOptions?.gradient,
          ...newGradient,
        },
      },
    });
  };

  const isGradient = !!options.dotsOptions?.gradient;
  const tabValue = isGradient ? "gradient" : "single";

  return (
    <div className="space-y-6 pt-2">
      <div className="space-y-3">
        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Dots Type</Label>
        <Select value={options.dotsOptions?.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="h-12 text-sm bg-white/5 border-white/10 rounded-2xl">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1B23] border-white/10 text-white rounded-2xl">
            <SelectItem value="rounded" className="rounded-xl">Rounded</SelectItem>
            <SelectItem value="dots" className="rounded-xl">Dots</SelectItem>
            <SelectItem value="classy" className="rounded-xl">Classy</SelectItem>
            <SelectItem value="classy-rounded" className="rounded-xl">Classy Rounded</SelectItem>
            <SelectItem value="square" className="rounded-xl">Square</SelectItem>
            <SelectItem value="extra-rounded" className="rounded-xl">Extra Rounded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Color / Gradient</Label>
        <Tabs 
          value={tabValue} 
          onValueChange={(v) => v === 'single' ? handleColorChange('#A5F3FC') : handleGradientChange({ type: 'linear', rotation: 0, colorStops: [{ offset: 0, color: '#A5F3FC' }, { offset: 1, color: '#3b82f6' }] })} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 h-10 bg-white/5 rounded-xl p-1">
            <TabsTrigger value="single" className="text-[10px] uppercase rounded-lg data-[state=active]:bg-primary data-[state=active]:text-background">Solid</TabsTrigger>
            <TabsTrigger value="gradient" className="text-[10px] uppercase rounded-lg data-[state=active]:bg-primary data-[state=active]:text-background">Gradient</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="pt-4">
            <div className="flex gap-3">
              <Input
                type="color"
                value={options.dotsOptions?.color || '#A5F3FC'}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-14 h-12 p-1 cursor-pointer bg-white/5 border-white/10 rounded-2xl"
              />
              <Input
                type="text"
                value={options.dotsOptions?.color || '#A5F3FC'}
                onChange={(e) => handleColorChange(e.target.value)}
                className="h-12 text-sm font-mono bg-white/5 border-white/10 rounded-2xl"
              />
            </div>
          </TabsContent>

          <TabsContent value="gradient" className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-[10px] text-muted-foreground uppercase">Type</Label>
                <Select 
                  value={options.dotsOptions?.gradient?.type || 'linear'} 
                  onValueChange={(v) => handleGradientChange({ type: v })}
                >
                  <SelectTrigger className="h-10 text-xs bg-white/5 border-white/10 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1B23] border-white/10 text-white rounded-xl">
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="radial">Radial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-muted-foreground uppercase">Rotation</Label>
                <Input
                  type="number"
                  value={options.dotsOptions?.gradient?.rotation || 0}
                  onChange={(e) => handleGradientChange({ rotation: Number(e.target.value) })}
                  className="h-10 text-xs bg-white/5 border-white/10 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] text-muted-foreground uppercase">Color Stops</Label>
              {options.dotsOptions?.gradient?.colorStops.map((stop, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <Input
                    type="color"
                    value={stop.color}
                    onChange={(e) => {
                      const newStops = [...(options.dotsOptions?.gradient?.colorStops || [])];
                      newStops[idx] = { ...stop, color: e.target.value };
                      handleGradientChange({ colorStops: newStops });
                    }}
                    className="w-10 h-10 p-1 cursor-pointer bg-white/5 border-white/10 rounded-xl"
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
                    className="h-10 text-xs w-20 bg-white/5 border-white/10 rounded-xl"
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

