/**
 * Seed dos 3 usuários de marketing. Execute após criar a tabela marketing_users.
 * Uso: npm run seed:marketing
 * Ou: npx tsx server/scripts/seed-marketing-user.ts
 *
 * Requer SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env (ou ambiente).
 */

import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

const SEED_USERS = [
  { email: 'mateus.mantovani@onsmart.com.br', password: 'Arizona@10161921' },
  { email: 'isabella.simiao@onsmart.com.br', password: 'Onsmart2026@isabellasimiao' },
  { email: 'thomas.jaeger@onsmart.com.br', password: 'Onsmart2026@thomasjaeger' },
];

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env');
  process.exit(1);
}

const supabase = createClient(url, key);

async function main() {
  for (const { email, password } of SEED_USERS) {
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
      console.error('Seed falhou para', normalizedEmail, ':', error.message);
      process.exit(1);
    }
    console.log('Usuário marketing pronto:', data?.email);
  }
}

main();
