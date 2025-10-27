import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Circle, ChevronLeft, ChevronRight } from "lucide-react";

type AnswerValue = 1 | 2 | 3 | 4 | 5;

// Lista completa; usaremos apenas as 30 primeiras para versão compacta
const ALL_QUESTIONS: string[] = [
  "Nossa empresa possui uma estratégia clara para uso de IA.",
  "As lideranças apoiam iniciativas de IA.",
  "Temos processos definidos para identificar casos de uso.",
  "Os dados necessários estão acessíveis e bem governados.",
  "Existe governança para privacidade e segurança dos dados.",
  "Integramos dados de múltiplas fontes com consistência.",
  "Há padronização de APIs e integrações entre sistemas.",
  "Modelos de IA são monitorados em produção.",
  "Temos processo de re-treino com dados atualizados.",
  "Métricas de qualidade e drift são acompanhadas.",
  "Os times colaboram entre áreas (TI, negócio, dados).",
  "As áreas de negócio entendem os benefícios da IA.",
  "Há processos para priorização de backlog de IA.",
  "Nossos agentes de IA têm objetivos claros (KPIs).",
  "Existe roadmap trimestral para iniciativas de IA.",
  "A infraestrutura suporta escalabilidade sob demanda.",
  "Utilizamos arquitetura cloud-native.",
  "Temos automações para CI/CD de modelos e serviços.",
  "A observabilidade (logs, métricas, tracing) é adequada.",
  "Os custos de IA são rastreados e otimizados.",
  "Há padronização de prompts e reutilização de componentes.",
  "Aplicamos testes automatizados em pipelines e agentes.",
  "Revisamos e versionamos prompts/modelos.",
  "Temos critérios de sucesso para cada caso de uso.",
  "A experiência do usuário é priorizada (UX conversacional).",
  "Interfaces são acessíveis e fáceis de usar.",
  "Feedback dos usuários alimenta melhorias contínuas.",
  "Canais (web, WhatsApp, apps) são integrados.",
  "A personalização é aplicada de forma responsável.",
  "Possuímos diretrizes de ética e transparência em IA.",
  "Riscos (vieses, privacidade) são avaliados regularmente.",
  "Treinamentos internos sobre IA são recorrentes.",
  "Há papéis e responsabilidades claros (RACI).",
  "Time possui competências adequadas (dados/ML/engenharia).",
  "Contratações e parcerias cobrem gaps de capacidade.",
  "Documentamos decisões e resultados das iniciativas.",
  "Acompanhamos ROI e impacto de cada iniciativa.",
  "Existe processo de ideação contínua com as áreas.",
  "Adoção dos agentes de IA é medida e acompanhada.",
  "SLA e suporte estão definidos para operações críticas.",
  "Automatizamos tarefas repetitivas sempre que possível.",
  "Backups e recuperação de desastres estão definidos.",
  "Ambiente de testes reflete produção adequadamente.",
  "Segurança é revisada em cada release.",
  "Temos catálogo de componentes e boas práticas.",
  "Integração com legados é estável e monitorada.",
  "Compartilhamento de conhecimento é incentivado.",
  "Dados mestres e taxonomias são padronizados.",
  "Políticas de acesso a dados são bem definidas.",
  "Os agentes de IA têm mecanismos de fallback.",
  "Falhas são analisadas com post-mortem e ações.",
  "Existe orquestração entre múltiplos agentes.",
  "Conectores com sistemas externos são mantidos.",
  "Monitoramos qualidade das respostas dos agentes.",
  "Melhorias são priorizadas por impacto e esforço.",
  "Aprendizados são compartilhados entre projetos.",
  "Visão de produto guia a evolução dos agentes.",
  "Objetivos estratégicos orientam o portfólio de IA."
];
// Versão compacta: 30 perguntas
const QUESTIONS: string[] = ALL_QUESTIONS.slice(0, 30);

const LIKERT_OPTIONS: { label: string; value: AnswerValue }[] = [
  { label: "Discordo totalmente", value: 1 },
  { label: "Discordo", value: 2 },
  { label: "Neutro", value: 3 },
  { label: "Concordo", value: 4 },
  { label: "Concordo totalmente", value: 5 }
];

