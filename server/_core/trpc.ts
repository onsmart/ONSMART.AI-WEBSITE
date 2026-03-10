/**
 * tRPC procedures: publicProcedure and marketingProcedure.
 * marketingProcedure requires ctx.marketingUser.
 */

import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context.js';

const t = initTRPC.context<Context>().create();

/** Mensagem de erro para não-autenticado na área de marketing (distinta de outros logins, ex. OAuth). */
export const MARKETING_UNAUTHED_ERR_MSG = 'Marketing login required (10002)';

export const router = t.router;
export const publicProcedure = t.procedure;

export const marketingProcedure = t.procedure.use(async (opts) => {
  if (!opts.ctx.marketingUser) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: MARKETING_UNAUTHED_ERR_MSG });
  }
  return opts.next({
    ctx: {
      ...opts.ctx,
      marketingUser: opts.ctx.marketingUser,
    },
  });
});
