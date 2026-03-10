/**
 * Modal de tutorial da área de marketing: explica de forma resumida como usar as funcionalidades.
 */

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FileText,
  LayoutGrid,
  BookOpen,
  Plus,
  Sparkles,
  Eye,
  Image,
} from 'lucide-react';

interface MarketingTutorialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  {
    icon: LayoutGrid,
    title: 'Abas de conteúdo',
    text: 'Use as abas Blog/Artigos, Ferramentas e Materiais Gratuitos para filtrar o que aparece no site. Cada tipo tem sua listagem e você pode buscar por título ou filtrar por status (Rascunho/Publicado).',
  },
  {
    icon: Plus,
    title: 'Criar e editar',
    text: 'Clique em "Novo" para criar um conteúdo ou em "Editar" na linha da tabela. Preencha título, slug (gerado automaticamente) e o conteúdo. Para artigos do site, você pode escrever em HTML ou usar "Formatar com IA" para converter texto em HTML responsivo.',
  },
  {
    icon: Sparkles,
    title: 'Formatar com IA',
    text: 'No campo Conteúdo, o botão "Formatar com IA" envia o texto para a IA e devolve HTML com títulos (h2/h3), parágrafos e estilos. Use para acelerar a formatação de artigos.',
  },
  {
    icon: Eye,
    title: 'Preview',
    text: 'Antes de publicar, use o botão "Preview" para ver como o conteúdo aparecerá na página do site.',
  },
  {
    icon: FileText,
    title: 'Blog: Site ou LinkedIn',
    text: 'Em Blog/Artigos você pode criar conteúdo que fica no site ou apenas um card que redireciona para um post do LinkedIn (informe a URL).',
  },
  {
    icon: Image,
    title: 'Imagem e PDF',
    text: 'Para ferramentas e materiais, você pode definir uma imagem de capa (URL ou upload) e anexar um PDF. O material é enviado por e-mail ao visitante que preenche o formulário.',
  },
];

export function MarketingTutorialModal({ open, onOpenChange }: MarketingTutorialModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl bg-white dark:bg-gray-800 p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-brand-blue/5 to-blue-50/50 dark:from-brand-blue/10 dark:to-gray-800/50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/15 dark:bg-brand-blue/25 text-brand-blue">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Como usar a Área de Marketing
              </DialogTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Resumo das funcionalidades
              </p>
            </div>
          </div>
        </DialogHeader>
        <div className="p-6 space-y-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex gap-4 rounded-xl border border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 text-brand-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
