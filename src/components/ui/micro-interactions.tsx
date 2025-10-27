
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonWithRippleProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export const ButtonWithRipple: React.FC<ButtonWithRippleProps> = ({ 
  children, 
  className, 
  variant = 'primary',
  onClick,
  disabled,
  type = 'button',
  'aria-label': ariaLabel,
  ...props 
}) => {
  const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples(prev => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 600);

    onClick?.(e);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-brand-blue hover:bg-brand-blue/90 text-white';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
      case 'outline':
        return 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white';
    }
  };

  return (
    <button
      className={cn(
        'relative overflow-hidden px-6 py-3 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover-scale',
        getVariantClasses(),
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
      
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none animate-fade-out"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px'
          }}
        />
      ))}
    </button>
  );
};

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({ children, className }) => (
  <div className={cn('cursor-pointer hover-scale', className)}>
    {children}
  </div>
);

interface ProgressIndicatorProps {
  progress: number;
  label?: string;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  progress, 
  label, 
  className 
}) => (
  <div className={cn('space-y-2', className)}>
    {label && (
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{Math.round(progress)}%</span>
      </div>
    )}
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-brand-blue to-brand-blue-light rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

interface CountUpProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({ 
  from, 
  to, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  className 
}) => {
  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    const start = Date.now();
    const end = start + duration * 1000;
    
    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - start) / (end - start), 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = from + (to - from) * easeOutCubic;
      
      setCount(Math.floor(currentCount));
      
      if (progress === 1) {
        clearInterval(timer);
        setCount(to);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [from, to, duration]);

  return (
    <span className={cn('animate-fade-in', className)}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  icon, 
  onClick, 
  className 
}) => (
  <button
    onClick={onClick}
    className={cn(
      'fixed bottom-6 right-6 w-14 h-14 bg-brand-blue text-white rounded-full shadow-lg flex items-center justify-center z-50 hover-scale animate-fade-in',
      className
    )}
  >
    {icon}
  </button>
);
