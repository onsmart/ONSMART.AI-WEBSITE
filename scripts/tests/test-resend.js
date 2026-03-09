/**
 * Teste de envio de e-mail com Resend.
 * Uso: npm run test:resend
 * Requer no .env: RESEND_API_KEY, RESEND_SENDER_EMAIL
 * Opcional: RESEND_SENDER_NAME, RESEND_TEST_TO (destino do e-mail de teste)
 */

import 'dotenv/config';
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_SENDER_EMAIL || 'onboarding@resend.dev';
const fromName = process.env.RESEND_SENDER_NAME || 'OnSmart';
const to = (process.env.RESEND_TEST_TO || process.env.RESEND_SENDER_EMAIL || 'teste@example.com').trim();

async function main() {
  console.log('\n=== Teste Resend (E-mail) ===\n');

  if (!apiKey) {
    console.error('❌ Defina RESEND_API_KEY no .env');
    process.exit(1);
  }
  if (!process.env.RESEND_SENDER_EMAIL) {
    console.warn('⚠️  RESEND_SENDER_EMAIL não definido; usando fallback. Configure para produção.');
  }

  const resend = new Resend(apiKey);
  const from = `${fromName} <${fromEmail}>`;

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: '[Teste] Integração Resend - OnSmart',
      html: '<p>E-mail de teste da integração Resend.</p><p>Se você recebeu isso, o Resend está configurado corretamente.</p>',
    });

    if (error) {
      console.error('❌ Resend:', error.message);
      if (error.message?.includes('domain')) {
        console.error('   Dica: verifique se o domínio do remetente está verificado no painel Resend.');
      }
      process.exit(1);
    }

    console.log('✅ E-mail enviado. Id:', data?.id);
    console.log('   De:', from);
    console.log('   Para:', to);
    console.log('\n✅ Resend: integração OK.\n');
  } catch (err) {
    console.error('❌ Erro:', err.message || err);
    process.exit(1);
  }
}

main();
