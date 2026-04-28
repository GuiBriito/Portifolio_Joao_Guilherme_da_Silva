import { create } from 'zustand';
import { Options } from 'qr-code-styling';

export type QRCodeOptions = Options;

interface QRStore {
  options: QRCodeOptions;
  logoFile: File | null;
  setOptions: (newOptions: Partial<QRCodeOptions>) => void;
  setLogoFile: (file: File | null) => void;
  resetOptions: () => void;
}

const defaultOptions: QRCodeOptions = {
  width: 300,
  height: 300,
  data: 'https://qr-code-styling.com',
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
    type: 'square',
    color: '#000000',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    type: 'square',
    color: '#000000',
  },
  cornersDotOptions: {
    type: 'square',
    color: '#000000',
  },
};

export const useQRStore = create<QRStore>((set) => ({
  options: defaultOptions,
  logoFile: null,
  setOptions: (newOptions) =>
    set((state) => ({
      options: { ...state.options, ...newOptions },
    })),
  setLogoFile: (file) => set({ logoFile: file }),
  resetOptions: () => set({ options: defaultOptions, logoFile: null }),
}));
