/**
 * Marketing auth cookies: TTL and set/clear helpers.
 * Session = MARKETING_SESSION_TTL_HOURS (default 5). After that, tokens expire and user must re-login.
 */

const SESSION_TTL_HOURS = Number(process.env.MARKETING_SESSION_TTL_HOURS) || 5;
const SESSION_MAX_AGE_SECONDS = SESSION_TTL_HOURS * 60 * 60;

export function getMarketingSessionMaxAgeSeconds(): number {
  return SESSION_MAX_AGE_SECONDS;
}

export function setMarketingCookies(
  res: { setHeader: (name: string, value: string | string[]) => void },
  accessToken: string,
  refreshToken: string
) {
  const isProd = process.env.NODE_ENV === 'production';
  (res as any).setHeader('Set-Cookie', [
    `marketing_access=${accessToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_SECONDS}${isProd ? '; Secure' : ''}`,
    `marketing_refresh=${refreshToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_SECONDS}${isProd ? '; Secure' : ''}`,
  ]);
}

export function clearMarketingCookies(res: { setHeader: (name: string, value: string | string[]) => void }) {
  (res as any).setHeader('Set-Cookie', [
    'marketing_access=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
    'marketing_refresh=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
  ]);
}
