
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import ServicesTab from './ServicesTab';
import MethodologyTab from './MethodologyTab';
import SectorsTab from './SectorsTab';

interface ServicesContentProps {
  activeTab: string;
  handleContactClick: () => void;
}

const ServicesContent: React.FC<ServicesContentProps> = ({ activeTab, handleContactClick }) => {
  return (
    <>
      <TabsContent value="servicos" className="animate-fade-in">
        <ServicesTab handleContactClick={handleContactClick} />
      </TabsContent>

      <TabsContent value="como-funciona" className="animate-fade-in">
        <MethodologyTab handleContactClick={handleContactClick} />
      </TabsContent>

      <TabsContent value="setores" className="animate-fade-in">
        <SectorsTab handleContactClick={handleContactClick} />
      </TabsContent>
    </>
  );
};

export default ServicesContent;
