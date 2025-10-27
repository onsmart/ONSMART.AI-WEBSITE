import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useEnhancedAnalytics = () => {
  const location = useLocation();

  // Track custom events
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        page: location.pathname,
        timestamp: Date.now(),
        active_user: true,
        user_engagement_level: 'high',
        ...parameters
      });
    }
  }, [location.pathname]);

  // Track form submissions
  const trackFormSubmission = useCallback((formName: string, success: boolean = true) => {
    trackEvent('form_submit', {
      form_name: formName,
      success: success,
      page: location.pathname
    });
  }, [trackEvent, location.pathname]);

  // Track button clicks
  const trackButtonClick = useCallback((buttonName: string, buttonLocation?: string) => {
    trackEvent('button_click', {
      button_name: buttonName,
      button_location: buttonLocation || location.pathname,
      page: location.pathname
    });
  }, [trackEvent, location.pathname]);

  // Track scroll depth
  const trackScrollDepth = useCallback((depth: number) => {
    trackEvent('scroll_depth', {
      scroll_depth: depth,
      page: location.pathname
    });
  }, [trackEvent, location.pathname]);

  // Track time on page
  const trackTimeOnPage = useCallback((timeInSeconds: number) => {
    trackEvent('time_on_page', {
      time_on_page: timeInSeconds,
      page: location.pathname
    });
  }, [trackEvent, location.pathname]);

  // Track user engagement
  const trackUserEngagement = useCallback((engagementType: string, data?: Record<string, any>) => {
    trackEvent('user_engagement', {
      engagement_type: engagementType,
      page: location.pathname,
      active_user: true,
      user_engagement_level: 'high',
      ...data
    });
  }, [trackEvent, location.pathname]);

  // Track conversion events
  const trackConversion = useCallback((conversionType: string, value?: number) => {
    trackEvent('conversion', {
      conversion_type: conversionType,
      value: value,
      page: location.pathname,
      currency: 'BRL'
    });
  }, [trackEvent, location.pathname]);

  // Track page views with enhanced data
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // Enhanced page view tracking
      (window as any).gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
        page_referrer: document.referrer,
        send_page_view: true,
        user_engagement_level: 'high',
        active_user: true,
        session_engaged: 1,
        timestamp: Date.now()
      });

      // Track session start
      const sessionId = sessionStorage.getItem('session_id') || `session_${Date.now()}`;
      sessionStorage.setItem('session_id', sessionId);
      sessionStorage.setItem('session_start', Date.now().toString());

      trackEvent('session_start', {
        session_id: sessionId,
        user_engaged: true,
        active_user: true
      });
    }
  }, [location.pathname, trackEvent]);

  // Track user activity
  useEffect(() => {
    if (typeof window === 'undefined' || !(window as any).gtag) return;

    let isActive = false;
    let lastActivity = Date.now();

    const markAsActive = () => {
      if (!isActive) {
        isActive = true;
        trackUserEngagement('user_active');
      }
      lastActivity = Date.now();
    };

    // Events that indicate user activity
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click', 'focus'];
    
    activityEvents.forEach(event => {
      document.addEventListener(event, markAsActive, { passive: true });
    });

    // Check activity every 10 seconds
    const interval = setInterval(() => {
      if (isActive && (Date.now() - lastActivity) < 30000) {
        trackUserEngagement('user_active_session');
      } else if ((Date.now() - lastActivity) > 30000) {
        isActive = false;
      }
    }, 10000);

    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, markAsActive);
      });
      clearInterval(interval);
    };
  }, [trackUserEngagement]);

  return {
    trackEvent,
    trackFormSubmission,
    trackButtonClick,
    trackScrollDepth,
    trackTimeOnPage,
    trackUserEngagement,
    trackConversion
  };
}; 