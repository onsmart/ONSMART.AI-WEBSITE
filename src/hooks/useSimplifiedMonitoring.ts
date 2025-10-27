
import { useEffect, useCallback } from 'react';

interface MonitoringConfig {
  enableTracking?: boolean;
  sampleRate?: number;
}

export const useSimplifiedMonitoring = (config: MonitoringConfig = {}) => {
  const {
    enableTracking = true,
    sampleRate = 0.05 // Only 5% of sessions to minimize overhead
  } = config;

  const shouldTrack = useCallback(() => {
    return enableTracking && Math.random() < sampleRate;
  }, [enableTracking, sampleRate]);

  // Minimal performance tracking
  useEffect(() => {
    if (!shouldTrack()) return;

    const trackPerformance = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation && navigation.loadEventEnd > 0) {
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          
          if (loadTime < 10000) {
            console.log('Page Load Time:', Math.round(loadTime), 'ms');
          }
        }
      }
    };

    // Delay tracking to avoid interfering with page load
    const timer = setTimeout(trackPerformance, 3000);
    return () => clearTimeout(timer);
  }, [shouldTrack]);

  return {
    trackEvent: useCallback((eventName: string, data?: any) => {
      if (!shouldTrack()) return;
      console.log('Event:', eventName, data);
    }, [shouldTrack])
  };
};
