import React from 'react';
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
 * - Ícone de globo
 * - Dropdown com opções de idiomas
 * - Mostra idioma atual como ativo
 */

const languages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  // Função para trocar idioma
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    // O idioma é salvo automaticamente no localStorage pela configuração do i18n
  };

  // Encontrar idioma atual
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-2"
          aria-label="Selecionar idioma"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.name}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex items-center gap-2 ${
              i18n.language === lang.code ? 'bg-accent font-semibold' : ''
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
            {i18n.language === lang.code && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;

