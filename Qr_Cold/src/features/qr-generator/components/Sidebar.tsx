import React, { useEffect, useState } from 'react';
import { ScrollArea } from '../../../shared/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../shared/components/ui/accordion';
import { Settings2, Palette, Image as ImageIcon, LayoutGrid, RotateCcw, History, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '../../../shared/components/ui/button';
import { useQRStore } from '../store/useQRStore';
import { MainContentControls } from './MainContentControls';
import { ScannabilityIndicator } from './ScannabilityIndicator';
import { DotsControls } from './DotsControls';
import { CornersSquareControls } from './CornersSquareControls';
import { CornersDotControls } from './CornersDotControls';
import { LogoControls } from './LogoControls';
import { BackgroundControls } from './BackgroundControls';
import { QrOptionsControls } from './QrOptionsControls';
import { PresetsControls } from './PresetsControls';
import { db } from '../../../shared/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

export const Sidebar: React.FC = () => {
  const { options, resetOptions, user, setOptions } = useQRStore();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      setHistory([]);
      return;
    }

    const q = query(
      collection(db, 'qr_history'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHistory(docs);
    });

    return () => unsubscribe();
  }, [user]);

  const deleteHistoryItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'qr_history', id));
    } catch (error) {
      console.error('Error deleting history item:', error);
    }
  };

  const loadHistoryItem = (item: any) => {
    setOptions(item.options);
  };

  return (
    <aside className="w-full border border-white/10 bg-[#0B0C11]/80 backdrop-blur-xl flex flex-col shadow-2xl overflow-hidden rounded-[2rem]">
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-2xl bg-primary flex items-center justify-center">
            <Settings2 className="w-4 h-4 text-background" />
          </div>
          <span className="font-bold text-sm uppercase tracking-widest text-foreground/90">Studio</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all rounded-2xl"
          onClick={resetOptions}
          title="Reset all"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 h-[600px] custom-scrollbar">
        <div className="p-6 space-y-8">
          <div className="space-y-6">
            <MainContentControls />
            <ScannabilityIndicator />
          </div>

          <PresetsControls />

          <Accordion type="multiple" className="w-full space-y-2">
            {user && history.length > 0 && (
              <AccordionItem value="history" className="border-none bg-primary/5 rounded-3xl overflow-hidden px-2">
                <AccordionTrigger className="hover:no-underline py-4 px-4 text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <History className="w-4 h-4" />
                    <span className="uppercase tracking-widest text-[10px]">Your History</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0 space-y-3">
                  {history.map((item) => (
                    <div key={item.id} className="group flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/5 hover:border-primary/20 transition-all">
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-[10px] font-bold text-white truncate">{item.options.data}</span>
                        <span className="text-[8px] text-muted-foreground uppercase tracking-widest">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-xl hover:bg-primary/10 hover:text-primary"
                          onClick={() => loadHistoryItem(item)}
                          title="Load settings"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-xl hover:bg-red-500/10 hover:text-red-500"
                          onClick={() => deleteHistoryItem(item.id)}
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="dots" className="border-none bg-white/5 rounded-3xl overflow-hidden px-2">
              <AccordionTrigger className="hover:no-underline py-4 px-4 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                <div className="flex items-center gap-3">
                  <Palette className="w-4 h-4" />
                  <span>Dots Styling</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <DotsControls />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cornersSquare" className="border-none bg-white/5 rounded-3xl overflow-hidden px-2">
              <AccordionTrigger className="hover:no-underline py-4 px-4 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                <div className="flex items-center gap-3">
                  <LayoutGrid className="w-4 h-4" />
                  <span>Corners Square</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <CornersSquareControls />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cornersDot" className="border-none bg-white/5 rounded-3xl overflow-hidden px-2">
              <AccordionTrigger className="hover:no-underline py-4 px-4 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                <div className="flex items-center gap-3">
                  <LayoutGrid className="w-4 h-4" />
                  <span>Corners Dot</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <CornersDotControls />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="background" className="border-none bg-white/5 rounded-3xl overflow-hidden px-2">
              <AccordionTrigger className="hover:no-underline py-4 px-4 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                <div className="flex items-center gap-3">
                  <Palette className="w-4 h-4" />
                  <span>Background</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <BackgroundControls />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="image" className="border-none bg-white/5 rounded-3xl overflow-hidden px-2">
              <AccordionTrigger className="hover:no-underline py-4 px-4 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-4 h-4" />
                  <span>Logo / Image</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <LogoControls />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="qr" className="border-none bg-white/5 rounded-3xl overflow-hidden px-2">
              <AccordionTrigger className="hover:no-underline py-4 px-4 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                <div className="flex items-center gap-3">
                  <Settings2 className="w-4 h-4" />
                  <span>QR Config</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <QrOptionsControls />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    </aside>
  );
};
