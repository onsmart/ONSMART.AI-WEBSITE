
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <div className="flex justify-center">
      <Button 
        type="submit" 
        disabled={isSubmitting}
        size="lg"
        className="bg-[#1844E3] hover:bg-[#1844E3]/80 text-white font-semibold text-lg px-10 min-w-[200px]"
        aria-describedby="submit-status"
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            <span>Enviando...</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            <span>Solicitar Diagnóstico</span>
          </div>
        )}
      </Button>
      <div id="submit-status" className="sr-only">
        {isSubmitting ? "Enviando formulário, aguarde..." : "Pronto para enviar"}
      </div>
    </div>
  );
};

export default SubmitButton;
