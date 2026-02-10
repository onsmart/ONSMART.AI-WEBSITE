
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Download, MessageCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLeadScoring } from '@/hooks/useLeadScoring';

interface IntelligentCTAProps {
  context: string;
  contentType?: 'blog' | 'case' | 'content' | 'general';
  className?: string;
}

const IntelligentCTA: React.FC<IntelligentCTAProps> = ({ 
  context, 
  contentType = 'general',
  className = ""
}) => {
  const navigate = useNavigate();
  const { leadProfile, scoreAction, getRecommendedActions, isQualified, isHot } = useLeadScoring();
  
  const recommendedActions = getRecommendedActions();
  const primaryAction = recommendedActions[0];

  const handleCTAClick = (actionType: string) => {
    // Score the interaction
    scoreAction(`${actionType}_clicked`, { context, contentType });
    
    // Navigate based on action
    switch (actionType) {
      case 'demo_request':
      case 'direct_contact':
        navigate('/contato');
        break;
      case 'diagnostic_form':
        navigate('/diagnostico');
        break;
      case 'case_study':
        navigate('/case-de-sucesso');
        break;
      case 'content_upgrade':
        // Trigger download modal or navigate to content
        scoreAction('content_downloaded', { source: context });
        break;
      case 'whatsapp_contact': {
        const whatsappUrl = "https://wa.me/5511996669247?text=" + encodeURIComponent("Olá! Vim pelo site da Onsmart.ai");
        window.open(whatsappUrl, "_blank");
        break;
      }
      default:
        navigate('/');
    }
  };

  const getCTAConfig = () => {
    if (isQualified) {
      return {
        primary: {
          text: "Diagnóstico Gratuito",
          icon: <Calendar className="mr-2 h-4 w-4" />,
          className: "bg-brand-blue hover:bg-brand-blue/90 text-white",
          action: "diagnostic_form"
        },
        secondary: {
          text: "WhatsApp Direto",
          icon: <MessageCircle className="mr-2 h-4 w-4" />,
          className: "border-green-500 text-green-600 hover:bg-green-50",
          action: "whatsapp_contact"
        }
      };
    }

    if (isHot) {
      return {
        primary: {
          text: "Diagnóstico Gratuito",
          icon: <TrendingUp className="mr-2 h-4 w-4" />,
          className: "bg-brand-blue hover:bg-brand-blue/90 text-white",
          action: "diagnostic_form"
        },
        secondary: {
          text: "Ver Cases Similares",
          icon: <ArrowRight className="mr-2 h-4 w-4" />,
          className: "border-brand-blue text-brand-blue hover:bg-brand-blue/5",
          action: "case_study"
        }
      };
    }

    // Default for warm/cold leads
    return {
      primary: {
        text: contentType === 'blog' ? "Material Exclusivo" : "Diagnóstico Gratuito",
        icon: contentType === 'blog' ? <Download className="mr-2 h-4 w-4" /> : <Calendar className="mr-2 h-4 w-4" />,
        className: "bg-brand-black hover:bg-brand-black/90 text-white",
        action: contentType === 'blog' ? "content_upgrade" : "diagnostic_form"
      },
      secondary: {
        text: "WhatsApp Rápido",
        icon: <MessageCircle className="mr-2 h-4 w-4" />,
        className: "border-gray-300 text-gray-700 hover:bg-gray-50",
        action: "whatsapp_contact"
      }
    };
  };

  const ctaConfig = getCTAConfig();

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      
      <Button
        size="lg"
        onClick={() => handleCTAClick(ctaConfig.primary.action)}
        className={`${ctaConfig.primary.className} min-h-[48px] font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105`}
      >
        {ctaConfig.primary.icon}
        {ctaConfig.primary.text}
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={() => handleCTAClick(ctaConfig.secondary.action)}
        className={`${ctaConfig.secondary.className} min-h-[48px]`}
      >
        {ctaConfig.secondary.icon}
        {ctaConfig.secondary.text}
      </Button>
    </div>
  );
};

export default IntelligentCTA;
