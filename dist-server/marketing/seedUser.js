/**
 * Seed de marketing na subida do server quando MARKETING_SEED_ON_STARTUP=true.
 * Usuários vêm só de MARKETING_SEED_USERS_JSON (env); sem variável, nada é inserido.
 */
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';
import { getMarketingSeedUsersFromEnv } from './seedUsersFromEnv.js';
export async function runSeedIfEnabled() {
    if (process.env.MARKETING_SEED_ON_STARTUP !== 'true')
        return;
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
        console.warn('[marketing] Seed skipped: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required');
        return;
    }
    let seedUsers;
    try {
        seedUsers = getMarketingSeedUsersFromEnv();
    }
    catch (e) {
        console.error('[marketing] MARKETING_SEED_USERS_JSON inválido:', e instanceof Error ? e.message : e);
        return;
    }
    if (seedUsers.length === 0) {
        console.warn('[marketing] Seed skipped: MARKETING_SEED_USERS_JSON vazio — defina a variável ou gerencie usuários no Supabase');
        return;
    }
    try {
        const supabase = createClient(url, key);
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
                console.error('[marketing] Seed failed for', normalizedEmail, ':', error.message);
                continue;
            }
            console.log('[marketing] Seed user ready:', data?.email);
        }
    }
    catch (e) {
        console.error('[marketing] Seed error:', e);
    }
}
