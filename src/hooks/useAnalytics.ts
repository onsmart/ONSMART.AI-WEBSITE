
import { useCallback } from 'react';
import { 
  trackEvent, 
  trackPageView, 
  trackCTAClick, 
  trackFormSubmit,
  trackActiveUser,
  trackPerformance,
  trackJarvisEvent,
  trackJarvisUsage,
  trackJarvisPerformance,
  trackUserEngagement,
  trackSession,
  trackUserActivity
} from '../utils/analytics';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const useAnalytics = () => {
  const trackCustomEvent = useCallback(({ action, category, label, value }: AnalyticsEvent) => {
    trackEvent(category, action, label, value);
  }, []);

  const trackPage = useCallback((page: string) => {
    trackPageView(page);
  }, []);

  const trackButtonClick = useCallback((buttonText: string, context?: string) => {
    trackCTAClick(buttonText, context);
  }, []);

  const trackForm = useCallback((formType: string, success: boolean = true) => {
    trackFormSubmit(formType, success);
  }, []);

  const trackUserActivityEvent = useCallback((activityType: string, metadata?: Record<string, any>) => {
    trackUserActivity(activityType, metadata);
  }, []);

  const trackPerformanceMetric = useCallback((metric: string, value: number) => {
    trackPerformance(metric, value);
  }, []);

  const trackJarvisInteraction = useCallback((eventType: string, details: { command: string; responseTime: number }) => {
    trackJarvisEvent(eventType, details);
  }, []);

  const trackJarvisSession = useCallback((sessionDuration: number) => {
    trackJarvisUsage(sessionDuration);
  }, []);

  const trackJarvisResponseTime = useCallback((responseTime: number) => {
    trackJarvisPerformance(responseTime);
  }, []);

  const trackEngagement = useCallback((engagementType: string, duration?: number) => {
    trackUserEngagement(engagementType, duration);
  }, []);

  const trackUserSession = useCallback((sessionData?: Record<string, any>) => {
    trackSession(sessionData);
  }, []);

  const trackActiveUserEvent = useCallback(() => {
    trackActiveUser();
  }, []);

  return {
    // Métodos básicos
    trackEvent: trackCustomEvent,
    trackPage,
    trackButtonClick,
    trackForm,
    
    // Métodos específicos para usuários ativos
    trackUserActivity: trackUserActivityEvent,
    trackActiveUser: trackActiveUserEvent,
    trackEngagement,
    trackUserSession,
    
    // Métodos de performance
    trackPerformance: trackPerformanceMetric,
    
    // Métodos específicos para Jarvis AI Assistant
    trackJarvisInteraction,
    trackJarvisSession,
    trackJarvisResponseTime,
  };
};
