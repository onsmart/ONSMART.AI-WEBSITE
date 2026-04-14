/**
 * Seed de usuários de marketing a partir de MARKETING_SEED_USERS_JSON (env).
 * Uso: npm run seed:marketing
 *
 * Requer SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.
 * Credenciais reais: só no .env local ou geridas direto no Supabase (SQL Editor), não no Git.
 */
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';
import { getMarketingSeedUsersFromEnv } from '../marketing/seedUsersFromEnv.js';
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
    console.error('Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env');
    process.exit(1);
}
let seedUsers;
try {
    seedUsers = getMarketingSeedUsersFromEnv();
}
catch (e) {
    console.error('MARKETING_SEED_USERS_JSON:', e instanceof Error ? e.message : e);
    process.exit(1);
}
if (seedUsers.length === 0) {
    console.log('MARKETING_SEED_USERS_JSON vazio ou ausente — nenhum usuário para seed. ' +
        'Crie ou atualize marketing_users no Supabase ou defina a variável no .env local.');
    process.exit(0);
}
const supabase = createClient(url, key);
async function main() {
    for (const { email, password, name } of seedUsers) {
        const normalizedEmail = email.toLowerCase().trim();
        const passwordHash = await bcrypt.hash(password, 10);
        const row = {
            email: normalizedEmail,
            password_hash: passwordHash,
            updated_at: new Date().toISOString(),
        };
        if (name)
            row.name = name;
        const { data, error } = await supabase
            .from('marketing_users')
            .upsert(row, { onConflict: 'email' })
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
