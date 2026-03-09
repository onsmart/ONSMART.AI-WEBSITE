/**
 * tRPC context (Express). Exposes marketingUser and res for setting httpOnly cookies.
 * When access token is present but invalid/expired, clears cookies to force re-login.
 */
import { verifyMarketingToken } from '../marketing/jwt.js';
import { getMarketingUserById } from '../marketing/db.js';
import { clearMarketingCookies } from '../marketing/cookies.js';
const COOKIE_ACCESS = 'marketing_access';
function getCookie(req, name) {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader)
        return null;
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}
export async function createContext(opts) {
    const { req, res } = opts;
    let marketingUser = null;
    const accessToken = getCookie(req, COOKIE_ACCESS);
    if (accessToken) {
        const payload = await verifyMarketingToken(accessToken);
        if (payload) {
            const user = await getMarketingUserById(payload.sub);
            if (user) {
                marketingUser = { id: user.id, email: user.email, name: user.name };
            }
        }
        else {
            // Token expired or invalid: clear cookies so browser drops them (force logout)
            clearMarketingCookies(res);
        }
    }
    return {
        req,
        res,
        marketingUser,
    };
}
