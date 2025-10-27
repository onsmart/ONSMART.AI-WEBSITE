import { ContactFormValues } from "@/components/contato/form/ContactFormSchema";
import { SecurityService, SecurityValidationResult } from "./securityService";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
  securityIssues: string[];
}

export const validateContactForm = async (data: ContactFormValues, step?: number): Promise<ValidationResult> => {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const errors: Record<string, string> = {};
  const warnings: Record<string, string> = {};
  const securityIssues: string[] = [];

  // Validações específicas por etapa - Mais robustas
  if (!step || step === 1) {
    // Etapa 1: Validações essenciais com segurança
    
    // Validação do nome
    if (!data.name || data.name.length < 2) {
      errors.name = "Nome deve ter pelo menos 2 caracteres";
    } else {
      // Sanitizar e validar nome
      const sanitizedName = SecurityService.sanitizeInput(data.name, {
        allowedChars: /[a-zA-ZÀ-ÿ\u0100-\u017F\s\-'\.]/,
        maxLength: 100
      });
      
      if (sanitizedName !== data.name) {
        warnings.name = "Nome contém caracteres que foram removidos";
      }

      // Detectar tentativas de injection
      const injectionCheck = SecurityService.detectInjectionAttempts(data.name);
      if (!injectionCheck.isValid) {
        securityIssues.push("Nome contém conteúdo suspeito");
        errors.name = "Nome contém caracteres não permitidos";
      }

      // Validar se não é muito genérico
      const genericNames = ['test', 'teste', 'admin', 'user', 'usuario'];
      if (genericNames.includes(data.name.toLowerCase())) {
        warnings.name = "Use seu nome real para melhor atendimento";
      }
    }
    
    // Validação do email
    const emailValidation = SecurityService.validateEmail(data.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.errors[0];
      if (emailValidation.severity === 'high') {
        securityIssues.push("Email com problemas de segurança");
      }
    }
    
    // Verificar se email não é muito comum/genérico
    if (data.email && data.email.includes('@gmail.com')) {
      const localPart = data.email.split('@')[0];
      if (localPart.length < 5 || /^test|^admin|^user/.test(localPart)) {
        warnings.email = "Use um email profissional para melhor atendimento";
      }
    }
  }

  if (!step || step === 2) {
    // Etapa 2: Área de interesse (obrigatório)
    if (!data.interestArea) {
      errors.interestArea = "Selecione uma área de interesse";
    }
    
    // Validar empresa se fornecida
    if (data.company) {
      const sanitizedCompany = SecurityService.sanitizeInput(data.company, {
        maxLength: 200
      });
      
      if (sanitizedCompany !== data.company) {
        warnings.company = "Nome da empresa foi sanitizado";
      }

      // Verificar tentativas de injection
      const injectionCheck = SecurityService.detectInjectionAttempts(data.company);
      if (!injectionCheck.isValid) {
        securityIssues.push("Nome da empresa contém conteúdo suspeito");
        errors.company = "Nome da empresa contém caracteres não permitidos";
      }
    }
  }

  if (!step || step === 3) {
    // Etapa 3: Validações opcionais robustas
    
    if (data.phone) {
      const phoneValidation = SecurityService.validatePhone(data.phone);
      if (!phoneValidation.isValid) {
        errors.phone = phoneValidation.errors[0];
      }
    }
    
    if (data.message) {
      // Sanitizar mensagem
      const sanitizedMessage = SecurityService.sanitizeInput(data.message, {
        maxLength: 2000,
        allowHtml: false
      });
      
      if (sanitizedMessage !== data.message) {
        warnings.message = "Mensagem foi sanitizada por segurança";
      }

      // Verificar tentativas de injection
      const injectionCheck = SecurityService.detectInjectionAttempts(data.message);
      if (!injectionCheck.isValid) {
        securityIssues.push("Mensagem contém conteúdo suspeito");
        errors.message = "Mensagem contém conteúdo não permitido";
      }

      if (data.message.length > 2000) {
        errors.message = "Mensagem muito longa (máximo 2000 caracteres)";
      }

      // Detectar spam patterns
      const spamPatterns = [
        /(\b\w+\b.*?){20,}/,  // Muitas palavras repetidas
        /[A-Z]{5,}/,          // Muitas maiúsculas seguidas
        /(\!{3,}|\?{3,})/,    // Muitos pontos de exclamação/interrogação
        /(http|www\.)/i       // Links não permitidos
      ];

      spamPatterns.forEach(pattern => {
        if (pattern.test(data.message)) {
          warnings.message = "Mensagem pode ser identificada como spam";
        }
      });
    }

    if (data.position) {
      const sanitizedPosition = SecurityService.sanitizeInput(data.position, {
        maxLength: 100
      });
      
      if (sanitizedPosition !== data.position) {
        warnings.position = "Cargo foi sanitizado";
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
    securityIssues
  };
};
