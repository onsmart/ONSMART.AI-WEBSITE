import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Share2, FileText } from 'lucide-react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import { useTranslation } from 'react-i18next';

const ArtigoIACompliancePMEs = () => {
  const { t } = useTranslation(['common']);

  return (
    <>
      <UnifiedSEO 
        title="IA e Compliance em PMEs: O Guia Prático para Não Se Enrolar | Blog OnSmartAI"
        description="Guia completo sobre como usar Inteligência Artificial em PMEs de forma responsável e em conformidade com a LGPD. Aprenda os passos práticos para implementar IA sem se enrolar."
        keywords="IA PMEs, LGPD, compliance, inteligência artificial, proteção de dados, ANPD, Shadow AI, segurança de dados"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Blog
            </Link>
          </Button>

          {/* Article Header */}
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-10 lg:p-14 xl:p-16">
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  <span>Artigo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>Fevereiro 2026</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>15 min de leitura</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                IA e Compliance em PMEs: O Guia Prático para Não Se Enrolar
              </h1>

              {/* Category and Share */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                <span className="inline-block bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium">
                  Compliance & LGPD
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'IA e Compliance em PMEs: O Guia Prático para Não Se Enrolar',
                        text: 'Guia completo sobre como usar IA em PMEs de forma responsável e em conformidade com a LGPD.',
                        url: window.location.href
                      });
                    }
                  }}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar
                </Button>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg md:prose-xl max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-brand-blue dark:prose-a:text-brand-blue prose-strong:text-gray-900 dark:prose-strong:text-white prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg prose-headings:font-bold">
                
                {/* Introduction */}
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-medium">
                  "Usar o ChatGPT na sua empresa pode gerar uma multa da LGPD?". A pergunta, que parece simples, abre uma discussão crucial para qualquer pequeno ou médio empresário no Brasil. A Inteligência Artificial (IA) deixou de ser uma promessa distante e se tornou uma ferramenta do dia a dia, mas seu uso traz consigo responsabilidades que muitos ainda desconhecem.
                </p>

                <p className="mb-6">
                  O cenário é um misto de otimismo e risco. Pesquisas recentes mostram que a grande maioria dos gestores de PMEs no Brasil já usa ou pretende usar IA, com 75% deles otimistas sobre o impacto da tecnologia em seus negócios e 85% a considerando uma aliada na rotina de trabalho. Contudo, essa revolução silenciosa esconde um perigo: a "Shadow AI", que é o uso de ferramentas de IA pelos colaboradores sem o conhecimento ou a aprovação da gestão. Um estudo revelou que 38% dos funcionários admitem inserir dados sensíveis da empresa em plataformas de IA sem autorização, abrindo uma porta perigosa para vazamentos e problemas legais.
                </p>

                <p className="mb-8">
                  Se você é dono ou gestor de uma PME, este artigo é o seu guia. Vamos desmistificar o que a Lei Geral de Proteção de Dados (LGPD) diz sobre o uso de IA, apresentar os passos mínimos para usar a tecnologia com segurança e mostrar por que estar em conformidade, longe de ser um obstáculo, é uma vantagem competitiva.
                </p>

                {/* Section 1 */}
                <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
                  LGPD e IA: Se Você Usa, a Lei te Enxerga
                </h2>

                <p className="mb-6">
                  O primeiro ponto a entender é direto: ao inserir dados de clientes, leads ou funcionários em qualquer ferramenta de IA — seja o ChatGPT, um CRM inteligente ou uma plataforma de automação —, sua empresa continua sendo a controladora desses dados. Para a LGPD, isso significa que a responsabilidade pela segurança e pelo uso correto dessas informações é 100% sua, mesmo que a tecnologia seja de terceiros.
                </p>

                {/* Section 2 */}
                <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
                  A ANPD para Pequenos Negócios: Flexibilização Não Significa Imunidade
                </h2>

                <p className="mb-6">
                  Reconhecendo que PMEs têm menos estrutura que grandes corporações, a Autoridade Nacional de Proteção de Dados (ANPD) criou regras mais flexíveis para elas através da Resolução nº 2/2022. No entanto, é fundamental entender que flexibilizar não é isentar. As principais adaptações para agentes de tratamento de pequeno porte são:
                </p>

                {/* Table */}
                <div className="overflow-x-auto my-8">
                  <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                    <thead>
                      <tr className="bg-brand-blue/10 dark:bg-brand-blue/20">
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                          Benefício para PMEs
                        </th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                          O que significa na prática
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium text-gray-900 dark:text-white">
                          Dispensa do Encarregado (DPO)
                        </td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                          Sua empresa não precisa nomear formalmente um Encarregado de Proteção de Dados, desde que ofereça um canal de comunicação claro e acessível para que qualquer pessoa possa tirar dúvidas ou fazer solicitações sobre seus dados.
                        </td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-800/50">
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium text-gray-900 dark:text-white">
                          Prazos em Dobro
                        </td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                          A empresa ganha o dobro do tempo para responder às solicitações dos titulares de dados, como pedidos de acesso ou exclusão de informações.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium text-gray-900 dark:text-white">
                          Registro Simplificado
                        </td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                          A obrigação de registrar todas as operações de tratamento de dados pode ser feita de forma simplificada. A própria ANPD disponibiliza um modelo para facilitar esse controle.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mb-8">
                  Essa postura orientadora foi reforçada em fevereiro de 2026, com uma parceria firmada entre a ANPD e o Sebrae para massificar a cultura de proteção de dados entre as micro e pequenas empresas. O recado é claro: o objetivo é ajudar, mas a conformidade com a lei continua sendo obrigatória.
                </p>

                {/* Section 3 */}
                <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
                  O Mínimo Viável: 4 Passos Práticos para Começar Hoje
                </h2>

                <p className="mb-6">
                  Para não se enrolar, não é preciso implementar um projeto complexo e caro da noite para o dia. Comece com o básico. Aqui estão quatro passos práticos, inspirados no guia da própria ANPD, para organizar a casa.
                </p>

                <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
                  Passo 1: Entenda seu Enquadramento
                </h3>

                <p className="mb-6">
                  Primeiro, verifique se sua empresa se enquadra como "agente de tratamento de pequeno porte". A definição inclui microempresas, empresas de pequeno porte, startups e pessoas jurídicas de direito privado que não realizem tratamento de alto risco. Confirmar esse enquadramento é o que garante o direito às flexibilizações da Resolução n° 2.
                </p>

                <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
                  Passo 2: Faça o Inventário da IA
                </h3>

                <p className="mb-6">
                  Para combater a "Shadow AI", você precisa saber o que está sendo usado. Converse com suas equipes e mapeie todas as ferramentas de IA em uso, formais ou não. Onde os dados da empresa estão sendo inseridos? Para quais finalidades? O "Formulário Modelo de Registro de Operações" disponibilizado pela ANPD é um excelente ponto de partida para documentar isso.
                </p>

                <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
                  Passo 3: Crie Regras Claras (e Comunique!)
                </h3>

                <p className="mb-6">
                  Crie uma política interna de uso de IA, mesmo que seja simples. Um documento de uma página estabelecendo diretrizes como "É proibido inserir dados pessoais de clientes ou informações confidenciais da empresa em IAs generativas públicas" já é um grande avanço. Para ajudar, a ANPD publicou o "Guia Orientativo sobre Segurança da Informação para Agentes de Tratamento de Pequeno Porte", um material gratuito e em linguagem acessível.
                </p>

                <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
                  Passo 4: Tenha um Plano para Incidentes
                </h3>

                <p className="mb-8">
                  Se um vazamento de dados acontecer, a LGPD exige que o incidente seja comunicado à ANPD e aos titulares afetados em até três dias úteis, caso represente risco ou dano relevante. Ter um plano mínimo de resposta — saber quem contatar, como avaliar o risco e o que comunicar — é crucial. Embora as multas ainda sejam raras, a não comunicação de um incidente é vista como uma falha grave pela autoridade.
                </p>

                {/* Section 4 */}
                <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
                  O Cenário Real das Sanções: A Fase "Educativa" da ANPD Está no Fim?
                </h2>

                <p className="mb-6">
                  Até hoje, a aplicação de multas pela ANPD tem sido tímida. Dados de 2025 mostram que, até agosto de 2024, apenas 18 sanções haviam sido aplicadas, com somente duas multas financeiras que, somadas, totalizaram R$ 14,4 mil para uma microempresa. Nenhuma empresa privada foi multada em 2024. Essa postura inicial foi claramente pedagógica.
                </p>

                <p className="mb-6">
                  Contudo, há sinais claros de que o cenário está mudando. A publicação de regulamentos importantes, como o de dosimetria de sanções e o de comunicação de incidentes, deu à ANPD as ferramentas que faltavam para uma fiscalização mais robusta. Além disso, a autoridade tem se tornado mais ativa, como na fiscalização de 20 empresas por falta de um canal de comunicação com o titular.
                </p>

                <p className="mb-8">
                  Decisões recentes também elevam o alerta. A Deliberação CD-10/2025 passou a prever multas diárias por descumprimento de medidas, e uma decisão do Superior Tribunal de Justiça (STJ) de setembro de 2025 firmou o entendimento de que o vazamento de dados pessoais gera dano moral presumido, o que pode levar a indenizações mesmo sem a aplicação de multa pela ANPD. A fase de orientação parece estar chegando ao fim.
                </p>

                {/* Section 5 */}
                <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
                  Olhando para o Futuro: Boas Práticas e a Nova Lei de IA
                </h2>

                <p className="mb-6">
                  Estar em conformidade não é apenas sobre evitar multas, mas sobre construir confiança. Duas referências internacionais ajudam a organizar a casa e demonstram diligência:
                </p>

                <ul className="list-disc pl-6 mb-6 space-y-3">
                  <li>
                    <strong>NIST AI Risk Management Framework (AI RMF):</strong> Um "manual de gestão de riscos" voluntário, criado pelo governo dos Estados Unidos, que ajuda a mapear, medir e gerenciar os riscos associados à IA.
                  </li>
                  <li>
                    <strong>ISO/IEC 42001:</strong> O primeiro padrão internacional para Sistemas de Gestão de IA. Ter essa certificação funciona como um selo de qualidade, atestando que a empresa possui processos maduros para usar IA de forma responsável.
                  </li>
                </ul>

                <p className="mb-8">
                  Enquanto isso, o Brasil avança na criação de sua própria lei para o setor. O PL 2338/2023, conhecido como Marco Legal da IA, já foi aprovado no Senado e agora tramita na Câmara dos Deputados. Ele propõe um sistema de governança e designa a ANPD como a autoridade central para o tema. Embora ainda não esteja em vigor, sua existência reforça que as regras atuais da LGPD são apenas o começo.
                </p>

                {/* Conclusion */}
                <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
                  Conclusão: Compliance como Vantagem Competitiva
                </h2>

                <p className="mb-6">
                  O uso de Inteligência Artificial é um caminho sem volta, repleto de oportunidades para otimizar processos, inovar e crescer. No entanto, ignorar as responsabilidades legais é um risco que pode custar caro. No Brasil, o custo médio de uma violação de dados já atinge R$ 7,19 milhões, sem contar o dano à reputação da marca.
                </p>

                <p className="mb-8">
                  Para uma PME, adequar-se à LGPD não é um luxo, mas uma questão de sobrevivência e estratégia. Começar com os passos mínimos, criar uma cultura de proteção de dados e enxergar o compliance como uma vantagem competitiva é o caminho mais inteligente para inovar com segurança.
                </p>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-brand-blue/10 via-blue-50 to-brand-blue/10 dark:from-brand-blue/20 dark:via-gray-800 dark:to-brand-blue/20 rounded-lg p-6 md:p-8 mt-12 border border-brand-blue/20">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Pronto para usar IA de forma estruturada e segura no seu negócio?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Se você quer entender como aplicar Inteligência Artificial de forma responsável e transformá-la em um motor de crescimento para sua empresa, fale com um de nossos especialistas.
                  </p>
                  <Button 
                    className="bg-brand-blue hover:bg-blue-600 text-white"
                    onClick={() => {
                      const phoneNumber = "15558991881"; // Número da Sonia
                      const message = "Olá! Vim pelo artigo sobre IA e Compliance em PMEs";
                      const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
                      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                    }}
                  >
                    Falar com Especialista no WhatsApp
                  </Button>
                </div>

              </div>
            </div>
          </article>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Artigos Relacionados</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Como Implementar Agentes de IA em sua Empresa</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Um roadmap prático para implementar agentes de IA, desde o planejamento até a medição de resultados.
                </p>
                <Link to="/blog" className="text-brand-blue hover:underline text-sm font-medium">
                  Ver mais artigos →
                </Link>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Calculando o ROI de Agentes de IA</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Framework completo para medir e maximizar o retorno do investimento em agentes de IA.
                </p>
                <Link to="/blog" className="text-brand-blue hover:underline text-sm font-medium">
                  Ver mais artigos →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ArtigoIACompliancePMEs;

