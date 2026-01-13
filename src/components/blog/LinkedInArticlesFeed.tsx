import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import LazyImage from "@/components/ui/lazy-image";

interface ArticleItem {
  title: string;
  image: string;
  videoUrl: string;
  description: string;
}

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
      <div className="py-16 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue mx-auto mb-4"></div>
        <p className="text-lg text-gray-500">Carregando artigos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-red-500">Erro ao carregar artigos: {error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-gray-500">Nenhum artigo encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
            {article.image ? (
              <LazyImage
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 to-brand-blue/40" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <Badge className="absolute top-4 left-4 z-10 bg-brand-blue text-white">
              Artigo
            </Badge>
          </div>
          
          <CardHeader>
            <CardTitle className="line-clamp-2 group-hover:text-brand-blue transition-colors text-gray-900 dark:text-gray-100">
              {article.title}
            </CardTitle>
            {article.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mt-2">
                {article.description}
              </p>
            )}
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>LinkedIn</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>5 min</span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full text-brand-blue hover:text-brand-blue/80 hover:bg-brand-blue/10"
              onClick={() => {
                if (article.videoUrl) {
                  window.open(article.videoUrl, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Ler no LinkedIn
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

