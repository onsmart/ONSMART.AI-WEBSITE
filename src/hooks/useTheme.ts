import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

/**
 * Hook para gerenciar o tema (light/dark) do site
 * 
 * Funcionalidades:
 * - Detecta preferência do sistema operacional
 * - Salva preferência no localStorage
 * - Adiciona/remove classe 'dark' no elemento <html>
 * - Retorna tema atual e função para alternar
 */
export const useTheme = () => {
  // FORÇADO PARA SEMPRE MODO CLARO (dark mode não finalizado)
  const [theme, setTheme] = useState<Theme>(() => {
    // Sempre retorna 'light' - ignora localStorage e preferência do sistema
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Sempre remove a classe 'dark' para garantir modo claro
    root.classList.remove('dark');
    
    // Sempre salva 'light' no localStorage
    localStorage.setItem('theme', 'light');
  }, [theme]);

  const toggleTheme = () => {
    // Não faz nada - dark mode está desabilitado
    // Mantém sempre em modo claro
    setTheme('light');
  };

  // Sempre retorna 'light'
  return { theme: 'light', toggleTheme };
};


