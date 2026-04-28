import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useQRStore } from '../store/useQRStore';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export const LogoControls: React.FC = () => {
  const { options, setOptions } = useQRStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOptions({ image: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setOptions({ image: undefined });
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-600 uppercase">Logo Upload</Label>
        <div className="flex flex-col gap-3">
          {options.image ? (
            <div className="relative w-full aspect-video bg-slate-50 rounded-none border border-slate-200 flex items-center justify-center p-4">
              <img src={options.image} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 w-6 h-6 rounded-none"
                onClick={removeLogo}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-none cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-slate-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-slate-500 font-medium">Click to upload</p>
                  <p className="text-xs text-slate-400">PNG, JPG or SVG</p>
                </div>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-600 uppercase">Logo Size ({Math.round((options.imageOptions?.imageSize || 0.4) * 100)}%)</Label>
        <Input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={options.imageOptions?.imageSize}
          onChange={(e) => setOptions({
            imageOptions: {
              ...options.imageOptions,
              imageSize: Number(e.target.value),
            }
          })}
          className="h-4"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-600 uppercase">Logo Margin ({options.imageOptions?.margin}px)</Label>
        <Input
          type="range"
          min="0"
          max="20"
          value={options.imageOptions?.margin}
          onChange={(e) => setOptions({
            imageOptions: {
              ...options.imageOptions,
              margin: Number(e.target.value),
            }
          })}
          className="h-4"
        />
      </div>
    </div>
  );
};
