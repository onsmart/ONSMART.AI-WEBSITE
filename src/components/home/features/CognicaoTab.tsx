
import React from "react";
import { Activity } from "lucide-react";
import AdvancedFeatureTabContent from "./AdvancedFeatureTabContent";

const CognicaoTab: React.FC = () => {
  return (
    <AdvancedFeatureTabContent
      title="Cognição Organizacional Distribuída"
      description={
        <>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Uma das características mais inovadoras do VIBE Enterprise é sua capacidade de processar, 
            analisar e extrair insights de dados em tempo real através de toda a organização.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Esta cognição distribuída permite que a empresa como um todo se torne mais inteligente, 
            capaz de identificar padrões, antecipar tendências e responder rapidamente a mudanças no ambiente de negócios.
          </p>
        </>
      }
      tags={["Análise em Tempo Real", "Rede Neural Corporativa"]}
      icon={Activity}
    />
  );
};

export default CognicaoTab;
