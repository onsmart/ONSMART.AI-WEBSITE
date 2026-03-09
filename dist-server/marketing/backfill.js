/**
 * Legacy site content to backfill into marketing_contents.
 * Maps static blogData (and any other existing content) into rows for marketing_contents.
 * Run when MARKETING_BACKFILL_FROM_SITE=true.
 */
import { createMarketingContent, getMarketingContentIdBySlug } from './db.js';
// Static blog posts from the site (blogData) - normalized for marketing_contents
const LEGACY_BLOG = [
    {
        slug: 'agentes-ia-produtividade-empresarial',
        titulo: 'Como os Agentes de IA estão revolucionando a produtividade corporativa',
        resumo: 'Descubra como empresas estão aumentando sua eficiência em 200% com implementação estratégica de agentes de IA.',
        conteudo: '<p>A inteligência artificial não é mais uma tecnologia do futuro - ela está transformando empresas hoje.</p><h2>O que são Agentes de IA?</h2><p>Agentes de IA são sistemas autônomos capazes de realizar tarefas complexas.</p><h2>Casos de Uso Transformadores</h2><ul><li>Automação de processos administrativos</li><li>Análise preditiva de vendas</li><li>Atendimento ao cliente 24/7</li></ul><h2>Resultados Mensuráveis</h2><p>Empresas que implementaram agentes de IA relatam aumentos médios de 200% na produtividade.</p>',
        imagem_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    },
    {
        slug: 'implementacao-agentes-ia-passo-passo',
        titulo: 'Guia Completo: Implementando Agentes de IA em sua Empresa',
        resumo: 'Um roadmap prático para implementar agentes de IA, desde o planejamento até a medição de resultados.',
        conteudo: '<p>A implementação bem-sucedida de agentes de IA requer planejamento estratégico e execução cuidadosa.</p><h2>Fase 1: Diagnóstico e Planejamento</h2><p>Antes de implementar qualquer solução de IA, é crucial entender os processos atuais.</p><h2>Fase 2: Desenvolvimento e Configuração</h2><h2>Fase 3: Implementação e Treinamento</h2>',
        imagem_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    },
    {
        slug: 'case-sucesso-financeira-agentes-ia',
        titulo: 'Case de Sucesso: Como a FinTech Brasil economizou R$ 2 milhões com Agentes de IA',
        resumo: 'História completa de transformação: processos, desafios, soluções e resultados mensuráveis.',
        conteudo: '<p>A FinTech Brasil enfrentava desafios críticos de escalabilidade.</p><h2>O Desafio</h2><h2>A Solução</h2><h2>Resultados</h2><ul><li>Redução de 4 horas para 15 minutos</li><li>Economia anual de R$ 2 milhões</li></ul>',
        imagem_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    },
    {
        slug: 'futuro-trabalho-agentes-ia-2024',
        titulo: 'O Futuro do Trabalho: Como os Agentes de IA vão transformar carreiras em 2024',
        resumo: 'Análise das tendências emergentes e como profissionais podem se preparar para a revolução da IA.',
        conteudo: '<p>O mercado de trabalho está passando por uma transformação sem precedentes.</p><h2>Novas Profissões Emergentes</h2><h2>Habilidades do Futuro</h2><h2>Como se Preparar</h2>',
        imagem_url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    },
    {
        slug: 'agentes-ia-atendimento-cliente-24h',
        titulo: 'Agentes de IA para Atendimento ao Cliente: Disponibilidade 24/7 com Qualidade Humana',
        resumo: 'Como implementar atendimento automatizado que mantém a qualidade e satisfação do cliente.',
        conteudo: '<p>O atendimento ao cliente evoluiu dramaticamente com agentes de IA.</p><h2>Benefícios Imediatos</h2><h2>Implementação Estratégica</h2>',
        imagem_url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    },
    {
        slug: 'roi-agentes-ia-calculo-retorno-investimento',
        titulo: 'Calculando o ROI de Agentes de IA: Métricas e Metodologias Comprovadas',
        resumo: 'Framework completo para medir e maximizar o retorno do investimento em agentes de IA.',
        conteudo: '<p>Medir o ROI de agentes de IA vai além de métricas tradicionais.</p><h2>Métricas Principais</h2><h2>Framework de Cálculo</h2>',
        imagem_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    },
];
export async function backfillLegacySiteContents() {
    let inserted = 0;
    let skipped = 0;
    for (const row of LEGACY_BLOG) {
        const existingId = await getMarketingContentIdBySlug(row.slug);
        if (existingId) {
            skipped += 1;
            continue;
        }
        const input = {
            type: 'blog_artigos',
            status: 'published',
            slug: row.slug,
            titulo: row.titulo,
            resumo: row.resumo,
            conteudo: row.conteudo,
            imagem_url: row.imagem_url,
        };
        const created = await createMarketingContent(input);
        if (created)
            inserted += 1;
    }
    return { inserted, skipped };
}
