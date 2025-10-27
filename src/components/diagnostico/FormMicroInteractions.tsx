
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface FormMicroInteractionsProps {
  currentStep: number;
  totalSteps: number;
  isValid: boolean;
  isSubmitting: boolean;
}

const FormMicroInteractions: React.FC<FormMicroInteractionsProps> = ({
  currentStep,
  totalSteps,
  isValid,
  isSubmitting
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4">
      {/* Animated Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-brand-blue to-brand-blue-light h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="flex justify-between mt-2">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                index + 1 <= currentStep
                  ? 'bg-brand-blue border-brand-blue text-white scale-110'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
            >
              {index + 1 <= currentStep ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Validation Feedback */}
      <div className={`flex items-center gap-2 text-sm transition-all duration-300 ${
        currentStep > 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}>
        {isValid ? (
          <>
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-green-700">Etapa concluída</span>
          </>
        ) : (
          <>
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span className="text-orange-700">Preencha os campos obrigatórios</span>
          </>
        )}
      </div>

      {/* Submission Animation */}
      {isSubmitting && (
        <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg animate-scale-in">
          <div className="flex items-center gap-3">
            <div className="animate-spin h-6 w-6 border-2 border-brand-blue border-t-transparent rounded-full"></div>
            <span className="text-brand-blue font-medium">Processando seu diagnóstico...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormMicroInteractions;
