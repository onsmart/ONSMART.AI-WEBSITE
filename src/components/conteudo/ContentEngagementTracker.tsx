
import React, { useEffect } from 'react';
import { useLeadScoring } from '@/hooks/useLeadScoring';

interface ContentEngagementTrackerProps {
  children: React.ReactNode;
  selectedCategory: string;
}

const ContentEngagementTracker: React.FC<ContentEngagementTrackerProps> = ({ 
  children, 
  selectedCategory 
}) => {
  const { scoreAction } = useLeadScoring();

  useEffect(() => {
    // Track category selection
      scoreAction('content_category_selected', { 
        category: selectedCategory 
      });
  }, [selectedCategory, scoreAction]);

  useEffect(() => {
    // Track content page load
    scoreAction('content_page_viewed');

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercentage === 50) {
        scoreAction('content_page_50_scroll');
      } else if (scrollPercentage === 75) {
        scoreAction('content_page_75_scroll');
      }
    };

    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 200);
    };

    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
    };
  }, [scoreAction]);

  return <>{children}</>;
};

export default ContentEngagementTracker;
