/**
 * Teste de persistência no Mailchimp (listar listas e adicionar/atualizar contato de teste).
 * Uso: npm run test:mailchimp
 * Requer no .env: MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID
 * Opcional: MAILCHIMP_API_BASE, MAILCHIMP_TEST_EMAIL (e-mail real para teste de add member)
 */

import 'dotenv/config';
import crypto from 'crypto';

const apiKey = process.env.MAILCHIMP_API_KEY;
const listId = process.env.MAILCHIMP_LIST_ID;
const baseUrl =
  process.env.MAILCHIMP_API_BASE ||
  (apiKey ? `https://${(apiKey.split('-')[1] || 'us16')}.api.mailchimp.com/3.0` : '');

function subscriberHash(email) {
  return crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex');
}

async function main() {
  console.log('\n=== Teste Mailchimp ===\n');

  if (!apiKey) {
    console.error('❌ Defina MAILCHIMP_API_KEY no .env');
    process.exit(1);
  }
  if (!listId) {
    console.error('❌ Defina MAILCHIMP_LIST_ID no .env (ID da lista/audience)');
    process.exit(1);
  }

  const auth = Buffer.from('anystring:' + apiKey).toString('base64');

  try {
    // 1) Listar listas (audiences)
    const listsRes = await fetch(baseUrl + '/lists?count=10', {
      headers: { Authorization: 'Basic ' + auth },
    });

    if (!listsRes.ok) {
      const body = await listsRes.text();
      console.error('❌ Mailchimp lists:', listsRes.status, body);
      process.exit(1);
    }

    const listsData = await listsRes.json();
    const lists = listsData.lists || [];
    console.log('✅ Listas (audiences):', lists.length);
    lists.forEach((l) => console.log('   -', l.name, '| id:', l.id));

    const listExists = lists.some((l) => l.id === listId);
    if (!listExists && lists.length > 0) {
      console.warn('⚠️  MAILCHIMP_LIST_ID não corresponde a nenhuma lista listada acima.');
    }

    // 2) Adicionar/atualizar contato de teste na lista
    const testEmail = (process.env.MAILCHIMP_TEST_EMAIL || process.env.RESEND_TEST_TO || '').trim();
    if (testEmail) {
      const hash = subscriberHash(testEmail);
      const addRes = await fetch(baseUrl + '/lists/' + listId + '/members/' + hash, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + auth,
        },
        body: JSON.stringify({
          email_address: testEmail,
          status: 'subscribed',
          merge_fields: {
            FNAME: 'Teste',
            LNAME: 'Mailchimp',
            PHONE: process.env.MAILCHIMP_TEST_PHONE || '',
          },
          tags: ['Teste integração'],
        }),
      });

      if (!addRes.ok) {
        const body = await addRes.text();
        if (body.includes('already a list member')) {
          console.log('✅ Contato já existe na lista:', listId);
        } else if (body.includes('fake') || body.includes('invalid') || body.includes('real email')) {
          console.error('❌ Mailchimp rejeitou o e-mail. Use um e-mail real em MAILCHIMP_TEST_EMAIL.');
          process.exit(1);
        } else {
          console.error('❌ Add member:', addRes.status, body);
          process.exit(1);
        }
      } else {
        console.log('✅ Contato adicionado/atualizado na lista:', listId, '|', testEmail);
      }
    } else {
      console.log('ℹ️  MAILCHIMP_TEST_EMAIL (ou RESEND_TEST_TO) não definido; pulando teste de adicionar contato.');
    }

    console.log('\n✅ Mailchimp: integração OK.\n');
  } catch (err) {
    console.error('❌ Erro:', err.message || err);
    process.exit(1);
  }
}

main();
