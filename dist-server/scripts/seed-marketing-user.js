/**
 * Seed one marketing user. Run once after creating marketing_users table.
 * Usage: MARKETING_SEED_EMAIL=admin@example.com MARKETING_SEED_PASSWORD=secret node dist-server/scripts/seed-marketing-user.js
 * Or with tsx: npx tsx server/scripts/seed-marketing-user.ts
 */
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.MARKETING_SEED_EMAIL || 'marketing@onsmart.com.br';
const password = process.env.MARKETING_SEED_PASSWORD || 'change-me';
if (!url || !key) {
    console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}
const supabase = createClient(url, key);
async function main() {
    const passwordHash = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
        .from('marketing_users')
        .upsert({ email: email.toLowerCase(), password_hash: passwordHash, updated_at: new Date().toISOString() }, { onConflict: 'email' })
        .select()
        .single();
    if (error) {
        console.error('Seed failed:', error.message);
        process.exit(1);
    }
    console.log('Marketing user ready:', data?.email);
}
main();
