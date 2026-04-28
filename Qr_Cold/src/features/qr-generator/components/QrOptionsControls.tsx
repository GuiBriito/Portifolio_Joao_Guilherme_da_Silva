import React from 'react';
import { Label } from '../../../shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/ui/select';
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
    <div className="space-y-6 pt-2">
      <div className="space-y-3">
        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Error Correction Level</Label>
        <Select 
          value={options.qrOptions?.errorCorrectionLevel} 
          onValueChange={(v) => handleQrOptionChange('errorCorrectionLevel', v)}
        >
          <SelectTrigger className="h-12 text-sm bg-white/5 border-white/10 rounded-2xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1B23] border-white/10 text-white rounded-2xl">
            <SelectItem value="L" className="rounded-xl">L (Low ~7%)</SelectItem>
            <SelectItem value="M" className="rounded-xl">M (Medium ~15%)</SelectItem>
            <SelectItem value="Q" className="rounded-xl">Q (Quartile ~25%)</SelectItem>
            <SelectItem value="H" className="rounded-xl">H (High ~30%)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Mode</Label>
        <Select 
          value={options.qrOptions?.mode} 
          onValueChange={(v) => handleQrOptionChange('mode', v)}
        >
          <SelectTrigger className="h-12 text-sm bg-white/5 border-white/10 rounded-2xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1B23] border-white/10 text-white rounded-2xl">
            <SelectItem value="Numeric" className="rounded-xl">Numeric</SelectItem>
            <SelectItem value="Alphanumeric" className="rounded-xl">Alphanumeric</SelectItem>
            <SelectItem value="Byte" className="rounded-xl">Byte</SelectItem>
            <SelectItem value="Kanji" className="rounded-xl">Kanji</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Type Number (0-40)</Label>
        <Select 
          value={String(options.qrOptions?.typeNumber)} 
          onValueChange={(v) => handleQrOptionChange('typeNumber', Number(v))}
        >
          <SelectTrigger className="h-12 text-sm bg-white/5 border-white/10 rounded-2xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1B23] border-white/10 text-white rounded-2xl">
            <SelectItem value="0" className="rounded-xl">Auto (0)</SelectItem>
            {Array.from({ length: 40 }, (_, i) => i + 1).map((n) => (
              <SelectItem key={n} value={String(n)} className="rounded-xl">{n}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
