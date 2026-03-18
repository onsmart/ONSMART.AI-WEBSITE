/**
 * Ativa camada de segurança e PWA (CSP + Service Worker) sem duplicar
 * inicialização de analytics já feita em AppContent.
 * Renderizado uma vez na árvore do App.
 */
import { useServiceWorker } from "@/hooks/useServiceWorker";
import { useCSPHeaders } from "@/hooks/useCSPHeaders";

export function SecurityAndPWA() {
  useServiceWorker({
    onUpdate: () => {
      console.log("Nova versão disponível");
    },
    onSuccess: () => {
      console.log("Service Worker ativo");
    },
    onError: (error) => {
      console.error("Erro no Service Worker:", error);
    },
  });
  useCSPHeaders();
  return null;
}
