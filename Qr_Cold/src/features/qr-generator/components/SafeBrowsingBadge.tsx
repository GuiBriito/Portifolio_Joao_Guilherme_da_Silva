import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, ShieldX, Loader2 } from 'lucide-react';
import { checkUrlSafety, SafetyResult } from '../services/geminiService';

interface SafeBrowsingBadgeProps {
  url: string;
  onSafetyChange?: (isSafe: boolean) => void;
}

export const SafeBrowsingBadge: React.FC<SafeBrowsingBadgeProps> = ({ url, onSafetyChange }) => {
  const [result, setResult] = useState<SafetyResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url || !url.startsWith('http')) {
      setResult(null);
      onSafetyChange?.(true);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const safety = await checkUrlSafety(url);
        setResult(safety);
        onSafetyChange?.(safety.isSafe);
      } catch (error) {
        console.error('Safety check failed:', error);
        onSafetyChange?.(true);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [url, onSafetyChange]);

  if (!url || !url.startsWith('http')) return null;

  const getBadgeConfig = () => {
    if (loading) return { icon: Loader2, color: 'text-primary', label: 'Verificando...', bg: 'bg-primary/10', border: 'border-primary/20' };
    if (!result) return null;

    switch (result.rating) {
      case 'safe':
        return { icon: ShieldCheck, color: 'text-green-400', label: 'URL Verificada', bg: 'bg-green-400/10', border: 'border-green-400/20' };
      case 'suspicious':
        return { icon: ShieldAlert, color: 'text-yellow-400', label: 'Link Suspeito', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' };
      case 'malicious':
        return { icon: ShieldX, color: 'text-red-400', label: 'Alerta de Risco', bg: 'bg-red-400/10', border: 'border-red-400/20' };
      default:
        return null;
    }
  };

  const config = getBadgeConfig();
  if (!config) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bg} ${config.border} backdrop-blur-sm`}
      >
        <config.icon className={`w-3 h-3 ${config.color} ${loading ? 'animate-spin' : ''}`} />
        <span className={`text-[9px] font-bold uppercase tracking-widest ${config.color}`}>
          {config.label}
        </span>
      </motion.div>
    </AnimatePresence>
  );
};
