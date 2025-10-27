
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MobileSubmenuItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const MobileSubmenuItem: React.FC<MobileSubmenuItemProps> = ({
  to,
  icon: Icon,
  label,
  isActive,
  onClick,
  className,
}) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-2 rounded-md hover:bg-primary/10",
        isActive && "bg-primary/10 text-primary",
        className
      )}
      onClick={onClick}
    >
      <Icon className="h-4 w-4 text-primary" />
      {label}
    </Link>
  );
};

export default MobileSubmenuItem;
