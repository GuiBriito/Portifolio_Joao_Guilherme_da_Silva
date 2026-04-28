import React from 'react';
import { Download, Share2, FileJson } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQRStore } from '../store/useQRStore';
import QRCodeStyling from 'qr-code-styling';

export const Navbar: React.FC = () => {
  const { options } = useQRStore();

  const handleExport = (extension: 'png' | 'svg' | 'jpeg') => {
    const qrCode = new QRCodeStyling(options);
    qrCode.download({ name: 'qr-code', extension });
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(options, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "qr-config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <header className="h-14 border-b border-slate-700 bg-[#333333] flex items-center justify-between px-6 z-10 text-white">
      <div className="flex items-center gap-1 leading-none select-none">
        <span className="text-3xl font-black tracking-tighter">QR</span>
        <div className="flex flex-col text-[9px] uppercase font-bold tracking-widest opacity-80">
          <span>Styling</span>
          <span>studio</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8 gap-2 bg-transparent border-slate-500 text-white hover:bg-slate-700 hover:text-white" onClick={handleExportJSON}>
          <FileJson className="w-3 h-3" />
          JSON
        </Button>
        <div className="h-4 w-[1px] bg-slate-600 mx-1" />
        <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-300 hover:text-white hover:bg-slate-700" onClick={() => handleExport('svg')}>
          SVG
        </Button>
        <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-300 hover:text-white hover:bg-slate-700" onClick={() => handleExport('jpeg')}>
          JPEG
        </Button>
        <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 gap-2 text-white px-4" onClick={() => handleExport('png')}>
          <Download className="w-3 h-3" />
          PNG
        </Button>
      </div>
    </header>
  );
};

