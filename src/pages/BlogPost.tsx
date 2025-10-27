
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock data - em um projeto real, isso viria de uma API ou CMS
  const post = {
    title: "Como Implementar Agentes de IA na sua Empresa em 30 Dias",
    content: `
      <p>A implementação de Agentes de Inteligência Artificial pode parecer complexa, mas com a metodologia certa, é possível transformar sua empresa em apenas 30 dias.</p>
      
      <h2>O que são Agentes de IA?</h2>
      <p>Agentes de IA são sistemas autônomos capazes de tomar decisões e executar tarefas específicas sem intervenção humana constante. Eles funcionam como uma força de trabalho digital que complementa suas equipes humanas.</p>
      
      <h2>Metodologia LÍDER</h2>
      <p>Nossa metodologia proprietária LÍDER garante uma implementação estruturada:</p>
      <ul>
        <li><strong>L</strong> - Levantamento de processos</li>
        <li><strong>Í</strong> - Identificação de oportunidades</li>
        <li><strong>D</strong> - Desenvolvimento dos agentes</li>
        <li><strong>E</strong> - Execução e implementação</li>
        <li><strong>R</strong> - Refinamento contínuo</li>
      </ul>
      
      <h2>Casos de Sucesso</h2>
      <p>Empresas que implementaram nossa metodologia viram aumentos de produtividade de até 420% em processos automatizados.</p>
    `,
    author: "onsmartAI Team",
    date: "2024-01-15",
    readTime: "5 min",
    category: "Implementação"
  };

  return (
    <>
      <UnifiedSEO 
        title={`${post.title} | Blog onsmartAI`}
        description="Aprenda como implementar Agentes de IA na sua empresa em 30 dias com nossa metodologia LÍDER comprovada."
        keywords="implementação ia, agentes ia, metodologia líder, automação empresarial"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Blog
            </Link>
          </Button>

          {/* Article Header */}
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime} de leitura
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                {post.title}
              </h1>

              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                <span className="inline-block bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar
                </Button>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Artigos Relacionados</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">5 Erros Comuns na Implementação de IA</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Evite os principais erros que podem comprometer seu projeto de IA empresarial.
                  </p>
                  <Link to="/blog/erros-implementacao-ia" className="text-brand-blue hover:underline text-sm font-medium">
                    Ler artigo →
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">ROI em Projetos de IA: Como Calcular</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Aprenda a calcular e apresentar o retorno sobre investimento em IA.
                  </p>
                  <Link to="/blog/roi-projetos-ia" className="text-brand-blue hover:underline text-sm font-medium">
                    Ler artigo →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
