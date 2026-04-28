import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Settings2, Palette, Image as ImageIcon, LayoutGrid, RotateCcw, FileJson } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQRStore } from '../store/useQRStore';
import { MainContentControls } from './MainContentControls';
import { DotsControls } from './DotsControls';
import { CornersSquareControls } from './CornersSquareControls';
import { CornersDotControls } from './CornersDotControls';
import { LogoControls } from './LogoControls';
import { BackgroundControls } from './BackgroundControls';
import { QrOptionsControls } from './QrOptionsControls';

export const Sidebar: React.FC = () => {
  const { options, resetOptions } = useQRStore();

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
    <aside className="w-full border border-slate-300 bg-[#d7d7d7] flex flex-col shadow-lg overflow-visible">
      <div className="p-4 border-b border-slate-400 flex items-center justify-between bg-black/5 backdrop-blur-sm">
        <span className="font-bold text-sm uppercase tracking-tight text-slate-700">Main Options</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          onClick={resetOptions}
          title="Reset all"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 h-[700px]">
        <div className="bg-white border-b border-slate-200">
          <div className="p-4">
            <MainContentControls />
          </div>
        </div>

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="dots" className="border-none">
            <AccordionTrigger className="hover:no-underline py-3 px-4">
              <span className="font-medium">Dots Options</span>
            </AccordionTrigger>
            <AccordionContent className="bg-white p-4 border-y border-slate-200">
              <DotsControls />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cornersSquare" className="border-none">
            <AccordionTrigger className="hover:no-underline py-3 px-4">
              <span className="font-medium">Corners Square Options</span>
            </AccordionTrigger>
            <AccordionContent className="bg-white p-4 border-y border-slate-200">
              <CornersSquareControls />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cornersDot" className="border-none">
            <AccordionTrigger className="hover:no-underline py-3 px-4">
              <span className="font-medium">Corners Dot Options</span>
            </AccordionTrigger>
            <AccordionContent className="bg-white p-4 border-y border-slate-200">
              <CornersDotControls />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="background" className="border-none">
            <AccordionTrigger className="hover:no-underline py-3 px-4">
              <span className="font-medium">Background Options</span>
            </AccordionTrigger>
            <AccordionContent className="bg-white p-4 border-y border-slate-200">
              <BackgroundControls />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="image" className="border-none">
            <AccordionTrigger className="hover:no-underline py-3 px-4">
              <span className="font-medium">Image Options</span>
            </AccordionTrigger>
            <AccordionContent className="bg-white p-4 border-y border-slate-200">
              <LogoControls />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="qr" className="border-none">
            <AccordionTrigger className="hover:no-underline py-3 px-4">
              <span className="font-medium">Qr Options</span>
            </AccordionTrigger>
            <AccordionContent className="bg-white p-4 border-y border-slate-200">
              <QrOptionsControls />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>

      <div className="p-4 bg-slate-100 border-t border-slate-300">
        <Button 
          onClick={handleExportJSON}
          className="w-full bg-slate-800 hover:bg-black text-white rounded-none gap-2 h-10 text-xs font-bold uppercase tracking-widest"
        >
          Export Options as JSON
        </Button>
      </div>
    </aside>
  );
};


