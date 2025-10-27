
import React from "react";
import { Network } from "lucide-react";
import AdvancedFeatureTabContent from "./AdvancedFeatureTabContent";

const OrquestracaoTab: React.FC = () => {
  return (
    <AdvancedFeatureTabContent
      title="Orquestração Multi-Agente"
      description={
        <>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            O VIBE Enterprise implementa um sistema central de orquestração que coordena diversos agentes especializados, 
            cada um com funções específicas, mas operando de forma integrada.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Esta arquitetura permite que agentes com diferentes capacidades e especializações trabalhem 
            em conjunto para resolver problemas complexos, compartilhando informações e recursos de maneira eficiente.
          </p>
        </>
      }
      tags={["Coordenação Inteligente", "Colaboração Homem-Máquina"]}
      icon={Network}
    />
  );
};

export default OrquestracaoTab;
