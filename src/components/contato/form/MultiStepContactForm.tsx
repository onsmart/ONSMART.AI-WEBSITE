import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { useForm as useFormspree, ValidationError } from '@formspree/react';
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import ContactFormHeader from "./ContactFormHeader";
import WhatsappSection from "./WhatsappSection";
import FormPreview from "./FormPreview";
import { contactFormSchema, ContactFormValues } from "./ContactFormSchema";
import { useAnalytics } from "@/hooks/useAnalytics";
import MultiStepFormFields from "./MultiStepFormFields";
import MultiStepProgress from "./MultiStepProgress";
import { useContactFormValidation } from "./hooks/useContactFormValidation";
import { useFormAbandonment } from "./hooks/useFormAbandonment";

const FORMSPREE_FORM_ID = "xovwrzqd";

const MultiStepContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { trackCTAClick } = useAnalytics();
  const totalSteps = 4;

  // React Hook Form para controle dos campos
  const form = useReactHookForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      company: "",
      position: "",
      email: "",
      phone: "",
      message: "",
      interestArea: "implementacao",
    },
  });

  // Formspree para envio
  const [formspreeState, formspreeSubmit] = useFormspree(FORMSPREE_FORM_ID);

  const { isValidating, validateCurrentStep, fieldErrors, fieldWarnings } = useContactFormValidation(form);
  const { hasInteracted } = useFormAbandonment(form, currentStep);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nextStep = async () => {
    if (currentStep === 4) return;
    const isValid = await validateCurrentStep(currentStep);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      trackCTAClick(`next_step_${currentStep}`, "contact_form");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      trackCTAClick(`prev_step_${currentStep}`, "contact_form");
    }
  };

  // Envio final usando Formspree
  const handleSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Montar payload para Formspree
      const payload: Record<string, string> = {
        name: data.name,
        email: data.email,
        company: data.company || '',
        position: data.position || '',
        phone: data.phone || '',
        message: data.message || '',
        interestArea: data.interestArea,
      };
      const result = await formspreeSubmit(payload);
      if (result && result.response && result.response.ok) {
        setCurrentStep(1);
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
            Enviado com Sucesso
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">
              Solicitação Enviada!
            </span>
          </h2>
          <p className="text-gray-600 mb-4">Em breve, um de nossos <span className="font-bold text-brand-blue">especialistas</span> entrará em contato.</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>✓ Resposta em 2h</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>✓ Consultoria gratuita</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/50 rounded-xl overflow-hidden">
      <ContactFormHeader />
      <CardContent className="pt-6 bg-transparent">
        <WhatsappSection />
        <MultiStepProgress currentStep={currentStep} totalSteps={totalSteps} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {currentStep < 4 ? (
              <MultiStepFormFields 
                form={form} 
                currentStep={currentStep}
                fieldErrors={fieldErrors}
                fieldWarnings={fieldWarnings}
              />
            ) : (
              <FormPreview formData={form.getValues()} />
            )}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={isSubmitting || isValidating}
                  className="w-full sm:w-auto border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
              )}
              <div className="flex-1 flex justify-end">
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={isSubmitting || isValidating}
                    className="w-full sm:w-auto bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {isValidating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Validando...
                      </>
                    ) : (
                      <>
                        {currentStep === 3 ? "Revisar" : "Próximo"}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 min-h-[48px]" 
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
                        Enviar Solicitação
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
            {submitError && (
              <div className="text-red-600 text-sm text-center mt-2">{submitError}</div>
            )}
            {/* Indicador de progresso mobile */}
            <div className="sm:hidden text-center text-sm text-gray-500 dark:text-gray-400">
              Etapa {currentStep} de {totalSteps}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MultiStepContactForm;
