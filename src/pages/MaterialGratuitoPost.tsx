/**
 * Página de um material gratuito por slug (/materiais-gratuitos/:slug).
 * Usa o componente compartilhado com captura de lead e localStorage (30 dias).
 */

import FerramentaMaterialPost from './FerramentaMaterialPost';

export default function MaterialGratuitoPost() {
  return (
    <FerramentaMaterialPost
      expectedType="materiais_gratuitos"
      backPath="/materiais-gratuitos"
      backLabel="Voltar aos materiais"
      pageTitleSuffix="Materiais Gratuitos OnSmartAI"
    />
  );
}
