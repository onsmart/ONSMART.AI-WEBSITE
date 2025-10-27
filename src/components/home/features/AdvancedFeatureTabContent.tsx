
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from 'lucide-react';

interface AdvancedFeatureTabContentProps {
  title: string;
  description: React.ReactNode;
  tags: string[];
  icon: LucideIcon;
}

const AdvancedFeatureTabContent: React.FC<AdvancedFeatureTabContentProps> = ({ 
  title, 
  description, 
  tags, 
  icon: IconComponent 
}) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
          <IconComponent className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl md:text-3xl mb-4">{title}</CardTitle>
        <CardDescription className="text-base text-left max-w-none">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag, idx) => (
            <Badge key={idx} variant="outline" className="bg-primary/5">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedFeatureTabContent;
