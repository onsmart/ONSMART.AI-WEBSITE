/**
 * In-memory store for revoked JWT jti until expiry.
 */
const revoked = new Map();
export function revokeToken(jti, expSeconds) {
    revoked.set(jti, expSeconds);
}
export function isRevoked(jti) {
    return revoked.has(jti);
}
export function pruneExpired() {
    const now = Math.floor(Date.now() / 1000);
    for (const [jti, exp] of revoked.entries()) {
        if (exp <= now)
            revoked.delete(jti);
    }
}
// Run prune every 5 minutes
setInterval(pruneExpired, 5 * 60 * 1000);
