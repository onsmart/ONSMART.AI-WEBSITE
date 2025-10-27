
import { useEffect } from 'react';
import { generateSitemap, downloadSitemap } from '@/utils/sitemapGenerator';

export const useSEO = () => {
  
  const generateAndExposesitemap = () => {
    // Gerar sitemap e disponibilizar para download
    return generateSitemap();
  };

  const downloadSitemapFile = () => {
    downloadSitemap();
  };

  // Automaticamente gerar sitemap quando o componente for montado
  useEffect(() => {
    // Adicionar meta robots para páginas importantes
    const addRobotsMeta = () => {
      let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    };

    addRobotsMeta();
  }, []);

  return {
    generateSitemap: generateAndExposesitemap,
    downloadSitemap: downloadSitemapFile
  };
};
