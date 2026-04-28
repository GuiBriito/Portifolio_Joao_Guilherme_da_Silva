import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from '../../../features/qr-generator/components/Sidebar';
import { useQRStore } from '../../../features/qr-generator/store/useQRStore';
import { motion } from 'motion/react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { options } = useQRStore();
  const dotColor = options.dotsOptions?.color || '#A5F3FC';

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0C11] text-[#F8FAFC] font-sans selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row relative">
        {/* Background Ambient Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 blur-[120px] pointer-events-none rounded-full transition-all duration-1000"
          style={{ background: dotColor }}
        />

        <div className="flex-1 flex flex-col lg:flex-row gap-8 p-6 lg:p-12 max-w-[1600px] mx-auto w-full relative z-10">
          {/* Sidebar Area */}
          <div className="w-full lg:w-[420px] shrink-0">
            <Sidebar />
          </div>

          {/* Main Preview Area */}
          <main className="flex-1 flex flex-col items-center justify-center min-h-[600px]">
            <motion.div 
              layout
              className="relative group"
            >
              {/* QR Code Hero Card */}
              <div className="relative z-10 bg-white rounded-[3rem] p-12 shadow-[0_0_100px_rgba(255,255,255,0.05)] transition-all duration-500 group-hover:shadow-[0_0_120px_rgba(165,243,252,0.15)]">
                {children}
              </div>

              {/* Decorative Glow behind the card */}
              <div 
                className="absolute -inset-4 opacity-20 blur-3xl rounded-[4rem] transition-all duration-500 group-hover:opacity-40"
                style={{ background: dotColor }}
              />
            </motion.div>

            {/* Info Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center space-y-4"
            >
              <h1 className="text-5xl font-black tracking-tighter text-white">
                QR <span className="text-primary italic">COLD</span>
              </h1>
              <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase opacity-60">
                Precision Design • Minimalist Engineering
              </p>
            </motion.div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-12 px-12 text-muted-foreground border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            QR COLD STUDIO
          </div>
          <div className="text-xs opacity-50 font-medium">
            &copy; 2026 • DESIGNED FOR THE FUTURE
          </div>
        </div>
      </footer>
    </div>
  );
};
