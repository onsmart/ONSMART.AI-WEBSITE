
import React from 'react';
import { toast } from 'sonner';
import i18n from '@/i18n/config';
import { CheckCircle, AlertCircle, Info, XCircle, Zap, Target, TrendingUp } from 'lucide-react';

interface ContextualToastOptions {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

// Helper para obter traduções quando necessário (fora de contexto React)
const getT = () => i18n.getFixedT(null, 'common');

export const contextualToast = {
  success: (options: ContextualToastOptions) => {
    toast.success(options.title, {
      description: options.description,
      icon: <CheckCircle className="h-4 w-4" />,
      duration: options.duration || 4000,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  },

  error: (options: ContextualToastOptions) => {
    toast.error(options.title, {
      description: options.description,
      icon: <XCircle className="h-4 w-4" />,
      duration: options.duration || 6000,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  },

  info: (options: ContextualToastOptions) => {
    toast.info(options.title, {
      description: options.description,
      icon: <Info className="h-4 w-4" />,
      duration: options.duration || 4000,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  },

  warning: (options: ContextualToastOptions) => {
    toast.warning(options.title, {
      description: options.description,
      icon: <AlertCircle className="h-4 w-4" />,
      duration: options.duration || 5000,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  },

  // Contextualized toasts for business scenarios
  formSubmitted: (formType: string, nextStep?: string) => {
    const t = getT();
    contextualToast.success({
      title: t('toast.formSubmitted'),
      description: nextStep || t('toast.formSubmittedDescription'),
      action: nextStep ? {
        label: t('toast.nextStep'),
        onClick: () => window.location.href = '/diagnostico'
      } : undefined,
    });
  },

  diagnosticScheduled: () => {
    const t = getT();
    contextualToast.success({
      title: t('toast.diagnosticScheduled'),
      description: t('toast.diagnosticScheduledDescription'),
      action: {
        label: t('toast.viewCalendar'),
        onClick: () => window.open('https://calendly.com/onsmart-ai', '_blank')
      },
    });
  },

  aiInsight: (insight: string) => {
    toast.custom(() => (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-5 w-5" />
          <span className="font-semibold">Insight de IA</span>
        </div>
        <p className="text-sm">{insight}</p>
      </div>
    ), { duration: 6000 });
  },

  conversionTip: (tip: string, ctaLabel?: string, ctaAction?: () => void) => {
    toast.custom(() => (
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-5 w-5" />
          <span className="font-semibold">Dica Estratégica</span>
        </div>
        <p className="text-sm mb-3">{tip}</p>
        {ctaLabel && ctaAction && (
          <button 
            onClick={ctaAction}
            className="bg-white text-green-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            {ctaLabel}
          </button>
        )}
      </div>
    ), { duration: 8000 });
  },

  roiAlert: (roi: number) => {
    toast.custom(() => (
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-5 w-5" />
          <span className="font-semibold">Potencial ROI Detectado</span>
        </div>
        <p className="text-sm">Sua empresa pode ter um ROI de até {roi}% com IA!</p>
      </div>
    ), { duration: 7000 });
  },

  offlineMode: () => {
    contextualToast.info({
      title: "Modo offline ativado",
      description: "Seus dados serão sincronizados quando a conexão for restaurada.",
      duration: 3000,
    });
  },

  updateAvailable: () => {
    contextualToast.info({
      title: "Nova versão disponível",
      description: "Atualize para acessar as últimas funcionalidades.",
      action: {
        label: "Atualizar",
        onClick: () => window.location.reload()
      },
      duration: 10000,
    });
  }
};

export default contextualToast;
