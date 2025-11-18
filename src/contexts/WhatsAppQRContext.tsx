import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WhatsAppQRContextType {
  isQRCodeOpen: boolean;
  setIsQRCodeOpen: (open: boolean) => void;
}

const WhatsAppQRContext = createContext<WhatsAppQRContextType | undefined>(undefined);

export const WhatsAppQRProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);

  return (
    <WhatsAppQRContext.Provider value={{ isQRCodeOpen, setIsQRCodeOpen }}>
      {children}
    </WhatsAppQRContext.Provider>
  );
};

export const useWhatsAppQR = () => {
  const context = useContext(WhatsAppQRContext);
  if (context === undefined) {
    throw new Error('useWhatsAppQR must be used within a WhatsAppQRProvider');
  }
  return context;
};


