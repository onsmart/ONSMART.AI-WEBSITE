import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Calendar, Clock, Download } from "lucide-react";
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
      <div className="py-16 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue mx-auto mb-4"></div>
        <p className="text-lg text-gray-500">Carregando e-books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-red-500">Erro ao carregar e-books: {error}</p>
      </div>
    );
  }

  if (ebooks.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-gray-500">Nenhum e-book encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {ebooks.map((ebook, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
            {ebook.image ? (
              <LazyImage
                src={ebook.image}
                alt={ebook.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 to-brand-blue/40" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <Badge className="absolute top-4 left-4 z-10 bg-green-600 text-white">
              E-book
            </Badge>
          </div>
          
          <CardHeader>
            <CardTitle className="line-clamp-2 group-hover:text-brand-blue transition-colors text-gray-900 dark:text-gray-100">
              {ebook.title}
            </CardTitle>
            {ebook.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mt-2">
                {ebook.description}
              </p>
            )}
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>E-book</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Download</span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full text-brand-blue hover:text-brand-blue/80 hover:bg-brand-blue/10"
              onClick={() => {
                if (ebook.link) {
                  window.open(ebook.link, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar E-book
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

