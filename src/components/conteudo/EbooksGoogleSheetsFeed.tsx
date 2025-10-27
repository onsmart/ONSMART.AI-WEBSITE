import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, ExternalLink, Calendar, Download } from "lucide-react";

interface EbookItem {
  title: string;
  image: string;
  description: string;
  link: string;
}

export default function EbooksGoogleSheetsFeed() {
  const [ebooks, setEbooks] = useState<EbookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // ID da planilha do Google Sheets
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
          const link = r.c[2]?.v || '';       // Coluna C - Link
          
          // Debug: Log dos dados para verificar estrutura
          console.log(`E-book ${index + 1}:`, {
            title,
            image,
            link,
            rawData: r.c
          });
          
          return {
            title,
            image,
            description: link, // Usando link como description temporariamente
            link
          };
        }).filter(row => row.title && row.title.trim() !== ''); // Filtrar linhas vazias
        
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
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
        <p className="text-lg text-gray-500">Nenhum e-book encontrado para esta categoria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ebooks.map((ebook, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative">
            {ebook.image ? (
              <img
                src={ebook.image}
                alt={ebook.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  // Debug: Log do erro da imagem
                  console.error('Erro ao carregar imagem do e-book:', {
                    src: ebook.image,
                    title: ebook.title,
                    error: e
                  });
                  // Fallback para imagem padrão se a URL da imagem falhar
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
                onLoad={() => {
                  console.log('Imagem do e-book carregada com sucesso:', ebook.image);
                }}
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Sem imagem</span>
              </div>
            )}
            <div className="absolute top-2 left-2">
              <div className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                E-book
              </div>
            </div>
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="text-sm line-clamp-2">
              {ebook.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-0">
            <p className="text-xs text-gray-500 mb-3 line-clamp-3">
              {ebook.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-400">
                <Book className="h-3 w-3 mr-1" />
                E-books
              </div>
              
              {ebook.link && (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => window.open(ebook.link, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Acessar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 