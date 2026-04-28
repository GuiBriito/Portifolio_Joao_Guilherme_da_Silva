import { useState } from 'react';
import { MainLayout } from './components/MainLayout';
import { QRCodePreview } from './components/QRCodePreview';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useQRStore } from './store/useQRStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import QRCodeStyling from 'qr-code-styling';

export default function App() {
  const { options } = useQRStore();
  const [format, setFormat] = useState<'png' | 'jpeg' | 'svg'>('png');

  const handleDownload = () => {
    const qrCode = new QRCodeStyling(options);
    qrCode.download({ name: 'qr-code', extension: format });
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center gap-8">
        <div className="bg-white p-4">
          <QRCodePreview />
        </div>
        
        <div className="w-full space-y-4 border-t border-slate-100 pt-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Select Format</Label>
            <Select value={format} onValueChange={(v: any) => setFormat(v)}>
              <SelectTrigger className="w-full rounded-none border-slate-200 h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG Image</SelectItem>
                <SelectItem value="jpeg">JPEG Image</SelectItem>
                <SelectItem value="svg">SVG Vector</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleDownload}
            className="w-full bg-[#333333] hover:bg-black text-white rounded-none h-12 text-sm font-bold uppercase tracking-widest gap-2 transition-all shadow-lg"
          >
            <Download className="w-4 h-4" />
            Download QR Code
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}


