import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useQRStore } from '../store/useQRStore';
import { motion } from 'motion/react';

export const QRCodePreview: React.FC = () => {
  const { options } = useQRStore();
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the QR Code Styling instance once
    qrCodeRef.current = new QRCodeStyling(options);
    
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    // Re-append the QR code whenever the container remounts
    if (containerRef.current && qrCodeRef.current) {
      containerRef.current.innerHTML = '';
      qrCodeRef.current.append(containerRef.current);
      // Ensure it's updated immediately after append
      qrCodeRef.current.update(options);
    }
  }, [
    options.dotsOptions?.type, 
    options.dotsOptions?.color,
    options.dotsOptions?.gradient,
    options.cornersSquareOptions?.type,
    options.cornersSquareOptions?.color,
    options.cornersDotOptions?.type,
    options.cornersDotOptions?.color,
    options.backgroundOptions?.color
  ]);

  useEffect(() => {
    // Update options when store changes
    if (qrCodeRef.current) {
      qrCodeRef.current.update(options);
    }
  }, [options]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex items-center justify-center"
    >
      <motion.div 
        key={
          (options.dotsOptions?.type || '') + 
          (options.dotsOptions?.color || '') + 
          (options.cornersSquareOptions?.type || '') +
          (options.cornersDotOptions?.type || '') +
          (options.backgroundOptions?.color || '')
        }
        initial={{ opacity: 0.8, scale: 0.98, filter: 'blur(4px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        ref={containerRef} 
        className="flex items-center justify-center p-2"
      />
    </motion.div>
  );
};
