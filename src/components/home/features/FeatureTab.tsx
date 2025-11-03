
import React from 'react';
import { TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from 'lucide-react';

interface FeatureTabProps {
  id: string;
  label: string;
  icon: LucideIcon;
}

const FeatureTab: React.FC<FeatureTabProps> = ({ id, label }) => {
  return (
    <TabsTrigger 
      value={id}
      className="group flex items-center justify-center p-3 min-h-[60px] w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-brand-blue/5 dark:hover:bg-brand-blue/10 transition-all duration-300 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-blue/40 shadow-md hover:shadow-lg overflow-hidden data-[state=active]:bg-brand-blue/10 dark:data-[state=active]:bg-brand-blue/20 data-[state=active]:border-brand-blue data-[state=active]:shadow-lg hover:scale-105 transform"
    >
      <div className="text-center">
        <span className="text-sm font-semibold text-gray-900 dark:text-white leading-tight group-hover:text-brand-blue data-[state=active]:text-brand-blue transition-colors">{label}</span>
      </div>
    </TabsTrigger>
  );
};

export default FeatureTab;
