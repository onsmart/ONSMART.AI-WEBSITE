import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Calendar, Clock, Download, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import LazyImage from "@/components/ui/lazy-image";

interface EbookItem {
  title: string;
  image: string;
  description: string;
  link: string;
}

export default function EbooksFeed() {
  const [ebooks, setEbooks] = useState<EbookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const SHEET_ID = "1VjjagCCY-UmkmSn__nZ6pw_Oejsx6Idc_i43AcYEfqg";

  useEffect(() => {
    const fetchEbooks = async () => {
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
          throw new Error(`Falha ao buscar e-books: ${response.status}`);
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
          const description = r.c[2]?.v || '';
          const link = r.c[3]?.v || '';
          
          return {
            title,
            image,
            description,
            link
          };
        }).filter(row => row.title && row.title.trim() !== '');
        
        setEbooks(rows);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        console.error('Erro ao buscar e-books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEbooks();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Carregando e-books...</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Aguarde um momento</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
          <BookOpen className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Erro ao carregar e-books</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  if (ebooks.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <BookOpen className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Nenhum e-book encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {ebooks.map((ebook, index) => (
        <Card 
          key={index} 
          className="overflow-hidden hover:shadow-2xl transition-all duration-300 group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-green-500/50 dark:hover:border-green-500/50 hover:-translate-y-1 cursor-pointer"
          onClick={() => {
            if (ebook.link) {
              window.open(ebook.link, '_blank', 'noopener,noreferrer');
            }
          }}
        >
          {/* Image Container with improved styling */}
          <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 relative overflow-hidden">
            {ebook.image && ebook.image.trim() !== '' ? (
              <>
                <LazyImage
                  src={ebook.image}
                  alt={ebook.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
                {/* Fallback se imagem falhar */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-500/20 via-emerald-500/30 to-green-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <BookOpen className="h-12 w-12 text-green-500/50" />
                </div>
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-500/20 via-emerald-500/30 to-green-500/20 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-green-500/50" />
              </div>
            )}
            
            {/* Badge */}
            <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg border-0 px-3 py-1">
              <BookOpen className="h-3 w-3 mr-1" />
              E-book
            </Badge>
            
            {/* Hover effect indicator */}
            <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <ArrowRight className="h-4 w-4 text-green-500" />
              </div>
            </div>
          </div>
          
          <CardHeader className="pb-3">
            <CardTitle className="line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight">
              {ebook.title}
            </CardTitle>
            {ebook.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mt-3 leading-relaxed">
                {ebook.description}
              </p>
            )}
          </CardHeader>

          <CardContent className="pt-0">
            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>E-book</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>Download</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-green-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 transition-all duration-300 group/btn"
              onClick={(e) => {
                e.stopPropagation();
                if (ebook.link) {
                  window.open(ebook.link, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <Download className="h-4 w-4 mr-2 group-hover/btn:translate-y-[-2px] transition-transform" />
              Baixar E-book
              <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


