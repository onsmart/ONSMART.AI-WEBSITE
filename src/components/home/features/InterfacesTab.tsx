
import React from "react";
import { Smartphone } from "lucide-react";
import AdvancedFeatureTabContent from "./AdvancedFeatureTabContent";

const InterfacesTab: React.FC = () => {
  return (
    <AdvancedFeatureTabContent
      title="Interfaces Adaptativas"
      description={
        <>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Reconhecendo a diversidade de usuários dentro de uma organização, o VIBE Enterprise implementa 
            interfaces adaptativas capazes de interagir com stakeholders em diferentes níveis de sofisticação técnica.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            A capacidade de comunicação multimodal permite que os agentes interajam através de texto, voz, 
            visualizações e outros formatos, adaptando-se às preferências e necessidades específicas de cada usuário.
          </p>
        </>
      }
      tags={["Personalização Automática", "Comunicação Multimodal"]}
      icon={Smartphone}
    />
  );
};

export default InterfacesTab;
