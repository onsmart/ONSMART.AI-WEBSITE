/**
 * Script para rodar o sync das planilhas (blog + e-books) para marketing_contents.
 * Uso: npm run sync:marketing (com .env com SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY).
 */

import 'dotenv/config';
import { syncBlogFromSheet, syncEbooksFromSheet } from '../marketing/syncFromSheet.js';

async function main() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env');
    process.exit(1);
  }
  console.log('Iniciando sync marketing (blog + e-books)...');
  try {
    const blog = await syncBlogFromSheet();
    console.log(`Blog/artigos: ${blog.created} novos, ${blog.updated} atualizados.`);
    const ebooks = await syncEbooksFromSheet();
    console.log(`E-books: ${ebooks.created} novos, ${ebooks.updated} atualizados.`);
    console.log('Sync concluído.');
  } catch (e) {
    console.error('Erro no sync:', e);
    process.exit(1);
  }
}

main();
