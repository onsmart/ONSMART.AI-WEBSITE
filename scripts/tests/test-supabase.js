/**
 * Teste de persistência no Supabase (marketing_users, marketing_contents e storage).
 * Uso: npm run test:supabase
 * Requer no .env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function main() {
  console.log('\n=== Teste Supabase (Marketing) ===\n');

  if (!url || !key) {
    console.error('❌ Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env');
    process.exit(1);
  }

  const supabase = createClient(url, key);

  try {
    // 1) marketing_users: listar
    const { data: users, error: usersError } = await supabase
      .from('marketing_users')
      .select('id, email, name, created_at');

    if (usersError) {
      console.error('❌ marketing_users:', usersError.message);
      console.log('   Verifique se a tabela existe (rode a migração SQL no Supabase).');
      process.exit(1);
    }
    console.log('✅ marketing_users:', users?.length ?? 0, 'registro(s)');
    if (users?.length) {
      users.forEach((u) => console.log('   -', u.email));
    }

    // 2) marketing_contents: contar e listar tipos
    const { data: contents, error: contentsError } = await supabase
      .from('marketing_contents')
      .select('id, type, status, slug, titulo');

    if (contentsError) {
      console.error('❌ marketing_contents:', contentsError.message);
      process.exit(1);
    }
    const total = contents?.length ?? 0;
    console.log('✅ marketing_contents:', total, 'registro(s)');
    if (total > 0) {
      const byType = contents.reduce((acc, c) => {
        acc[c.type] = (acc[c.type] || 0) + 1;
        return acc;
      }, {});
      Object.entries(byType).forEach(([t, n]) => console.log('   -', t + ':', n));
    }

    // 3) Teste de escrita: insert + delete
    const slugTest = 'teste-persistencia-' + Date.now();
    const { data: inserted, error: insertError } = await supabase
      .from('marketing_contents')
      .insert({
        type: 'blog_artigos',
        status: 'draft',
        slug: slugTest,
        titulo: 'Teste de persistência Supabase',
        resumo: 'Registro criado pelo script test-supabase.js',
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('❌ Insert teste:', insertError.message);
      process.exit(1);
    }
    console.log('✅ Insert teste OK (id:', inserted?.id + ')');

    const { error: deleteError } = await supabase
      .from('marketing_contents')
      .delete()
      .eq('id', inserted.id);

    if (deleteError) {
      console.warn('⚠️ Delete teste:', deleteError.message);
    } else {
      console.log('✅ Delete teste OK (registro removido)');
    }

    // 4) Storage: listar buckets (opcional; pode falhar se buckets não existirem)
    try {
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      if (!bucketsError && buckets?.length) {
        console.log('✅ Storage buckets:', buckets.map((b) => b.name).join(', '));
        const hasPdfs = buckets.some((b) => b.name === 'marketing-pdfs');
        const hasImages = buckets.some((b) => b.name === 'marketing-images');
        if (!hasPdfs || !hasImages) {
          console.warn('⚠️  Crie os buckets marketing-pdfs e marketing-images no Supabase para envio de materiais.');
        }
      }
    } catch (e) {
      console.warn('⚠️ Storage list:', e.message);
    }

    console.log('\n✅ Supabase: persistência OK.\n');
  } catch (err) {
    console.error('❌ Erro:', err.message || err);
    process.exit(1);
  }
}

main();
