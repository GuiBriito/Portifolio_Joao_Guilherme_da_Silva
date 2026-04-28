import { create } from 'zustand';
import { Options } from 'qr-code-styling';
import { User } from 'firebase/auth';

export type QRCodeOptions = Options;

interface QRStore {
  options: QRCodeOptions;
  logoFile: File | null;
  isUploading: boolean;
  uploadProgress: number;
  fileUrl: string | null;
  user: User | null;
  setOptions: (newOptions: Partial<QRCodeOptions>) => void;
  setLogoFile: (file: File | null) => void;
  setUploading: (isUploading: boolean) => void;
  setUploadProgress: (progress: number) => void;
  setFileUrl: (url: string | null) => void;
  setUser: (user: User | null) => void;
  resetOptions: () => void;
}

const defaultOptions: QRCodeOptions = {
  width: 300,
  height: 300,
  data: 'https://qrcold.app',
  margin: 10,
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'Q',
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0,
    crossOrigin: 'anonymous',
  },
  dotsOptions: {
    type: 'extra-rounded',
    color: '#000000',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
    color: '#000000',
  },
  cornersDotOptions: {
    type: 'dot',
    color: '#000000',
  },
};

export const useQRStore = create<QRStore>((set) => ({
  options: defaultOptions,
  logoFile: null,
  isUploading: false,
  uploadProgress: 0,
  fileUrl: null,
  user: null,
  setOptions: (newOptions) =>
    set((state) => {
      const mergedOptions = { ...state.options };
      
      // Deep merge for known nested objects
      Object.keys(newOptions).forEach((key) => {
        const k = key as keyof QRCodeOptions;
        const newVal = newOptions[k];
        
        if (newVal && typeof newVal === 'object' && !Array.isArray(newVal) && state.options[k] && typeof state.options[k] === 'object') {
          // @ts-ignore - nested objects merge
          mergedOptions[k] = { ...state.options[k], ...newVal };
        } else {
          // @ts-ignore - direct value assignment
          mergedOptions[k] = newVal;
        }
      });
      
      return { options: mergedOptions };
    }),
  setLogoFile: (file) => set({ logoFile: file }),
  setUploading: (isUploading) => set({ isUploading }),
  setUploadProgress: (uploadProgress) => set({ uploadProgress }),
  setFileUrl: (fileUrl) => set({ fileUrl }),
  setUser: (user) => set({ user }),
  resetOptions: () => set({ 
    options: defaultOptions, 
    logoFile: null, 
    isUploading: false, 
    uploadProgress: 0, 
    fileUrl: null 
  }),
}));
