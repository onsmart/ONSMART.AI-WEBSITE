
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface IndustryCategoryProps {
  icon: React.ElementType;
  name: string;
  description: string;
  features: {icon: React.ElementType, text: string}[];
  caseCount: number;
  path: string;
  bgColor: string;
  onClick?: () => void;
}

const IndustryCategory = ({ 
  icon: Icon,
  name, 
  description, 
  features,
  caseCount,
  path, 
  bgColor,
  onClick 
}: IndustryCategoryProps) => (
  <Link 
    to={path} 
    onClick={onClick}
    className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md hover:-translate-y-1"
  >
    <div className={cn("p-4", bgColor)}>
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-full">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">{name}</h3>
          <p className="text-xs text-white/90">{caseCount} estudos de caso</p>
        </div>
      </div>
    </div>
    <div className="p-4 flex-1 flex flex-col">
      <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{description}</p>
      <div className="space-y-2 mb-3 flex-1">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center text-left gap-2">
            <feature.icon className="h-3.5 w-3.5 text-primary flex-shrink-0" />
            <span className="text-xs">{feature.text}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center text-primary text-xs font-medium">
        <span>Ver casos</span>
        <ArrowRight className="h-3.5 w-3.5 ml-1" />
      </div>
    </div>
  </Link>
);

export default IndustryCategory;
