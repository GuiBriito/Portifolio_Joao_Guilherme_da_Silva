import React from 'react';
import { Label } from '../../../shared/components/ui/label';
import { Input } from '../../../shared/components/ui/input';
import { useQRStore } from '../store/useQRStore';
import { Link2, Maximize2, Move, ShieldAlert } from 'lucide-react';
import { URLPreview } from './URLPreview';
import { SafeBrowsingBadge } from './SafeBrowsingBadge';
import { motion, AnimatePresence } from 'motion/react';

export const MainContentControls: React.FC = () => {
  const { options, setOptions } = useQRStore();
  const [isSafe, setIsSafe] = React.useState(true);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Link2 className="w-3 h-3 text-primary" />
            <Label htmlFor="qr-data" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Data / URL
            </Label>
          </div>
          <SafeBrowsingBadge url={options.data || ''} onSafetyChange={setIsSafe} />
        </div>
        <div className="relative group">
          <Input
            id="qr-data"
            value={options.data}
            onChange={(e) => setOptions({ data: e.target.value })}
            placeholder="https://example.com"
            className={`h-12 text-sm bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-2xl transition-all placeholder:text-white/20 ${!isSafe ? 'border-red-500/50 ring-2 ring-red-500/20 shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]' : ''}`}
          />
          <AnimatePresence>
            {!isSafe && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <URLPreview url={options.data || ''} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Maximize2 className="w-3 h-3 text-primary" />
            <Label htmlFor="qr-width" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Width
            </Label>
          </div>
          <Input
            id="qr-width"
            type="number"
            min="100"
            max="2000"
            value={options.width}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 100) setOptions({ width: val });
              else setOptions({ width: 100 });
            }}
            className="h-12 text-sm bg-white/5 border-white/10 rounded-2xl"
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Maximize2 className="w-3 h-3 text-primary" />
            <Label htmlFor="qr-height" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Height
            </Label>
          </div>
          <Input
            id="qr-height"
            type="number"
            min="100"
            max="2000"
            value={options.height}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 100) setOptions({ height: val });
              else setOptions({ height: 100 });
            }}
            className="h-12 text-sm bg-white/5 border-white/10 rounded-2xl"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Move className="w-3 h-3 text-primary" />
            <Label htmlFor="qr-margin" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Margin
            </Label>
          </div>
          <span className="text-[10px] font-mono text-primary">{options.margin}px</span>
        </div>
        <Input
          id="qr-margin"
          type="range"
          min="0"
          max="100"
          value={options.margin}
          onChange={(e) => setOptions({ margin: Number(e.target.value) })}
          className="h-4 accent-primary"
        />
      </div>
    </div>
  );
};
