
import { useLocation } from 'react-router-dom';
import SEOMetaTags from '@/components/seo/SEOMetaTags';
import SEOStructuredData from '@/components/seo/SEOStructuredData';
import { getPageMeta } from '@/components/seo/SEOPageMeta';

interface UnifiedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: any;
  pageType?: 'blog' | 'service' | 'contact' | 'diagnostic' | 'case-study';
  pageData?: any;
  // Novos props para tornar mais dinâmico
  dynamicTitle?: string;
  dynamicDescription?: string;
  contextualKeywords?: string[];
  priority?: 'high' | 'medium' | 'low';
}

const UnifiedSEO = ({ 
  title,
  description,
  keywords,
  ogImage = "/images/91fc510f-198e-415f-b2c6-af34fe41fa23.png",
  canonicalUrl,
  structuredData,
  pageType,
  pageData,
  dynamicTitle,
  dynamicDescription,
  contextualKeywords = [],
  priority = 'medium'
}: UnifiedSEOProps) => {
  const location = useLocation();
  const currentUrl = canonicalUrl || `https://onsmart.ai${location.pathname}`;

  // Get page-specific meta data with enhanced descriptions
  const baseMeta = getPageMeta(location.pathname, title, description, keywords);

  // Enhanced meta generation based on context
  const generateDynamicMeta = () => {
    let enhancedTitle = dynamicTitle || baseMeta.title;
    let enhancedDescription = dynamicDescription || baseMeta.description;
    let enhancedKeywords = baseMeta.keywords;

    // Add contextual keywords if provided
    if (contextualKeywords.length > 0) {
      enhancedKeywords = `${baseMeta.keywords}, ${contextualKeywords.join(', ')}`;
    }

    // Page type specific enhancements
    if (pageType && pageData) {
      switch (pageType) {
        case 'blog':
          if (pageData.author) {
            enhancedDescription = `${enhancedDescription} | Por ${pageData.author}`;
          }
          if (pageData.category) {
            enhancedKeywords = `${enhancedKeywords}, ${pageData.category}`;
          }
          if (pageData.readTime) {
            enhancedTitle = `${enhancedTitle} | ${pageData.readTime} min de leitura`;
          }
          break;
          
        case 'service':
          if (pageData.serviceType) {
            enhancedDescription = `${enhancedDescription} | Especialistas em ${pageData.serviceType}`;
            enhancedKeywords = `${enhancedKeywords}, ${pageData.serviceType}`;
          }
          break;
          
        case 'case-study':
          if (pageData.company) {
            enhancedTitle = `Case ${pageData.company}: ${enhancedTitle}`;
          }
          if (pageData.sector) {
            enhancedKeywords = `${enhancedKeywords}, ${pageData.sector}, case de sucesso`;
          }
          if (pageData.roi) {
            enhancedDescription = `${enhancedDescription} | ROI de ${pageData.roi}%`;
          }
          break;
          
        case 'diagnostic':
          if (pageData.formType) {
            enhancedDescription = `${enhancedDescription} | ${pageData.formType} personalizado`;
          }
          break;
          
        case 'contact':
          if (pageData.urgency) {
            enhancedTitle = ` ${enhancedTitle}`;
            enhancedDescription = `${enhancedDescription} | Resposta em ${pageData.urgency || '2 horas'}`;
          }
          break;
      }
    }

    // Priority-based title enhancement
    if (priority === 'high') {
      if (!enhancedTitle.includes('') && !enhancedTitle.includes('✅')) {
        enhancedTitle = ` ${enhancedTitle}`;
      }
    }

    // Time-sensitive content
    const currentMonth = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    if (location.pathname === '/blog' || location.pathname.includes('/blog/')) {
      enhancedDescription = `${enhancedDescription} | Atualizado em ${currentMonth}`;
    }

    return {
      title: enhancedTitle,
      description: enhancedDescription,
      keywords: enhancedKeywords
    };
  };

  const meta = generateDynamicMeta();

  // Enhanced structured data based on page type
  const generateEnhancedStructuredData = () => {
    const baseData = structuredData || {};
    
    if (pageType && pageData) {
      switch (pageType) {
        case 'blog':
          return {
            ...baseData,
            '@type': 'BlogPosting',
            author: pageData.author || 'onsmartAI',
            datePublished: pageData.publishDate || new Date().toISOString(),
            dateModified: pageData.modifiedDate || new Date().toISOString(),
            wordCount: pageData.wordCount || 1500,
            timeRequired: `PT${pageData.readTime || 5}M`
          };
          
        case 'service':
          return {
            ...baseData,
            '@type': 'Service',
            serviceType: pageData.serviceType || 'Consultoria em IA',
            provider: {
              '@type': 'Organization',
              name: 'onsmartAI'
            },
            areaServed: 'Brasil'
          };
          
        case 'case-study':
          return {
            ...baseData,
            '@type': 'Case Study',
            about: pageData.company || 'Empresa',
            result: pageData.roi ? `ROI de ${pageData.roi}%` : 'Aumento significativo de produtividade'
          };
      }
    }
    
    return baseData;
  };

  const enhancedStructuredData = generateEnhancedStructuredData();

  return (
    <>
      <SEOMetaTags 
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        ogImage={ogImage}
        currentUrl={currentUrl}
      />
      <SEOStructuredData 
        structuredData={enhancedStructuredData}
        ogImage={ogImage}
      />
    </>
  );
};

export default UnifiedSEO;
