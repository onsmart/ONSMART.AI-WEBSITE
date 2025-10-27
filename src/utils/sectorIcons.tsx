import React from 'react';
import { 
  Heart, 
  Calculator, 
  Home, 
  ShoppingBag, 
  Scale, 
  Landmark, 
  Radio, 
  Store, 
  Factory, 
  Stethoscope,
  Building
} from 'lucide-react';

/**
 * Map sector slugs to Lucide React icons
 * This follows the same pattern as the products section
 */
export const getSectorIcon = (slug: string): React.ComponentType<any> => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    'clinicas-saude': Heart,
    'escritorios-contabilidade': Calculator,
    'setor-imobiliario': Home,
    'comercio': ShoppingBag,
    'advocacia': Scale,
    'bancos': Landmark,
    'telecomunicacoes': Radio,
    'varejo': Store,
    'industria': Factory,
    'saude': Stethoscope,
  };
  
  return iconMap[slug] || Building;
};

/**
 * Render sector icon with consistent styling
 */
interface SectorIconProps {
  slug: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const SectorIcon: React.FC<SectorIconProps> = ({ 
  slug, 
  size = 'md', 
  className = '' 
}) => {
  const IconComponent = getSectorIcon(slug);
  
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

