import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ArticleItem {
  title: string;
  image: string;
  videoUrl: string;
  description: string;
}

// Componente para o card do artigo com gerenciamento de erro de imagem
const ArticleCard = ({ article, index }: { article: ArticleItem; index: number }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card 
      className="overflow-hidden hover:shadow-2xl transition-all duration-300 group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 hover:-translate-y-1 cursor-pointer"
      onClick={() => {
        if (article.videoUrl) {
          window.open(article.videoUrl, '_blank', 'noopener,noreferrer');
        }
      }}
    >
      {/* Image Container with improved styling */}
      <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 relative overflow-hidden">
        {article.image && article.image.trim() !== '' && !imageError ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading={index < 3 ? "eager" : "lazy"}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 via-blue-500/30 to-brand-blue/20 flex items-center justify-center">
            <FileText className="h-12 w-12 text-brand-blue/50" />
          </div>
        )}
        
        {/* Badge */}
        <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-brand-blue to-blue-600 text-white shadow-lg border-0 px-3 py-1">
          <FileText className="h-3 w-3 mr-1" />
          Artigo
        </Badge>
        
        {/* Hover effect indicator */}
        <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <ArrowRight className="h-4 w-4 text-brand-blue" />
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 group-hover:text-brand-blue transition-colors duration-300 text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight">
          {article.title}
        </CardTitle>
        {article.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mt-3 leading-relaxed">
            {article.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>LinkedIn</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>5 min</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-brand-blue hover:text-white hover:bg-gradient-to-r hover:from-brand-blue hover:to-blue-600 transition-all duration-300 group/btn"
          onClick={(e) => {
            e.stopPropagation();
            if (article.videoUrl) {
              window.open(article.videoUrl, '_blank', 'noopener,noreferrer');
            }
          }}
        >
          <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
          Ler no LinkedIn
          <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default function LinkedInArticlesFeed() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const SHEET_ID = "1GPgJ2wETkmEjZtJAxs1s8i2wnjjBdNSiykv-Hn-sbJ4";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&tq=select *`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Falha ao buscar artigos: ${response.status}`);
        }
        
        const text = await response.text();
        
        if (!text.includes('table')) {
          throw new Error('Resposta inválida da API do Google Sheets');
        }
        
        const json = JSON.parse(text.substr(47).slice(0, -2));
        
        if (!json.table || !json.table.rows || json.table.rows.length < 2) {
          throw new Error('Nenhum dado encontrado na planilha');
        }
        
        const rows = json.table.rows.slice(1).map((r: any, index: number) => {
          const title = r.c[0]?.v || '';
          const image = r.c[1]?.v || '';
          const videoUrl = r.c[2]?.v || '';
          const description = r.c[3]?.v || '';
          
          return {
            title,
            image,
            videoUrl,
            description
          };
        }).filter(row => row.title && row.title.trim() !== '');
        
        setArticles(rows);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        console.error('Erro ao buscar artigos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-brand-blue/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative w-16 h-16 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin"></div>
        </div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Carregando artigos...</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Aguarde um momento</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
          <FileText className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Erro ao carregar artigos</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Nenhum artigo encontrado.</p>
      </div>
    );
  }

  // Artigo especial que aparece primeiro
  const featuredArticle = {
    title: "IA e Compliance em PMEs: O Guia Prático para Não Se Enrolar",
    description: "Guia completo sobre como usar Inteligência Artificial em PMEs de forma responsável e em conformidade com a LGPD. Aprenda os passos práticos para implementar IA sem se enrolar.",
    image: "",
    isInternal: true,
    internalUrl: "/blog/ia-compliance-pmes",
    readTime: "15 min"
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Artigo em destaque - aparece primeiro */}
      <Link to={featuredArticle.internalUrl}>
        <Card 
          className="overflow-hidden hover:shadow-2xl transition-all duration-300 group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 hover:-translate-y-1 cursor-pointer"
        >
        {/* Image Container with improved styling */}
        <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 relative overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 via-blue-500/30 to-brand-blue/20 flex items-center justify-center">
            <FileText className="h-12 w-12 text-brand-blue/50" />
          </div>
          
          {/* Badge */}
          <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-brand-blue to-blue-600 text-white shadow-lg border-0 px-3 py-1">
            <FileText className="h-3 w-3 mr-1" />
            Artigo
          </Badge>
          
          {/* Hover effect indicator */}
          <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <ArrowRight className="h-4 w-4 text-brand-blue" />
            </div>
          </div>
        </div>
        
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-2 group-hover:text-brand-blue transition-colors duration-300 text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight">
            {featuredArticle.title}
          </CardTitle>
          {featuredArticle.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mt-3 leading-relaxed">
              {featuredArticle.description}
            </p>
          )}
        </CardHeader>

        <CardContent className="pt-0">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Artigo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{featuredArticle.readTime}</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-brand-blue hover:text-white hover:bg-gradient-to-r hover:from-brand-blue hover:to-blue-600 transition-all duration-300 group/btn"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ArrowRight className="h-4 w-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
            Ler Artigo Completo
            <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
          </Button>
        </CardContent>
        </Card>
      </Link>

      {/* Artigos do LinkedIn */}
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} index={index} />
      ))}
    </div>
  );
}


