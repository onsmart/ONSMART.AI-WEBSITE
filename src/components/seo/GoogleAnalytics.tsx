import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics if not already loaded
    const initializeGA = () => {
      if (typeof window === 'undefined') return;

      // Check if GA4 is already loaded
      if (!(window as any).gtag) {
        // Load Google Analytics script if not already loaded
        const existingScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
        if (!existingScript) {
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://www.googletagmanager.com/gtag/js?id=G-384496JX74';
          document.head.appendChild(script);

          // Initialize gtag
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).gtag = function() {
            (window as any).dataLayer.push(arguments);
          };
          (window as any).gtag('js', new Date());
          (window as any).gtag('config', 'G-384496JX74', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            anonymize_ip: true,
            engagement_time_msec: 100,
            session_timeout: 1800,
            engagement_timeout: 30,
            session_engaged: 1,
            // Enhanced tracking parameters
            custom_map: {
              'engagement_time_msec': 'engagement_time_msec',
              'session_engaged': 'session_engaged',
              'user_activity': 'user_activity',
              'scroll_depth': 'scroll_depth',
              'time_on_page': 'time_on_page',
              'active_user': 'active_user',
              'user_engagement_level': 'user_engagement_level'
            }
          });
        }
      }

      // Track page view with enhanced data
      if ((window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: location.pathname,
          page_referrer: document.referrer,
          send_page_view: true,
          // Enhanced tracking
          user_engagement_level: 'high',
          active_user: true,
          session_engaged: 1,
          timestamp: Date.now()
        });

        // Track additional engagement metrics
        (window as any).gtag('event', 'user_engagement', {
          engagement_time_msec: 100,
          session_engaged: 1,
          user_activity: 'active',
          active_user: true,
          user_engagement_level: 'high',
          page: location.pathname,
          timestamp: Date.now()
        });
      }
    };

    // Initialize GA with a small delay to ensure DOM is ready
    const timer = setTimeout(initializeGA, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Track user interactions for better engagement data
  useEffect(() => {
    if (typeof window === 'undefined' || !(window as any).gtag) return;

    const trackUserInteraction = (event: string, data?: Record<string, any>) => {
      (window as any).gtag('event', 'user_interaction', {
        event_type: event,
        page: location.pathname,
        active_user: true,
        user_engagement_level: 'high',
        timestamp: Date.now(),
        ...data
      });
    };

    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScroll = () => {
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        if (maxScrollDepth % 25 === 0) { // Track every 25% scroll
          trackUserInteraction('scroll_depth', { scroll_depth: maxScrollDepth });
        }
      }
    };

    // Track time on page
    let timeOnPage = 0;
    const trackTimeOnPage = () => {
      timeOnPage += 10;
      if (timeOnPage % 30 === 0) { // Track every 30 seconds
        trackUserInteraction('time_on_page', { time_on_page: timeOnPage });
      }
    };

    // Add event listeners
    window.addEventListener('scroll', trackScroll, { passive: true });
    const timeInterval = setInterval(trackTimeOnPage, 10000); // Check every 10 seconds

    // Track clicks
    const trackClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      trackUserInteraction('click', {
        element_type: target.tagName.toLowerCase(),
        element_text: target.textContent?.slice(0, 50),
        element_class: target.className
      });
    };

    document.addEventListener('click', trackClick);

    return () => {
      window.removeEventListener('scroll', trackScroll);
      document.removeEventListener('click', trackClick);
      clearInterval(timeInterval);
    };
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics; 