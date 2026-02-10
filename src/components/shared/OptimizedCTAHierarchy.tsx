
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useConversionMetrics } from "@/hooks/useConversionMetrics";
import { scrollToForm, scrollToElement } from "@/utils/scrollUtils";

interface OptimizedCTAHierarchyProps {
  primaryAction: "contact" | "diagnostico" | "demo";
  context: string;
  showSecondary?: boolean;
  className?: string;
}

const OptimizedCTAHierarchy: React.FC<OptimizedCTAHierarchyProps> = ({
  primaryAction,
  context,
  showSecondary = true,
  className = ""
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { trackCTAClick } = useAnalytics();
  const { trackConversion, trackFunnelStep } = useConversionMetrics();

  const handlePrimaryAction = () => {
    // Analytics básico
    trackCTAClick(`primary_${primaryAction}`, context);
    
    // Analytics de conversão avançado
    trackConversion({
      component: 'OptimizedCTAHierarchy',
      action: `primary_cta_click`,
      funnel_step: 'conversion_intent',
      metadata: {
        action_type: primaryAction,
        context: context,
        page: location.pathname,
        button_position: 'primary'
      }
    });

    // Track do funil baseado na ação
    const funnelSteps = {
      contact: 'contact_intent',
      diagnostico: 'diagnostic_intent', 
      demo: 'demo_intent'
    };
    
    trackFunnelStep(funnelSteps[primaryAction], 'OptimizedCTAHierarchy');
    
    if (primaryAction === "contact") {
      if (location.pathname === "/contato") {
        // Track scroll to form on same page
        trackConversion({
          component: 'OptimizedCTAHierarchy',
          action: 'scroll_to_form',
          funnel_step: 'form_focus',
          metadata: { context, source_page: location.pathname }
        });
        
        scrollToForm();
      } else {
        // Track navigation to contact page
        trackConversion({
          component: 'OptimizedCTAHierarchy',
          action: 'navigate_to_contact',
          funnel_step: 'page_navigation',
          metadata: { context, from_page: location.pathname }
        });
        navigate("/contato");
      }
    } else if (primaryAction === "diagnostico") {
      if (location.pathname === "/diagnostico") {
        trackConversion({
          component: 'OptimizedCTAHierarchy',
          action: 'scroll_to_diagnostic_form',
          funnel_step: 'form_focus',
          metadata: { context, source_page: location.pathname }
        });
        
        scrollToElement('diagnostico-form', '#diagnostico-form-section');
      } else {
        trackConversion({
          component: 'OptimizedCTAHierarchy',
          action: 'navigate_to_diagnostic',
          funnel_step: 'page_navigation',
          metadata: { context, from_page: location.pathname }
        });
        navigate("/diagnostico");
      }
    } else if (primaryAction === "demo") {
      trackConversion({
        component: 'OptimizedCTAHierarchy',
        action: 'demo_request',
        funnel_step: 'demo_intent',
        metadata: { context, source_page: location.pathname }
      });
      navigate("/contato");
    }
  };

  const handleSecondaryAction = () => {
    // Analytics básico
    trackCTAClick("secondary_whatsapp", context);
    
    // Analytics de conversão avançado
    trackConversion({
      component: 'OptimizedCTAHierarchy',
      action: 'whatsapp_click',
      funnel_step: 'direct_contact',
      metadata: {
        context: context,
        page: location.pathname,
        button_position: 'secondary',
        contact_method: 'whatsapp'
      }
    });

    trackFunnelStep('whatsapp_contact', 'OptimizedCTAHierarchy');
    
    const whatsappUrl = "https://wa.me/5511996669247?text=" + encodeURIComponent("Olá! Vim pelo site da Onsmart.ai");
    window.open(whatsappUrl, "_blank");
  };

  const getPrimaryConfig = () => {
    switch (primaryAction) {
      case "contact":
        return {
          text: "Falar com Especialista",
          icon: <MessageCircle className="mr-2 h-4 w-4" />,
          className: "bg-brand-black hover:bg-brand-black/90 text-white"
        };
      case "diagnostico":
        return {
          text: "Diagnóstico Gratuito",
          icon: <Calendar className="mr-2 h-4 w-4" />,
          className: "bg-brand-blue hover:bg-brand-blue/90 text-white"
        };
      case "demo":
        return {
          text: "Agendar Demo (15 min)",
          icon: <ArrowRight className="mr-2 h-4 w-4" />,
          className: "bg-brand-black hover:bg-brand-black/90 text-white"
        };
    }
  };

  const primaryConfig = getPrimaryConfig();

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {/* Primary CTA - Mais destaque */}
      <Button
        size="lg"
        onClick={handlePrimaryAction}
        className={`${primaryConfig.className} min-h-[48px] px-8 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105`}
        data-cta="primary"
        data-context={context}
        data-action={primaryAction}
      >
        {primaryConfig.icon}
        {primaryConfig.text}
      </Button>

      {/* Secondary CTA - Menor destaque */}
      {showSecondary && (
        <Button
          variant="outline"
          size="lg"
          onClick={handleSecondaryAction}
          className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 min-h-[48px] px-6"
          data-cta="secondary"
          data-context={context}
          data-action="whatsapp"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          WhatsApp Direto
        </Button>
      )}
    </div>
  );
};

export default OptimizedCTAHierarchy;
