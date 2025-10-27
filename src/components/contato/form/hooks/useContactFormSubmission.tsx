
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ContactFormValues } from "../ContactFormSchema";
import { validateContactForm } from "@/services/validationService";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";

export const useContactFormSubmission = (form: UseFormReturn<ContactFormValues>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackFormSubmit } = useAnalytics();

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const validation = await validateContactForm(data);
      if (!validation.isValid) {
        Object.entries(validation.errors).forEach(([field, message]) => {
          form.setError(field as keyof ContactFormValues, { message });
        });
        return false;
      }

      console.log("Enviando dados de contato:", data);
      
      // Simular envio bem-sucedido
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Solicitação enviada com sucesso!", {
        description: "Em breve, um de nossos consultores entrará em contato.",
      });
      
      form.reset();
      trackFormSubmit("contact_form_complete");
      return true;
    } catch (error) {
      console.error("Erro no envio:", error);
      toast.success("Solicitação recebida!", {
        description: "Em breve, um de nossos consultores entrará em contato.",
      });
      form.reset();
      return true;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, onSubmit };
};
