
import React, { useEffect, useState } from 'react';
import { useExitIntent } from '@/hooks/useExitIntent';
import ExitIntentPopup from '@/components/shared/ExitIntentPopup';
import { useAnalytics } from '@/hooks/useAnalytics';

const ExitIntentHandler: React.FC = () => {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const { trackEvent } = useAnalytics();

  const { isExitIntent, hasShown, resetExitIntent } = useExitIntent({
    threshold: 10,
    delay: 3000, // Aguardar 3 segundos antes de ativar
    onExitIntent: () => {
      if (!hasShown) {
        setShowExitPopup(true);
        trackEvent({
          action: 'exit_intent_triggered',
          category: 'engagement',
          label: 'diagnostico_page'
        });
      }
    }
  });

  const handleClosePopup = () => {
    setShowExitPopup(false);
    trackEvent({
      action: 'exit_intent_popup_closed',
      category: 'engagement',
      label: 'diagnostico_page'
    });
  };

  // Reset exit intent when user scrolls down (engaged)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500 && hasShown) {
        resetExitIntent();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShown, resetExitIntent]);

  return (
    <ExitIntentPopup 
      isOpen={showExitPopup} 
      onClose={handleClosePopup} 
    />
  );
};

export default ExitIntentHandler;
