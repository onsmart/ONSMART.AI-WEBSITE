
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  animation?: 'pulse' | 'glow' | 'scale' | 'slide';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  className, 
  animation = 'scale',
  ...props 
}) => {
  const getAnimationClasses = () => {
    switch (animation) {
      case 'pulse':
        return 'animate-pulse hover:animate-none transition-all duration-300';
      case 'glow':
        return 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700';
      case 'scale':
        return 'transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95';
      case 'slide':
        return 'relative overflow-hidden after:absolute after:inset-0 after:bg-white/10 after:translate-y-full hover:after:translate-y-0 after:transition-transform after:duration-300';
      default:
        return 'transition-all duration-200 hover:scale-105';
    }
  };

  return (
    <Button
      className={cn(getAnimationClasses(), className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AnimatedButton;
