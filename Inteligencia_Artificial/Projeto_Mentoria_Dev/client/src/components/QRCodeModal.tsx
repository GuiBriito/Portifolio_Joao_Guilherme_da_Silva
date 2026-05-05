import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Download, X } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  url: string;
  onClose: () => void;
}

export function QRCodeModal({ isOpen, url, onClose }: QRCodeModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        errorCorrectionLevel: 'H',
        width: 300,
        margin: 2,
        color: {
          dark: '#0F172A',
          light: '#F8FAFC'
        }
      } as any);
    }
  }, [isOpen, url]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.href = canvasRef.current.toDataURL('image/png');
      link.download = 'mentoria-dev-qrcode.png';
      link.click();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="backdrop-blur-xl bg-slate-900/95 border border-white/20 shadow-2xl max-w-sm w-full p-8 relative animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
              QR Code
            </h2>
            <p className="text-sm text-slate-400" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Escaneie para acessar o app no seu celular
            </p>
          </div>

          {/* QR Code Canvas */}
          <div className="flex justify-center p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/10">
            <canvas
              ref={canvasRef}
              className="w-64 h-64"
            />
          </div>

          {/* URL Display */}
          <div className="space-y-2">
            <p className="text-xs text-slate-500 uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              URL de Preview
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-xs text-slate-300 truncate"
              />
              <Button
                onClick={handleCopyUrl}
                size="sm"
                className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30"
                variant="outline"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            {copied && (
              <p className="text-xs text-cyan-400" style={{ fontFamily: "'Poppins', sans-serif" }}>
                ✓ Copiado para a área de transferência!
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleDownloadQR}
              className="flex-1 h-10 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-cyan-500 to-pink-500"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar QR Code
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-10 rounded-lg font-semibold border-slate-600 text-slate-300 hover:bg-slate-800 transition-all duration-300"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Fechar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
