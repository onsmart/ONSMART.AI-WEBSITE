
import React from 'react';
import { Brain, Zap, Target, TrendingUp, Cpu, BarChart3 } from 'lucide-react';

const DynamicVisualElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating icons with different animation delays - hidden on mobile */}
      <div className="hidden md:block absolute top-1/4 left-1/4 animate-float opacity-20" style={{ animationDelay: '0s' }}>
        <Brain className="h-8 w-8 text-brand-blue" />
      </div>
      
      <div className="hidden md:block absolute top-1/3 right-1/4 animate-float opacity-25" style={{ animationDelay: '1s' }}>
        <Zap className="h-6 w-6 text-brand-blue-light" />
      </div>
      
      <div className="hidden md:block absolute bottom-1/3 left-1/3 animate-float opacity-20" style={{ animationDelay: '2s' }}>
        <Target className="h-7 w-7 text-brand-blue" />
      </div>
      
      <div className="hidden md:block absolute top-1/2 right-1/3 animate-float opacity-25" style={{ animationDelay: '0.5s' }}>
        <TrendingUp className="h-6 w-6 text-brand-blue-light" />
      </div>
      
      <div className="hidden md:block absolute bottom-1/4 right-1/4 animate-float opacity-20" style={{ animationDelay: '1.5s' }}>
        <Cpu className="h-8 w-8 text-brand-blue" />
      </div>
      
      <div className="hidden md:block absolute top-3/4 left-1/5 animate-float opacity-25" style={{ animationDelay: '3s' }}>
        <BarChart3 className="h-7 w-7 text-brand-blue-light" />
      </div>

      {/* Animated gradient orbs - smaller on mobile */}
      <div className="absolute top-1/5 right-1/5 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-r from-brand-blue/10 to-brand-blue-light/10 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/5 left-1/6 w-12 h-12 md:w-24 md:h-24 bg-gradient-to-r from-brand-blue-light/15 to-brand-blue/15 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      {/* Geometric shapes - hidden on mobile */}
      <div className="hidden md:block absolute top-1/6 left-1/2 w-16 h-16 border border-brand-blue/20 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
      <div className="hidden md:block absolute bottom-1/6 right-1/2 w-12 h-12 bg-brand-blue-light/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default DynamicVisualElements;
