
import React from 'react';
import { createRoot } from 'react-dom/client';
// Importar configuração do i18n ANTES do App
// Isso garante que as traduções estejam disponíveis quando os componentes renderizarem
import './i18n/config';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);
