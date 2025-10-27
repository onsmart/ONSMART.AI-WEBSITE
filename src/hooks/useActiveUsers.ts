import { useEffect, useCallback } from 'react';
import { trackActiveUser as trackActive, trackUserActivity as trackActivity, trackSession } from '@/utils/analyticsConfig';

export const useActiveUsers = () => {
  const trackActiveUser = useCallback(() => {
    trackActive();
    trackSession();
  }, []);

  const trackUserActivity = useCallback((activityType: string) => {
    trackActivity(activityType);
  }, []);

  useEffect(() => {
    console.log('Iniciando rastreamento de usuários ativos...');
    
    // Rastrear quando o usuário se torna ativo
    let isActive = false;
    let activityTimeout: NodeJS.Timeout;
    let sessionTracked = false;

    const markAsActive = () => {
      if (!isActive) {
        isActive = true;
        trackActiveUser();
        
        // Rastrear sessão apenas uma vez
        if (!sessionTracked) {
          trackSession();
          sessionTracked = true;
        }
      }
      
      // Reset timeout
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        isActive = false;
        console.log('Usuário marcado como inativo');
      }, 30000); // 30 segundos de inatividade
    };

    // Eventos que indicam atividade do usuário
    const activityEvents = [
      'mousedown',
      'mousemove', 
      'keypress',
      'scroll',
      'touchstart',
      'click',
      'focus'
    ];

    activityEvents.forEach(event => {
      document.addEventListener(event, markAsActive, { passive: true });
    });

    // Rastrear tempo na página com milestones
    const startTime = Date.now();
    const timeIntervals = [10000, 30000, 60000, 120000, 300000]; // 10s, 30s, 1min, 2min, 5min
    const trackedIntervals = new Set();

    timeIntervals.forEach(interval => {
      setTimeout(() => {
        if (isActive && !trackedIntervals.has(interval)) {
          trackedIntervals.add(interval);
          trackUserActivity(`time_on_page_${interval / 1000}s`);
          console.log(`Usuário ativo por ${interval / 1000} segundos`);
        }
      }, interval);
    });

    // Rastrear scroll depth com milestones
    let maxScroll = 0;
    const scrollMilestones = [25, 50, 75, 90];
    const trackedScrollMilestones = new Set();

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        
        // Rastrear milestones de scroll
        scrollMilestones.forEach(milestone => {
          if (scrollPercentage >= milestone && !trackedScrollMilestones.has(milestone)) {
            trackedScrollMilestones.add(milestone);
            trackUserActivity(`scroll_${milestone}_percent`);
            console.log(`Scroll atingiu ${milestone}%`);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Rastrear interações com elementos específicos
    const trackElementInteraction = (element: Element, interactionType: string) => {
      if (isActive) {
        trackUserActivity(`${interactionType}_${element.tagName.toLowerCase()}`);
      }
    };

    // Observer para elementos que entram na viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && isActive) {
          const elementType = entry.target.tagName.toLowerCase();
          trackUserActivity(`element_viewed_${elementType}`);
        }
      });
    }, { threshold: 0.5 });

    // Observar elementos importantes
    document.querySelectorAll('button, a, form, [data-cta]').forEach(el => {
      observer.observe(el);
    });

    // Cleanup
    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, markAsActive);
      });
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearTimeout(activityTimeout);
      console.log('Rastreamento de usuários ativos finalizado');
    };
  }, [trackActiveUser, trackUserActivity]);

  return {
    trackActiveUser,
    trackUserActivity
  };
}; 