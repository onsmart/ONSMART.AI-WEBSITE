import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

/**
 * COMPONENTE LANGUAGE SWITCHER
 * 
 * Este componente permite ao usuário trocar o idioma do site.
 * 
 * Como funciona:
 * 1. Usa o hook useTranslation para acessar i18n
 * 2. i18n.changeLanguage() muda o idioma globalmente
 * 3. O idioma escolhido é salvo no localStorage automaticamente (pela configuração)
 * 4. Quando o idioma muda, todos os componentes que usam t() são atualizados automaticamente
 * 
 * Visual:
 * - Ícone de globo + texto do idioma atual
 * - Abre automaticamente no hover
 * - Dropdown com opções de idiomas
 */

const languages = [
  { code: 'pt', nameKey: 'portuguese', flag: '🇧🇷', displayName: 'Português - Brasil' },
  { code: 'en', nameKey: 'english', flag: '🇺🇸', displayName: 'English' },
  { code: 'es', nameKey: 'spanish', flag: '🇪🇸', displayName: 'Español' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Função para trocar idioma
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setOpen(false); // Fecha o dropdown após seleção
    // O idioma é salvo automaticamente no localStorage pela configuração do i18n
  };

  // Encontrar idioma atual
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Gerencia hover com delay para evitar fechar muito rápido
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    // Pequeno delay para evitar fechar quando o mouse passa do botão para o dropdown
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  // Limpar timeout ao desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base"
            aria-label={t('language.selectLanguage')}
          >
            <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">{currentLanguage.displayName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end"
          className="cursor-pointer"
          onCloseAutoFocus={(e) => e.preventDefault()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex items-center gap-2 ${
              i18n.language === lang.code ? 'bg-accent font-semibold' : ''
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.displayName}</span>
            {i18n.language === lang.code && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;

