import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { ContactFormValues } from "../ContactFormSchema";
import { validateContactForm } from "@/services/validationService";
import { toast } from "sonner";

export const useContactFormValidation = (form: UseFormReturn<ContactFormValues>) => {
  const [isValidating, setIsValidating] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [fieldWarnings, setFieldWarnings] = useState<Record<string, string>>({});

  // Validação em tempo real para campos específicos
  const validateField = async (fieldName: keyof ContactFormValues, value: string) => {
    if (!value) {
      setFieldErrors(prev => ({ ...prev, [fieldName]: "" }));
      setFieldWarnings(prev => ({ ...prev, [fieldName]: "" }));
      return;
    }

    try {
      const formData = form.getValues();
      const updatedData = { ...formData, [fieldName]: value };
      const validation = await validateContactForm(updatedData);
      
      // Atualizar erros e avisos específicos do campo
      if (validation.errors[fieldName]) {
        setFieldErrors(prev => ({ ...prev, [fieldName]: validation.errors[fieldName] }));
      } else {
        setFieldErrors(prev => ({ ...prev, [fieldName]: "" }));
      }

      if (validation.warnings[fieldName]) {
        setFieldWarnings(prev => ({ ...prev, [fieldName]: validation.warnings[fieldName] }));
      } else {
        setFieldWarnings(prev => ({ ...prev, [fieldName]: "" }));
      }
    } catch (error) {
      console.error("Erro na validação em tempo real:", error);
      // Adicionar feedback amigável ao usuário
      setFieldWarnings(prev => ({ ...prev, [fieldName]: "Não foi possível validar este campo no momento. Por favor, continue preenchendo normalmente." }));
      toast.info("Não foi possível validar o campo em tempo real. Isso não impede o envio do formulário.");
    }
  };

  // Watch para validação em tempo real
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name && value[name]) {
        validateField(name as keyof ContactFormValues, value[name] as string);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const validateCurrentStep = async (currentStep: number) => {
    setIsValidating(true);
    const currentData = form.getValues();
    
    try {
      const validation = await validateContactForm(currentData, currentStep);
      
      if (!validation.isValid) {
        Object.entries(validation.errors).forEach(([field, message]) => {
          form.setError(field as keyof ContactFormValues, { message });
        });
        
        // Mostrar toast com quantidade de erros
        const errorCount = Object.keys(validation.errors).length;
        toast.error(`${errorCount} campo${errorCount > 1 ? 's' : ''} precisa${errorCount > 1 ? 'm' : ''} ser corrigido${errorCount > 1 ? 's' : ''}`);
        return false;
      }
      
      // Mostrar avisos se houver
      if (Object.keys(validation.warnings).length > 0) {
        const warningMessage = Object.values(validation.warnings)[0];
        if (typeof warningMessage === 'string') {
          toast.info(warningMessage);
        }
      }
      
      form.clearErrors();
      return true;
    } catch (error) {
      console.error("Erro na validação:", error);
      toast.error("Erro na validação. Tente novamente.");
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  return { 
    isValidating, 
    validateCurrentStep, 
    fieldErrors, 
    fieldWarnings,
    validateField 
  };
};
