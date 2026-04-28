import React, { useState, useEffect } from 'react';
import { db } from '../../../shared/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useQRStore } from '../store/useQRStore';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { Label } from '../../../shared/components/ui/label';
import { Plus, Trash2, Check, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PresetsControls: React.FC = () => {
  const { options, setOptions, user } = useQRStore();
  const [presets, setPresets] = useState<any[]>([]);
  const [newPresetName, setNewPresetName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      setPresets([]);
      return;
    }

    const q = query(
      collection(db, 'presets'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPresets(docs);
    });

    return () => unsubscribe();
  }, [user]);

  const savePreset = async () => {
    if (!user || !newPresetName.trim()) return;

    setIsSaving(true);
    try {
      // Create a clean copy of design options, explicitly including nested objects
      const designOptions = {
        width: options.width,
        height: options.height,
        margin: options.margin,
        image: options.image || null,
        qrOptions: options.qrOptions || {},
        imageOptions: options.imageOptions || {},
        dotsOptions: options.dotsOptions || {},
        backgroundOptions: options.backgroundOptions || {},
        cornersSquareOptions: options.cornersSquareOptions || {},
        cornersDotOptions: options.cornersDotOptions || {},
      };
      
      await addDoc(collection(db, 'presets'), {
        userId: user.uid,
        name: newPresetName.trim(),
        options: designOptions,
        createdAt: new Date().toISOString(),
        serverTime: serverTimestamp()
      });
      setNewPresetName('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Error saving preset:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const deletePreset = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, 'presets', id));
    } catch (error) {
      console.error('Error deleting preset:', error);
    }
  };

  const applyPreset = (presetOptions: any) => {
    // Trigger a "morphing" effect by updating the store
    // We explicitly extract design fields to ensure we don't overwrite 'data'
    const { 
      width, height, margin, image,
      qrOptions, imageOptions, dotsOptions, 
      backgroundOptions, cornersSquareOptions, cornersDotOptions 
    } = presetOptions;

    setOptions({
      width, height, margin, image,
      qrOptions, imageOptions, dotsOptions,
      backgroundOptions, cornersSquareOptions, cornersDotOptions
    });
  };

  if (!user) {
    return (
      <div className="p-4 bg-white/5 rounded-3xl border border-white/5 text-center">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Sign in to save presets
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">
          Save Current Design
        </Label>
        <div className="flex gap-2">
          <Input
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
            placeholder="Preset Name"
            className="h-11 bg-white/5 border-white/10 rounded-2xl text-xs focus:ring-primary/20"
          />
          <Button
            onClick={savePreset}
            disabled={isSaving || !newPresetName.trim()}
            size="icon"
            className={`h-11 w-11 rounded-2xl shrink-0 transition-all ${showSuccess ? 'bg-green-500 text-white' : 'bg-primary text-background shadow-[0_0_15px_rgba(165,243,252,0.3)]'}`}
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : showSuccess ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">
          Your Styles
        </Label>
        <div className="grid grid-cols-1 gap-3">
          <AnimatePresence mode="popLayout">
            {presets.map((preset) => (
              <motion.div
                key={preset.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => applyPreset(preset.options)}
                className="group relative flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-primary/5 rounded-[1.5rem] cursor-pointer transition-all overflow-hidden"
              >
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Sparkles className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white group-hover:text-primary transition-colors">
                      {preset.name}
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold">
                      {preset.options.dotsOptions?.type || 'Standard'}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => deletePreset(e, preset.id)}
                  className="h-8 w-8 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-500 transition-all relative z-10"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {presets.length === 0 && (
            <div className="py-8 text-center border-2 border-dashed border-white/5 rounded-[1.5rem]">
              <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                No presets saved yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
