/**
 * Bloco "Compartilhar" para páginas de artigo: exibe o link da página e permite copiar.
 * Opcionalmente usa a Web Share API quando disponível (mobile).
 */

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Check } from 'lucide-react';

export interface ShareArticleBlockProps {
  /** URL a compartilhar; padrão: URL atual da aba */
  url?: string;
  /** Título do artigo (usado no navigator.share) */
  title?: string;
  /** Texto do botão principal */
  label?: string;
  /** Texto do botão de copiar */
  copyLabel?: string;
  /** Texto após copiar */
  copiedLabel?: string;
  className?: string;
}

export function ShareArticleBlock({
  url,
  title = '',
  label = 'Compartilhar',
  copyLabel = 'Copiar link',
  copiedLabel = 'Link copiado!',
  className = '',
}: ShareArticleBlockProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '');
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleCopy = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select + execCommand
      const input = document.createElement('input');
      input.value = shareUrl;
      input.readOnly = true;
      input.style.position = 'absolute';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } finally {
        document.body.removeChild(input);
      }
    }
  }, [shareUrl]);

  const handleShareClick = useCallback(async () => {
    if (canShare && title) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
          text: title,
        });
        setOpen(false);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') setOpen(true);
      }
    } else {
      setOpen((o) => !o);
    }
  }, [canShare, title, shareUrl]);

  return (
    <div className={`relative ${className}`}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleShareClick}
        className="gap-2"
      >
        <Share2 className="h-4 w-4" />
        {label}
      </Button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-2 w-full min-w-[280px] max-w-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-3">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Link do artigo
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 min-w-0 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm px-3 py-2"
              />
              <Button
                type="button"
                variant={copied ? 'default' : 'secondary'}
                size="sm"
                onClick={handleCopy}
                className="shrink-0 gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    {copiedLabel}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    {copyLabel}
                  </>
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
