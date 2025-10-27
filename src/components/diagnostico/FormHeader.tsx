
import React from "react";
import { Calendar } from "lucide-react";

interface FormHeaderProps {
  title: string;
  description: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, description }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200/50 mb-6">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
        <Calendar className="h-3 w-3" />
        Formulário de Diagnóstico
      </div>
      
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3">
        <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Agende Seu</span> Diagnóstico Gratuito
      </h2>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        Preencha o formulário em <span className="font-bold text-brand-blue">3 etapas simples</span> e nossa equipe entrará em contato em até <span className="font-bold text-brand-blue">24 horas</span> para agendar uma sessão personalizada.
      </p>
    </div>
  );
};

export default FormHeader;
