
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  color?: string;
  handleContactClick: () => void;
  animationDelay?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  features = [],
  color = "primary",
  handleContactClick,
  animationDelay = "0s"
}) => (
  <Card 
    className="hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden group border border-gray-200 dark:border-gray-800 animate-fade-in hover:translate-y-[-5px]" 
    style={{ animationDelay }}
  >
    <div className={`h-2 w-full bg-${color}`}></div>
    <CardHeader>
      <div className={`inline-flex p-3 rounded-lg bg-${color}/10 mb-4 group-hover:bg-${color}/20 transition-all duration-300 group-hover:scale-110`}>
        <Icon className={`h-6 w-6 text-${color}`} />
      </div>
      <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow space-y-4">
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
      {features.length > 0 && (
        <ul className="space-y-2 mt-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 hover:translate-x-1 transition-transform">
              <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </CardContent>
    <CardFooter className="pt-4 border-t border-gray-100 dark:border-gray-800">
      <Button 
        onClick={handleContactClick}
        className="w-full group-hover:translate-y-[-2px] transition-all bg-brand-blue text-white hover:bg-brand-blue/90 font-semibold"
      >
        <span>Solicitar Proposta</span> <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </CardFooter>
  </Card>
);

export default ServiceCard;
