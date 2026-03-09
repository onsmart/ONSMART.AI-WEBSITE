/**
 * Root app router: marketing sub-router.
 */

import { router } from './_core/trpc.js';
import { marketingRouter } from './marketing/router.js';

export const appRouter = router({
  marketing: marketingRouter,
});

export type AppRouter = typeof appRouter;
