
export interface SecurityValidationResult {
  isValid: boolean;
  errors: string[];
  severity: 'low' | 'medium' | 'high';
}

export interface InputSanitizationOptions {
  allowHtml?: boolean;
  maxLength?: number;
  allowedChars?: RegExp;
  removeScripts?: boolean;
}

export class SecurityService {
  // Sanitização robusta de inputs
  static sanitizeInput(input: string, options: InputSanitizationOptions = {}): string {
    const {
      allowHtml = false,
      maxLength = 1000,
      allowedChars,
      removeScripts = true
    } = options;

    if (!input || typeof input !== 'string') {
      return '';
    }

    let sanitized = input.trim();

    // Remover scripts maliciosos
    if (removeScripts) {
      sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      sanitized = sanitized.replace(/javascript:/gi, '');
      sanitized = sanitized.replace(/on\w+\s*=/gi, '');
    }

    // Escape HTML se não permitido
    if (!allowHtml) {
      sanitized = sanitized
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
    }

    // Aplicar caracteres permitidos
    if (allowedChars) {
      sanitized = sanitized.replace(new RegExp(`[^${allowedChars.source}]`, 'g'), '');
    }

    // Truncar se necessário
    if (sanitized.length > maxLength) {
      sanitized = sanitized.substring(0, maxLength);
    }

    return sanitized;
  }

  // Validação de email mais robusta
  static validateEmail(email: string): SecurityValidationResult {
    const errors: string[] = [];
    
    if (!email) {
      return { isValid: false, errors: ['Email é obrigatório'], severity: 'high' };
    }

    // Validação básica de formato
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email)) {
      errors.push('Formato de email inválido');
    }

    // Verificar domínios suspeitos
    const suspiciousDomains = ['tempmail', 'guerrillamail', '10minutemail', 'mailinator'];
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (domain && suspiciousDomains.some(sus => domain.includes(sus))) {
      errors.push('Domínio de email não permitido');
    }

    // Verificar comprimento
    if (email.length > 254) {
      errors.push('Email muito longo');
    }

    return {
      isValid: errors.length === 0,
      errors,
      severity: errors.length > 1 ? 'high' : 'medium'
    };
  }

  // Validação de telefone brasileiro
  static validatePhone(phone: string): SecurityValidationResult {
    const errors: string[] = [];
    
    if (!phone) {
      return { isValid: true, errors: [], severity: 'low' }; // Telefone é opcional
    }

    // Remover caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Validar formato brasileiro
    const phoneRegex = /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9\s?)?[0-9]{4}[-\s]?[0-9]{4}$/;
    
    if (!phoneRegex.test(phone) && cleanPhone.length < 10) {
      errors.push('Formato de telefone inválido');
    }

    if (cleanPhone.length > 15) {
      errors.push('Número de telefone muito longo');
    }

    return {
      isValid: errors.length === 0,
      errors,
      severity: errors.length > 0 ? 'medium' : 'low'
    };
  }

  // Detecção de tentativas de injection
  static detectInjectionAttempts(input: string): SecurityValidationResult {
    const errors: string[] = [];
    const injectionPatterns = [
      /<script/i,
      /javascript:/i,
      /onload\s*=/i,
      /onclick\s*=/i,
      /onerror\s*=/i,
      /eval\s*\(/i,
      /union\s+select/i,
      /drop\s+table/i,
      /insert\s+into/i,
      /delete\s+from/i
    ];

    injectionPatterns.forEach(pattern => {
      if (pattern.test(input)) {
        errors.push('Conteúdo potencialmente malicioso detectado');
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      severity: errors.length > 0 ? 'high' : 'low'
    };
  }
}
