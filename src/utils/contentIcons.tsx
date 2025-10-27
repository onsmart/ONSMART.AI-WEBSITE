import React from 'react';
import { 
  FileText, 
  BookOpen, 
  Calculator, 
  GraduationCap,
  Folder
} from 'lucide-react';

/**
 * Map content categories to Lucide React icons
 * This follows the same pattern as the sectors section
 */
export const getContentIcon = (category: string, slug?: string): React.ComponentType<any> => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    'blog': FileText,
    'material': BookOpen,
    'ferramenta': Calculator,
    'university': GraduationCap,
  };
  
  return iconMap[category] || Folder;
};

/**
 * Render content icon with consistent styling
 */
interface ContentIconProps {
  category: string;
  slug?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ContentIcon: React.FC<ContentIconProps> = ({ 
  category, 
  slug,
  size = 'md', 
  className = '' 
}) => {
  const IconComponent = getContentIcon(category, slug);
  
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

