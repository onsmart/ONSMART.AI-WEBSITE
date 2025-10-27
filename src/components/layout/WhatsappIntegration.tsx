
import React, { useEffect, useState } from "react";
import FloatingWhatsappButton from "@/components/contact/FloatingWhatsappButton";

const WhatsappIntegration: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show button after 3 seconds to avoid immediate distraction
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    // Hide/show based on scroll position
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = 200;
      
      setIsVisible(scrolled > threshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!showButton || !isVisible) return null;

  return (
    <FloatingWhatsappButton
      phoneNumber="5511996669247"
      message="Olá! Visitei o site da onsmart e gostaria de saber mais sobre como os Agentes de IA podem transformar minha empresa. Podem me ajudar?"
      position="bottom-right"
    />
  );
};

export default WhatsappIntegration;
