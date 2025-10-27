
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Clock, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RateLimitIndicatorProps {
  attempts: number;
  maxAttempts: number;
  isBlocked: boolean;
  remainingTime: number;
  warningLevel: 'none' | 'warning' | 'danger';
  formatRemainingTime: (ms: number) => string;
  className?: string;
}

export const RateLimitIndicator: React.FC<RateLimitIndicatorProps> = ({
  attempts,
  maxAttempts,
  isBlocked,
  remainingTime,
  warningLevel,
  formatRemainingTime,
  className = ''
}) => {
  const progress = (attempts / maxAttempts) * 100;
  const attemptsRemaining = maxAttempts - attempts;

  if (warningLevel === 'none' && !isBlocked) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {isBlocked ? (
        <Alert variant="destructive">
          <Clock className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>Bloqueado por excesso de tentativas</span>
              <span className="font-mono text-sm">
                {formatRemainingTime(remainingTime)}
              </span>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant={warningLevel === 'danger' ? 'destructive' : 'default'}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {warningLevel === 'danger' ? (
              <span>
                Última tentativa disponível! ({attemptsRemaining} restante)
              </span>
            ) : (
              <span>
                Atenção: {attemptsRemaining} tentativas restantes de {maxAttempts}
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Tentativas
          </span>
          <span>{attempts}/{maxAttempts}</span>
        </div>
        <Progress 
          value={progress} 
          className={`h-2 ${
            warningLevel === 'danger' ? 'bg-red-100' : 
            warningLevel === 'warning' ? 'bg-yellow-100' : 
            'bg-gray-100'
          }`}
        />
      </div>
    </div>
  );
};
