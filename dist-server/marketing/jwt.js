/**
 * JWT for marketing auth: access + refresh using jose.
 * Session TTL = MARKETING_SESSION_TTL_HOURS (default 5). After that, tokens expire and user must re-login.
 */
import * as jose from 'jose';
import { isRevoked, revokeToken } from './tokenStore.js';
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
const SESSION_TTL_HOURS = Number(process.env.MARKETING_SESSION_TTL_HOURS) || 5;
const EXPIRATION_STRING = `${SESSION_TTL_HOURS}h`;
if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'change-me-in-production') {
    console.warn('[marketing/jwt] JWT_SECRET não definido ou valor padrão. Defina JWT_SECRET no .env em produção.');
}
const getSecret = () => new TextEncoder().encode(JWT_SECRET);
export async function signMarketingAccessToken(payload) {
    return new jose.SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject(payload.sub)
        .setJti(payload.jti)
        .setIssuedAt()
        .setExpirationTime(EXPIRATION_STRING)
        .sign(getSecret());
}
export async function signMarketingRefreshToken(payload) {
    return new jose.SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject(payload.sub)
        .setJti(payload.jti)
        .setIssuedAt()
        .setExpirationTime(EXPIRATION_STRING)
        .sign(getSecret());
}
export async function verifyMarketingToken(token) {
    try {
        const { payload } = await jose.jwtVerify(token, getSecret());
        const jti = payload.jti;
        if (jti && isRevoked(jti))
            return null;
        return {
            sub: payload.sub,
            email: payload.email,
            jti,
            exp: payload.exp ?? 0,
        };
    }
    catch {
        return null;
    }
}
export function revokeMarketingToken(jti, exp) {
    revokeToken(jti, exp);
}
