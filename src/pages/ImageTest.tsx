import React, { useState, useEffect } from 'react';
import TestImage from '@/components/conteudo/TestImage';

interface TestArticle {
  title: string;
  image: string;
  link: string;
}

const ImageTestPage: React.FC = () => {
  const [articles, setArticles] = useState<TestArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setLoading(true);
        
        // Testar com URLs de exemplo
        const testArticles: TestArticle[] = [
          {
            title: "Teste 1 - Imagem válida",
            image: "https://picsum.photos/400/200?random=1",
            link: "https://example.com/1"
          },
          {
            title: "Teste 2 - Imagem válida",
            image: "https://picsum.photos/400/200?random=2", 
            link: "https://example.com/2"
          },
          {
            title: "Teste 3 - URL inválida",
            image: "https://url-invalida.com/imagem.jpg",
            link: "https://example.com/3"
          },
          {
            title: "Teste 4 - Sem imagem",
            image: "",
            link: "https://example.com/4"
          }
        ];

        // Simular carregamento do Google Sheets
        setTimeout(() => {
          setArticles(testArticles);
          setLoading(false);
        }, 1000);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setLoading(false);
      }
    };

    fetchTestData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold">Carregando testes de imagem...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600">Erro: {error}</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🖼️ Teste de Carregamento de Imagens
          </h1>
          <p className="text-gray-600">
            Verificando se as imagens do CMS estão carregando corretamente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <TestImage
              key={index}
              src={article.image}
              alt={article.title}
              title={article.title}
            />
          ))}
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">📋 Instruções para Teste</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>1. <strong>Verifique o console do navegador</strong> para logs de debug</p>
            <p>2. <strong>Teste URLs válidas:</strong> Devem carregar normalmente</p>
            <p>3. <strong>Teste URLs inválidas:</strong> Devem mostrar erro e fallback</p>
            <p>4. <strong>Teste URLs vazias:</strong> Devem mostrar "Sem imagem"</p>
            <p>5. <strong>Use o botão "Abrir URL"</strong> para testar URLs manualmente</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageTestPage;

