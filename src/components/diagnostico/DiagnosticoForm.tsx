
import React from "react";
import FormHeader from "./FormHeader";
import WhatsAppSection from "./WhatsAppSection";
import FormFooter from "./FormFooter";
import MultiStepDiagnosticoForm from "./MultiStepDiagnosticoForm";
import WhatsAppTestButton from "./WhatsAppTestButton";

const DiagnosticoForm = () => {
  return (
    <div className="space-y-6" data-form-section="true">
      <FormHeader 
        title="Agende Seu Diagnóstico Gratuito"
        description="Preencha o formulário em 3 etapas simples e nossa equipe entrará em contato em até 24 horas para agendar uma sessão personalizada de diagnóstico para sua empresa."
      />
      
      {/* WhatsApp AI Contact Option - Top Priority */}
      <WhatsAppSection position="top" />
      
      {/* Main Form with enhanced visibility */}
      <div className="relative">
        <MultiStepDiagnosticoForm />
      </div>
      
      <FormFooter />
      
      {/* WhatsApp Contact Option - Bottom */}
      <WhatsAppSection position="bottom" />
    </div>
  );
};

export default DiagnosticoForm;
