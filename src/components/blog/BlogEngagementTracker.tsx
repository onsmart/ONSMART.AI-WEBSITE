import React, { useEffect } from 'react';
import { useLeadScoring } from '@/hooks/useLeadScoring';
import { useLocation } from 'react-router-dom';

interface BlogEngagementTrackerProps {
  children: React.ReactNode;
  selectedCategory?: string;
}

const BlogEngagementTracker: React.FC<BlogEngagementTrackerProps> = ({ 
  children, 
  selectedCategory 
}) => {
  const { scoreAction } = useLeadScoring();
  const location = useLocation();

  useEffect(() => {
    // Track blog page visit
    scoreAction('blog_page_viewed', { page: location.pathname });

    // Track time on page
    const startTime = Date.now();
    const timeThresholds = [30000, 120000, 300000]; // 30s, 2min, 5min
    
    const timeouts = timeThresholds.map(threshold => 
      setTimeout(() => {
        scoreAction(`blog_time_spent_${threshold / 1000}s`, {
          page: location.pathname,
          category: selectedCategory
        });
      }, threshold)
    );

    // Track scroll depth for engagement
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        
        if (scrollPercentage >= 75 && maxScroll < 75) {
          scoreAction('blog_deep_read', { 
            scroll_percentage: scrollPercentage,
            category: selectedCategory 
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, selectedCategory, scoreAction]);

  // Track category changes
  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'todos') {
      scoreAction('blog_category_filtered', { category: selectedCategory });
    }
  }, [selectedCategory, scoreAction]);

  return <>{children}</>;
};

export default BlogEngagementTracker;
