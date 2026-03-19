/**
 * Seed marketing users on startup when MARKETING_SEED_ON_STARTUP=true.
 * Creates/updates os 3 usuários de acesso à área de marketing.
 */

import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

const MARKETING_SEED_USERS = [
  { email: 'mateus.mantovani@onsmart.com.br', password: 'Arizona@10161921' },
  { email: 'isabella.simiao@onsmart.com.br', password: 'Onsmart2026@isabellasimiao' },
  { email: 'thomas.jaeger@onsmart.com.br', password: 'Onsmart2026@thomasjaeger' },
];

export async function runSeedIfEnabled(): Promise<void> {
  if (process.env.MARKETING_SEED_ON_STARTUP !== 'true') return;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.warn('[marketing] Seed skipped: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required');
    return;
  }

  try {
    const supabase = createClient(url, key);
    for (const { email, password } of MARKETING_SEED_USERS) {
      const normalizedEmail = email.toLowerCase().trim();
      const passwordHash = await bcrypt.hash(password, 10);
      const { data, error } = await supabase
        .from('marketing_users')
        .upsert(
          { email: normalizedEmail, password_hash: passwordHash, updated_at: new Date().toISOString() },
          { onConflict: 'email' }
        )
        .select()
        .single();

      if (error) {
        console.error('[marketing] Seed failed for', normalizedEmail, ':', error.message);
        continue;
      }
      console.log('[marketing] Seed user ready:', data?.email);
    }
  } catch (e) {
    console.error('[marketing] Seed error:', e);
  }
}