
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X, Zap, Target, TrendingUp } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning' | 'ai-insight' | 'conversion-tip' | 'roi-alert';
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useEnhancedToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useEnhancedToast must be used within ToastProvider');
  }
  return context;
};

const getToastConfig = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return {
        icon: CheckCircle,
        className: 'bg-green-50 border-green-200 text-green-800',
        iconColor: 'text-green-500'
      };
    case 'error':
      return {
        icon: AlertCircle,
        className: 'bg-red-50 border-red-200 text-red-800',
        iconColor: 'text-red-500'
      };
    case 'info':
      return {
        icon: Info,
        className: 'bg-blue-50 border-blue-200 text-blue-800',
        iconColor: 'text-blue-500'
      };
    case 'warning':
      return {
        icon: AlertCircle,
        className: 'bg-orange-50 border-orange-200 text-orange-800',
        iconColor: 'text-orange-500'
      };
    case 'ai-insight':
      return {
        icon: Zap,
        className: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
        iconColor: 'text-white'
      };
    case 'conversion-tip':
      return {
        icon: Target,
        className: 'bg-gradient-to-r from-green-500 to-teal-600 text-white',
        iconColor: 'text-white'
      };
    case 'roi-alert':
      return {
        icon: TrendingUp,
        className: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
        iconColor: 'text-white'
      };
  }
};

const ToastItem: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  const config = getToastConfig(toast.type);
  const Icon = config.icon;

  React.useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => {
        onRemove(toast.id);
      }, toast.duration);
      
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div className={`relative p-4 rounded-lg shadow-lg border max-w-sm animate-fade-in ${config.className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 ${config.iconColor}`} />
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold">{toast.title}</h4>
          {toast.description && (
            <p className="text-sm mt-1 opacity-90">{toast.description}</p>
          )}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 px-3 py-1 bg-white/20 rounded text-xs font-medium hover:bg-white/30 transition-colors"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        
        <button
          onClick={() => onRemove(toast.id)}
          className="text-current opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export const EnhancedToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id, duration: toast.duration || 5000 };
    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAllToasts }}>
      {children}
      
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Helper functions for contextual toasts
export const enhancedToastHelpers = {
  formSubmitted: (addToast: ToastContextType['addToast'], formType: string, nextStep?: string) => {
    addToast({
      type: 'success',
      title: 'Formulário enviado com sucesso!',
      description: nextStep || 'Nossa equipe entrará em contato em breve.',
      action: nextStep ? {
        label: 'Próximo passo',
        onClick: () => window.location.href = '/diagnostico'
      } : undefined,
    });
  },

  diagnosticScheduled: (addToast: ToastContextType['addToast']) => {
    addToast({
      type: 'success',
      title: 'Diagnóstico agendado!',
      description: 'Você receberá um e-mail de confirmação em instantes.',
      action: {
        label: 'Ver calendário',
        onClick: () => window.open('https://calendly.com/onsmart-ai', '_blank')
      },
    });
  },

  aiInsight: (addToast: ToastContextType['addToast'], insight: string) => {
    addToast({
      type: 'ai-insight',
      title: 'Insight de IA',
      description: insight,
      duration: 6000,
    });
  },

  conversionTip: (addToast: ToastContextType['addToast'], tip: string, ctaLabel?: string, ctaAction?: () => void) => {
    addToast({
      type: 'conversion-tip',
      title: 'Dica Estratégica',
      description: tip,
      duration: 8000,
      action: ctaLabel && ctaAction ? {
        label: ctaLabel,
        onClick: ctaAction
      } : undefined,
    });
  },

  roiAlert: (addToast: ToastContextType['addToast'], roi: number) => {
    addToast({
      type: 'roi-alert',
      title: 'Potencial ROI Detectado',
      description: `Sua empresa pode ter um ROI de até ${roi}% com IA!`,
      duration: 7000,
    });
  }
};
