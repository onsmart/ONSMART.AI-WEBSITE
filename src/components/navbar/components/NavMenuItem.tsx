
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
          "relative px-4 md:px-5 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm md:text-base whitespace-nowrap",
          "hover:scale-[1.02] active:scale-[0.98]",
          isActive 
            ? "text-brand-blue font-semibold" 
            : "text-gray-700 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue"
        )}
      >
        <span className="relative z-10">{label}</span>
        {/* Background hover effect with gradient */}
        <span className={cn(
          "absolute inset-0 rounded-xl transition-all duration-200",
          isActive 
            ? "bg-gradient-to-br from-brand-blue/12 via-brand-blue/8 to-brand-blue/12 dark:from-brand-blue/20 dark:via-brand-blue/15 dark:to-brand-blue/20" 
            : "bg-gradient-to-br from-gray-100/0 via-gray-50/0 to-gray-100/0 dark:from-gray-800/0 dark:via-gray-800/0 dark:to-gray-800/0 group-hover:from-brand-blue/8 group-hover:via-brand-blue/5 group-hover:to-brand-blue/8 dark:group-hover:from-brand-blue/15 dark:group-hover:via-brand-blue/10 dark:group-hover:to-brand-blue/15"
        )} />
        {/* Active indicator with gradient */}
        {isActive && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-gradient-to-r from-transparent via-brand-blue to-transparent rounded-full shadow-sm shadow-brand-blue/50" />
        )}
      </button>
    </div>
  );
};

export default NavMenuItem;
