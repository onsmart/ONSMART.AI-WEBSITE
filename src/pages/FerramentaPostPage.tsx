/**
 * Página de uma ferramenta por slug (/ferramentas/:slug).
 * Usa o componente compartilhado com captura de lead e localStorage.
 */

import FerramentaMaterialPost from './FerramentaMaterialPost';

export default function FerramentaPostPage() {
  return (
    <FerramentaMaterialPost
      expectedType="ferramentas"
      backPath="/ferramentas-gratuitas"
      backLabel="Voltar às ferramentas"
      pageTitleSuffix="Ferramentas OnSmartAI"
    />
  );
}
