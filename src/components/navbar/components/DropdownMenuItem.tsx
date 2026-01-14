
import { cloneElement, useRef } from "react";
import { cn } from "@/lib/utils";
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
  icon,
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

  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative group" ref={containerRef}>
      <DropdownMenu open={isOpen} onOpenChange={onOpenChange} modal={false}>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <DropdownMenuTrigger asChild>
            <button
              ref={buttonRef}
              className={cn(
                "relative flex items-center px-3 sm:px-4 md:px-5 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm md:text-base whitespace-nowrap",
                isActive && !isOpen 
                  ? "text-brand-blue font-semibold" 
                  : "text-gray-700 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue",
                isOpen && "text-brand-blue font-semibold"
              )}
              onClick={handleTriggerClick}
            >
              <span className="relative z-10">{label}</span>
              {/* Background hover effect */}
              <span className={cn(
                "absolute inset-0 rounded-lg transition-all duration-300",
                (isActive || isOpen)
                  ? "bg-brand-blue/10 dark:bg-brand-blue/20" 
                  : "bg-gray-100/0 dark:bg-gray-800/0 group-hover:bg-gray-100/80 dark:group-hover:bg-gray-800/80"
              )} />
              <ChevronDown className={cn(
                "relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1.5 flex-shrink-0 transition-all duration-300",
                isActive && !isOpen 
                  ? "text-brand-blue" 
                  : "text-gray-600 dark:text-gray-400",
                isOpen && "text-brand-blue rotate-180"
              )} />
              {/* Active indicator */}
              {(isActive || isOpen) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-brand-blue to-blue-600 rounded-full" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className={cn(contentWidth, "p-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border border-gray-200/50 dark:border-gray-800/50 z-[101] rounded-xl overflow-hidden")}
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
    </div>
  );
};

export default DropdownMenuItem;
