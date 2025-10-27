import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Package, Briefcase, Mail, BookOpen, Building } from "lucide-react";
import MobileMenuItem from "./MobileMenuItem";
import MobileDiagnosticoButton from "./MobileDiagnosticoButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  isConteudoActive,
  isServicosActive,
  isHomeActive,
  isContatoActive,
  isSetoresActive,
  isProdutosActive,
} from "../utils/menuUtils";

interface MobileMenuItemsProps {
  isActive: (path: string) => boolean;
  isActivePrefix: (prefix: string) => boolean;
  onClose: () => void;
}

const MobileMenuItems: React.FC<MobileMenuItemsProps> = ({ 
  isActive, 
  isActivePrefix,
  onClose 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Direct navigation handler that closes the menu after navigating
  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };
  
  // Use centralized active state functions
  const isHomeActiveState = isHomeActive(location.pathname);
  const isProdutosActiveState = isProdutosActive(location.pathname);
  const isServicosActiveState = isServicosActive(location.pathname);
  const isContatoActiveState = isContatoActive(location.pathname);
  const isConteudoActiveState = isConteudoActive(location.pathname);
  const isSetoresActiveState = isSetoresActive(location.pathname);
    
  return (
    <div className="flex flex-col gap-2 animate-in fade-in-0 duration-300">
      <div 
        className={cn(
          "py-2.5 px-3 rounded-lg flex items-center cursor-pointer transition-all duration-200 hover:scale-105 animate-in slide-in-from-left-2 duration-300 delay-100",
          isHomeActiveState && "bg-brand-blue text-white font-medium"
        )}
        onClick={() => handleNavigate("/")}
      >
        <Home className={cn("h-4 w-4 mr-2 transition-all duration-200", isHomeActiveState ? "text-white" : "text-brand-blue")} />
        <span className="font-medium">Início</span>
      </div>
      
      {/* Produtos - Submenu simples */}
      <Accordion type="single" collapsible className="border-none animate-in slide-in-from-left-2 duration-300 delay-200">
        <AccordionItem value="produtos" className="border-none">
          <AccordionTrigger 
            className={cn(
              "py-2.5 px-3 rounded-lg flex items-center transition-all duration-200 hover:scale-105",
              isProdutosActiveState && "bg-brand-blue text-white font-medium"
            )}
            onClick={(e) => {
              if (isProdutosActiveState) {
                e.preventDefault();
                handleNavigate("/agentes-ia");
              }
            }}
          >
            <div className="flex items-center">
              <Package className={cn("h-4 w-4 mr-2", isProdutosActiveState ? "text-white" : "text-brand-blue")} />
              <span className="font-medium">Produtos</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-0 animate-in slide-in-from-top-2 duration-300">
            <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
              <h4 className="px-8 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide animate-in fade-in-0 duration-200 delay-100">
                Nossos Produtos
              </h4>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer transition-all duration-200 hover:translate-x-1 animate-in slide-in-from-left-2 duration-300 delay-200"
                onClick={() => handleNavigate("/agentes-ia")}
              >
                <div className="font-medium">Agentes de IA</div>
                <div className="text-xs text-gray-500">Soluções proprietárias de IA</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer transition-all duration-200 hover:translate-x-1 animate-in slide-in-from-left-2 duration-300 delay-300"
                onClick={() => handleNavigate("/ecossistema-ibm")}
              >
                <div className="font-medium">Ecossistema IBM</div>
                <div className="text-xs text-gray-500">Watson X e Cloud Pak</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer transition-all duration-200 hover:translate-x-1 animate-in slide-in-from-left-2 duration-300 delay-400"
                onClick={() => handleNavigate("/produtos/sonia-assistente-ia")}
              >
                <div className="font-medium">Sonia Assistente IA</div>
                <div className="text-xs text-gray-500">Assistente de IA Especializada</div>
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Serviços - Submenu simples */}
      <Accordion type="single" collapsible className="border-none animate-in slide-in-from-left-2 duration-300 delay-300">
        <AccordionItem value="servicos" className="border-none">
          <AccordionTrigger 
            className={cn(
              "py-2.5 px-3 rounded-lg flex items-center transition-all duration-200 hover:scale-105",
              isServicosActiveState && "bg-brand-blue text-white font-medium"
            )}
            onClick={(e) => {
              if (isServicosActiveState) {
                e.preventDefault();
                handleNavigate("/servicos");
              }
            }}
          >
            <div className="flex items-center">
              <Briefcase className={cn("h-4 w-4 mr-2", isServicosActiveState ? "text-white" : "text-brand-blue")} />
              <span className="font-medium">Serviços</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-0">
            <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer border-b border-gray-100 dark:border-gray-700"
                onClick={() => handleNavigate("/servicos")}
              >
                <div className="font-medium text-brand-blue">Ver Todos os Serviços</div>
                <div className="text-xs text-gray-500">Explore nossa gama completa</div>
              </button>
              
              <h4 className="px-8 py-2 pt-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Principais Serviços
              </h4>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/diagnostico")}
              >
                <div className="font-medium">Diagnóstico de IA</div>
                <div className="text-xs text-gray-500">Avaliação gratuita em 15 min</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/consultoria")}
              >
                <div className="font-medium">Consultoria Especializada</div>
                <div className="text-xs text-gray-500">Estratégia personalizada</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/implementacao")}
              >
                <div className="font-medium">Implementação</div>
                <div className="text-xs text-gray-500">Deploy completo em 30 dias</div>
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Mobile: Conteúdo section with collapsible submenus */}
      <Accordion type="single" collapsible className="border-none animate-in slide-in-from-left-2 duration-300 delay-500">
        <AccordionItem value="conteudo" className="border-none">
          <AccordionTrigger 
            className={cn(
              "py-2.5 px-3 rounded-lg flex items-center transition-all duration-200 hover:scale-105",
              isConteudoActiveState && "bg-brand-blue text-white font-medium"
            )}
            onClick={(e) => {
              if (isConteudoActiveState) {
                e.preventDefault();
                handleNavigate("/conteudo");
              }
            }}
          >
            <div className="flex items-center">
              <BookOpen className={cn("h-4 w-4 mr-2", isConteudoActiveState ? "text-white" : "text-brand-blue")} />
              <span className="font-medium">Conteúdo</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-0">
            <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer border-b border-gray-100 dark:border-gray-700"
                onClick={() => handleNavigate("/conteudo")}
              >
                <div className="font-medium text-brand-blue">Central de Conteúdo</div>
                <div className="text-xs text-gray-500">Hub completo de conhecimento</div>
              </button>
              
              <h4 className="px-8 py-2 pt-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Materiais
              </h4>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/blog")}
              >
                <div className="font-medium">Blog</div>
                <div className="text-xs text-gray-500">Artigos e insights</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/materiais-gratuitos")}
              >
                <div className="font-medium">Materiais Gratuitos</div>
                <div className="text-xs text-gray-500">E-books e whitepapers</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/ferramentas-gratuitas")}
              >
                <div className="font-medium">Ferramentas Gratuitas</div>
                <div className="text-xs text-gray-500">Calculadoras e templates</div>
              </button>
              
              <h4 className="px-8 py-2 pt-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                University
              </h4>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/university/ia-basico")}
              >
                <div className="font-medium">IA Básico</div>
                <div className="text-xs text-gray-500">Fundamentos de IA</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/university/agentes-ia")}
              >
                <div className="font-medium">Agentes de IA</div>
                <div className="text-xs text-gray-500">Curso especializado</div>
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Setores - Submenu simples */}
      <Accordion type="single" collapsible className="border-none animate-in slide-in-from-left-2 duration-300 delay-200">
        <AccordionItem value="setores" className="border-none">
          <AccordionTrigger 
            className={cn(
              "py-2.5 px-3 rounded-lg flex items-center transition-all duration-200 hover:scale-105",
              isSetoresActiveState && "bg-brand-blue text-white font-medium"
            )}
            onClick={(e) => {
              if (isSetoresActiveState) {
                e.preventDefault();
                handleNavigate("/setores");
              }
            }}
          >
            <div className="flex items-center">
              <Building className={cn("h-4 w-4 mr-2", isSetoresActiveState ? "text-white" : "text-brand-blue")} />
              <span className="font-medium">Setores</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-0">
            <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer border-b border-gray-100 dark:border-gray-700"
                onClick={() => handleNavigate("/setores")}
              >
                <div className="font-medium text-brand-blue">Ver Todos os Setores</div>
                <div className="text-xs text-gray-500">Soluções especializadas</div>
              </button>
              
              <h4 className="px-8 py-2 pt-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Principais Setores
              </h4>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/setores/financeiro")}
              >
                <div className="font-medium">Financeiro</div>
                <div className="text-xs text-gray-500">Bancos e fintechs</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/setores/saude")}
              >
                <div className="font-medium">Saúde</div>
                <div className="text-xs text-gray-500">Hospitais e clínicas</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/setores/tecnologia")}
              >
                <div className="font-medium">Tecnologia</div>
                <div className="text-xs text-gray-500">Startups e big techs</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/setores/educacao")}
              >
                <div className="font-medium">Educação</div>
                <div className="text-xs text-gray-500">Escolas e universidades</div>
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div 
        className={cn(
          "py-2.5 px-3 rounded-lg flex items-center cursor-pointer transition-all duration-200 hover:scale-105 animate-in slide-in-from-left-2 duration-300 delay-300",
          isContatoActiveState && "bg-brand-blue text-white font-medium"
        )}
        onClick={() => handleNavigate("/contato")}
      >
        <Mail className={cn("h-4 w-4 mr-2 transition-all duration-200", isContatoActiveState ? "text-white" : "text-brand-blue")} />
        <span className="font-medium">Contato</span>
      </div>
      
      {/* Botão de Agendar Diagnóstico no menu mobile */}
      <div className="mt-2 animate-in slide-in-from-left-2 duration-300 delay-500">
        <MobileDiagnosticoButton onClose={onClose} />
      </div>
    </div>
  );
};

export default MobileMenuItems;