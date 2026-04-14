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
import { useHasPublishedFerramentas } from "@/hooks/useHasPublishedFerramentas";

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
  const { hasFerramentas } = useHasPublishedFerramentas();

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
          "relative py-3 px-4 rounded-xl flex items-center cursor-pointer transition-all duration-300 group animate-in slide-in-from-left-2 duration-300 delay-100",
          isHomeActiveState 
            ? "bg-gradient-to-r from-brand-blue to-blue-600 text-white font-semibold shadow-lg" 
            : "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 hover:shadow-md"
        )}
        onClick={() => handleNavigate("/")}
      >
        <div className={cn(
          "p-1.5 rounded-lg mr-3 transition-all duration-300",
          isHomeActiveState 
            ? "bg-white/20" 
            : "bg-brand-blue/10 dark:bg-brand-blue/20 group-hover:bg-brand-blue/20"
        )}>
          <Home className={cn("h-4 w-4 transition-all duration-300", isHomeActiveState ? "text-white" : "text-brand-blue")} />
        </div>
        <span className={cn("font-medium transition-colors", isHomeActiveState ? "text-white" : "text-gray-900 dark:text-gray-100")}>{t('menu.home')}</span>
        {isHomeActiveState && (
          <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        )}
      </div>
      
      {/* Produtos - Submenu simples */}
      <Accordion type="single" collapsible className="border-none animate-in slide-in-from-left-2 duration-300 delay-200">
        <AccordionItem value="produtos" className="border-none">
          <AccordionTrigger 
            className={cn(
              "relative py-3 px-4 rounded-xl flex items-center transition-all duration-300 group hover:no-underline",
              isProdutosActiveState 
                ? "bg-gradient-to-r from-brand-blue to-blue-600 text-white font-semibold shadow-lg" 
                : "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 hover:shadow-md"
            )}
            onClick={(e) => {
              if (isProdutosActiveState) {
                e.preventDefault();
                handleNavigate("/agentes-ia");
              }
            }}
          >
            <div className="flex items-center w-full">
              <div className={cn(
                "p-1.5 rounded-lg mr-3 transition-all duration-300",
                isProdutosActiveState 
                  ? "bg-white/20" 
                  : "bg-brand-blue/10 dark:bg-brand-blue/20 group-hover:bg-brand-blue/20"
              )}>
                <Package className={cn("h-4 w-4 transition-all duration-300", isProdutosActiveState ? "text-white" : "text-brand-blue")} />
              </div>
              <span className={cn("font-medium transition-colors", isProdutosActiveState ? "text-white" : "text-gray-900 dark:text-gray-100")}>{t('menu.products')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-3 pb-0 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-3 mt-2 border border-gray-200/50 dark:border-gray-700/50">
              <h4 className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider animate-in fade-in-0 duration-200 delay-100">
                {t('menu.ourProducts')}
              </h4>
              <div className="space-y-1">
                <button 
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20 animate-in slide-in-from-left-2 duration-300 delay-200"
                  onClick={() => handleNavigate("/agentes-ia")}
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{t('menu.aiAgents')}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.proprietaryAISolutions')}</div>
                </button>
                <button 
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20 animate-in slide-in-from-left-2 duration-300 delay-300"
                  onClick={() => handleNavigate("/ecossistema-ibm")}
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{t('menu.ibmEcosystem')}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.watsonXCloudPak')}</div>
                </button>
                <button 
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20 animate-in slide-in-from-left-2 duration-300 delay-400"
                  onClick={() => handleNavigate("/produtos/sonia-assistente-ia")}
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{t('menu.soniaAssistant')}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.specializedAIAssistant')}</div>
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Serviços - Submenu simples */}
      <Accordion type="single" collapsible className="border-none animate-in slide-in-from-left-2 duration-300 delay-300">
        <AccordionItem value="servicos" className="border-none">
          <AccordionTrigger 
            className={cn(
              "relative py-3 px-4 rounded-xl flex items-center transition-all duration-300 group hover:no-underline",
              isServicosActiveState 
                ? "bg-gradient-to-r from-brand-blue to-blue-600 text-white font-semibold shadow-lg" 
                : "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 hover:shadow-md"
            )}
            onClick={(e) => {
              if (isServicosActiveState) {
                e.preventDefault();
                handleNavigate("/servicos");
              }
            }}
          >
            <div className="flex items-center w-full">
              <div className={cn(
                "p-1.5 rounded-lg mr-3 transition-all duration-300",
                isServicosActiveState 
                  ? "bg-white/20" 
                  : "bg-brand-blue/10 dark:bg-brand-blue/20 group-hover:bg-brand-blue/20"
              )}>
                <Briefcase className={cn("h-4 w-4 transition-all duration-300", isServicosActiveState ? "text-white" : "text-brand-blue")} />
              </div>
              <span className={cn("font-medium transition-colors", isServicosActiveState ? "text-white" : "text-gray-900 dark:text-gray-100")}>{t('menu.services')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-3 pb-0 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-3 mt-2 border border-gray-200/50 dark:border-gray-700/50">
              <button 
                type="button"
                className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20 mb-2"
                onClick={() => handleNavigate("/servicos")}
              >
                <div className="font-semibold text-brand-blue">{t('menu.viewAllServices')}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.exploreFullRange')}</div>
              </button>
              
              <h4 className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                {t('menu.mainServices')}
              </h4>
              <div className="space-y-1">
                <button 
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20"
                  onClick={() => handleNavigate("/diagnostico")}
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{t('menu.aiDiagnostic')}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.freeEvaluation15min')}</div>
                </button>
                <button 
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20"
                  onClick={() => handleNavigate("/consultoria")}
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{t('menu.specializedConsulting')}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.personalizedStrategy')}</div>
                </button>
                <button 
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20"
                  onClick={() => handleNavigate("/implementacao")}
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{t('menu.implementation')}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.fullDeploy30days')}</div>
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Mobile: Conteúdo section with collapsible submenus */}
      <Accordion type="single" collapsible className="border-none animate-in slide-in-from-left-2 duration-300 delay-500">
        <AccordionItem value="conteudo" className="border-none">
          <AccordionTrigger 
            className={cn(
              "relative py-3 px-4 rounded-xl flex items-center transition-all duration-300 group hover:no-underline",
              isConteudoActiveState 
                ? "bg-gradient-to-r from-brand-blue to-blue-600 text-white font-semibold shadow-lg" 
                : "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 hover:shadow-md"
            )}
            onClick={(e) => {
              if (isConteudoActiveState) {
                e.preventDefault();
                handleNavigate("/conteudo");
              }
            }}
          >
            <div className="flex items-center w-full">
              <div className={cn(
                "p-1.5 rounded-lg mr-3 transition-all duration-300",
                isConteudoActiveState 
                  ? "bg-white/20" 
                  : "bg-brand-blue/10 dark:bg-brand-blue/20 group-hover:bg-brand-blue/20"
              )}>
                <BookOpen className={cn("h-4 w-4 transition-all duration-300", isConteudoActiveState ? "text-white" : "text-brand-blue")} />
              </div>
              <span className={cn("font-medium transition-colors", isConteudoActiveState ? "text-white" : "text-gray-900 dark:text-gray-100")}>{t('menu.content')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-3 pb-0 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-3 mt-2 border border-gray-200/50 dark:border-gray-700/50">
              <button 
                type="button"
                className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20 mb-3"
                onClick={() => handleNavigate("/conteudo")}
              >
                <div className="font-semibold text-brand-blue">{t('menu.contentHub')}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.completeKnowledgeHub')}</div>
              </button>
              
              <h4 className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                {t('menu.materials')}
              </h4>
              <div className="space-y-1 mb-3">
                <button 
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20"
                  onClick={() => handleNavigate("/blog")}
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{t('menu.blog')}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.articlesInsights')}</div>
                </button>
                <button 
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20"
                  onClick={() => handleNavigate("/materiais-gratuitos")}
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{t('menu.freeMaterials')}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.ebooksWhitepapers')}</div>
                </button>
                {hasFerramentas && (
                  <button 
                    type="button"
                    className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20"
                    onClick={() => handleNavigate("/ferramentas-gratuitas")}
                  >
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{t('menu.freeTools')}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.calculatorsTemplates')}</div>
                  </button>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Setores - Submenu simples */}
      <Accordion type="single" collapsible className="border-none animate-in slide-in-from-left-2 duration-300 delay-200">
        <AccordionItem value="setores" className="border-none">
          <AccordionTrigger 
            className={cn(
              "relative py-3 px-4 rounded-xl flex items-center transition-all duration-300 group hover:no-underline",
              isSetoresActiveState 
                ? "bg-gradient-to-r from-brand-blue to-blue-600 text-white font-semibold shadow-lg" 
                : "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 hover:shadow-md"
            )}
            onClick={(e) => {
              if (isSetoresActiveState) {
                e.preventDefault();
                handleNavigate("/setores");
              }
            }}
          >
            <div className="flex items-center w-full">
              <div className={cn(
                "p-1.5 rounded-lg mr-3 transition-all duration-300",
                isSetoresActiveState 
                  ? "bg-white/20" 
                  : "bg-brand-blue/10 dark:bg-brand-blue/20 group-hover:bg-brand-blue/20"
              )}>
                <Building className={cn("h-4 w-4 transition-all duration-300", isSetoresActiveState ? "text-white" : "text-brand-blue")} />
              </div>
              <span className={cn("font-medium transition-colors", isSetoresActiveState ? "text-white" : "text-gray-900 dark:text-gray-100")}>{t('menu.sectors')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-3 pb-0 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-3 mt-2 border border-gray-200/50 dark:border-gray-700/50">
              <button 
                type="button"
                className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20 mb-3"
                onClick={() => handleNavigate("/setores")}
              >
                <div className="font-semibold text-brand-blue">{t('menu.viewAllSectors')}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.specializedSolutions')}</div>
              </button>
              
              <h4 className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                {t('menu.mainSectors')}
              </h4>
              <div className="space-y-1">
                <button 
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20"
                  onClick={() => handleNavigate("/setores/financeiro")}
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{t('menu.financial')}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.banksFintechs')}</div>
                </button>
                <button 
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20"
                  onClick={() => handleNavigate("/setores/saude")}
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{t('menu.health')}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.hospitalsClinics')}</div>
                </button>
                <button 
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20"
                  onClick={() => handleNavigate("/setores/tecnologia")}
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{t('menu.technology')}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.startupsBigTechs')}</div>
                </button>
                <button 
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-brand-blue/20"
                  onClick={() => handleNavigate("/setores/educacao")}
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{t('menu.education')}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('menu.schoolsUniversities')}</div>
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div 
        className={cn(
          "relative py-3 px-4 rounded-xl flex items-center cursor-pointer transition-all duration-300 group animate-in slide-in-from-left-2 duration-300 delay-300",
          isContatoActiveState 
            ? "bg-gradient-to-r from-brand-blue to-blue-600 text-white font-semibold shadow-lg" 
            : "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 hover:shadow-md"
        )}
        onClick={() => handleNavigate("/contato")}
      >
        <div className={cn(
          "p-1.5 rounded-lg mr-3 transition-all duration-300",
          isContatoActiveState 
            ? "bg-white/20" 
            : "bg-brand-blue/10 dark:bg-brand-blue/20 group-hover:bg-brand-blue/20"
        )}>
          <Mail className={cn("h-4 w-4 transition-all duration-300", isContatoActiveState ? "text-white" : "text-brand-blue")} />
        </div>
        <span className={cn("font-medium transition-colors", isContatoActiveState ? "text-white" : "text-gray-900 dark:text-gray-100")}>{t('menu.contact')}</span>
        {isContatoActiveState && (
          <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        )}
      </div>
      
      {/* Botão de Agendar Diagnóstico no menu mobile */}
      <div className="mt-2 animate-in slide-in-from-left-2 duration-300 delay-500">
        <MobileDiagnosticoButton onClose={onClose} />
      </div>
    </div>
  );
};

export default MobileMenuItems;