
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { DiagnosticoFormData } from "./types";
import { StepOne, StepTwo, StepThree } from "./form-steps";

interface MultiStepDiagnosticoFieldsProps {
  form: UseFormReturn<DiagnosticoFormData>;
  currentStep: number;
}

const MultiStepDiagnosticoFields: React.FC<MultiStepDiagnosticoFieldsProps> = ({ form, currentStep }) => {
  switch (currentStep) {
    case 1:
      return <StepOne form={form} />;
    case 2:
      return <StepTwo form={form} />;
    case 3:
      return <StepThree form={form} />;
    default:
      return null;
  }
};

export default MultiStepDiagnosticoFields;
