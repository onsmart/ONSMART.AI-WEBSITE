
import React from "react";
import WhatsappButton from "@/components/contact/WhatsappButton";
import { Separator } from "@/components/ui/separator";

const WhatsappSection: React.FC = () => {
  return (
    <>
      {/* Seção WhatsApp - Estilo Homepage */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200/50 mb-6">
        <div className="text-center">
          {/* Badge Superior - Estilo Homepage */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/5 text-green-600 px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-green-500/20">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
            </svg>
            Resposta Imediata
          </div>
          
          {/* Título melhorado */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Converse com <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">Especialistas</span>
          </h3>
          
          <p className="text-sm text-gray-600 mb-4">
            Nossa equipe de <span className="font-bold text-green-600">especialistas em IA</span> está pronta para ajudar
          </p>
          
          <div className="flex justify-center mb-4">
            <WhatsappButton 
              phoneNumber="5511996669247"
              message="Olá! Vim pelo site da Onsmart.ai" 
              variant="inline"
            />
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>✓ Resposta em 15min</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>✓ Horário comercial</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>✓ 100% Gratuito</span>
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="my-6" />
    </>
  );
};

export default WhatsappSection;
