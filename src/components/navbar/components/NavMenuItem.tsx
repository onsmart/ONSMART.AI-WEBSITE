
import React from "react";
import { cn } from "@/lib/utils";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";

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
    <NavigationMenuItem>
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
    </NavigationMenuItem>
  );
};

export default NavMenuItem;
