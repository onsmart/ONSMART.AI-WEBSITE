/**
 * Formulário de captura de lead para liberar conteúdo (ferramentas / materiais gratuitos).
 * Após sucesso: salva em localStorage (lead_captured_${slug}, validade 30 dias) e chama onSuccess.
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trpc } from '@/trpc';
import { Download } from 'lucide-react';

const LEAD_CAPTURED_KEY = (slug: string) => `lead_captured_${slug}`;
const VALIDITY_DAYS = 30;

export interface LeadCapturedData {
  nomeCompleto: string;
  email: string;
  telefone: string;
  timestamp: number;
}

export function getLeadCaptured(slug: string): LeadCapturedData | null {
  try {
    const raw = localStorage.getItem(LEAD_CAPTURED_KEY(slug));
    if (!raw) return null;
    const data = JSON.parse(raw) as LeadCapturedData;
    if (!data.timestamp) return null;
    const maxAge = VALIDITY_DAYS * 24 * 60 * 60 * 1000;
    if (Date.now() - data.timestamp > maxAge) return null;
    return data;
  } catch {
    return null;
  }
}

export function setLeadCaptured(slug: string, data: Omit<LeadCapturedData, 'timestamp'>): void {
  const payload: LeadCapturedData = { ...data, timestamp: Date.now() };
  localStorage.setItem(LEAD_CAPTURED_KEY(slug), JSON.stringify(payload));
}

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
      setLeadCaptured(contentSlug, { nomeCompleto, email, telefone });
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

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Receba &quot;{contentTitle}&quot; por e-mail
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Preencha os campos abaixo. O arquivo será enviado para seu e-mail e você terá acesso ao conteúdo aqui.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="lead-nome">Nome completo *</Label>
          <Input
            id="lead-nome"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
            required
            minLength={2}
            className="mt-1"
            placeholder="Seu nome completo"
          />
        </div>
        <div>
          <Label htmlFor="lead-email">E-mail *</Label>
          <Input
            id="lead-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1"
            placeholder="seu@email.com"
          />
        </div>
        <div>
          <Label htmlFor="lead-telefone">Telefone *</Label>
          <Input
            id="lead-telefone"
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
            minLength={8}
            className="mt-1"
            placeholder="(00) 00000-0000"
          />
        </div>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        <Button type="submit" disabled={sendMutation.isPending} className="bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4 mr-2" />
          {sendMutation.isPending ? 'Enviando...' : labelReceber}
        </Button>
      </form>
    </div>
  );
}
