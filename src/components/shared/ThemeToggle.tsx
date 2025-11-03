import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';

/**
 * COMPONENTE THEME TOGGLE
 * 
 * Componente discreto para alternar entre tema claro e escuro.
 * Deve ser colocado ao lado do LanguageSwitcher na navbar.
 * 
 * Visual:
 * - Ícone de sol (light) ou lua (dark)
 * - Botão minimalista e discreto
 * - Mantém o estilo consistente com o LanguageSwitcher
 */
const ThemeToggle: React.FC = () => {
  // Dark mode button is currently hidden/disabled
  // const { theme, toggleTheme } = useTheme();
  // const { t } = useTranslation('common');

  // Return null to hide the button completely
  return null;

  /* Original implementation (hidden):
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="flex items-center gap-2"
      aria-label={theme === 'light' ? t('theme.switchToDark') : t('theme.switchToLight')}
      title={theme === 'light' ? t('theme.switchToDark') : t('theme.switchToLight')}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
  */
};

export default ThemeToggle;


