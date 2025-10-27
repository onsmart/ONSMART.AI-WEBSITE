
import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface MobileDiagnosticoButtonProps {
  onClose: () => void;
}

const MobileDiagnosticoButton: React.FC<MobileDiagnosticoButtonProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleClick = () => {
    onClose();
    
    if (location.pathname === "/diagnostico") {
      // If already on diagnostico page, just scroll to form
      const formElement = document.getElementById('diagnostico-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to diagnostico page
      navigate("/diagnostico");
      // Use setTimeout to ensure page loads before scrolling
      setTimeout(() => {
        const formElement = document.getElementById('diagnostico-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };
  
  return (
    <div className="mt-4">
      <Button 
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold border-2 border-orange-500 hover:border-orange-400 transition-all duration-300"
        onClick={handleClick}
      >
        <Calendar className="h-4 w-4 mr-2" />
        Agendar Diagnóstico
      </Button>
    </div>
  );
};

export default MobileDiagnosticoButton;
