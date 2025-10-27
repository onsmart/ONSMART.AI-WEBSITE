
import React, { createContext, useContext, useCallback } from 'react';

interface AnnouncementContextType {
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | null>(null);

export const useAnnouncement = () => {
  const context = useContext(AnnouncementContext);
  if (!context) {
    throw new Error('useAnnouncement must be used within AnnouncementProvider');
  }
  return context;
};

export const AnnouncementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    // Criar elemento temporário para anúncio
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remover após 1 segundo para manter o DOM limpo
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }, []);

  return (
    <AnnouncementContext.Provider value={{ announce }}>
      {children}
      {/* Região permanente para anúncios */}
      <div
        id="aria-live-announcer"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
    </AnnouncementContext.Provider>
  );
};
