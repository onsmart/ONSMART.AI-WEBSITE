
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { DiagnosticoFormData } from "./types";
import PersonalInfoFields from "./fields/PersonalInfoFields";
import CompanyInfoFields from "./fields/CompanyInfoFields";

interface FormFieldsProps {
  form: UseFormReturn<DiagnosticoFormData>;
}

const FormFields: React.FC<FormFieldsProps> = ({ form }) => {
  return (
    <div role="group" aria-labelledby="form-section-title">
      <h3 id="form-section-title" className="sr-only">
        Dados para diagnóstico gratuito de IA
      </h3>
      
      <PersonalInfoFields form={form} />
      
      <Separator />
      
      <CompanyInfoFields form={form} />
    </div>
  );
};

export default FormFields;
