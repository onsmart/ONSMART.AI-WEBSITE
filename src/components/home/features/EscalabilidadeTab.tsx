
import React from "react";
import { TrendingUp } from "lucide-react";
import AdvancedFeatureTabContent from "./AdvancedFeatureTabContent";

const EscalabilidadeTab: React.FC = () => {
  return (
    <AdvancedFeatureTabContent
      title="Escalabilidade Vertical e Horizontal"
      description={
        <>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            O VIBE Enterprise foi projetado para crescer junto com a organização, oferecendo 
            escalabilidade tanto vertical (em profundidade funcional) quanto horizontal (em abrangência organizacional).
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Esta arquitetura flexível permite que empresas de diferentes tamanhos e setores implementem o sistema 
            de acordo com suas necessidades específicas, começando com aplicações focadas e expandindo gradualmente.
          </p>
        </>
      }
      tags={["Adaptação ao Crescimento", "Flexibilidade Organizacional"]}
      icon={TrendingUp}
    />
  );
};

export default EscalabilidadeTab;
