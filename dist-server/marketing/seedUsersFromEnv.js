/**
 * Lista de usuários para seed de marketing — apenas via env (ex.: .env local, nunca commitada).
 * Formato: MARKETING_SEED_USERS_JSON='[{"email":"...","password":"...","name":"..."}]'
 * name é opcional.
 */
export function getMarketingSeedUsersFromEnv() {
    const raw = process.env.MARKETING_SEED_USERS_JSON?.trim();
    if (!raw)
        return [];
    let parsed;
    try {
        parsed = JSON.parse(raw);
    }
    catch {
        throw new Error('JSON inválido');
    }
    if (!Array.isArray(parsed)) {
        throw new Error('deve ser um array JSON');
    }
    const out = [];
    for (const item of parsed) {
        if (!item || typeof item !== 'object')
            continue;
        const o = item;
        const email = o.email;
        const password = o.password;
        if (typeof email !== 'string' || typeof password !== 'string')
            continue;
        const name = o.name;
        const row = {
            email: email.trim(),
            password,
        };
        if (typeof name === 'string' && name.trim()) {
            row.name = name.trim();
        }
        if (row.email)
            out.push(row);
    }
    return out;
}
