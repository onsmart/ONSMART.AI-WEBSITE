
import React from "react";
import { BookOpen } from "lucide-react";
import AdvancedFeatureTabContent from "./AdvancedFeatureTabContent";

const AprendizagemTab: React.FC = () => {
  return (
    <AdvancedFeatureTabContent
      title="Aprendizagem Contínua Contextualizada"
      description={
        <>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            O sistema VIBE Enterprise evolui constantemente baseado não apenas em dados brutos, mas no 
            contexto específico da cultura e operações da organização.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Esta aprendizagem contextualizada permite que os agentes de IA compreendam as nuances, valores e objetivos 
            específicos da empresa, adaptando seu comportamento e recomendações de acordo com o ambiente único em que operam.
          </p>
        </>
      }
      tags={["Adaptação Contextual", "Evolução Contínua"]}
      icon={BookOpen}
    />
  );
};

export default AprendizagemTab;
