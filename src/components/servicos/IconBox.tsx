
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconBoxProps {
  icon: LucideIcon;
  title: string;
  color?: string;
}

const IconBox: React.FC<IconBoxProps> = ({ icon: Icon, title, color = "primary" }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-all hover:translate-y-[-2px] cursor-pointer animate-fade-in">
    <div className={`inline-flex p-3 rounded-full bg-${color}/10 mb-3 transition-transform hover:scale-110`}>
      <Icon className={`h-6 w-6 text-${color}`} />
    </div>
    <h3 className="font-medium text-sm hover:text-primary transition-colors">{title}</h3>
  </div>
);

export default IconBox;
