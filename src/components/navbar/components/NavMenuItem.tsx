
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
    <div className="relative">
      <button 
        onClick={handleClick}
        className={cn(
          "px-2.5 sm:px-3 md:px-3.5 py-2 rounded-md transition-all duration-200 font-medium text-sm sm:text-base whitespace-nowrap",
          isActive 
            ? "text-brand-blue" 
            : "text-gray-700 hover:text-brand-blue"
        )}
      >
        {label}
      </button>
    </div>
  );
};

export default NavMenuItem;
