import React from 'react';
import { 
  Heart, 
  Calculator, 
  Home, 
  ShoppingBag, 
  Landmark,
  Building
} from 'lucide-react';

/**
 * Map case industries to Lucide React icons
 * This follows the same pattern as the sectors section
 */
export const getCaseIcon = (industry: string): React.ComponentType<any> => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    'Saúde': Heart,
    'Contabilidade': Calculator,
    'Imobiliário': Home,
    'Varejo': ShoppingBag,
    'Financeiro': Landmark,
  };
  
  return iconMap[industry] || Building;
};

/**
 * Render case icon with consistent styling
 */
interface CaseIconProps {
  industry: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CaseIcon: React.FC<CaseIconProps> = ({ 
  industry, 
  size = 'md', 
  className = '' 
}) => {
  const IconComponent = getCaseIcon(industry);
  
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-lg',
    lg: 'w-12 h-12 rounded-xl',
    xl: 'w-16 h-16 rounded-xl'
  };
  
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  };
  
  return (
    <div className={`${sizeClasses[size]} bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors ${className}`}>
      <IconComponent className={`${iconSizes[size]} text-primary`} />
    </div>
  );
};

