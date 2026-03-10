/**
 * Formulário de captura de lead para liberar conteúdo (ferramentas / materiais gratuitos).
 * Após sucesso: chama onSuccess (não armazena em localStorage).
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trpc } from '@/trpc';
import { Download, Mail, User, Phone } from 'lucide-react';

export interface LeadCaptureFormProps {
  contentSlug: string;
  contentTitle: string;
  contentType: 'ferramentas' | 'materiais_gratuitos';
  onSuccess: () => void;
}

export function LeadCaptureForm({ contentSlug, contentTitle, contentType, onSuccess }: LeadCaptureFormProps) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [error, setError] = useState('');

  const sendMutation = trpc.marketing.content.sendPdfByEmail.useMutation({
    onSuccess: () => {
      onSuccess();
    },
    onError: (e) => setError(e.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    sendMutation.mutate({
      slug: contentSlug,
      nomeCompleto: nomeCompleto.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
    });
  };

  const labelReceber =
    contentType === 'ferramentas'
      ? 'Receber ferramenta por e-mail'
      : 'Receber material por e-mail';

  const inputBase =
    'h-11 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:outline-none px-4 min-w-0';

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-700/80 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/80 dark:to-gray-800/80 p-6 md:p-8 shadow-lg shadow-gray-200/50 dark:shadow-none">
      <div className="flex items-center gap-3 mb-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue">
          <Mail className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Receba &quot;{contentTitle}&quot; por e-mail
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 pl-[3.25rem]">
        Preencha os campos abaixo. O arquivo será enviado para seu e-mail.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="lead-nome" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome completo *
          </Label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500 pointer-events-none shrink-0" />
            <Input
              id="lead-nome"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              required
              minLength={2}
              className={`pl-11 ${inputBase}`}
              placeholder="Seu nome completo"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            E-mail *
          </Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500 pointer-events-none shrink-0" />
            <Input
              id="lead-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`pl-11 ${inputBase}`}
              placeholder="seu@email.com"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-telefone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Telefone *
          </Label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500 pointer-events-none shrink-0" />
            <Input
              id="lead-telefone"
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              minLength={8}
              className={`pl-11 ${inputBase}`}
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-2">
            {error}
          </p>
        )}
        <Button
          type="submit"
          disabled={sendMutation.isPending}
          className="h-11 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white font-medium shadow-md shadow-brand-blue/25 transition-all duration-200"
        >
          <Download className="h-4 w-4 mr-2" />
          {sendMutation.isPending ? 'Enviando...' : labelReceber}
        </Button>
      </form>
    </div>
  );
}
