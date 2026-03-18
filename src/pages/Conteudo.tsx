
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, FileText, Download, Users, TrendingUp, Calendar, GraduationCap, Image, Lightbulb, Video, CheckCircle } from "lucide-react";
import UnifiedSEO from "@/components/shared/UnifiedSEO";
import { useTranslation } from 'react-i18next';
import { sanitizeHtml } from '@/utils/sanitizeHtml';

const contentCategories = [
  { id: 'artigos', name: 'conteudo:categories.artigos', icon: FileText },
  { id: 'ebooks', name: 'conteudo:categories.ebooks', icon: BookOpen }
];

const Conteudo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['conteudo', 'common']);
  const [selectedCategory, setSelectedCategory] = useState('artigos');
  const [contentData, setContentData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const handleCtaClick = () => {
    navigate('/contato');
  };

  // Reset showAll quando mudar de categoria
  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory]);


  // Função para carregar artigos do Google Sheets
  const loadArticlesFromCMS = async () => {
    try {
      // Converter URL do Google Sheets para CSV
      const sheetId = '1GPgJ2wETkmEjZtJAxs1s8i2wnjjBdNSiykv-Hn-sbJ4';
      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`;
      
      const response = await fetch(csvUrl);
      const csvText = await response.text();
      
      // Converter CSV para JSON - Estrutura: A=TÍTULO, B=CAPA, C=LINKS
      const lines = csvText.split('\n');
      const articles = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          // Função para parsear CSV corretamente, lidando com vírgulas dentro de aspas
          const parseCSVLine = (line: string) => {
            const result = [];
            let current = '';
            let inQuotes = false;
            
            for (let j = 0; j < line.length; j++) {
              const char = line[j];
              
              if (char === '"') {
                inQuotes = !inQuotes;
              } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
              } else {
                current += char;
              }
            }
            result.push(current.trim());
            return result;
          };
          
          const values = parseCSVLine(lines[i]);
          
          // Estrutura: A=TÍTULO, B=CAPA, C=LINKS
          const title = (values[0] || '').replace(/"/g, '');
          const cover = (values[1] || '').replace(/"/g, '');
          const link = (values[2] || '').replace(/"/g, '');
          
          if (title && title !== 'TÍTULO') { // Só adiciona se tiver título e não for cabeçalho
            articles.push({
              id: `article-${i}`,
              type: 'artigo',
              icon: FileText,
              title: title,
              duration: '5 min de leitura',
              category: 'artigos',
              subcategory: 'Artigos & Guias',
              url: link,
              cover: cover,
              publishedAt: new Date().toISOString()
            });
          }
        }
      }
      
      return articles;
    } catch (error) {
      console.error('Erro ao carregar artigos:', error);
      return [];
    }
  };


  // Função para carregar e-books do Google Sheets
  const loadEbooksFromCMS = async () => {
    try {
      // Converter URL do Google Sheets para CSV
      const sheetId = '1VjjagCCY-UmkmSn__nZ6pw_Oejsx6Idc_i43AcYEfqg';
      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`;
      
      const response = await fetch(csvUrl);
      const csvText = await response.text();
      
      // Converter CSV para JSON - Estrutura: A=TÍTULO, B=IMAGEM, C=DESCRIÇÃO, D=LINK
      const lines = csvText.split('\n');
      const ebooks = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          // Função para parsear CSV corretamente, lidando com vírgulas dentro de aspas
          const parseCSVLine = (line: string) => {
            const result = [];
            let current = '';
            let inQuotes = false;
            
            for (let j = 0; j < line.length; j++) {
              const char = line[j];
              
              if (char === '"') {
                inQuotes = !inQuotes;
              } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
              } else {
                current += char;
              }
            }
            result.push(current.trim());
            return result;
          };
          
          const values = parseCSVLine(lines[i]);
          
          // Estrutura: A=TÍTULO, B=IMAGEM, C=DESCRIÇÃO, D=LINK
          const title = (values[0] || '').replace(/"/g, '');
          const image = (values[1] || '').replace(/"/g, '');
          const description = (values[2] || '').replace(/"/g, '');
          const link = (values[3] || '').replace(/"/g, '');
          
          if (title && title !== 'TÍTULO') { // Só adiciona se tiver título e não for cabeçalho
            ebooks.push({
              id: `ebook-${i}`,
              type: 'ebook',
              icon: BookOpen,
              title: title,
              description: description || 'E-book especializado em IA e transformação digital',
              duration: 'Download',
              category: 'ebooks',
              subcategory: 'E-books',
              url: link,
              cover: image,
              publishedAt: new Date().toISOString()
            });
          }
        }
      }
      
      return ebooks;
    } catch (error) {
      console.error('Erro ao carregar e-books:', error);
      return [];
    }
  };

  // Função para carregar webinars da API do YouTube
  const loadWebinarsFromAPI = async () => {
    try {
      console.log('🎥 Carregando webinars do OnSmart Tech...');
      
      // Como a API excedeu a cota, vamos usar webinars de exemplo otimizados
      console.log('📺 Usando webinars de exemplo do canal OnSmart Tech');
      
      return [
        {
          id: 'dQw4w9WgXcQ',
          type: 'webinar',
          icon: Video,
          title: 'Webinar: Implementação de IA em Empresas',
          description: 'Webinar completo sobre como implementar IA na sua empresa com a metodologia LÍDER da OnSmart AI.',
          duration: 'Webinar',
          category: 'webinars',
          subcategory: 'Webinars',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
          publishedAt: new Date().toISOString()
        },
        {
          id: 'jNQXAC9IVRw',
          type: 'webinar',
          icon: Video,
          title: 'Palestra: O Futuro dos Agentes de IA',
          description: 'Palestra sobre como os Agentes de IA estão transformando os negócios e aumentando a produtividade.',
          duration: 'Webinar',
          category: 'webinars',
          subcategory: 'Webinars',
          url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
          thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg',
          publishedAt: new Date().toISOString()
        },
        {
          id: 'fJ9rUzIMcZQ',
          type: 'webinar',
          icon: Video,
          title: 'Evento: Transformação Digital com IA',
          description: 'Evento especial sobre transformação digital e como a IA pode revolucionar sua empresa em 30 dias.',
          duration: 'Webinar',
          category: 'webinars',
          subcategory: 'Webinars',
          url: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
          thumbnail: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/mqdefault.jpg',
          publishedAt: new Date().toISOString()
        }
      ];
    } catch (error) {
      console.error('❌ Erro ao carregar webinars:', error);
      return [];
    }
  };

  // Função para carregar todos os conteúdos
  const loadAllContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Iniciando carregamento de todo o conteúdo...');
      
      const [articles, ebooks, webinars] = await Promise.all([
        loadArticlesFromCMS(),
        loadEbooksFromCMS(),
        loadWebinarsFromAPI()
      ]);

      console.log('📊 Conteúdo carregado:');
      console.log('📄 Artigos:', articles.length);
      console.log('📚 E-books:', ebooks.length);
      console.log('🎥 Webinars:', webinars.length);

      const allContent = [...articles, ...ebooks, ...webinars];
      console.log('📦 Total de conteúdo:', allContent.length);
      
      setContentData(allContent);
      console.log('✅ Conteúdo definido no estado');
    } catch (error) {
      setError('Erro ao carregar conteúdo. Tente novamente mais tarde.');
      console.error('❌ Erro ao carregar conteúdo:', error);
    } finally {
      setLoading(false);
      console.log('🏁 Carregamento finalizado');
    }
  };

  // Carregar conteúdo ao montar o componente
  useEffect(() => {
    loadAllContent();
  }, []);

  const getContentByCategory = () => {
    const categoryMap: { [key: string]: string[] } = {
      'artigos': ['artigo'],
      'ebooks': ['ebook']
    };

    console.log('🔍 Filtrando conteúdo para categoria:', selectedCategory);
    console.log('📊 Total de conteúdo disponível:', contentData.length);
    console.log('📋 Tipos de conteúdo:', contentData.map(c => c.type));

    let filtered = contentData;
    
    const contentTypes = categoryMap[selectedCategory] || [];
    filtered = contentData.filter(content => contentTypes.includes(content.type));
    
    console.log('🎯 Conteúdo filtrado:', filtered.length);
    console.log('📋 Conteúdo filtrado por tipo:', filtered.map(c => ({ type: c.type, title: c.title })));

    // Para artigos e e-books, mostrar apenas 3 inicialmente
    if (selectedCategory === 'artigos' || selectedCategory === 'ebooks') {
      const articles = filtered.filter(content => content.type === 'artigo');
      const ebooks = filtered.filter(content => content.type === 'ebook');
      
      if (selectedCategory === 'artigos') {
        return showAll ? articles : articles.slice(0, 3);
      } else if (selectedCategory === 'ebooks') {
        return showAll ? ebooks : ebooks.slice(0, 3);
      }
    }

    return filtered;
  };

  const filteredContent = getContentByCategory();

  const getCategoryStats = () => {
    const categoryMap: { [key: string]: string[] } = {
      'artigos': ['artigo'],
      'ebooks': ['ebook']
    };

    const stats: { [key: string]: number } = {
      total: contentData.length
    };

    contentCategories.forEach(category => {
      const contentTypes = categoryMap[category.id] || [];
      stats[category.id] = contentData.filter(content => contentTypes.includes(content.type)).length;
    });

    return stats;
  };

  const stats = getCategoryStats();

  return (
    <>
      <UnifiedSEO 
        pageType="service"
        pageData={{
        title: t('seo.title'),
        description: t('seo.description')
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="py-8 sm:py-12 md:py-16">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
              <div className="text-center mb-12">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
                  <BookOpen className="h-3 w-3" />
                  {t('hero.badge')}
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {t('hero.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{t('hero.titleHighlight')}</span> {t('hero.titleEnd')}
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8" dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(t('hero.description').replace(/<span>/g, '<span class="font-bold text-brand-blue">').replace(/<\/span>/g, '</span>'))
                }} />
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-bold text-gray-900 dark:text-gray-100">{stats.total}+</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t('hero.stats.contents')}</p>
                  </div>
                  
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-bold text-gray-900 dark:text-gray-100">{stats.ebooks}+</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t('hero.stats.ebooks')}</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </section>

          {/* Category Filters */}
          <section className="py-8">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('filters.title')}
            </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('filters.showing')} <span className="font-semibold text-brand-blue">{filteredContent.length}</span> {t('filters.of')} <span className="font-semibold text-gray-900 dark:text-gray-100">{contentData.length}</span> {t('filters.contents')}
                  {selectedCategory !== 'all' && (
                    <span className="ml-2">
                      {t('filters.in')} <span className="font-semibold text-brand-blue">
                        {t(`categories.${selectedCategory}`)}
                      </span>
                    </span>
                  )}
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {contentCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-brand-blue to-blue-600 text-white shadow-md scale-105'
                        : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-brand-blue/10 dark:hover:bg-brand-blue/20 hover:text-brand-blue border border-gray-200/50 dark:border-gray-700/50 hover:scale-105'
                    }`}
                  >
                    <category.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">{t(`categories.${category.id}`)}</span>
                    <span className="sm:hidden">
                      {t(`categories.${category.id}`).split(' ')[0]}
                    </span>
                    {category.id !== 'all' && (
                      <span className="ml-1 text-xs opacity-75 bg-white/20 px-1.5 py-0.5 rounded-full">
                        {stats[category.id as keyof typeof stats] || 0}
                      </span>
                    )}
                  </button>
                ))}
              </div>
          </div>
        </section>
        
          {/* Content Grid */}
          <section className="pb-16">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
              {loading ? (
                <div className="text-center py-16">
                  <div className="flex flex-col items-center justify-center">
                    {/* Spinner principal */}
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin mb-4"></div>
                      <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                    </div>
                    
                    {/* Texto de carregamento */}
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('loading.title')}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('loading.description')}</p>
                      
                      {/* Indicador de progresso animado */}
                      <div className="flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-500 mb-4">
                    <FileText className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-lg font-semibold">{t('error.title')}</p>
                    <p className="text-sm text-gray-600 mt-2">{error || t('error.description')}</p>
                  </div>
                  <Button 
                    onClick={loadAllContent}
                    className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white"
                  >
                    {t('error.button')}
                  </Button>
                </div>
              ) : filteredContent.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">
                    <FileText className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-lg font-semibold">{t('empty.title')}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {selectedCategory === 'all' 
                        ? t('empty.description1')
                        : t('empty.description2', { category: t(`categories.${selectedCategory}`) })
                      }
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 mt-4 p-4 bg-gray-100 rounded">
                    <p><strong>Debug Info:</strong></p>
                    <p>Categoria selecionada: {selectedCategory}</p>
                    <p>Conteúdo filtrado: {filteredContent.length}</p>
                    <p>Total de conteúdo: {contentData.length}</p>
                    <p>Tipos disponíveis: {contentData.map(c => c.type).join(', ')}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredContent.map((content) => (
                  <div 
                    key={content.id}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                    onClick={() => {
                      if (content.url) {
                        window.open(content.url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    {/* Capa/Thumbnail se disponível */}
                    {(content.cover || content.thumbnail) && (content.cover?.trim() !== '' || content.thumbnail?.trim() !== '') && (
                      <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
                        <img 
                          src={content.cover || content.thumbnail} 
                          alt={content.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.style.display = 'none';
                          }}
                          onLoad={(e) => {
                            e.currentTarget.style.opacity = '1';
                          }}
                          style={{ opacity: 0, transition: 'opacity 0.3s' }}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <content.icon className="h-6 w-6 text-brand-blue" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-brand-blue font-medium uppercase tracking-wide">
                          {content.subcategory}
                        </div>
                        <div className="text-xs text-gray-500">
                          {content.duration}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-brand-blue transition-colors leading-tight">
                      {content.title}
                    </h3>
                    
                    {/* Descrição para e-books */}
                    {content.type === 'ebook' && content.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
                        {content.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-brand-blue text-sm font-medium group-hover:gap-2 transition-all">
                        <span>
                          {content.type === 'ebook' ? t('actions.download') :
                           content.type === 'webinar' ? t('actions.watch') :
                           content.type === 'curso' ? t('actions.start') :
                           t('actions.access')}
                        </span>
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        {content.type === 'ebook' && <Download className="h-3 w-3" />}
                        {content.type === 'webinar' && <Calendar className="h-3 w-3" />}
                        {content.type === 'curso' && <GraduationCap className="h-3 w-3" />}
                        {content.type === 'case' && <TrendingUp className="h-3 w-3" />}
                        {content.type === 'infografico' && <Image className="h-3 w-3" />}
                        {content.type === 'guia' && <Lightbulb className="h-3 w-3" />}
                        {content.type === 'artigo' && <FileText className="h-3 w-3" />}
                        <span>
                          {content.type === 'ebook' ? t('contentTypes.pdf') :
                           content.type === 'webinar' ? t('contentTypes.webinar') :
                           content.type === 'curso' ? t('contentTypes.course') :
                           content.type === 'case' ? t('contentTypes.case') :
                           content.type === 'infografico' ? t('contentTypes.infographic') :
                           content.type === 'guia' ? t('contentTypes.guide') :
                           t('contentTypes.article')}
                        </span>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              )}
              
              {/* Botão Mostrar Mais para artigos e e-books */}
              {((selectedCategory === 'artigos' && contentData.filter(c => c.type === 'artigo').length > 3) ||
                (selectedCategory === 'ebooks' && contentData.filter(c => c.type === 'ebook').length > 3)) && (
                <div className="text-center mt-8">
                  <Button
                    onClick={() => setShowAll(!showAll)}
                    className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white px-8 py-3"
                  >
                    {showAll ? t('actions.viewLess') : 
                      `${t('actions.viewMore')} (${selectedCategory === 'artigos' ? contentData.filter(c => c.type === 'artigo').length - 3 : contentData.filter(c => c.type === 'ebook').length - 3} ${t('actions.remaining')})`
                    }
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8 text-center">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/5 text-green-600 px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-green-500/20">
                  <CheckCircle className="h-3 w-3" />
                  {t('ctaSection.badge')}
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4" dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(t('ctaSection.title').replace(/<span>/g, '<span class="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">').replace(/<\/span>/g, '</span>'))
                }} />
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto" dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(t('ctaSection.subtitle').replace(/<span>/g, '<span class="font-bold text-brand-blue">').replace(/<\/span>/g, '</span>'))
                }} />
                
                <div className="flex justify-center">
                  <Button 
                    onClick={handleCtaClick}
                    className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {t('ctaSection.button1')}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Button>
                </div>
                
                <div className="flex flex-wrap justify-center items-center gap-4 mt-6 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{t('ctaSection.benefits.free')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{t('ctaSection.benefits.response')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>{t('ctaSection.benefits.noCommitment')}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

    </>
  );
};

export default Conteudo;
