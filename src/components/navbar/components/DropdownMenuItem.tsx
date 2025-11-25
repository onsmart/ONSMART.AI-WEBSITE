
import { cloneElement, useEffect, useRef } from "react";
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

  // Remover qualquer elemento que possa estar criando parênteses após o carregamento
  useEffect(() => {
    const removeParentheses = () => {
      if (!buttonRef.current) return;

      const button = buttonRef.current;
      // Forçar remoção via inline styles
      button.style.setProperty('--before-content', 'none', 'important');
      button.style.setProperty('--after-content', 'none', 'important');
      
      // Remover elementos filhos que contenham apenas parênteses
      const children = button.querySelectorAll('*');
      children.forEach((child) => {
        const childEl = child as HTMLElement;
        const text = childEl.textContent?.trim() || '';
        // Se contém apenas parênteses, remover
        if (text.match(/^[\[\]()]+$/) && text.length > 0) {
          childEl.remove();
        }
      });
      
      // Verificar se o próprio botão ou seus irmãos contêm parênteses
      const parent = button.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children);
        siblings.forEach((sibling) => {
          if (sibling !== button) {
            const text = sibling.textContent?.trim() || '';
            if (text.match(/^[\[\]()]+$/) && text.length > 0) {
              (sibling as HTMLElement).style.display = 'none';
              (sibling as HTMLElement).style.visibility = 'hidden';
              (sibling as HTMLElement).style.opacity = '0';
              (sibling as HTMLElement).style.width = '0';
              (sibling as HTMLElement).style.height = '0';
            }
          }
        });
      }
    };

    // Executar múltiplas vezes para capturar elementos criados dinamicamente
    removeParentheses();
    const timeouts = [
      setTimeout(removeParentheses, 50),
      setTimeout(removeParentheses, 100),
      setTimeout(removeParentheses, 200),
      setTimeout(removeParentheses, 500),
      setTimeout(removeParentheses, 1000),
    ];

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <DropdownMenu open={isOpen} onOpenChange={onOpenChange} modal={false}>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <DropdownMenuTrigger asChild>
            <button
              ref={buttonRef}
              className={cn(
                "flex items-center px-1.5 sm:px-2 md:px-2.5 py-2 rounded-md transition-all duration-200 font-medium text-sm md:text-base whitespace-nowrap",
                "no-parentheses-forced", // Classe para forçar remoção de parênteses
                "dropdown-menu-item-no-brackets", // Classe específica para remover parênteses
                isActive && !isOpen 
                  ? "text-brand-blue" 
                  : "text-gray-700 hover:text-brand-blue",
                isOpen && "text-brand-blue"
              )}
              onClick={handleTriggerClick}
              style={{
                // Forçar remoção de pseudo-elementos via inline style
                '--before-content': 'none !important',
                '--after-content': 'none !important',
                position: 'relative',
              } as React.CSSProperties}
            >
              {label}
              <ChevronDown className={cn(
                "h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1 flex-shrink-0 transition-transform duration-200",
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
    </div>
  );
};

export default DropdownMenuItem;
