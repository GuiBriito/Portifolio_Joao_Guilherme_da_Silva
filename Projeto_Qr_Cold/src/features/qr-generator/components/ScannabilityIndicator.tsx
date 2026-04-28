import React, { useMemo } from 'react';
import { useQRStore } from '../store/useQRStore';
import { getRelativeLuminance, getContrastRatio, suggestContrastColor } from '../../../shared/utils/colorUtils';
import { ShieldCheck, ShieldAlert, ShieldX, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../../../shared/components/ui/button';

export const ScannabilityIndicator: React.FC = () => {
  const { options, setOptions } = useQRStore();

  const scannability = useMemo(() => {
    const bgHex = options.backgroundOptions?.color || '#ffffff';
    const bgLum = getRelativeLuminance(bgHex);

    const checkContrast = (colorHex: string | undefined, gradient: any) => {
      if (gradient?.colorStops) {
        return gradient.colorStops.map((stop: any) => getContrastRatio(bgLum, getRelativeLuminance(stop.color)));
      }
      if (colorHex) {
        return [getContrastRatio(bgLum, getRelativeLuminance(colorHex))];
      }
      return [21]; // Default high contrast if no color specified
    };

    const dotsContrasts = checkContrast(options.dotsOptions?.color, options.dotsOptions?.gradient);
    const squareContrasts = checkContrast(options.cornersSquareOptions?.color, options.cornersSquareOptions?.gradient);
    const cornerDotContrasts = checkContrast(options.cornersDotOptions?.color, options.cornersDotOptions?.gradient);

    const allContrasts = [...dotsContrasts, ...squareContrasts, ...cornerDotContrasts];
    const minContrast = Math.min(...allContrasts);

    if (minContrast >= 7) return { label: 'Excellent', score: 3, color: 'text-green-400', icon: ShieldCheck, minContrast };
    if (minContrast >= 3) return { label: 'Good', score: 2, color: 'text-yellow-400', icon: ShieldAlert, minContrast };
    return { label: 'Poor', score: 1, color: 'text-red-400', icon: ShieldX, minContrast };
  }, [options]);

  const autoAdjust = () => {
    const bgHex = options.backgroundOptions?.color || '#ffffff';
    const bgLum = getRelativeLuminance(bgHex);
    const suggestedColor = suggestContrastColor(bgLum);

    setOptions({
      dotsOptions: {
        ...options.dotsOptions,
        color: suggestedColor,
        gradient: null as any
      },
      cornersSquareOptions: {
        ...options.cornersSquareOptions,
        color: suggestedColor,
        gradient: null as any
      },
      cornersDotOptions: {
        ...options.cornersDotOptions,
        color: suggestedColor,
        gradient: null as any
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <scannability.icon className={`w-3 h-3 ${scannability.color}`} />
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Scannability</span>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${scannability.color}`}>
          {scannability.label}
        </span>
      </div>

      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-0.5">
        <div className={`h-full transition-all duration-500 ${scannability.score >= 1 ? (scannability.score === 1 ? 'bg-red-400 w-1/3' : 'bg-green-400/20 w-1/3') : 'bg-white/5 w-1/3'}`} />
        <div className={`h-full transition-all duration-500 ${scannability.score >= 2 ? (scannability.score === 2 ? 'bg-yellow-400 w-1/3' : 'bg-green-400/20 w-1/3') : 'bg-white/5 w-1/3'}`} />
        <div className={`h-full transition-all duration-500 ${scannability.score >= 3 ? 'bg-green-400 w-1/3' : 'bg-white/5 w-1/3'}`} />
      </div>

      <AnimatePresence>
        {scannability.score < 3 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-primary" />
                <p className="text-[9px] text-primary/80 font-medium leading-tight">
                  Low contrast detected. Adjust colors for better scanning?
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={autoAdjust}
                className="h-7 px-3 text-[9px] font-bold uppercase tracking-widest bg-primary text-background hover:bg-primary/90 rounded-xl shrink-0"
              >
                Fix Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
