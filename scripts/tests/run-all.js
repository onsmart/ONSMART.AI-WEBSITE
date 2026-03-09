/**
 * Executa todos os testes de serviços (Supabase, Resend, Mailchimp, HubSpot).
 * Uso: npm run test:services
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');

const scripts = [
  { name: 'Supabase', script: 'test-supabase.js' },
  { name: 'Resend', script: 'test-resend.js' },
  { name: 'Mailchimp', script: 'test-mailchimp.js' },
  { name: 'HubSpot', script: 'test-hubspot.js' },
  { name: 'Site/API', script: 'test-site.js', optional: true },
];

function run(scriptName) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, scriptName);
    const child = spawn('node', [scriptPath], { cwd: root, stdio: 'inherit' });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error('Exit ' + code))));
  });
}

async function main() {
  console.log('\n>>> Testes de serviços (Supabase, Resend, Mailchimp, HubSpot)\n');

  let failed = 0;
  for (const { name, script, optional } of scripts) {
    try {
      await run(script);
    } catch (e) {
      if (optional) {
        console.warn('   (opcional) ' + name + ' ignorado – servidor pode não estar rodando.');
      } else {
        console.error(name, 'falhou.');
        failed++;
      }
    }
  }

  if (failed > 0) {
    console.error('\n' + failed + ' teste(s) falharam.');
    process.exit(1);
  }
  console.log('\n>>> Todos os testes passaram.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
