import React, { useEffect, useRef, useState } from 'react';
import { elevenLabsConfigService } from '@/lib/elevenlabsConfigService';
import { loadElevenLabsScript, isElevenLabsConvaiElementDefined } from '@/lib/elevenlabsConfig';

interface ElevenLabsWidgetProps {
  className?: string;
}

type WidgetStatus = 'loading' | 'ready' | 'unavailable';

const ElevenLabsWidget: React.FC<ElevenLabsWidgetProps> = ({ className = '' }) => {
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<WidgetStatus>('loading');
  const [unavailableReason, setUnavailableReason] = useState<'script' | 'config' | 'network' | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        await new Promise((r) => setTimeout(r, 200));

        if (!isElevenLabsConvaiElementDefined()) {
          try {
            await loadElevenLabsScript();
          } catch (e) {
            console.warn('[ElevenLabsWidget] Script do widget não carregou:', e);
            if (cancelled) return;
            setUnavailableReason('script');
            setStatus('unavailable');
            return;
          }
        }

        if (cancelled || !widgetRef.current) return;

        const widgetHtml = await elevenLabsConfigService.getWidgetHtml();
        if (!widgetHtml?.trim()) {
          if (cancelled) return;
          setUnavailableReason('config');
          setStatus('unavailable');
          return;
        }

        widgetRef.current.innerHTML = '';
        widgetRef.current.innerHTML = widgetHtml;
        if (cancelled) return;
        setStatus('ready');
      } catch (e) {
        console.warn('[ElevenLabsWidget] Falha ao montar widget:', e);
        if (!cancelled) {
          setUnavailableReason('network');
          setStatus('unavailable');
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
      if (widgetRef.current) {
        widgetRef.current.innerHTML = '';
      }
    };
  }, []);

  const unavailableMessage =
    unavailableReason === 'config'
      ? 'Voz da Sonia indisponível: configure o servidor (ElevenLabs).'
      : unavailableReason === 'script'
        ? 'Voz da Sonia indisponível: não foi possível carregar o widget (rede ou bloqueio).'
        : 'Voz da Sonia indisponível no momento.';

  return (
    <div className={`elevenlabs-widget-container ${className}`}>
      {status === 'loading' && (
        <div className="flex items-center justify-center h-full min-h-[120px]">
          <div className="text-center px-2">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-emerald-600">Carregando Sonia...</p>
          </div>
        </div>
      )}
      {status === 'unavailable' && (
        <div className="flex items-center justify-center h-full min-h-[120px] px-2">
          <p className="text-xs text-center text-amber-700 dark:text-amber-400 leading-relaxed">{unavailableMessage}</p>
        </div>
      )}
      <div ref={widgetRef} className={`w-full h-full max-w-xs mx-auto ${status === 'ready' ? '' : 'sr-only'}`} aria-hidden={status !== 'ready'}>
        {/* HTML do widget injetado após script + /api/elevenlabs-widget */}
      </div>
    </div>
  );
};

export default ElevenLabsWidget;
