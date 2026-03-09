/**
 * Mailchimp: add/update member in list (obrigatório ao enviar material).
 * Variáveis: MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, opcional MAILCHIMP_API_BASE.
 */
import crypto from 'crypto';
const apiKey = process.env.MAILCHIMP_API_KEY;
const listId = process.env.MAILCHIMP_LIST_ID;
const baseUrl = process.env.MAILCHIMP_API_BASE ||
    (apiKey ? `https://${apiKey.split('-')[1] || 'us16'}.api.mailchimp.com/3.0` : '');
function subscriberHash(email) {
    return crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex');
}
export function isMailchimpConfigured() {
    return !!(apiKey && listId);
}
export async function addOrUpdateMailchimpLead(input) {
    if (!apiKey || !listId) {
        return { ok: false, error: 'Mailchimp não configurado (MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID)' };
    }
    const auth = Buffer.from('anystring:' + apiKey).toString('base64');
    const hash = subscriberHash(input.email);
    const nameParts = (input.firstName || '').trim().split(/\s+/);
    const fname = nameParts[0] || input.firstName || '';
    const lname = nameParts.slice(1).join(' ') || input.lastName || '';
    const body = {
        email_address: input.email.toLowerCase().trim(),
        status: 'subscribed',
        merge_fields: {
            FNAME: fname,
            LNAME: lname,
            ...(input.phone && { PHONE: input.phone }),
        },
    };
    if (input.tags && input.tags.length > 0) {
        body.tags = input.tags.map((t) => ({ name: t }));
    }
    const res = await fetch(`${baseUrl}/lists/${listId}/members/${hash}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + auth,
        },
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        const text = await res.text();
        return { ok: false, error: `Mailchimp ${res.status}: ${text.slice(0, 200)}` };
    }
    return { ok: true };
}
