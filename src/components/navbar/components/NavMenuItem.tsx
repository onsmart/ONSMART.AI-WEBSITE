
import React from "react";
import { cn } from "@/lib/utils";

interface NavMenuItemProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: (e?: React.MouseEvent) => void;
}

const NavMenuItem: React.FC<NavMenuItemProps> = ({ icon: Icon, label, isActive, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(e);
  };

  return (
    <div className="relative group">
      <button 
        onClick={handleClick}
        className={cn(
          "relative px-3 sm:px-4 md:px-5 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm md:text-base whitespace-nowrap",
          isActive 
            ? "text-brand-blue font-semibold" 
            : "text-gray-700 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue"
        )}
      >
        <span className="relative z-10">{label}</span>
        {/* Background hover effect */}
        <span className={cn(
          "absolute inset-0 rounded-lg transition-all duration-300",
          isActive 
            ? "bg-brand-blue/10 dark:bg-brand-blue/20" 
            : "bg-gray-100/0 dark:bg-gray-800/0 group-hover:bg-gray-100/80 dark:group-hover:bg-gray-800/80"
        )} />
        {/* Active indicator */}
        {isActive && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-brand-blue to-blue-600 rounded-full" />
        )}
      </button>
    </div>
  );
};

export default NavMenuItem;
