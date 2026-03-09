/**
 * Server entry: export appRouter and createContext for Express mount.
 * Run sync from Google Sheet when MARKETING_BACKFILL_FROM_SITE=true (production only).
 */

import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers.js';
import { createContext } from './_core/context.js';
import { syncBlogFromSheet, syncEbooksFromSheet } from './marketing/syncFromSheet.js';
import { runSeedIfEnabled } from './marketing/seedUser.js';

export { appRouter, createContext };

export function createMarketingTrpcMiddleware() {
  return createExpressMiddleware({
    router: appRouter,
    createContext,
  });
}

/** Sync current deploy content (Google Sheet) into marketing_contents. Runs when MARKETING_BACKFILL_FROM_SITE=true (dev e produção). */
export async function runBackfillIfEnabled(): Promise<void> {
  if (process.env.MARKETING_BACKFILL_FROM_SITE !== 'true') return;
  try {
    const blog = await syncBlogFromSheet();
    console.log(`[marketing] Sync blog/planilha: ${blog.created} novos, ${blog.updated} atualizados.`);
    const ebooks = await syncEbooksFromSheet();
    console.log(`[marketing] Sync e-books: ${ebooks.created} novos, ${ebooks.updated} atualizados.`);
  } catch (e) {
    console.error('[marketing] Sync error:', e);
  }
}

export async function runMarketingSeedIfEnabled(): Promise<void> {
  await runSeedIfEnabled();
}
