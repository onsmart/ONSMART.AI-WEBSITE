import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { DiagnosticoFormData } from './types';

interface AdvancedFormValidationProps {
  form: UseFormReturn<DiagnosticoFormData>;
  currentStep: number;
}

interface ValidationState {
  email: 'valid' | 'invalid' | 'checking' | 'idle';
  empresa: 'valid' | 'invalid' | 'checking' | 'idle';
  overall: number; // 0-100 percentage
}

const AdvancedFormValidation: React.FC<AdvancedFormValidationProps> = ({
  form,
  currentStep
}) => {
  const [validationState, setValidationState] = useState<ValidationState>({
    email: 'idle',
    empresa: 'idle',
    overall: 0
  });

  const watchedFields = form.watch();

  // Email validation with debounce
  useEffect(() => {
    const email = watchedFields.email;
    if (!email) {
      setValidationState(prev => ({ ...prev, email: 'idle' }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationState(prev => ({ ...prev, email: 'invalid' }));
      return;
    }

    setValidationState(prev => ({ ...prev, email: 'checking' }));
    
    const timer = setTimeout(() => {
      // Simulate advanced email validation
      if (email.includes('test') || email.includes('example')) {
        setValidationState(prev => ({ ...prev, email: 'invalid' }));
      } else {
        setValidationState(prev => ({ ...prev, email: 'valid' }));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [watchedFields.email]);

  // Company validation
  useEffect(() => {
    const empresa = watchedFields.empresa;
    if (!empresa || empresa.length < 2) {
      setValidationState(prev => ({ ...prev, empresa: 'idle' }));
      return;
    }

    setValidationState(prev => ({ ...prev, empresa: 'checking' }));
    
    const timer = setTimeout(() => {
      // Simple company validation
      if (empresa.length >= 3) {
        setValidationState(prev => ({ ...prev, empresa: 'valid' }));
      } else {
        setValidationState(prev => ({ ...prev, empresa: 'invalid' }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [watchedFields.empresa]);

  // Calculate overall completion
  useEffect(() => {
    const fields = Object.values(watchedFields);
    const filledFields = fields.filter(field => field && field.toString().trim() !== '');
    const percentage = (filledFields.length / fields.length) * 100;
    setValidationState(prev => ({ ...prev, overall: percentage }));
  }, [watchedFields]);

  const getValidationIcon = (state: string) => {
    switch (state) {
      case 'valid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'invalid':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'checking':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      default:
        return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  const getValidationMessage = (field: string, state: string) => {
    if (state === 'checking') return 'Verificando...';
    if (state === 'valid') return 'Válido';
    if (state === 'invalid') {
      switch (field) {
        case 'email':
          return 'Email inválido ou não recomendado';
        case 'empresa':
          return 'Nome muito curto';
        default:
          return 'Inválido';
      }
    }
    return '';
  };

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-800">
            Progresso do Formulário
          </span>
          <span className="text-sm text-blue-600">
            {Math.round(validationState.overall)}%
          </span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${validationState.overall}%` }}
          />
        </div>
      </div>

      {/* Field Validations */}
      {currentStep >= 1 && watchedFields.email && (
        <div className="flex items-center gap-2 text-sm animate-fade-in">
          {getValidationIcon(validationState.email)}
          <span className={
            validationState.email === 'valid' ? 'text-green-700' :
            validationState.email === 'invalid' ? 'text-red-700' :
            'text-gray-600'
          }>
            Email: {getValidationMessage('email', validationState.email)}
          </span>
        </div>
      )}

      {currentStep >= 2 && watchedFields.empresa && (
        <div className="flex items-center gap-2 text-sm animate-fade-in">
          {getValidationIcon(validationState.empresa)}
          <span className={
            validationState.empresa === 'valid' ? 'text-green-700' :
            validationState.empresa === 'invalid' ? 'text-red-700' :
            'text-gray-600'
          }>
            Empresa: {getValidationMessage('empresa', validationState.empresa)}
          </span>
        </div>
      )}

      {/* Tips */}
      {validationState.overall < 50 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 animate-fade-in">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Dica:</p>
              <p>Preencha todos os campos para uma análise mais precisa do seu diagnóstico.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFormValidation;
