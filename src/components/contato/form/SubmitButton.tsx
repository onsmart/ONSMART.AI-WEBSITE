
import React from "react";
import { Button } from "@/components/ui/button";
import { Send, Check, Loader2 } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  const { trackCTAClick } = useAnalytics();

  const handleClick = () => {
    if (!isSubmitting) {
      trackCTAClick("submit_contact_form", "contact_form");
    }
  };

  return (
    <>
      <Button 
        type="submit" 
        className="w-full bg-brand-blue hover:bg-brand-blue/80 min-h-[48px]" 
        disabled={isSubmitting}
        aria-describedby="submit-status"
        onClick={handleClick}
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Enviando...</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Send className="mr-2 h-4 w-4" />
            <span>Solicitar Contato</span>
          </div>
        )}
      </Button>
      
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
        <div className="flex items-center justify-center">
          <Check className="h-4 w-4 text-green-500 mr-1" />
          <span>Resposta em até 24 horas úteis</span>
        </div>
      </div>
      
      <div id="submit-status" className="sr-only">
        {isSubmitting ? "Enviando formulário, aguarde..." : "Pronto para enviar"}
      </div>
    </>
  );
};

export default SubmitButton;
