
import React from 'react';
import { CheckCircle, AlertCircle, Info, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisualFeedbackProps {
  type: 'success' | 'error' | 'info' | 'loading';
  message: string;
  progress?: number;
  className?: string;
  onClose?: () => void;
}

export const VisualFeedback: React.FC<VisualFeedbackProps> = ({
  type,
  message,
  progress,
  className,
  onClose
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'loading':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'loading':
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg border-2 shadow-sm opacity-0 animate-fade-in",
        getBackgroundColor(),
        className
      )}
    >
      <div className="transition-all duration-200">
        {getIcon()}
      </div>
      
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{message}</p>
        
        {progress !== undefined && (
          <div className="mt-2 bg-white rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default VisualFeedback;
