/**
 * tRPC procedures: publicProcedure and marketingProcedure.
 * marketingProcedure requires ctx.marketingUser.
 */

import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context.js';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const marketingProcedure = t.procedure.use(async (opts) => {
  if (!opts.ctx.marketingUser) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Marketing login required' });
  }
  return opts.next({
    ctx: {
      ...opts.ctx,
      marketingUser: opts.ctx.marketingUser,
    },
  });
});
