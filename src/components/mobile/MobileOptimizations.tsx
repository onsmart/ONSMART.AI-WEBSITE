
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileButton, MobileInput } from '@/components/ui/mobile-optimized';
import { ChevronUp, Phone, MessageCircle } from 'lucide-react';
import { scrollToForm, scrollToTop } from '@/utils/scrollUtils';

// Componente para sticky CTA mobile
export const MobileStickyFooter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 500;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const openWhatsApp = () => {
    window.open('https://wa.me/5511996669247?text=Olá! Gostaria de saber mais sobre Agentes de IA', '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50 shadow-lg">
      <div className="flex gap-2">
        <MobileButton 
          onClick={scrollToForm}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          touchOptimized
        >
          Diagnóstico Gratuito
        </MobileButton>
        <MobileButton 
          onClick={openWhatsApp}
          variant="outline"
          className="px-4 border-green-500 text-green-600 hover:bg-green-50"
          touchOptimized
        >
          <MessageCircle className="h-5 w-5" />
        </MobileButton>
      </div>
    </div>
  );
};

// Componente para formulários mobile otimizados
export const MobileFormOptimizations: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Prevenir zoom no iOS quando focando inputs
    const viewport = document.querySelector('meta[name=viewport]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Cleanup
    return () => {
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
    };
  }, []);

  return (
    <div className="mobile-form-container">
      {children}
    </div>
  );
};

// Componente para scroll suave para cima
export const MobileScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  if (!isVisible) return null;

  return (
    <MobileButton
      onClick={scrollToTop}
      className="md:hidden fixed bottom-20 right-4 z-40 bg-gray-800 hover:bg-gray-900 text-white rounded-full p-3 shadow-lg"
      touchOptimized
    >
      <ChevronUp className="h-5 w-5" />
    </MobileButton>
  );
};

// Hook para detectar mobile e ajustar comportamentos
export const useMobileOptimizations = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isIOSSafari, setIsIOSSafari] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      
      // Detectar iOS Safari
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      setIsIOSSafari(isIOS && isSafari);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Otimizações específicas para mobile
  useEffect(() => {
    if (isMobile) {
      // Adicionar classe CSS para mobile
      document.body.classList.add('mobile-optimized');
      
      // Otimizar touch events
      document.addEventListener('touchstart', () => {}, { passive: true });
    } else {
      document.body.classList.remove('mobile-optimized');
    }

    return () => {
      document.body.classList.remove('mobile-optimized');
    };
  }, [isMobile]);

  return {
    isMobile,
    isIOSSafari,
    optimizeForMobile: (element: HTMLElement) => {
      if (isMobile) {
        element.style.touchAction = 'manipulation';
        element.style.userSelect = 'none';
      }
    }
  };
};

// Componente para otimizar imagens mobile
export const MobileOptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = '' }) => {
  return (
    <picture>
      <source 
        media="(max-width: 767px)" 
        srcSet={`${src}?w=400&q=75`} 
      />
      <source 
        media="(min-width: 768px)" 
        srcSet={`${src}?w=800&q=85`} 
      />
      <img 
        src={`${src}?w=800&q=85`} 
        alt={alt} 
        className={`${className} max-w-full h-auto`}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};
