import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation('navigation');
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
        <span className="font-medium">{t('menu.home')}</span>
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
              <span className="font-medium">{t('menu.products')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-0 animate-in slide-in-from-top-2 duration-300">
            <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
              <h4 className="px-8 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide animate-in fade-in-0 duration-200 delay-100">
                {t('menu.ourProducts')}
              </h4>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer transition-all duration-200 hover:translate-x-1 animate-in slide-in-from-left-2 duration-300 delay-200"
                onClick={() => handleNavigate("/agentes-ia")}
              >
                <div className="font-medium">{t('menu.aiAgents')}</div>
                <div className="text-xs text-gray-500">{t('menu.proprietaryAISolutions')}</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer transition-all duration-200 hover:translate-x-1 animate-in slide-in-from-left-2 duration-300 delay-300"
                onClick={() => handleNavigate("/ecossistema-ibm")}
              >
                <div className="font-medium">{t('menu.ibmEcosystem')}</div>
                <div className="text-xs text-gray-500">{t('menu.watsonXCloudPak')}</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer transition-all duration-200 hover:translate-x-1 animate-in slide-in-from-left-2 duration-300 delay-400"
                onClick={() => handleNavigate("/produtos/sonia-assistente-ia")}
              >
                <div className="font-medium">{t('menu.soniaAssistant')}</div>
                <div className="text-xs text-gray-500">{t('menu.specializedAIAssistant')}</div>
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
              <span className="font-medium">{t('menu.services')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-0">
            <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer border-b border-gray-100 dark:border-gray-700"
                onClick={() => handleNavigate("/servicos")}
              >
                <div className="font-medium text-brand-blue">{t('menu.viewAllServices')}</div>
                <div className="text-xs text-gray-500">{t('menu.exploreFullRange')}</div>
              </button>
              
              <h4 className="px-8 py-2 pt-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('menu.mainServices')}
              </h4>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/diagnostico")}
              >
                <div className="font-medium">{t('menu.aiDiagnostic')}</div>
                <div className="text-xs text-gray-500">{t('menu.freeEvaluation15min')}</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/consultoria")}
              >
                <div className="font-medium">{t('menu.specializedConsulting')}</div>
                <div className="text-xs text-gray-500">{t('menu.personalizedStrategy')}</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/implementacao")}
              >
                <div className="font-medium">{t('menu.implementation')}</div>
                <div className="text-xs text-gray-500">{t('menu.fullDeploy30days')}</div>
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
              <span className="font-medium">{t('menu.content')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-0">
            <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer border-b border-gray-100 dark:border-gray-700"
                onClick={() => handleNavigate("/conteudo")}
              >
                <div className="font-medium text-brand-blue">{t('menu.contentHub')}</div>
                <div className="text-xs text-gray-500">{t('menu.completeKnowledgeHub')}</div>
              </button>
              
              <h4 className="px-8 py-2 pt-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('menu.materials')}
              </h4>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/blog")}
              >
                <div className="font-medium">{t('menu.blog')}</div>
                <div className="text-xs text-gray-500">{t('menu.articlesInsights')}</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/materiais-gratuitos")}
              >
                <div className="font-medium">{t('menu.freeMaterials')}</div>
                <div className="text-xs text-gray-500">{t('menu.ebooksWhitepapers')}</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/ferramentas-gratuitas")}
              >
                <div className="font-medium">{t('menu.freeTools')}</div>
                <div className="text-xs text-gray-500">{t('menu.calculatorsTemplates')}</div>
              </button>
              
              <h4 className="px-8 py-2 pt-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('menu.university')}
              </h4>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/university/ia-basico")}
              >
                <div className="font-medium">{t('menu.basicAI')}</div>
                <div className="text-xs text-gray-500">{t('menu.aiFundamentals')}</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/university/agentes-ia")}
              >
                <div className="font-medium">{t('menu.aiAgentsCourse')}</div>
                <div className="text-xs text-gray-500">{t('menu.specializedCourse')}</div>
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
              <span className="font-medium">{t('menu.sectors')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-0">
            <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer border-b border-gray-100 dark:border-gray-700"
                onClick={() => handleNavigate("/setores")}
              >
                <div className="font-medium text-brand-blue">{t('menu.viewAllSectors')}</div>
                <div className="text-xs text-gray-500">{t('menu.specializedSolutions')}</div>
              </button>
              
              <h4 className="px-8 py-2 pt-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('menu.mainSectors')}
              </h4>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/setores/financeiro")}
              >
                <div className="font-medium">{t('menu.financial')}</div>
                <div className="text-xs text-gray-500">{t('menu.banksFintechs')}</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/setores/saude")}
              >
                <div className="font-medium">{t('menu.health')}</div>
                <div className="text-xs text-gray-500">{t('menu.hospitalsClinics')}</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/setores/tecnologia")}
              >
                <div className="font-medium">{t('menu.technology')}</div>
                <div className="text-xs text-gray-500">{t('menu.startupsBigTechs')}</div>
              </button>
              <button 
                type="button"
                className="w-full text-left px-8 py-2 text-sm rounded-md hover:bg-brand-blue/10 cursor-pointer"
                onClick={() => handleNavigate("/setores/educacao")}
              >
                <div className="font-medium">{t('menu.education')}</div>
                <div className="text-xs text-gray-500">{t('menu.schoolsUniversities')}</div>
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
        <span className="font-medium">{t('menu.contact')}</span>
      </div>
      
      {/* Botão de Agendar Diagnóstico no menu mobile */}
      <div className="mt-2 animate-in slide-in-from-left-2 duration-300 delay-500">
        <MobileDiagnosticoButton onClose={onClose} />
      </div>
    </div>
  );
};

export default MobileMenuItems;