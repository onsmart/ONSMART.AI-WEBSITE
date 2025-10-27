
import React, { useEffect } from 'react';
import { useConversionMetrics } from '@/hooks/useConversionMetrics';

interface MicroConversionTrackerProps {
  children: React.ReactNode;
}

const MicroConversionTracker: React.FC<MicroConversionTrackerProps> = ({ children }) => {
  const { trackConversion } = useConversionMetrics();

  useEffect(() => {
    // Track page load
    trackConversion({
      component: 'homepage',
      action: 'page_load',
      funnel_step: 'awareness'
    });

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track scroll milestones
      if (scrollPercentage === 25) {
        trackConversion({
          component: 'homepage',
          action: 'scroll_25_percent',
          funnel_step: 'engagement'
        });
      } else if (scrollPercentage === 50) {
        trackConversion({
          component: 'homepage',
          action: 'scroll_50_percent',
          funnel_step: 'interest'
        });
      } else if (scrollPercentage === 75) {
        trackConversion({
          component: 'homepage',
          action: 'scroll_75_percent',
          funnel_step: 'consideration'
        });
      }
    };

    // Track time on page
    const startTime = Date.now();
    const timeThresholds = [30000, 60000, 120000]; // 30s, 1min, 2min
    
    timeThresholds.forEach(threshold => {
      setTimeout(() => {
        trackConversion({
          component: 'homepage',
          action: `time_on_page_${threshold / 1000}s`,
          funnel_step: 'engagement',
          value: threshold / 1000
        });
      }, threshold);
    });

    // Track hover on CTAs
    const trackHoverIntent = () => {
      trackConversion({
        component: 'homepage',
        action: 'cta_hover_intent',
        funnel_step: 'conversion_intent'
      });
    };

    // Add hover listeners to CTAs
    const ctaButtons = document.querySelectorAll('[data-cta="primary"], [aria-label*="Diagnóstico"]');
    ctaButtons.forEach(button => {
      button.addEventListener('mouseenter', trackHoverIntent, { once: true });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctaButtons.forEach(button => {
        button.removeEventListener('mouseenter', trackHoverIntent);
      });
    };
  }, [trackConversion]);

  return <>{children}</>;
};

export default MicroConversionTracker;
