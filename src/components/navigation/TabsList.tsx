
import React from 'react';
import { TabsList as ShadcnTabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TabData {
  value: string;
  label: string;
  icon: LucideIcon;
}

interface TabsListProps {
  activeTab: string;
  tabs: TabData[];
  className?: string;
  iconOnly?: boolean;
  onTabChange?: (value: string) => void;
}

const TabsList: React.FC<TabsListProps> = ({ 
  activeTab, 
  tabs,
  className,
  iconOnly = false,
  onTabChange
}) => {
  const handleTabClick = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <ShadcnTabsList className={cn(
      "grid grid-cols-2 md:flex mb-8 bg-gray-100 dark:bg-gray-800",
      className
    )}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <TabsTrigger 
            key={tab.value}
            value={tab.value} 
            onClick={() => handleTabClick(tab.value)}
            className="flex gap-2 items-center data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <Icon className="h-4 w-4" />
            {!iconOnly && <span className="hidden md:inline">{tab.label}</span>}
          </TabsTrigger>
        );
      })}
    </ShadcnTabsList>
  );
};

export default TabsList;
