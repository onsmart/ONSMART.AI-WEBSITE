
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import OrquestracaoTab from "./OrquestracaoTab";
import CognicaoTab from "./CognicaoTab";
import InteroperabilidadeTab from "./InteroperabilidadeTab";
import AprendizagemTab from "./AprendizagemTab";
import InterfacesTab from "./InterfacesTab";
import OtimizacaoTab from "./OtimizacaoTab";
import EscalabilidadeTab from "./EscalabilidadeTab";

interface FeaturesTabsContentProps {
  activeTab: string;
}

const FeaturesTabsContent: React.FC<FeaturesTabsContentProps> = ({ activeTab }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-sm min-h-[300px]">
      <TabsContent value="orquestracao" className="mt-0">
        <OrquestracaoTab />
      </TabsContent>
      
      <TabsContent value="cognicao" className="mt-0">
        <CognicaoTab />
      </TabsContent>
      
      <TabsContent value="interoperabilidade" className="mt-0">
        <InteroperabilidadeTab />
      </TabsContent>
      
      <TabsContent value="aprendizagem" className="mt-0">
        <AprendizagemTab />
      </TabsContent>
      
      <TabsContent value="interfaces" className="mt-0">
        <InterfacesTab />
      </TabsContent>
      
      <TabsContent value="otimizacao" className="mt-0">
        <OtimizacaoTab />
      </TabsContent>
      
      <TabsContent value="escalabilidade" className="mt-0">
        <EscalabilidadeTab />
      </TabsContent>
    </div>
  );
};

export default FeaturesTabsContent;
