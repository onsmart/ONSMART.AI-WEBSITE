
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface CaseItemProps {
  icon: React.ElementType;
  title: string;
  sector: string;
  result: string;
  path: string;
  color: string;
  onClick?: () => void;
  isNew?: boolean;
}

const CaseItem = ({ icon: Icon, title, sector, result, path, color, onClick, isNew }: CaseItemProps) => (
  <Link 
    to={path} 
    className="flex items-start p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative"
    onClick={onClick}
  >
    <div className={cn("flex-shrink-0 mr-3 p-2 rounded-full transition-all group-hover:scale-110", color)}>
      <Icon className="h-5 w-5 text-white" />
    </div>
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <h3 className="font-medium group-hover:text-primary transition-colors">{title}</h3>
        {isNew && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px] py-0 h-4">
            NOVO
          </Badge>
        )}
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400">{sector}</p>
      <p className="text-sm text-primary font-medium mt-1">{result}</p>
    </div>
  </Link>
);

export default CaseItem;
