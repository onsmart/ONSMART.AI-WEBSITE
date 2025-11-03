
import { cloneElement } from "react";
import { cn } from "@/lib/utils";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { handleContentClick } from "../utils/menuUtils";

interface DropdownMenuItemProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onMenuItemClick: () => void;
  navigateTo: (path: string, e?: React.MouseEvent) => void;
  path: string;
  children: React.ReactNode;
  contentWidth?: string;
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  icon: Icon,
  label,
  isActive,
  isOpen,
  onOpenChange,
  onMenuItemClick,
  navigateTo,
  path,
  children,
  contentWidth = "w-[480px]"
}) => {
  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isActive && !isOpen) {
      // If we're on this page and dropdown is closed, navigate to it
      navigateTo(path, e);
    } else if (!isOpen) {
      // If we're not on this page, open dropdown
      onOpenChange(true);
    }
  };

  const handleMouseEnter = () => {
    onOpenChange(true);
  };

  const handleMouseLeave = () => {
    onOpenChange(false);
  };

  return (
    <NavigationMenuItem>
      <DropdownMenu open={isOpen} onOpenChange={onOpenChange} modal={false}>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex items-center px-2.5 sm:px-3 md:px-3.5 py-2 rounded-md transition-all duration-200 font-medium text-sm sm:text-base whitespace-nowrap",
                isActive && !isOpen 
                  ? "text-brand-blue" 
                  : "text-gray-700 hover:text-brand-blue",
                isOpen && "text-brand-blue"
              )}
              onClick={handleTriggerClick}
            >
              {label}
              <ChevronDown className={cn(
                "h-4 w-4 ml-1 flex-shrink-0 transition-transform duration-200",
                isActive && !isOpen 
                  ? "text-brand-blue" 
                  : "text-gray-700",
                isOpen && "text-brand-blue rotate-180"
              )} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className={cn(contentWidth, "p-0 bg-white dark:bg-gray-900 z-[101]")}
            onClick={handleContentClick}
            align="center"
            sideOffset={10}
            avoidCollisions={true}
            collisionPadding={20}
          >
            {cloneElement(children as React.ReactElement, { onMenuItemClick })}
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </NavigationMenuItem>
  );
};

export default DropdownMenuItem;
