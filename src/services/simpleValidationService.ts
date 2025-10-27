
import { ContactFormValues } from "@/components/contato/form/ContactFormSchema";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateContactForm = async (data: ContactFormValues, step?: number): Promise<ValidationResult> => {
  // Simula delay de rede mais curto
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const errors: Record<string, string> = {};

  // Validações específicas por etapa - Simplificadas
  if (!step || step === 1) {
    // Etapa 1: Validações essenciais
    if (!data.name || data.name.length < 2) {
      errors.name = "Nome deve ter pelo menos 2 caracteres";
    }
    
    // Validação simples de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.email = "Email inválido";
    }
  }

  if (!step || step === 2) {
    // Etapa 2: Área de interesse (obrigatório)
    if (!data.interestArea) {
      errors.interestArea = "Selecione uma área de interesse";
    }
  }

  if (!step || step === 3) {
    // Etapa 3: Validações opcionais simplificadas
    if (data.phone && data.phone.length < 10) {
      errors.phone = "Telefone deve ter pelo menos 10 caracteres";
    }
    
    if (data.message && data.message.length > 1000) {
      errors.message = "Mensagem muito longa (máximo 1000 caracteres)";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
