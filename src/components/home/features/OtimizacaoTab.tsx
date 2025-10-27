
import React from "react";
import { ChartBarIncreasing } from "lucide-react";
import AdvancedFeatureTabContent from "./AdvancedFeatureTabContent";

const OtimizacaoTab: React.FC = () => {
  return (
    <AdvancedFeatureTabContent
      title="Auto-otimização de Processos"
      description={
        <>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Uma funcionalidade distintiva do VIBE Enterprise é sua capacidade de identificar e 
            refinar automaticamente fluxos de trabalho subótimos.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Através da análise contínua de processos organizacionais, o sistema identifica gargalos, 
            redundâncias e oportunidades de melhoria, implementando ajustes incrementais que aumentam 
            progressivamente a eficiência operacional.
          </p>
        </>
      }
      tags={["Melhoria Contínua", "Eficiência Aumentada"]}
      icon={ChartBarIncreasing}
    />
  );
};

export default OtimizacaoTab;
