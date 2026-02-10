
import React from "react";
import WhatsappButton from "./WhatsappButton";

interface FloatingWhatsappButtonProps {
  phoneNumber?: string;
  message?: string;
  position?: "bottom-right" | "bottom-left";
}

const FloatingWhatsappButton: React.FC<FloatingWhatsappButtonProps> = ({
  phoneNumber = import.meta.env.VITE_COMPANY_PHONE || "5511996669247",
  message = "Olá! Vim pelo site da Onsmart.ai",
  position = "bottom-right",
}) => {
  const positionClasses = {
    "bottom-right": "",
    "bottom-left": "right-auto left-6",
  };
  
  return (
    <WhatsappButton
      phoneNumber={phoneNumber}
      message={message}
      variant="floating"
      className={positionClasses[position]}
    />
  );
};

export default FloatingWhatsappButton;
