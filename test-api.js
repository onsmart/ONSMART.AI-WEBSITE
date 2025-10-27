// Teste para verificar se a API Route está funcionando
// Execute este código no console do navegador em produção

async function testElevenLabsAPI() {
  try {
    console.log('Testando endpoint ElevenLabs...');
    
    const response = await fetch('/api/elevenlabs-widget');
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Dados recebidos:', data);
      console.log('✅ API Route funcionando!');
    } else {
      console.log('❌ Erro na API Route:', response.status, response.statusText);
    }
  } catch (error) {
    console.log('❌ Erro ao testar API:', error);
  }
}

// Executar teste
testElevenLabsAPI();
