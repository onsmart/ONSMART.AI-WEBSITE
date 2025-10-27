#!/usr/bin/env node

// Script para criar o arquivo .env baseado no template
const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'env-template.txt');
const envPath = path.join(__dirname, '.env');

console.log('🔧 Configurando arquivo .env...\n');

// Verificar se o template existe
if (!fs.existsSync(templatePath)) {
  console.error('❌ Arquivo env-template.txt não encontrado!');
  process.exit(1);
}

// Verificar se .env já existe
if (fs.existsSync(envPath)) {
  console.log('⚠️  Arquivo .env já existe!');
  console.log('Deseja sobrescrever? (y/N)');
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      createEnvFile();
    } else {
      console.log('❌ Operação cancelada.');
    }
    rl.close();
  });
} else {
  createEnvFile();
}

function createEnvFile() {
  try {
    // Ler o template
    const template = fs.readFileSync(templatePath, 'utf8');
    
    // Criar o arquivo .env
    fs.writeFileSync(envPath, template);
    
    console.log('✅ Arquivo .env criado com sucesso!');
    console.log('\n📋 Próximos passos:');
    console.log('1. Edite o arquivo .env com suas chaves de API');
    console.log('2. Configure as variáveis necessárias:');
    console.log('   - OPENAI_API_KEY (obrigatório para o chat da Sonia)');
    console.log('   - ELEVENLABS_AGENT_ID (obrigatório para voz da Sonia)');
    console.log('   - VITE_ELEVENLABS_API_KEY (obrigatório para voz da Sonia)');
    console.log('   - VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY (se usar Supabase)');
    console.log('   - VITE_YOUTUBE_API_KEY (se usar YouTube)');
    console.log('   - VITE_GOOGLE_PAGESPEED_API_KEY (se usar PageSpeed)');
    console.log('\n🔗 Links úteis:');
    console.log('- OpenAI: https://platform.openai.com/api-keys');
    console.log('- ElevenLabs: https://elevenlabs.io/app/settings/api-keys');
    console.log('- Supabase: https://supabase.com/');
    console.log('- Google APIs: https://console.developers.google.com/');
    console.log('\n⚠️  Lembre-se: NUNCA commite o arquivo .env no Git!');
    
  } catch (error) {
    console.error('❌ Erro ao criar arquivo .env:', error.message);
    process.exit(1);
  }
}

