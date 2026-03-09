/**
 * Teste de persistência no HubSpot (criar/buscar contato).
 * Uso: npm run test:hubspot
 * Requer no .env: HUBSPOT_ACCESS_TOKEN (token da Private App) ou HUBSPOT_API_KEY
 * Opcional: HUBSPOT_TEST_EMAIL (e-mail para criar/buscar contato)
 */

import 'dotenv/config';

const raw = process.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT_API_KEY || '';
const token = raw.replace(/\s+/g, '').trim();
const looksLikeOldApiKey = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(token);
const baseUrl = 'https://api.hubapi.com';
const testEmail = (process.env.HUBSPOT_TEST_EMAIL || process.env.RESEND_TEST_TO || 'teste-hubspot@example.com').trim();

async function main() {
  console.log('\n=== Teste HubSpot ===\n');

  if (!token) {
    console.error('❌ Defina HUBSPOT_ACCESS_TOKEN (ou HUBSPOT_API_KEY) no .env');
    console.error('   Private App: HubSpot → Settings → Integrations → Private Apps → Auth → Access token');
    process.exit(1);
  }

  console.log('   Token: tamanho', token.length + ', prefixo:', token.slice(0, 12) + '...');
  if (looksLikeOldApiKey) {
    console.error('\n❌ HUBSPOT_ACCESS_TOKEN está no formato de API key antiga (UUID).');
    console.error('   Use o Access token de uma Private App (não a API key legada).');
    process.exit(1);
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  try {
    // 1) Ping: listar contatos (verifica token)
    const pingRes = await fetch(baseUrl + '/crm/v3/objects/contacts?limit=1', { headers });
    const pingBody = await pingRes.text();
    if (pingRes.status === 401) {
      console.error('❌ HubSpot 401: token rejeitado.');
      try {
        const j = JSON.parse(pingBody);
        if (j.message) console.error('   ', j.message);
      } catch (_) {
        console.error('   ', pingBody.slice(0, 200));
      }
      process.exit(1);
    }
    if (!pingRes.ok) {
      console.error('❌ HubSpot ping:', pingRes.status, pingBody);
      process.exit(1);
    }
    console.log('✅ Conexão com HubSpot OK');

    // 2) Buscar contato por e-mail
    const searchRes = await fetch(baseUrl + '/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: testEmail }] }],
      }),
    });
    if (!searchRes.ok) {
      console.error('❌ HubSpot search:', searchRes.status, await searchRes.text());
      process.exit(1);
    }
    const searchData = await searchRes.json();
    const existing = searchData.results?.[0];

    if (existing) {
      // Atualizar contato existente
      const updateRes = await fetch(baseUrl + '/crm/v3/objects/contacts/' + existing.id, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          properties: {
            firstname: 'Teste',
            lastname: 'HubSpot',
            phone: process.env.HUBSPOT_TEST_PHONE || '',
          },
        }),
      });
      if (!updateRes.ok) {
        console.error('❌ HubSpot update:', updateRes.status, await updateRes.text());
        process.exit(1);
      }
      console.log('✅ Contato existente atualizado:', existing.id);
    } else {
      // Criar novo contato
      const createRes = await fetch(baseUrl + '/crm/v3/objects/contacts', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          properties: {
            email: testEmail,
            firstname: 'Teste',
            lastname: 'HubSpot',
            phone: process.env.HUBSPOT_TEST_PHONE || '',
          },
        }),
      });
      if (!createRes.ok) {
        const body = await createRes.text();
        if (createRes.status === 409) {
          console.log('✅ Contato já existe no HubSpot (conflito ao criar):', testEmail);
        } else {
          console.error('❌ HubSpot create:', createRes.status, body);
          process.exit(1);
        }
      } else {
        const contact = await createRes.json();
        console.log('✅ Contato criado no HubSpot:', contact.id, '|', testEmail);
      }
    }

    console.log('\n✅ HubSpot: integração OK.\n');
  } catch (err) {
    console.error('❌ Erro:', err.message || err);
    process.exit(1);
  }
}

main();
