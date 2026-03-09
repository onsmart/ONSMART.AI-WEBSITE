/**
 * Seed marketing user on startup when MARKETING_SEED_ON_STARTUP=true.
 * Uses same logic as server/scripts/seed-marketing-user.ts.
 */

import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

export async function runSeedIfEnabled(): Promise<void> {
  if (process.env.MARKETING_SEED_ON_STARTUP !== 'true') return;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const email = (process.env.MARKETING_SEED_EMAIL || 'marketing@onsmart.com.br').toLowerCase().trim();
  const password = process.env.MARKETING_SEED_PASSWORD || 'senha123';

  if (!url || !key) {
    console.warn('[marketing] Seed skipped: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required');
    return;
  }

  try {
    const supabase = createClient(url, key);
    const passwordHash = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from('marketing_users')
      .upsert(
        { email, password_hash: passwordHash, updated_at: new Date().toISOString() },
        { onConflict: 'email' }
      )
      .select()
      .single();

    if (error) {
      console.error('[marketing] Seed failed:', error.message);
      return;
    }
    console.log('[marketing] Seed user ready:', data?.email);
  } catch (e) {
    console.error('[marketing] Seed error:', e);
  }
}
