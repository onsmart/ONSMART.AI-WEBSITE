
import { useEffect, useCallback } from 'react';

interface UserSession {
  session_id: string;
  start_time: number;
  page_views: number;
  interactions: number;
  errors: number;
  performance_entries: any[];
}

interface UserInteraction {
  type: string;
  element: string;
  timestamp: number;
  page: string;
}

export const useRealUserMonitoring = () => {
  const generateSessionId = useCallback(() => {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('session_id', sessionId);
      sessionStorage.setItem('session_start', Date.now().toString());
    }
    return sessionId;
  }, []);

  const trackUserInteraction = useCallback((type: string, element: string) => {
    const interaction: UserInteraction = {
      type,
      element,
      timestamp: Date.now(),
      page: window.location.pathname
    };

    const interactions = JSON.parse(sessionStorage.getItem('user_interactions') || '[]');
    interactions.push(interaction);
    
    // Manter apenas as últimas 100 interações
    if (interactions.length > 100) {
      interactions.splice(0, interactions.length - 100);
    }
    
    sessionStorage.setItem('user_interactions', JSON.stringify(interactions));

    // Track no Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'user_interaction', {
        interaction_type: type,
        element_type: element,
        page: window.location.pathname
      });
    }
  }, []);

  const collectPerformanceMetrics = useCallback(() => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const metrics = {
        dns_lookup: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp_connect: navigation.connectEnd - navigation.connectStart,
        request_response: navigation.responseEnd - navigation.requestStart,
        dom_processing: navigation.domContentLoadedEventEnd - navigation.responseEnd,
        page_load: navigation.loadEventEnd - navigation.loadEventStart,
        first_paint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        first_contentful_paint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        timestamp: Date.now(),
        page: window.location.pathname
      };

      const performanceData = JSON.parse(localStorage.getItem('performance_metrics') || '[]');
      performanceData.push(metrics);
      
      // Manter apenas os últimos 50 registros
      if (performanceData.length > 50) {
        performanceData.splice(0, performanceData.length - 50);
      }
      
      localStorage.setItem('performance_metrics', JSON.stringify(performanceData));

      return metrics;
    }
    return null;
  }, []);

  const getSessionData = useCallback((): UserSession => {
    const sessionId = generateSessionId();
    const startTime = parseInt(sessionStorage.getItem('session_start') || '0');
    const interactions = JSON.parse(sessionStorage.getItem('user_interactions') || '[]');
    const performanceEntries = JSON.parse(localStorage.getItem('performance_metrics') || '[]');
    const errors = JSON.parse(localStorage.getItem('error_reports') || '[]');

    return {
      session_id: sessionId,
      start_time: startTime,
      page_views: interactions.filter((i: UserInteraction) => i.type === 'page_view').length,
      interactions: interactions.length,
      errors: errors.length,
      performance_entries: performanceEntries
    };
  }, [generateSessionId]);

  const trackPageView = useCallback(() => {
    trackUserInteraction('page_view', 'page');
    collectPerformanceMetrics();
  }, [trackUserInteraction, collectPerformanceMetrics]);

  useEffect(() => {
    generateSessionId();
    trackPageView();

    // Track cliques
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const elementType = target.tagName.toLowerCase();
      const elementId = target.id || target.className || elementType;
      trackUserInteraction('click', elementId);
    };

    // Track mudanças de foco
    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      const elementType = target.tagName.toLowerCase();
      trackUserInteraction('focus', elementType);
    };

    // Track erros JS
    const handleError = (event: ErrorEvent) => {
      trackUserInteraction('error', `${event.filename}:${event.lineno}`);
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('focus', handleFocus, true);
    window.addEventListener('error', handleError);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('focus', handleFocus, true);
      window.removeEventListener('error', handleError);
    };
  }, [generateSessionId, trackPageView, trackUserInteraction]);

  return {
    trackUserInteraction,
    trackPageView,
    collectPerformanceMetrics,
    getSessionData
  };
};
