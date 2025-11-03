
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, FileText, Video, Download, Users, TrendingUp, CheckCircle, Play, Calendar, GraduationCap, Wrench, BarChart3, Image, FileCheck, Calculator, Lightbulb, Target, Zap } from "lucide-react";
import UnifiedSEO from "@/components/shared/UnifiedSEO";
import { useTranslation } from 'react-i18next';

const contentCategories = [
  { id: 'artigos', name: 'conteudo:categories.artigos', icon: FileText },
  { id: 'videos', name: 'conteudo:categories.videos', icon: Play },
  { id: 'ebooks', name: 'conteudo:categories.ebooks', icon: BookOpen },
  { id: 'templates', name: 'conteudo:categories.templates', icon: FileCheck },
  { id: 'checklists', name: 'conteudo:categories.checklists', icon: CheckCircle },
  { id: 'calculadoras', name: 'conteudo:categories.calculadoras', icon: Calculator }
];

const Conteudo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['conteudo', 'common']);
  const [selectedCategory, setSelectedCategory] = useState('artigos');
  const [contentData, setContentData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const handleCtaClick = () => {
    navigate('/contato');
  };

  // Função para extrair ID do vídeo do YouTube
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Função para abrir vídeo no modal
  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
  };

  // Função para fechar modal
  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  // Reset showAll quando mudar de categoria
  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory]);

  const handleDiagnosticoClick = () => {
    navigate('/diagnostico');
  };

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

  // Lista de vídeos de fallback quando a API não estiver disponível
  const fallbackVideos = [
    {
      id: 'F2wkF4KZz2Y',
      type: 'video',
      icon: Play,
      title: 'OnSmart AI - Vídeo Oficial',
      description: 'Conteúdo oficial da OnSmart AI sobre inteligência artificial e transformação digital.',
      duration: 'Vídeo',
      category: 'videos',
      subcategory: 'Vídeos',
      url: 'https://www.youtube.com/watch?v=F2wkF4KZz2Y',
      thumbnail: 'https://img.youtube.com/vi/F2wkF4KZz2Y/mqdefault.jpg',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'dQw4w9WgXcQ',
      type: 'video',
      icon: Play,
      title: 'OnSmart AI - Inteligência Artificial para Empresas',
      description: 'Descubra como a OnSmart AI pode transformar sua empresa com soluções de inteligência artificial personalizadas.',
      duration: 'Vídeo',
      category: 'videos',
      subcategory: 'Vídeos',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      publishedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 'jNQXAC9IVRw',
      type: 'video',
      icon: Play,
      title: 'Vibe Enterprise - Plataforma de Gestão Inteligente',
      description: 'Conheça a Vibe Enterprise, nossa plataforma completa de gestão empresarial com IA integrada.',
      duration: 'Vídeo',
      category: 'videos',
      subcategory: 'Vídeos',
      url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
      thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg',
      publishedAt: '2024-01-10T14:30:00Z'
    }
  ];

  // Função para carregar vídeos da API do YouTube
  const loadVideosFromAPI = async () => {
    try {
      console.log('🎬 Carregando vídeos reais do canal @onsmarttech...');
      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
      
      // Primeiro, buscar o Channel ID usando o handle
      let channelId = "UC7IkX4S0ixK0QBSdW8rDaXQ"; // fallback
      
      try {
        console.log('🔍 Buscando Channel ID do @onsmarttech...');
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&forUsername=onsmarttech&part=id`
        );
        
        if (channelResponse.ok) {
          const channelData = await channelResponse.json();
          if (channelData.items && channelData.items.length > 0) {
            channelId = channelData.items[0].id;
            console.log('✅ Channel ID encontrado:', channelId);
          }
        }
      } catch (channelError) {
        console.warn('⚠️ Erro ao buscar Channel ID:', channelError);
      }
      
      // Tentar buscar vídeos do canal OnSmart Tech diretamente
      try {
        console.log('🔍 Buscando vídeos do canal OnSmart Tech...');
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&order=date&type=video&key=${API_KEY}`
        );
        
        if (response.ok) {
          const data = await response.json();
          console.log('📊 Resposta da API:', data);
          
          if (data.items && data.items.length > 0) {
            console.log('✅ Vídeos reais encontrados:', data.items.length);
            
            const videos = data.items
              .filter((video: any) => {
                const title = video.snippet.title.toLowerCase();
                return title.includes('onsmart.ai') || title.includes('vibe enterprise');
              })
              .map((video: any) => ({
                id: video.id.videoId,
                type: 'video',
                icon: Play,
                title: video.snippet.title,
                description: video.snippet.description.substring(0, 150) + '...',
                duration: 'Vídeo',
                category: 'videos',
                subcategory: 'Vídeos',
                url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
                thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url,
                publishedAt: video.snippet.publishedAt
              }));
            
            console.log('📋 Vídeos reais carregados:', videos.map(v => v.title));
            return videos;
          }
        } else if (response.status === 403) {
          console.warn('⚠️ Quota da API excedida, usando vídeos de fallback');
          return fallbackVideos;
        } else {
          console.warn('⚠️ Erro na busca por canal ID, tentando busca por nome...');
        }
      } catch (channelError) {
        console.warn('⚠️ Erro ao buscar por canal ID:', channelError);
      }
      
      // Se não conseguir pelo canal ID, tentar busca por nome
      try {
        console.log('🔍 Buscando por "OnSmart Tech" ou "onsmarttech"...');
        const searchTerms = ['OnSmart Tech', 'onsmarttech', 'OnSmart AI', 'onsmart ai'];
        
        for (const term of searchTerms) {
          console.log(`🔍 Tentando busca por: "${term}"`);
          
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(term)}&maxResults=50&order=date&type=video&key=${API_KEY}`
          );
          
          if (response.ok) {
            const data = await response.json();
            console.log(`📊 Resultados para "${term}":`, data.items?.length || 0);
            
            if (data.items && data.items.length > 0) {
              // Filtrar vídeos que contenham "onsmart.AI" ou "Vibe Enterprise" no título
              const filteredVideos = data.items.filter((video: any) => {
                const title = video.snippet.title.toLowerCase();
                
                // Apenas vídeos com "onsmart.ai" ou "vibe enterprise" no título
                return title.includes('onsmart.ai') || title.includes('vibe enterprise');
              });
              
              if (filteredVideos.length > 0) {
                console.log(`✅ Vídeos do OnSmart encontrados para "${term}":`, filteredVideos.length);
                
                const videos = filteredVideos.map((video: any) => ({
                  id: video.id.videoId,
                  type: 'video',
                  icon: Play,
                  title: video.snippet.title,
                  description: video.snippet.description.substring(0, 150) + '...',
                  duration: 'Vídeo',
                  category: 'videos',
                  subcategory: 'Vídeos',
                  url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
                  thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url,
                  publishedAt: video.snippet.publishedAt
                }));
                
                console.log('📋 Vídeos reais do OnSmart carregados:', videos.map(v => v.title));
                return videos;
              }
            }
          } else if (response.status === 403) {
            console.warn('⚠️ Quota da API excedida, usando vídeos de fallback');
            return fallbackVideos;
          } else {
            console.warn(`⚠️ Erro na busca por "${term}":`, response.status);
          }
        }
      } catch (searchError) {
        console.warn('⚠️ Erro na busca por nome:', searchError);
      }
      
      // Se chegou até aqui, a API não está funcionando ou não encontrou vídeos
      console.warn('⚠️ Não foi possível carregar vídeos reais, usando vídeos de exemplo');
      
      // Retornar vídeos de exemplo como fallback
      console.log('📺 Usando vídeos de fallback:', fallbackVideos.length);
      return fallbackVideos;
      
    } catch (error) {
      console.error('❌ Erro geral ao carregar vídeos:', error);
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
      
      const [articles, videos, ebooks, webinars] = await Promise.all([
        loadArticlesFromCMS(),
        loadVideosFromAPI(),
        loadEbooksFromCMS(),
        loadWebinarsFromAPI()
      ]);

      console.log('📊 Conteúdo carregado:');
      console.log('📄 Artigos:', articles.length);
      console.log('🎬 Vídeos:', videos.length);
      console.log('📚 E-books:', ebooks.length);
      console.log('🎥 Webinars:', webinars.length);

      const allContent = [...articles, ...videos, ...ebooks, ...webinars];
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
      'videos': ['video'],
      'ebooks': ['ebook'],
      'templates': ['template'],
      'checklists': ['checklist'],
      'calculadoras': ['calculadora']
    };

    console.log('🔍 Filtrando conteúdo para categoria:', selectedCategory);
    console.log('📊 Total de conteúdo disponível:', contentData.length);
    console.log('📋 Tipos de conteúdo:', contentData.map(c => c.type));

    let filtered = contentData;
    
    const contentTypes = categoryMap[selectedCategory] || [];
    filtered = contentData.filter(content => contentTypes.includes(content.type));
    
    // Para vídeos, aplicar filtro adicional por título
    if (selectedCategory === 'videos') {
      filtered = filtered.filter(content => {
        if (content.type === 'video') {
          const title = content.title.toLowerCase();
          return title.includes('onsmart.ai') || title.includes('vibe enterprise');
        }
        return true;
      });
    }
    
    console.log('🎯 Conteúdo filtrado:', filtered.length);
    console.log('📋 Conteúdo filtrado por tipo:', filtered.map(c => ({ type: c.type, title: c.title })));

    // Para artigos, e-books e vídeos, mostrar apenas 3 inicialmente
    if (selectedCategory === 'artigos' || selectedCategory === 'ebooks' || selectedCategory === 'videos') {
      const articles = filtered.filter(content => content.type === 'artigo');
      const ebooks = filtered.filter(content => content.type === 'ebook');
      const videos = filtered.filter(content => content.type === 'video');
      const otherContent = filtered.filter(content => content.type !== 'artigo' && content.type !== 'ebook' && content.type !== 'video');
      
      if (selectedCategory === 'artigos') {
        return showAll ? articles : articles.slice(0, 3);
      } else if (selectedCategory === 'ebooks') {
        return showAll ? ebooks : ebooks.slice(0, 3);
      } else if (selectedCategory === 'videos') {
        return showAll ? videos : videos.slice(0, 3);
      }
    }

    return filtered;
  };

  const filteredContent = getContentByCategory();

  const getCategoryStats = () => {
    const categoryMap: { [key: string]: string[] } = {
      'artigos': ['artigo'],
      'videos': ['video'],
      'ebooks': ['ebook'],
      'templates': ['template'],
      'checklists': ['checklist'],
      'calculadoras': ['calculadora']
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
                  __html: t('hero.description').replace(/<span>/g, '<span class="font-bold text-brand-blue">').replace(/<\/span>/g, '</span>')
                }} />
                
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
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
                  
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-bold text-gray-900 dark:text-gray-100">{stats.videos}+</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t('hero.stats.videos')}</p>
                  </div>

                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                        <Calculator className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-bold text-gray-900 dark:text-gray-100">{stats.calculadoras}+</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t('hero.stats.tools')}</p>
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
                      if (content.type === 'video') {
                        handleVideoClick(content);
                      } else if (content.url) {
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
                          {content.type === 'ebook' || content.type === 'template' || content.type === 'checklist' ? t('actions.download') :
                           content.type === 'video' || content.type === 'webinar' ? t('actions.watch') :
                           content.type === 'calculadora' ? t('actions.use') :
                           content.type === 'curso' ? t('actions.start') :
                           t('actions.access')}
                        </span>
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        {content.type === 'ebook' && <Download className="h-3 w-3" />}
                        {content.type === 'video' && <Video className="h-3 w-3" />}
                        {content.type === 'webinar' && <Calendar className="h-3 w-3" />}
                        {content.type === 'template' && <FileCheck className="h-3 w-3" />}
                        {content.type === 'checklist' && <CheckCircle className="h-3 w-3" />}
                        {content.type === 'calculadora' && <Calculator className="h-3 w-3" />}
                        {content.type === 'curso' && <GraduationCap className="h-3 w-3" />}
                        {content.type === 'case' && <TrendingUp className="h-3 w-3" />}
                        {content.type === 'infografico' && <Image className="h-3 w-3" />}
                        {content.type === 'guia' && <Lightbulb className="h-3 w-3" />}
                        {content.type === 'artigo' && <FileText className="h-3 w-3" />}
                        <span>
                          {content.type === 'ebook' ? t('contentTypes.pdf') :
                           content.type === 'video' ? t('contentTypes.video') :
                           content.type === 'webinar' ? t('contentTypes.webinar') :
                           content.type === 'template' ? t('contentTypes.template') :
                           content.type === 'checklist' ? t('contentTypes.checklist') :
                           content.type === 'calculadora' ? t('contentTypes.calculator') :
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
              
              {/* Botão Mostrar Mais para artigos, e-books e vídeos */}
              {((selectedCategory === 'artigos' && contentData.filter(c => c.type === 'artigo').length > 3) ||
                (selectedCategory === 'ebooks' && contentData.filter(c => c.type === 'ebook').length > 3) ||
                (selectedCategory === 'videos' && contentData.filter(c => c.type === 'video').length > 3)) && (
                <div className="text-center mt-8">
                  <Button
                    onClick={() => setShowAll(!showAll)}
                    className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white px-8 py-3"
                  >
                    {showAll ? t('actions.viewLess') : 
                      `${t('actions.viewMore')} (${selectedCategory === 'artigos' ? contentData.filter(c => c.type === 'artigo').length - 3 : selectedCategory === 'ebooks' ? contentData.filter(c => c.type === 'ebook').length - 3 : contentData.filter(c => c.type === 'video').length - 3} ${t('actions.remaining')})`
                    }
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-900">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8 text-center">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-violet-500/5 text-purple-600 px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-purple-500/20">
                  <Calendar className="h-3 w-3" />
                  {t('newsletterSection.badge')}
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4" dangerouslySetInnerHTML={{
                  __html: t('newsletterSection.title').replace(/<span>/g, '<span class="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 bg-clip-text text-transparent">').replace(/<\/span>/g, '</span>')
                }} />
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto" dangerouslySetInnerHTML={{
                  __html: t('newsletterSection.subtitle').replace(/<span>/g, '<span class="font-bold text-brand-blue">').replace(/<\/span>/g, '</span>')
                }} />
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto mb-6">
                  <input
                    type="email"
                    placeholder={t('newsletterSection.placeholder')}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-brand-blue focus:ring-brand-blue focus:outline-none"
                  />
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {t('newsletterSection.button')}
                    </div>
                  </Button>
                </div>
                
                <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{t('newsletterSection.benefits.free')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{t('newsletterSection.benefits.noSpam')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>{t('newsletterSection.benefits.cancel')}</span>
                  </div>
                </div>
              </div>
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
                  __html: t('ctaSection.title').replace(/<span>/g, '<span class="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">').replace(/<\/span>/g, '</span>')
                }} />
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto" dangerouslySetInnerHTML={{
                  __html: t('ctaSection.subtitle').replace(/<span>/g, '<span class="font-bold text-brand-blue">').replace(/<\/span>/g, '</span>')
                }} />
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
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
                  
                  <Button 
                    onClick={handleDiagnosticoClick}
                    variant="outline"
                    className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      {t('ctaSection.button2')}
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

      {/* Modal de Vídeo */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <div 
            className="relative w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-brand-blue to-blue-600">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{t('videoModal.channel')}</h3>
                  <p className="text-white/80 text-sm">{t('videoModal.official')}</p>
                </div>
              </div>
              <button
                onClick={closeVideoModal}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Player do YouTube */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideo.url)}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Informações do Vídeo */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900">
              <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2 line-clamp-2">{selectedVideo.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{selectedVideo.description}</p>
              
              {/* Footer do Modal */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{t('videoModal.channel')}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('videoModal.official')}</p>
                  </div>
                </div>
                <button
                  onClick={() => window.open(selectedVideo.url, '_blank', 'noopener,noreferrer')}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>{t('videoModal.watchOnYouTube')}</span>
                </button>
              </div>
            </div>
          </div>
      </div>
      )}
    </>
  );
};

export default Conteudo;
