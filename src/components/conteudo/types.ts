
import { ReactElement } from 'react';
import { LucideIcon } from 'lucide-react';

export interface ContentItem {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  borderColor: string;
  backgroundFrom: string;
  backgroundTo: string;
  actionText: string;
  actionVariant: "default" | "outline";
  content: string;
  category: string;
  tags: string[];
  difficulty?: 'iniciante' | 'intermediario' | 'avancado';
  readTime?: number;
  // Novas propriedades
  rating?: number;
  totalRatings?: number;
  downloadCount?: number;
  previewUrl?: string;
  fileSize?: string;
  lastUpdated?: string;
  isCompleted?: boolean;
  prerequisites?: string[];
  learningObjectives?: string[];
}

export interface UserProgress {
  userId: string;
  contentId: string;
  completed: boolean;
  rating?: number;
  downloadedAt?: string;
  completedAt?: string;
  timeSpent?: number;
}

export interface ContentRating {
  id: string;
  contentId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface ConteudoGridProps {
  selectedCategory: string;
}

// Mapeamento expandido com categorias mais específicas
export const categoryTypeMap: Record<string, string[]> = {
  'artigos': ['artigo', 'tutorial', 'guia'],
  'ebooks': ['ebook', 'livro-digital'],
  'videos': ['video', 'webinar', 'tutorial-video'], 
  'webinars': ['webinar', 'live', 'evento-online'],
  'infograficos': ['infografico', 'visual', 'diagrama'],
  'casos': ['caso', 'estudo-caso', 'case-study'],
  'materiais': ['ebook', 'infografico', 'material', 'template', 'checklist'],
  'ferramentas': ['ferramenta', 'calculadora', 'template', 'planilha'],
  'glossario': ['glossario', 'termo', 'definicao'],
  'university': ['curso', 'aula', 'modulo', 'trilha'],
  'templates': ['template', 'modelo', 'planilha'],
  'checklists': ['checklist', 'lista', 'guia-rapido'],
  'calculadoras': ['calculadora', 'ferramenta-calculo', 'roi'],
  'guias': ['guia', 'passo-a-passo', 'manual']
};

// Categorias principais com subcategorias
export const contentCategories = {
  iniciante: {
    label: 'Iniciante',
    description: 'Conteúdo para quem está começando com IA',
    types: ['artigo', 'guia', 'glossario', 'video']
  },
  intermediario: {
    label: 'Intermediário', 
    description: 'Conteúdo para quem já tem conhecimento básico',
    types: ['caso', 'ebook', 'webinar', 'ferramenta']
  },
  avancado: {
    label: 'Avançado',
    description: 'Conteúdo técnico e especializado',
    types: ['curso', 'template', 'calculadora']
  },
  estrategico: {
    label: 'Estratégico',
    description: 'Conteúdo para tomadores de decisão',
    types: ['caso', 'infografico', 'ebook']
  },
  tecnico: {
    label: 'Técnico',
    description: 'Implementação prática e ferramentas',
    types: ['template', 'checklist', 'calculadora', 'ferramenta']
  }
};

// Tags disponíveis para organização
export const availableTags = [
  'ia-empresarial',
  'automacao',
  'produtividade',
  'roi',
  'implementacao',
  'estrategia',
  'cases',
  'metodologia-lider',
  'transformacao-digital',
  'agentes-ia',
  'chatbots',
  'machine-learning',
  'analise-dados',
  'processos',
  'eficiencia',
  'custos',
  'inovacao',
  'tecnologia',
  'gestao',
  'lideranca'
];
