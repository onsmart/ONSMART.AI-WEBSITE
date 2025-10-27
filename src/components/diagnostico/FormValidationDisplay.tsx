
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { DiagnosticoFormData } from "./types";

interface FormValidationDisplayProps {
  form: UseFormReturn<DiagnosticoFormData>;
  currentStep: number;
}

const FormValidationDisplay: React.FC<FormValidationDisplayProps> = ({ form, currentStep }) => {
  const formState = form.formState;
  const hasErrors = Object.keys(formState.errors).length > 0;
  
  if (!hasErrors && !formState.isValid) {
    return null;
  }

  return (
    <div className="mb-4">
      {hasErrors ? (
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Por favor, corrija os campos obrigatórios antes de continuar.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="mb-2 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Etapa {currentStep} preenchida corretamente!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FormValidationDisplay;
