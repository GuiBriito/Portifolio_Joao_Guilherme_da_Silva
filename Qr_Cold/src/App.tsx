import { useState, useEffect } from 'react';
import { MainLayout } from './shared/components/layout/MainLayout';
import { QRCodePreview } from './features/qr-generator/components/QRCodePreview';
import { Button } from './shared/components/ui/button';
import { Download, FileDown, Layers, Save, CheckCircle2, FileText, Image as ImageIcon, Box } from 'lucide-react';
import { useQRStore } from './features/qr-generator/store/useQRStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './shared/components/ui/select';
import { Label } from './shared/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './shared/components/ui/dropdown-menu';
import QRCodeStyling from 'qr-code-styling';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from './shared/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { jsPDF } from 'jspdf';

export default function App() {
  const { options, setUser, user } = useQRStore();
  const [format, setFormat] = useState<'png' | 'jpeg' | 'svg'>('png');
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Save user profile to Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          await setDoc(userRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName
          }, { merge: true });
        } catch (error) {
          console.error('Error saving user profile:', error);
        }
      }
    });
    return () => unsubscribe();
  }, [setUser]);

  const handleDownload = (ext: 'png' | 'jpeg' | 'svg') => {
    const qrCode = new QRCodeStyling(options);
    qrCode.download({ name: 'qr-cold', extension: ext });
  };

  const generateBrandKit = async () => {
    const qrCode = new QRCodeStyling(options);
    const blob = await qrCode.getRawData('png') as any;
    if (!blob) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Background
      doc.setFillColor(11, 12, 17);
      doc.rect(0, 0, 210, 297, 'F');

      // Header
      doc.setTextColor(165, 243, 252); // Primary color
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('QR COLD', 20, 30);
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('BRAND IDENTITY KIT', 20, 38);

      // QR Code Section
      doc.setDrawColor(255, 255, 255, 0.1);
      doc.setFillColor(255, 255, 255, 0.05);
      doc.roundedRect(20, 50, 170, 120, 5, 5, 'FD');
      
      doc.addImage(base64data, 'PNG', 55, 60, 100, 100);
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text('PRODUCTION READY QR CODE', 105, 165, { align: 'center' });

      // Specs Section
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('TECHNICAL SPECIFICATIONS', 20, 190);

      // Color Palette
      doc.setFontSize(10);
      doc.text('COLOR PALETTE', 20, 205);
      
      const colors = [
        { label: 'Dots', color: options.dotsOptions?.color || '#000000' },
        { label: 'Background', color: options.backgroundOptions?.color || '#FFFFFF' },
        { label: 'Corners', color: options.cornersSquareOptions?.color || '#000000' }
      ];

      colors.forEach((c, i) => {
        const y = 215 + (i * 12);
        doc.setFillColor(c.color);
        doc.roundedRect(20, y - 5, 10, 10, 2, 2, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text(`${c.label}: ${c.color.toUpperCase()}`, 35, y + 2);
      });

      // Content
      doc.text('DESTINATION URL', 120, 205);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const splitUrl = doc.splitTextToSize(options.data || '', 70);
      doc.text(splitUrl, 120, 215);

      // Footer
      doc.setDrawColor(165, 243, 252, 0.3);
      doc.line(20, 270, 190, 270);
      doc.setFontSize(8);
      doc.text('Generated via QR COLD Studio', 105, 280, { align: 'center' });

      doc.save('QR-Cold-Brand-Kit.pdf');
    };
    reader.readAsDataURL(blob);
  };

  const handleSaveToHistory = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      await addDoc(collection(db, 'qr_history'), {
        userId: user.uid,
        options: options,
        createdAt: new Date().toISOString(),
        serverTime: serverTimestamp()
      });
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 3000);
    } catch (error) {
      console.error('Error saving to history:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center gap-12 w-full max-w-md mx-auto">
        {/* QR Code Container with subtle hover effect */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-8 rounded-[3rem] shadow-2xl relative group"
        >
          <QRCodePreview />
          
          {/* Decorative Corner Accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl group-hover:border-primary/40 transition-colors" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-2xl group-hover:border-primary/40 transition-colors" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/20 rounded-bl-2xl group-hover:border-primary/40 transition-colors" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/20 rounded-br-2xl group-hover:border-primary/40 transition-colors" />
        </motion.div>
        
        {/* Export Controls Area */}
        <div className="w-full space-y-8 bg-[#0B0C11]/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 shadow-xl relative">
          <AnimatePresence>
            {showSavedToast && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-12 left-0 right-0 flex justify-center"
              >
                <div className="bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-2 rounded-full flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Saved to History</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-background rounded-2xl h-16 text-sm font-black uppercase tracking-[0.15em] gap-3 transition-all shadow-[0_20px_40px_-15px_rgba(165,243,252,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(165,243,252,0.4)] active:scale-95"
                >
                  <FileDown className="w-5 h-5" />
                  Generate & Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[320px] bg-[#1A1B23] border-white/10 text-white rounded-2xl p-2 shadow-2xl">
                <DropdownMenuItem 
                  onClick={() => handleDownload('png')}
                  className="rounded-xl h-12 gap-3 focus:bg-primary/20 focus:text-primary cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">Download PNG</span>
                    <span className="text-[8px] uppercase tracking-widest opacity-50">High quality image</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleDownload('svg')}
                  className="rounded-xl h-12 gap-3 focus:bg-primary/20 focus:text-primary cursor-pointer"
                >
                  <Box className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">Download SVG</span>
                    <span className="text-[8px] uppercase tracking-widest opacity-50">Vector for print</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5 my-2" />
                <DropdownMenuItem 
                  onClick={generateBrandKit}
                  className="rounded-xl h-14 gap-3 focus:bg-primary/20 focus:text-primary cursor-pointer bg-primary/5"
                >
                  <FileText className="w-4 h-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary">Generate Brand Kit</span>
                    <span className="text-[8px] uppercase tracking-widest text-primary/60">PDF with technical specs</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user && (
              <Button 
                onClick={handleSaveToHistory}
                disabled={isSaving}
                variant="outline"
                className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-2xl h-14 text-xs font-bold uppercase tracking-[0.15em] gap-3 transition-all active:scale-95 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save to History'}
              </Button>
            )}
          </div>

          <p className="text-[10px] text-center text-primary/60 font-bold uppercase tracking-widest">
            High Resolution • Production Ready
          </p>
        </div>
      </div>
    </MainLayout>
  );
}


