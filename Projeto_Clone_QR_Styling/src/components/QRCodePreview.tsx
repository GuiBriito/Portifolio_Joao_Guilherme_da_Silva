import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useQRStore } from '../store/useQRStore';

export const QRCodePreview: React.FC = () => {
  const { options } = useQRStore();
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the QR Code Styling instance
    qrCodeRef.current = new QRCodeStyling(options);
    
    if (containerRef.current) {
      qrCodeRef.current.append(containerRef.current);
    }

    return () => {
      // Cleanup if necessary
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    // Update options when store changes
    if (qrCodeRef.current) {
      qrCodeRef.current.update(options);
    }
  }, [options]);

  return (
    <div className="relative group inline-block">
      <div 
        ref={containerRef} 
        className="bg-white rounded-none transition-transform duration-300 group-hover:scale-[1.01] flex items-center justify-center"
      />
      <div className="absolute inset-0 border border-transparent group-hover:border-blue-100 rounded-none pointer-events-none transition-colors" />
    </div>
  );
};