const DiagnosticQuestionnaire: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<(AnswerValue | null)[]>(() => Array(QUESTIONS.length).fill(null));

  const total = QUESTIONS.length;
  const numAnswered = useMemo(() => answers.filter(a => a !== null).length, [answers]);
  const progressPercent = Math.round((numAnswered / total) * 100);

  const handleSelect = (value: AnswerValue) => {
    setAnswers(prev => {
      const next = [...prev];
      next[currentIndex] = value;
      return next;
    });
  };

  const goPrev = () => setCurrentIndex(i => Math.max(0, i - 1));
  const goNext = () => setCurrentIndex(i => Math.min(total - 1, i + 1));

  const canNext = answers[currentIndex] !== null;
  const isLast = currentIndex === total - 1;

  const handleSubmit = () => {
    // Aqui poderíamos enviar para backend/GA/CRM, por enquanto apenas logamos
    const payload = {
      completed: numAnswered === total,
      score: answers.reduce((acc, v) => acc + (v || 0), 0),
      answers
    };
    // eslint-disable-next-line no-console
    console.log("Diagnóstico submetido:", payload);
    alert("Obrigado! Suas respostas foram registradas.");
  };

  // Atalhos de teclado: setas para navegar, 1-5 para selecionar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (!isLast && canNext) goNext();
      } else if (["1","2","3","4","5"].includes(e.key)) {
        const val = parseInt(e.key, 10) as AnswerValue;
        handleSelect(val);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [canNext, isLast, currentIndex]);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/90 dark:bg-gray-900/80 border border-primary/10 shadow-sm">
      <CardHeader className="pb-3 px-4 sm:px-6">
        <CardTitle className="text-base md:text-lg font-bold text-center">
          Diagnóstico Inteligente (60 perguntas)
        </CardTitle>

        {/* Barra de progresso linear */}
        <div className="mt-2">
          <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-1 text-center text-[11px] text-gray-600 dark:text-gray-300">
            {numAnswered}/{total} respondidas ({progressPercent}%)
          </div>
        </div>

        {/* Painel quadrado com números e check */}
        <div className="mt-3 mx-auto w-full max-w-xs sm:max-w-sm">
          <div className="aspect-square">
            <div className="grid grid-cols-10 gap-1 h-full">
              {Array.from({ length: total }).map((_, idx) => {
                const answered = answers[idx] !== null;
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    className={[
                      "relative rounded-sm border flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400",
                      answered
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200",
                      isCurrent ? "ring-2 ring-blue-400" : ""
                    ].join(" ")}
                    title={`Pergunta ${idx + 1}${answered ? " — respondida" : ""}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Ir para a pergunta ${idx + 1}`}
                  >
                    <span className="text-[10px] leading-none select-none">{idx + 1}</span>
                    {answered && (
                      <Check className="h-3 w-3 absolute right-0.5 top-0.5 opacity-90" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded-sm bg-blue-600 inline-block" /> Respondida</span>
            <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded-sm bg-gray-200 inline-block" /> Pendente</span>
            <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded-sm ring-2 ring-blue-400 inline-block bg-transparent" /> Atual</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-4 sm:px-6">
        {/* Cabeçalho da pergunta atual */}
        <div className="flex items-center justify-center gap-3">
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
            Pergunta {currentIndex + 1} de {total}
          </span>
          {answers[currentIndex] !== null && (
            <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
              <Check className="h-4 w-4" /> Respondida
            </span>
          )}
        </div>
        <h3 className="text-base md:text-lg font-semibold text-center text-gray-900 dark:text-gray-100">
          {QUESTIONS[currentIndex]}
        </h3>

        {/* Opções Likert aprimoradas */}
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {LIKERT_OPTIONS.map(({ label, value }) => {
            const selected = answers[currentIndex] === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => handleSelect(value)}
                className={[
                  "group flex flex-col items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-md border text-xs sm:text-sm transition",
                  selected
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                ].join(" ")}
                aria-pressed={selected}
              >
                {selected ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5 opacity-60" />}
                <span className="text-center leading-tight">{label}</span>
              </button>
            );
          })}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3 px-4 sm:px-6 pb-4">
        <Button size="sm" variant="outline" onClick={goPrev} disabled={currentIndex === 0}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span className="hidden xs:inline">Anterior</span>
        </Button>
        {!isLast && (
          <Button size="sm" onClick={goNext} disabled={!canNext} className="min-w-[120px]">
            Próxima
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
        {isLast && (
          <Button size="sm" onClick={handleSubmit} disabled={!canNext} className="min-w-[150px]">
            Enviar
            <Check className="h-4 w-4 ml-1" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DiagnosticQuestionnaire;


