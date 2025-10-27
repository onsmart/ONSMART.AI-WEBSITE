
import React from "react";
import { Layers } from "lucide-react";
import AdvancedFeatureTabContent from "./AdvancedFeatureTabContent";

const InteroperabilidadeTab: React.FC = () => {
  return (
    <AdvancedFeatureTabContent
      title="Interoperabilidade Departamental"
      description={
        <>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            O VIBE Enterprise foi projetado para superar um dos maiores desafios das organizações modernas: 
            a fragmentação de informações e processos entre departamentos.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Os agentes do VIBE Enterprise cruzam silos organizacionais, conectando informações e processos entre 
            áreas como finanças, RH, operações e marketing, permitindo uma visão holística da organização.
          </p>
        </>
      }
      tags={["Integração Departamental", "Visão Holística"]}
      icon={Layers}
    />
  );
};

export default InteroperabilidadeTab;
