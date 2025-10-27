import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send, Save } from "lucide-react";
import { useDiagnosticoForm } from "@/hooks/useDiagnosticoForm";
import { useConversionMetrics } from "@/hooks/useConversionMetrics";
import MultiStepDiagnosticoFields from "./MultiStepDiagnosticoFields";
import DynamicResponseTime from "./DynamicResponseTime";
import { useForm as useFormspree } from '@formspree/react';

const FORMSPREE_FORM_ID = "xovwrzqd";

const MultiStepDiagnosticoForm = () => {
  const {
    form,
    currentStep,
    totalSteps,
    isSubmitting: isOldSubmitting,
    lastSaved,
    isCurrentStepValid,
    nextStep,
    prevStep,
    clearDraft
  } = useDiagnosticoForm();

  const { trackConversion } = useConversionMetrics();
  const formData = form.getValues();

  // Formspree para envio
  const [formspreeState, formspreeSubmit] = useFormspree(FORMSPREE_FORM_ID);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Track form abandonment
  useEffect(() => {
    const handleBeforeUnload = () => {
      const hasFormData = Object.values(formData).some(value => value && value.toString().trim() !== '');
      if (hasFormData && currentStep < totalSteps) {
        trackConversion({
          component: 'DiagnosticoForm',
          action: 'form_abandoned',
          funnel_step: 'abandonment',
          metadata: {
            step_abandoned: currentStep,
            total_steps: totalSteps,
            form_completion: Math.round((currentStep / totalSteps) * 100),
            filled_fields: Object.keys(formData).filter(key => formData[key as keyof typeof formData])
          }
        });
      }
    };
    const stepStartTime = Date.now();
    return () => {
      const timeSpent = Date.now() - stepStartTime;
      trackConversion({
        component: 'DiagnosticoForm',
        action: 'step_time_spent',
        funnel_step: 'engagement',
        value: Math.round(timeSpent / 1000),
        metadata: {
          step: currentStep,
          time_seconds: Math.round(timeSpent / 1000)
        }
      });
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentStep, totalSteps, formData, trackConversion]);

  useEffect(() => {
    trackConversion({
      component: 'DiagnosticoForm',
      action: 'form_loaded',
      funnel_step: 'form_start',
      metadata: {
        initial_step: currentStep
      }
    });
  }, []);

  // Submit final usando Formspree
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload: Record<string, string> = {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        empresa: data.empresa,
        setor: data.setor,
        mensagem: data.mensagem || '',
      };
      const result = await formspreeSubmit(payload);
      if (result && result.response && result.response.ok) {
        form.reset();
      } else {
        setSubmitError("Erro ao enviar. Tente novamente ou use outro canal.");
      }
    } catch (err) {
      setSubmitError("Erro ao enviar. Tente novamente ou use outro canal.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mensagem de sucesso do Formspree
  if (formspreeState.succeeded) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/50 rounded-xl overflow-hidden">
        <CardContent className="p-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/5 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-green-500/20">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Diagnóstico Agendado
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">
              Sucesso!
            </span> Seu diagnóstico foi agendado
          </h2>
          <p className="text-gray-600 mb-4">Em breve, um de nossos <span className="font-bold text-brand-blue">especialistas</span> entrará em contato para agendar sua sessão.</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>✓ Resposta em 24h</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>✓ Diagnóstico gratuito</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dynamic Response Time */}
      <DynamicResponseTime formData={formData} currentStep={currentStep} />
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/50 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-brand-blue/5 to-blue-50/20 border-b border-gray-200/50">
          <CardTitle className="text-xl text-center text-gray-900">Diagnóstico Gratuito de IA</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Descubra o potencial de IA para sua empresa em 3 etapas simples
          </CardDescription>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-brand-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            Etapa {currentStep} de {totalSteps}
          </div>
          {lastSaved && (
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <span className="flex items-center gap-1">
                <Save className="h-3 w-3" />
                Salvo automaticamente às {lastSaved.toLocaleTimeString()}
              </span>
              <button 
                onClick={clearDraft}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Limpar rascunho
              </button>
            </div>
          )}
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            {currentStep < totalSteps ? (
              <>
                <div className="transition-all duration-300 ease-in-out">
                  <MultiStepDiagnosticoFields form={form} currentStep={currentStep} />
                </div>
                <div className="flex justify-between pt-4">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={isSubmitting}
                      className="min-h-[48px] min-w-[120px]"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Anterior
                    </Button>
                  )}
                  <div className="ml-auto">
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={isSubmitting || !isCurrentStepValid}
                      className="bg-brand-blue hover:bg-brand-blue/80 min-h-[48px] min-w-[120px]"
                    >
                      Próximo
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="transition-all duration-300 ease-in-out">
                  <MultiStepDiagnosticoFields form={form} currentStep={currentStep} />
                </div>
                <div className="flex justify-between pt-4">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={isSubmitting}
                      className="min-h-[48px] min-w-[120px]"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Anterior
                    </Button>
                  )}
                  <div className="ml-auto">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 min-h-[48px] min-w-[160px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Enviando...
                        </div>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Agendar Diagnóstico
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                {submitError && (
                  <div className="text-red-600 text-sm text-center mt-2">{submitError}</div>
                )}
              </form>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiStepDiagnosticoForm;
