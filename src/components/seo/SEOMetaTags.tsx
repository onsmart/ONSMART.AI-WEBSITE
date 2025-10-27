import React, { useEffect } from 'react';

interface SEOMetaTagsProps {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  currentUrl: string;
}

const SEOMetaTags = ({ title, description, keywords, ogImage, currentUrl }: SEOMetaTagsProps) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateOrCreateMeta = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', property);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    // Enhanced meta tags with explicit index directives
    updateOrCreateMeta('description', description);
    updateOrCreateMeta('keywords', keywords);
    updateOrCreateMeta('author', 'onsmartAI - Especialistas em Agentes de IA');
    updateOrCreateMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateOrCreateMeta('viewport', 'width=device-width, initial-scale=1.0');
    updateOrCreateMeta('language', 'pt-BR');
    updateOrCreateMeta('geo.region', 'BR');
    updateOrCreateMeta('geo.placename', 'São Paulo, Brasil');
    
    // Additional SEO meta tags
    updateOrCreateMeta('revisit-after', '7 days');
    updateOrCreateMeta('distribution', 'global');
    updateOrCreateMeta('rating', 'general');
    updateOrCreateMeta('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateOrCreateMeta('bingbot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Open Graph enhanced
    updateOrCreateMeta('og:title', title, 'og:title');
    updateOrCreateMeta('og:description', description, 'og:description');
    updateOrCreateMeta('og:image', `https://onsmart.ai${ogImage}`, 'og:image');
    updateOrCreateMeta('og:image:width', '1200', 'og:image:width');
    updateOrCreateMeta('og:image:height', '630', 'og:image:height');
    updateOrCreateMeta('og:url', currentUrl, 'og:url');
    updateOrCreateMeta('og:type', 'website', 'og:type');
    updateOrCreateMeta('og:site_name', 'onsmartAI', 'og:site_name');
    updateOrCreateMeta('og:locale', 'pt_BR', 'og:locale');
    updateOrCreateMeta('og:locale:alternate', 'en_US', 'og:locale:alternate');

    // Twitter Card enhanced
    updateOrCreateMeta('twitter:card', 'summary_large_image', 'twitter:card');
    updateOrCreateMeta('twitter:title', title, 'twitter:title');
    updateOrCreateMeta('twitter:description', description, 'twitter:description');
    updateOrCreateMeta('twitter:image', `https://onsmart.ai${ogImage}`, 'twitter:image');
    updateOrCreateMeta('twitter:site', '@onsmartAI', 'twitter:site');
    updateOrCreateMeta('twitter:creator', '@onsmartAI', 'twitter:creator');

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Add hreflang for international SEO
    const addHreflang = (lang: string, url: string) => {
      let hreflang = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement;
      if (!hreflang) {
        hreflang = document.createElement('link');
        hreflang.setAttribute('rel', 'alternate');
        hreflang.setAttribute('hreflang', lang);
        document.head.appendChild(hreflang);
      }
      hreflang.setAttribute('href', url);
    };

    addHreflang('pt-BR', currentUrl);
    addHreflang('x-default', currentUrl);

    // Remove any existing noindex tags
    const noindexTags = document.querySelectorAll('meta[name="robots"][content*="noindex"]');
    noindexTags.forEach(tag => tag.remove());

  }, [title, description, keywords, ogImage, currentUrl]);

  return null;
};

export default SEOMetaTags;
