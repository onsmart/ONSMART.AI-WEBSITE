
import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm">
      <Progress 
        value={scrollProgress} 
        className="h-1 rounded-none bg-gray-200"
      />
    </div>
  );
};

export default ScrollProgress;
