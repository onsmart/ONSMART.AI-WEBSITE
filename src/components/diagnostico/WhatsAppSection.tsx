
import React from "react";
import { Separator } from "@/components/ui/separator";
import WhatsappButton from "@/components/contact/WhatsappButton";
import DiagnosticQuestionnaire from "./DiagnosticQuestionnaire";

interface WhatsAppSectionProps {
  className?: string;
  position?: "top" | "bottom";
}

const WhatsAppSection: React.FC<WhatsAppSectionProps> = ({ 
  className = "", 
  position = "top" 
}) => {
  return (
    <>
      {position === "top" && (
        <div className={`mb-6 ${className}`}>
          <DiagnosticQuestionnaire />
        </div>
      )}
      
      {position === "bottom" && <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="font-medium mb-3">Prefere contato imediato?</p>
        <div className="flex justify-center">
          <WhatsappButton 
            phoneNumber="5511996669247"
            message="Olá! Vim pelo site da Onsmart.ai" 
          />
        </div>
      </div>}
      
      {position === "top" && <Separator className="my-8" />}
    </>
  );
};

export default WhatsAppSection;
