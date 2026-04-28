import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQRStore } from '../store/useQRStore';

export const QrOptionsControls: React.FC = () => {
  const { options, setOptions } = useQRStore();

  const handleQrOptionChange = (key: string, value: any) => {
    setOptions({
      qrOptions: {
        ...options.qrOptions,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-600 uppercase">Error Correction Level</Label>
        <Select 
          value={options.qrOptions?.errorCorrectionLevel} 
          onValueChange={(v) => handleQrOptionChange('errorCorrectionLevel', v)}
        >
          <SelectTrigger className="h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="L">L (Low ~7%)</SelectItem>
            <SelectItem value="M">M (Medium ~15%)</SelectItem>
            <SelectItem value="Q">Q (Quartile ~25%)</SelectItem>
            <SelectItem value="H">H (High ~30%)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-600 uppercase">Mode</Label>
        <Select 
          value={options.qrOptions?.mode} 
          onValueChange={(v) => handleQrOptionChange('mode', v)}
        >
          <SelectTrigger className="h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Numeric">Numeric</SelectItem>
            <SelectItem value="Alphanumeric">Alphanumeric</SelectItem>
            <SelectItem value="Byte">Byte</SelectItem>
            <SelectItem value="Kanji">Kanji</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-600 uppercase">Type Number (0-40)</Label>
        <Select 
          value={String(options.qrOptions?.typeNumber)} 
          onValueChange={(v) => handleQrOptionChange('typeNumber', Number(v))}
        >
          <SelectTrigger className="h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Auto (0)</SelectItem>
            {Array.from({ length: 40 }, (_, i) => i + 1).map((n) => (
              <SelectItem key={n} value={String(n)}>{n}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
