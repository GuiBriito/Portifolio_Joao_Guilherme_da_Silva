import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useQRStore } from '../store/useQRStore';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { options } = useQRStore();
  const dotColor = options.dotsOptions?.color || '#000000';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section - Full width below Navbar */}
      <div 
        className="w-full py-16 px-12 border-b border-slate-700 flex flex-col text-white transition-all duration-500"
        style={{ 
          background: `linear-gradient(90deg, rgb(0, 0, 0) 0%, ${dotColor} 50%, rgb(255, 255, 255) 100%)` 
        }}
      >
        <h2 className="text-6xl font-bold leading-tight mb-2 tracking-tighter">
          QR Code Styling
        </h2>
        <p className="text-2xl font-medium opacity-90 leading-relaxed">
          An open source JS library <br />
          For generating styled QR codes
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start max-w-7xl w-full">
          {/* Sidebar - Centered vertically with QR code */}
          <div className="w-full lg:w-[450px] shrink-0">
            <Sidebar />
          </div>

          {/* Main Content / Viewport - QR Code aligned to the right */}
          <main className="flex-1 w-full flex items-center justify-center lg:justify-end">
            <div className="bg-white border border-slate-200 shadow-sm p-12 min-h-[600px] flex items-center justify-center w-full lg:w-auto">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#333333] py-8 px-12 text-white border-t border-slate-700">
        <div className="flex items-center justify-center text-sm opacity-80">
          &copy; 2025 Copyright reserved by João Guilherme
        </div>
      </footer>
    </div>
  );
};
