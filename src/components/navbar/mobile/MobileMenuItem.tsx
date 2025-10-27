
import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MobileMenuItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({
  to,
  icon: Icon,
  label,
  isActive,
  onClick,
}) => {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
    onClick(); // Close the menu
  };
  
  return (
    <div 
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer",
        isActive ? "bg-primary text-white font-medium" : "hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
      onClick={handleClick}
    >
      <Icon className="h-4 w-4 text-primary" />
      {label}
    </div>
  );
};

export default MobileMenuItem;
