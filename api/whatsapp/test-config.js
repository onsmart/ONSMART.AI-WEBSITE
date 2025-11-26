/**
 * Endpoint de teste para verificar configuração do WhatsApp
 * Acesse: /api/whatsapp/test-config
 * 
 * Este endpoint verifica se todas as variáveis de ambiente estão configuradas
 * e se os serviços estão acessíveis
 */

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const results = {
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || 'development',
    vercelUrl: process.env.VERCEL_URL || 'not set',
    checks: {}
  };

  // 1. Verificar OPENAI_API_KEY
  results.checks.openaiApiKey = {
    configured: !!process.env.OPENAI_API_KEY,
    length: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0,
    startsWithSk: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.startsWith('sk-') : false,
    status: process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-') ? '✅ OK' : '❌ MISSING/INVALID'
  };

  // 2. Verificar EVOLUTION_API_BASE_URL
  results.checks.evolutionBaseUrl = {
    configured: !!process.env.EVOLUTION_API_BASE_URL,
    value: process.env.EVOLUTION_API_BASE_URL ? 
      process.env.EVOLUTION_API_BASE_URL.replace(/\/$/, '') : 'not set',
    status: process.env.EVOLUTION_API_BASE_URL ? '✅ OK' : '❌ MISSING'
  };

  // 3. Verificar EVOLUTION_API_APIKEY
  results.checks.evolutionApiKey = {
    configured: !!process.env.EVOLUTION_API_APIKEY,
    length: process.env.EVOLUTION_API_APIKEY ? process.env.EVOLUTION_API_APIKEY.length : 0,
    status: process.env.EVOLUTION_API_APIKEY ? '✅ OK' : '❌ MISSING'
  };

  // 4. Verificar EVOLUTION_API_INSTANCE_ID
  results.checks.evolutionInstanceId = {
    configured: !!process.env.EVOLUTION_API_INSTANCE_ID,
    value: process.env.EVOLUTION_API_INSTANCE_ID || 'not set',
    status: process.env.EVOLUTION_API_INSTANCE_ID ? '✅ OK' : '❌ MISSING'
  };

  // 5. Verificar CALENDLY_URL
  results.checks.calendlyUrl = {
    configured: !!process.env.CALENDLY_URL,
    value: process.env.CALENDLY_URL || 'using default',
    status: process.env.CALENDLY_URL ? '✅ OK' : '⚠️ USING DEFAULT'
  };

  // 6. Testar conexão com Evolution API (se configurada)
  if (process.env.EVOLUTION_API_BASE_URL && process.env.EVOLUTION_API_APIKEY && process.env.EVOLUTION_API_INSTANCE_ID) {
    try {
      const testUrl = `${process.env.EVOLUTION_API_BASE_URL.replace(/\/$/, '')}/instance/fetchInstances`;
      const testResponse = await fetch(testUrl, {
        method: 'GET',
        headers: {
          'apikey': process.env.EVOLUTION_API_APIKEY
        }
      });

      results.checks.evolutionApiConnection = {
        status: testResponse.ok ? '✅ OK' : `❌ ERROR ${testResponse.status}`,
        statusCode: testResponse.status,
        accessible: testResponse.ok
      };

      if (testResponse.ok) {
        try {
          const data = await testResponse.json();
          const instanceExists = Array.isArray(data) && data.some(inst => 
            inst.instance?.instanceName === process.env.EVOLUTION_API_INSTANCE_ID ||
            inst.instanceName === process.env.EVOLUTION_API_INSTANCE_ID
          );
          results.checks.evolutionInstanceExists = {
            status: instanceExists ? '✅ FOUND' : '⚠️ NOT FOUND',
            exists: instanceExists
          };
        } catch (e) {
          results.checks.evolutionInstanceExists = {
            status: '⚠️ Could not parse response',
            error: e.message
          };
        }
      }
    } catch (error) {
      results.checks.evolutionApiConnection = {
        status: '❌ CONNECTION ERROR',
        error: error.message,
        accessible: false
      };
    }
  } else {
    results.checks.evolutionApiConnection = {
      status: '⚠️ SKIPPED (missing config)',
      accessible: false
    };
  }

  // 7. Testar proxy OpenAI (se configurado)
  if (process.env.OPENAI_API_KEY) {
    try {
      // Construir URL do proxy
      let proxyUrl;
      if (process.env.VERCEL_URL) {
        proxyUrl = `https://${process.env.VERCEL_URL}/api/openai-proxy`;
      } else if (process.env.VERCEL) {
        proxyUrl = 'https://onsmart.ai/api/openai-proxy';
      } else {
        proxyUrl = 'http://localhost:3000/api/openai-proxy';
      }

      const testResponse = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'Test' },
            { role: 'user', content: 'Test' }
          ]
        })
      });

      results.checks.openaiProxy = {
        status: testResponse.ok ? '✅ OK' : `❌ ERROR ${testResponse.status}`,
        statusCode: testResponse.status,
        url: proxyUrl,
        accessible: testResponse.ok
      };
    } catch (error) {
      results.checks.openaiProxy = {
        status: '❌ CONNECTION ERROR',
        error: error.message,
        accessible: false
      };
    }
  } else {
    results.checks.openaiProxy = {
      status: '⚠️ SKIPPED (missing OPENAI_API_KEY)',
      accessible: false
    };
  }

  // Resumo geral
  const allCriticalOk = 
    results.checks.openaiApiKey.configured &&
    results.checks.evolutionBaseUrl.configured &&
    results.checks.evolutionApiKey.configured &&
    results.checks.evolutionInstanceId.configured;

  results.summary = {
    allCriticalConfigured: allCriticalOk,
    status: allCriticalOk ? '✅ ALL CRITICAL VARIABLES CONFIGURED' : '❌ MISSING CRITICAL VARIABLES',
    totalChecks: Object.keys(results.checks).length,
    passedChecks: Object.values(results.checks).filter(c => c.status?.includes('✅')).length
  };

  // Retornar resultado
  const statusCode = allCriticalOk ? 200 : 500;
  return res.status(statusCode).json(results);
}

