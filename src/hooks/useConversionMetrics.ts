
import { useCallback } from 'react';
import { useAnalytics } from './useAnalytics';

interface ConversionEvent {
  component: string;
  action: string;
  funnel_step?: string;
  value?: number;
  metadata?: Record<string, any>;
}

interface FunnelStep {
  step: string;
  component: string;
  timestamp: number;
}

export const useConversionMetrics = () => {
  const { trackEvent } = useAnalytics();

  const trackConversion = useCallback(({ component, action, funnel_step, value, metadata }: ConversionEvent) => {
    // Track no Google Analytics
    trackEvent({
      action: 'conversion',
      category: 'engagement',
      label: `${component}_${action}`,
      value
    });

    // Armazenar dados de conversão localmente para análise
    const conversionData = {
      component,
      action,
      funnel_step,
      value,
      metadata,
      timestamp: Date.now(),
      session_id: sessionStorage.getItem('session_id') || 'unknown',
      user_agent: navigator.userAgent,
      url: window.location.pathname
    };

    const conversions = JSON.parse(localStorage.getItem('conversions') || '[]');
    conversions.push(conversionData);
    
    // Manter apenas os últimos 200 registros
    if (conversions.length > 200) {
      conversions.splice(0, conversions.length - 200);
    }
    
    localStorage.setItem('conversions', JSON.stringify(conversions));
  }, [trackEvent]);

  const trackFunnelStep = useCallback((step: string, component: string) => {
    const funnelData: FunnelStep = {
      step,
      component,
      timestamp: Date.now()
    };

    const funnelSteps = JSON.parse(sessionStorage.getItem('funnel_steps') || '[]');
    funnelSteps.push(funnelData);
    sessionStorage.setItem('funnel_steps', JSON.stringify(funnelSteps));

    trackConversion({
      component,
      action: 'funnel_step',
      funnel_step: step
    });
  }, [trackConversion]);

  const getConversionReport = useCallback(() => {
    return JSON.parse(localStorage.getItem('conversions') || '[]');
  }, []);

  const getFunnelReport = useCallback(() => {
    return JSON.parse(sessionStorage.getItem('funnel_steps') || '[]');
  }, []);

  return {
    trackConversion,
    trackFunnelStep,
    getConversionReport,
    getFunnelReport
  };
};
