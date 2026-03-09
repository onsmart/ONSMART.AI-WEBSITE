/**
 * HubSpot: criar/atualizar contato + nota (obrigatório ao enviar material).
 * Variáveis: HUBSPOT_ACCESS_TOKEN ou HUBSPOT_API_KEY (Private App token).
 */
const token = (process.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT_API_KEY || '').replace(/\s+/g, '').trim();
const baseUrl = 'https://api.hubapi.com';
export function isHubSpotConfigured() {
    return !!token;
}
async function findContactByEmail(email) {
    const res = await fetch(`${baseUrl}/crm/v3/objects/contacts/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
            filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
        }),
    });
    if (!res.ok)
        return null;
    const data = (await res.json());
    return data.results?.[0]?.id ?? null;
}
export async function addOrUpdateHubSpotContact(input) {
    if (!token) {
        return { ok: false, error: 'HubSpot não configurado (HUBSPOT_ACCESS_TOKEN ou HUBSPOT_API_KEY)' };
    }
    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
    };
    let contactId = await findContactByEmail(input.email);
    const props = {
        email: input.email,
        firstname: (input.firstName || '').trim() || 'N/A',
        lastname: (input.lastName || '').trim() || 'N/A',
    };
    if (input.phone)
        props.phone = input.phone;
    if (contactId) {
        const updateRes = await fetch(`${baseUrl}/crm/v3/objects/contacts/${contactId}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ properties: props }),
        });
        if (!updateRes.ok) {
            const text = await updateRes.text();
            return { ok: false, error: `HubSpot update ${updateRes.status}: ${text.slice(0, 200)}` };
        }
    }
    else {
        const createRes = await fetch(`${baseUrl}/crm/v3/objects/contacts`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ properties: props }),
        });
        if (!createRes.ok) {
            const text = await createRes.text();
            return { ok: false, error: `HubSpot create ${createRes.status}: ${text.slice(0, 200)}` };
        }
        contactId = await findContactByEmail(input.email);
    }
    if (input.note && contactId) {
        const noteRes = await fetch(`${baseUrl}/crm/v4/objects/notes`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                properties: { hs_note_body: input.note },
                associations: [{ to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }] }],
            }),
        });
        if (!noteRes.ok) {
            try {
                const r = await fetch(`${baseUrl}/crm/v3/objects/notes`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        properties: { hs_note_body: input.note },
                        associations: [{ to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }] }],
                    }),
                });
                if (!r.ok)
                    console.warn('[hubspot] Nota não criada:', await r.text());
            }
            catch (e) {
                console.warn('[hubspot] Nota não criada:', e);
            }
        }
    }
    return { ok: true };
}
