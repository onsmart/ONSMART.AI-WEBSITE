
import React from 'react';
import { createRoot } from 'react-dom/client';
// Importar configuração do i18n ANTES do App
// Isso garante que as traduções estejam disponíveis quando os componentes renderarem
import './i18n/config';
import App from './App.tsx';
import './index.css';

// Inicializar tema antes do React renderizar para evitar flash
// FORÇADO PARA SEMPRE MODO CLARO (dark mode não finalizado)
(function initTheme() {
  // Sempre força modo claro - ignora localStorage e preferência do sistema
  document.documentElement.classList.remove('dark');
  // Limpa qualquer preferência dark salva anteriormente
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.setItem('theme', 'light');
  }
})();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);
