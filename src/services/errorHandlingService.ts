
export type ErrorType = 'network' | 'validation' | 'unknown';
export type ErrorSeverity = 'low' | 'medium' | 'high';

export interface ProcessedError {
  id: string;
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  userMessage: string;
  timestamp: number;
}

export class ErrorHandlingService {
  static processError(error: Error | unknown): ProcessedError {
    const errorId = `error_${Date.now()}`;
    const timestamp = Date.now();
    
    let errorMessage: string;
    let errorType: ErrorType = 'unknown';
    let severity: ErrorSeverity = 'medium';

    if (error instanceof Error) {
      errorMessage = error.message;
      if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        errorType = 'network';
      } else if (errorMessage.includes('validation')) {
        errorType = 'validation';
      }
    } else {
      errorMessage = String(error);
    }

    const userMessage = this.generateUserMessage(errorType);

    return {
      id: errorId,
      type: errorType,
      severity,
      message: errorMessage,
      userMessage,
      timestamp
    };
  }

  private static generateUserMessage(type: ErrorType): string {
    const messages = {
      validation: 'Por favor, verifique os dados e tente novamente.',
      network: 'Problema de conexão. Tente novamente.',
      unknown: 'Erro inesperado. Recarregue a página.'
    };

    return messages[type];
  }
}
