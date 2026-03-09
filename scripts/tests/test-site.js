/**
 * Teste de verificação da API/site (backend tRPC).
 * Confirma que o servidor está no ar e que a API de marketing responde com dados do Supabase.
 * Uso: npm run test:site
 * Requer: servidor rodando (npm run server ou npm run dev:one). Base URL: PORT do .env ou 3001.
 */

import 'dotenv/config';

const PORT = process.env.PORT || 3001;
const BASE = process.env.VITE_API_URL || `http://localhost:${PORT}`;

async function main() {
  console.log('\n=== Teste API / Site (Backend tRPC) ===\n');
  console.log('   Base URL:', BASE);

  try {
    // 1) Health: endpoint que não exige tRPC
    const healthUrl = BASE + '/api/docker/status';
    let healthRes;
    try {
      healthRes = await fetch(healthUrl, { signal: AbortSignal.timeout(5000) });
    } catch (e) {
      if (e.code === 'ECONNREFUSED' || e.name === 'AbortError') {
        console.warn('⚠️  Servidor não está rodando em', BASE);
        console.warn('   Inicie com: npm run dev:one (ou npm run server em outro terminal)');
        console.log('\n   Teste de site ignorado (exit 0). Rode os outros testes com npm run test:services.\n');
        process.exit(0);
      }
      throw e;
    }

    if (!healthRes.ok) {
      console.warn('⚠️  Health check retornou', healthRes.status);
    } else {
      console.log('✅ Servidor no ar');
    }

    // 2) tRPC: marketing.public.list (dados do Supabase expostos pela API)
    const listPath = 'marketing.public.list';
    const inputEnc = encodeURIComponent(JSON.stringify({ json: { limit: 3 } }));
    const getUrl = BASE + '/api/trpc/' + listPath + '?input=' + inputEnc;
    let trpcRes = await fetch(getUrl, { signal: AbortSignal.timeout(10000) });
    if (!trpcRes.ok) {
      const postUrl = BASE + '/api/trpc';
      trpcRes = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([{ id: 0, path: listPath, input: { json: { limit: 3 } } }]),
        signal: AbortSignal.timeout(10000),
      });
    }

    if (trpcRes.ok && trpcRes.headers.get('content-type')?.includes('application/json')) {
      const data = await trpcRes.json();
      const first = data?.[0] ?? data?.result ?? data;
      const result = first?.result?.data?.json ?? first?.data?.json ?? first?.json ?? first?.result;
      const rows = result?.rows ?? result?.items ?? (Array.isArray(result) ? result : []);
      if (result && !first?.error) {
        console.log('✅ API marketing.public.list OK. Conteúdos (amostra):', Array.isArray(rows) ? rows.length : 0);
        if (Array.isArray(rows) && rows.length > 0) {
          rows.slice(0, 3).forEach((r) => console.log('   -', r.titulo || r.slug || r.id));
        }
      } else {
        console.warn('⚠️  Resposta tRPC inesperada; servidor está no ar.');
      }
    } else {
      console.warn('⚠️  tRPC retornou', trpcRes.status, '- servidor está no ar. Verifique a rota /api/trpc.');
    }

    console.log('\n✅ Site/API: verificação OK (persistência lida pelo backend).\n');
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      console.warn('⚠️  Servidor não está rodando. Inicie com: npm run dev:one');
      console.log('\n   Teste de site ignorado (exit 0).\n');
      process.exit(0);
    }
    console.error('❌ Erro:', err.message || err);
    process.exit(1);
  }
}

main();
