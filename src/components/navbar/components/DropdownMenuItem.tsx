
import { cloneElement, useRef, memo, useCallback } from "react";
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

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = memo(({
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
  const handleTriggerClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isActive && !isOpen) {
      // If we're on this page and dropdown is closed, navigate to it
      navigateTo(path, e);
    } else if (!isOpen) {
      // If we're not on this page, open dropdown
      onOpenChange(true);
    }
  }, [isActive, isOpen, navigateTo, path, onOpenChange]);

  const handleMouseEnter = useCallback(() => {
    onOpenChange(true);
  }, [onOpenChange]);

  const handleMouseLeave = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

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
                "relative flex items-center px-4 md:px-5 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm md:text-base whitespace-nowrap outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 border-0",
                "hover:scale-[1.02] active:scale-[0.98]",
                isActive && !isOpen 
                  ? "text-brand-blue font-semibold" 
                  : "text-gray-700 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue",
                isOpen && "text-brand-blue font-semibold"
              )}
              onClick={handleTriggerClick}
              style={{ boxShadow: 'none', outline: 'none' }}
            >
              <span className="relative z-10">{label}</span>
              {/* Background hover effect with gradient */}
              <span className={cn(
                "absolute inset-0 rounded-xl transition-all duration-200",
                (isActive || isOpen)
                  ? "bg-gradient-to-br from-brand-blue/12 via-brand-blue/8 to-brand-blue/12 dark:from-brand-blue/20 dark:via-brand-blue/15 dark:to-brand-blue/20" 
                  : "bg-gradient-to-br from-gray-100/0 via-gray-50/0 to-gray-100/0 dark:from-gray-800/0 dark:via-gray-800/0 dark:to-gray-800/0 group-hover:from-brand-blue/8 group-hover:via-brand-blue/5 group-hover:to-brand-blue/8 dark:group-hover:from-brand-blue/15 dark:group-hover:via-brand-blue/10 dark:group-hover:to-brand-blue/15"
              )} />
              <ChevronDown className={cn(
                "relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1.5 flex-shrink-0 transition-all duration-200",
                isActive && !isOpen 
                  ? "text-brand-blue" 
                  : "text-gray-600 dark:text-gray-400 group-hover:text-brand-blue/80",
                isOpen && "text-brand-blue rotate-180"
              )} />
              {/* Active indicator with gradient */}
              {(isActive || isOpen) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-gradient-to-r from-transparent via-brand-blue to-transparent rounded-full shadow-sm shadow-brand-blue/50" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className={cn(
              contentWidth, 
              "p-0 bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 z-[101] rounded-2xl overflow-hidden"
            )}
            style={{
              boxShadow: '0 10px 40px -10px rgba(121, 185, 234, 0.15), 0 4px 16px -4px rgba(12, 13, 14, 0.1), 0 0 0 1px rgba(121, 185, 234, 0.05)'
            }}
            onClick={handleContentClick}
            align="center"
            sideOffset={12}
            avoidCollisions={true}
            collisionPadding={20}
          >
            {cloneElement(children as React.ReactElement, { onMenuItemClick })}
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  );
});

DropdownMenuItem.displayName = 'DropdownMenuItem';

export default DropdownMenuItem;
