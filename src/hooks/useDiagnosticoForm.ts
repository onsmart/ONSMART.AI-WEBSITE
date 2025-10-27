import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DiagnosticoFormData } from "@/components/diagnostico/types";
import { sendDiagnosticoEmail } from "@/services/emailService";
import { useConversionMetrics } from "./useConversionMetrics";

const STORAGE_KEY = 'diagnostico_form_draft';

export const useDiagnosticoForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { trackConversion, trackFunnelStep } = useConversionMetrics();

  const totalSteps = 3;

  const form = useForm<DiagnosticoFormData>({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      empresa: "",
      setor: "",
      mensagem: "",
    },
  });

  // Auto-save functionality com tracking
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData);
        
        // Track restauração de rascunho
        trackConversion({
          component: 'DiagnosticoForm',
          action: 'draft_restored',
          funnel_step: 'form_continuation'
        });
        
        toast.info("Rascunho restaurado automaticamente");
      } catch (error) {
        console.error("Erro ao carregar rascunho:", error);
      }
    }
  }, [form, trackConversion]);

  // Auto-save on form changes com micro-tracking
  useEffect(() => {
    const subscription = form.watch((data, { name }) => {
      const hasData = Object.values(data).some(value => value && value.toString().trim() !== '');
      
      if (hasData) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setLastSaved(new Date());
        
        // Track preenchimento de campo específico
        if (name) {
          trackConversion({
            component: 'DiagnosticoForm',
            action: 'field_filled',
            funnel_step: 'form_progress',
            metadata: {
              field_name: name,
              step: currentStep,
              form_completion: calculateFormCompletion(data)
            }
          });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, currentStep, trackConversion]);

  const calculateFormCompletion = (data: Partial<DiagnosticoFormData>) => {
    const requiredFields = ['nome', 'email', 'telefone', 'empresa', 'setor'];
    const filledFields = requiredFields.filter(field => data[field as keyof DiagnosticoFormData]);
    return Math.round((filledFields.length / requiredFields.length) * 100);
  };

  const validateCurrentStep = () => {
    const currentData = form.getValues();
    
    if (currentStep === 1) {
      return Boolean(currentData.nome && currentData.email && currentData.telefone);
    }
    if (currentStep === 2) {
      return Boolean(currentData.empresa && currentData.setor);
    }
    return true;
  };

  const nextStep = async () => {
    const isValid = validateCurrentStep();
    
    if (!isValid) {
      // Track erro de validação
      trackConversion({
        component: 'DiagnosticoForm',
        action: 'validation_error',
        funnel_step: 'form_error',
        metadata: {
          step: currentStep,
          missing_fields: getMissingFields()
        }
      });
      
      if (currentStep === 1) {
        await form.trigger(["nome", "email", "telefone"]);
      } else if (currentStep === 2) {
        await form.trigger(["empresa", "setor"]);
      }
      return;
    }

    if (currentStep < totalSteps) {
      // Track progresso no funil
      trackFunnelStep(`step_${currentStep}_completed`, 'DiagnosticoForm');
      trackConversion({
        component: 'DiagnosticoForm',
        action: 'step_progression',
        funnel_step: 'form_advancement',
        metadata: {
          from_step: currentStep,
          to_step: currentStep + 1,
          form_completion: calculateFormCompletion(form.getValues())
        }
      });
      
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      // Track volta no funil
      trackConversion({
        component: 'DiagnosticoForm',
        action: 'step_back',
        funnel_step: 'form_navigation',
        metadata: {
          from_step: currentStep,
          to_step: currentStep - 1
        }
      });
      
      setCurrentStep(currentStep - 1);
    }
  };

  const getMissingFields = () => {
    const currentData = form.getValues();
    const missingFields = [];
    
    if (currentStep === 1) {
      if (!currentData.nome) missingFields.push('nome');
      if (!currentData.email) missingFields.push('email');
      if (!currentData.telefone) missingFields.push('telefone');
    } else if (currentStep === 2) {
      if (!currentData.empresa) missingFields.push('empresa');
      if (!currentData.setor) missingFields.push('setor');
    }
    
    return missingFields;
  };

  const onSubmit = async (data: DiagnosticoFormData) => {
    setIsSubmitting(true);
    
    // Track início da submissão
    trackConversion({
      component: 'DiagnosticoForm',
      action: 'submit_attempt',
      funnel_step: 'conversion',
      metadata: {
        form_data: {
          has_message: Boolean(data.mensagem),
          sector: data.setor,
          form_completion: 100
        }
      }
    });
    
    try {
      console.log("Enviando dados de diagnóstico para:", "atendimento.ai@onsmart.com.br");
      console.log("Dados do formulário:", data);
      
      const result = await sendDiagnosticoEmail(data);
      
      if (result.success) {
        // Track conversão bem-sucedida
        trackConversion({
          component: 'DiagnosticoForm',
          action: 'submit_success',
          funnel_step: 'conversion_completed',
          metadata: {
            email_sent: true,
            form_data: data
          }
        });
        
        trackFunnelStep('diagnostic_completed', 'DiagnosticoForm');
        
        toast.success("Diagnóstico agendado com sucesso!", {
          description: "Seu pedido foi enviado. Entraremos em contato em até 24 horas.",
        });
      } else {
        // Track conversão com fallback
        trackConversion({
          component: 'DiagnosticoForm',
          action: 'submit_fallback',
          funnel_step: 'conversion_completed',
          metadata: {
            email_sent: false,
            fallback_used: true
          }
        });
        
        toast.success("Diagnóstico agendado com sucesso!", {
          description: "Entraremos em contato em até 24 horas para agendar sua sessão personalizada.",
        });
      }
      
      localStorage.removeItem(STORAGE_KEY);
      form.reset();
      setCurrentStep(1);
    } catch (error) {
      console.error("Erro no envio:", error);
      
      // Track erro mas ainda considera conversão
      trackConversion({
        component: 'DiagnosticoForm',
        action: 'submit_error_handled',
        funnel_step: 'conversion_completed',
        metadata: {
          error: error instanceof Error ? error.message : 'Unknown error',
          fallback_message_shown: true
        }
      });
      
      toast.success("Diagnóstico agendado com sucesso!", {
        description: "Entraremos em contato em até 24 horas para agendar sua sessão personalizada.",
      });
      
      localStorage.removeItem(STORAGE_KEY);
      form.reset();
      setCurrentStep(1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearDraft = () => {
    // Track limpeza de rascunho
    trackConversion({
      component: 'DiagnosticoForm',
      action: 'draft_cleared',
      funnel_step: 'form_reset',
      metadata: {
        step_when_cleared: currentStep,
        had_data: Boolean(localStorage.getItem(STORAGE_KEY))
      }
    });
    
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    setLastSaved(null);
    toast.info("Rascunho removido");
  };

  const isCurrentStepValid = validateCurrentStep();

  return {
    form,
    currentStep,
    totalSteps,
    isSubmitting,
    lastSaved,
    isCurrentStepValid,
    nextStep,
    prevStep,
    clearDraft
  };
};
