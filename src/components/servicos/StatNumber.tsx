
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatNumberProps {
  number: string;
  label: string;
  icon: LucideIcon;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const StatNumber: React.FC<StatNumberProps> = ({ 
  number, 
  label, 
  icon: Icon, 
  color = "primary", 
  className = "",
  style = {}
}) => (
  <div 
    className={`flex flex-col items-center p-5 bg-white dark:bg-gray-800/70 rounded-lg shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px] ${className}`} 
    style={style}
  >
    <div className={`p-3 rounded-full bg-${color}/10 mb-3 transition-transform hover:scale-110`}>
      <Icon className={`h-6 w-6 text-${color}`} />
    </div>
    <div className="text-3xl font-bold mb-1 transition-colors hover:text-primary">{number}</div>
    <div className="text-sm text-gray-600 dark:text-gray-400 text-center">{label}</div>
  </div>
);

export default StatNumber;
