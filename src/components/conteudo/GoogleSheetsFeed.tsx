import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Calendar, Eye, ChevronDown } from "lucide-react";

interface ArticleItem {
  title: string;
  image: string;
  videoUrl: string;
  description: string;
}

export default function GoogleSheetsFeed() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  
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
        
        // Verificar se a resposta contém dados válidos
        if (!text.includes('table')) {
          throw new Error('Resposta inválida da API do Google Sheets');
        }
        
        const json = JSON.parse(text.substr(47).slice(0, -2));
        
        // Verificar se há dados na tabela
        if (!json.table || !json.table.rows || json.table.rows.length < 2) {
          throw new Error('Nenhum dado encontrado na planilha');
        }
        
        // Pular a primeira linha (cabeçalhos) e mapear os dados
        // Estrutura: A=TÍTULO, B=IMAGEM, C=LINK
        const rows = json.table.rows.slice(1).map((r: any, index: number) => {
          const title = r.c[0]?.v || '';      // Coluna A - Título
          const image = r.c[1]?.v || '';      // Coluna B - URL da imagem
          const videoUrl = r.c[2]?.v || '';   // Coluna C - Link do artigo
          const description = r.c[3]?.v || ''; // Coluna D - Descrição (opcional)
          
          // Debug: Log dos dados para verificar estrutura
          console.log(`Artigo ${index + 1}:`, {
            title,
            image,
            videoUrl,
            description,
            rawData: r.c
          });
          
          return {
            title,
            image,
            videoUrl,
            description
          };
        }).filter(row => row.title && row.title.trim() !== ''); // Filtrar linhas vazias
        
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
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
        <p className="text-lg text-gray-500">Nenhum artigo encontrado para esta categoria.</p>
      </div>
    );
  }

  // Mostrar apenas os 5 mais recentes se showAll for false
  const displayedArticles = showAll ? articles : articles.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArticles.map((article, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    // Debug: Log do erro da imagem
                    console.error('Erro ao carregar imagem:', {
                      src: article.image,
                      title: article.title,
                      error: e
                    });
                    // Fallback para imagem padrão se a URL da imagem falhar
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                  onLoad={() => {
                    console.log('Imagem carregada com sucesso:', article.image);
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Sem imagem</span>
                </div>
              )}
              <div className="absolute top-2 left-2">
                <div className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                  Artigo
                </div>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-sm line-clamp-2">
                {article.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-xs text-gray-500 mb-3 line-clamp-3">
                {article.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-400">
                  <FileText className="h-3 w-3 mr-1" />
                  Artigos & Guias
                </div>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => {
                    // Abrir a URL do vídeo em nova aba
                    if (article.videoUrl) {
                      window.open(article.videoUrl, '_blank');
                    } else {
                      alert(`Artigo: ${article.title}`);
                    }
                  }}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Ir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Botão "Ver Todos" se houver mais de 5 artigos */}
      {articles.length > 5 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2"
          >
            {showAll ? (
              <>
                Mostrar Menos
                <ChevronDown className="h-4 w-4 rotate-180" />
              </>
            ) : (
              <>
                Ver Todos os Artigos ({articles.length})
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
} 