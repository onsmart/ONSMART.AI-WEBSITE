
import React from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from "lucide-react";

interface MultiStepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const MultiStepProgress: React.FC<MultiStepProgressProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  const stepLabels = [
    "Dados Essenciais",
    "Interesse em IA", 
    "Detalhes da Empresa",
    "Confirmar Envio"
  ];

  return (
    <div className="mb-8">
      {/* Header - Estilo Homepage */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-3 border border-brand-blue/20">
          <Circle className="h-3 w-3" />
          Progresso do Formulário
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Etapa <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{currentStep}</span> de {totalSteps}
        </h3>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                {isCompleted ? (
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isCurrent 
                      ? 'border-brand-blue bg-brand-blue/10' 
                      : 'border-gray-300 bg-gray-50'
                  }`}>
                    <Circle className={`h-3 w-3 ${
                      isCurrent ? 'text-brand-blue fill-brand-blue' : 'text-gray-400'
                    }`} />
                  </div>
                )}
              </div>
              <span 
                className={`text-xs font-medium text-center max-w-[80px] ${
                  isCurrent ? 'text-brand-blue font-bold' : isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
      
      <Progress 
        value={progress} 
        className="h-2 bg-gray-200"
      />
      
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Etapa {currentStep} de {totalSteps}</span>
        <span>{Math.round(progress)}% concluído</span>
      </div>
    </div>
  );
};

export default MultiStepProgress;
