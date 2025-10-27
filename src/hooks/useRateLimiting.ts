
import { useState, useCallback, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface RateLimitOptions {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs: number;
  warningThreshold?: number;
}

interface RateLimitState {
  attempts: number;
  isBlocked: boolean;
  remainingTime: number;
  canProceed: boolean;
  warningLevel: 'none' | 'warning' | 'danger';
}

export const useRateLimiting = (
  key: string,
  options: RateLimitOptions
) => {
  const {
    maxAttempts,
    windowMs,
    blockDurationMs,
    warningThreshold = Math.floor(maxAttempts * 0.7)
  } = options;

  const [state, setState] = useState<RateLimitState>({
    attempts: 0,
    isBlocked: false,
    remainingTime: 0,
    canProceed: true,
    warningLevel: 'none'
  });

  const intervalRef = useRef<NodeJS.Timeout>();
  const attemptsRef = useRef<number[]>([]);

  const updateRemainingTime = useCallback(() => {
    setState(prev => {
      if (prev.remainingTime <= 1000) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return {
          ...prev,
          isBlocked: false,
          remainingTime: 0,
          canProceed: true,
          warningLevel: 'none'
        };
      }
      return {
        ...prev,
        remainingTime: prev.remainingTime - 1000
      };
    });
  }, []);

  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    const storageKey = `rate_limit_${key}`;
    
    // Recuperar tentativas do localStorage
    const stored = localStorage.getItem(storageKey);
    const attempts = stored ? JSON.parse(stored) : [];
    
    // Filtrar tentativas dentro da janela de tempo
    const recentAttempts = attempts.filter((timestamp: number) => 
      now - timestamp < windowMs
    );

    // Verificar se excedeu o limite
    if (recentAttempts.length >= maxAttempts) {
      const oldestAttempt = Math.min(...recentAttempts);
      const blockTime = blockDurationMs - (now - oldestAttempt);
      
      if (blockTime > 0) {
        setState({
          attempts: recentAttempts.length,
          isBlocked: true,
          remainingTime: blockTime,
          canProceed: false,
          warningLevel: 'danger'
        });

        // Iniciar countdown
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(updateRemainingTime, 1000);

        toast({
          title: "Muitas tentativas",
          description: `Aguarde ${Math.ceil(blockTime / 1000)} segundos antes de tentar novamente.`,
          variant: "destructive"
        });

        return false;
      }
    }

    // Adicionar nova tentativa
    recentAttempts.push(now);
    localStorage.setItem(storageKey, JSON.stringify(recentAttempts));
    attemptsRef.current = recentAttempts;

    // Calcular nível de warning
    const warningLevel = 
      recentAttempts.length >= maxAttempts - 1 ? 'danger' :
      recentAttempts.length >= warningThreshold ? 'warning' : 'none';

    setState({
      attempts: recentAttempts.length,
      isBlocked: false,
      remainingTime: 0,
      canProceed: true,
      warningLevel
    });

    // Mostrar warning se necessário
    if (warningLevel === 'warning') {
      toast({
        title: "Atenção",
        description: `Você tem ${maxAttempts - recentAttempts.length} tentativas restantes.`,
        variant: "default"
      });
    }

    return true;
  }, [key, maxAttempts, windowMs, blockDurationMs, warningThreshold, updateRemainingTime]);

  const reset = useCallback(() => {
    const storageKey = `rate_limit_${key}`;
    localStorage.removeItem(storageKey);
    setState({
      attempts: 0,
      isBlocked: false,
      remainingTime: 0,
      canProceed: true,
      warningLevel: 'none'
    });
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [key]);

  const formatRemainingTime = useCallback((ms: number): string => {
    const seconds = Math.ceil(ms / 1000);
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }, []);

  return {
    ...state,
    checkRateLimit,
    reset,
    formatRemainingTime,
    attemptsRemaining: maxAttempts - state.attempts
  };
};
