// API Route para webhook do ElevenLabs + Twilio
// Endpoint: /api/elevenlabs/webhook

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validar assinatura do webhook (opcional mas recomendado)
    const signature = req.headers['x-elevenlabs-signature'] || req.headers['x-twilio-signature'];
    
    // Processar payload do webhook
    const payload = req.body;
    console.log('Webhook payload received:', JSON.stringify(payload, null, 2));

    // Extrair dados do lead
    const lead = payload?.lead ?? payload;
    
    if (!lead) {
      return res.status(400).json({ 
        error: 'No lead data found in payload',
        received: payload 
      });
    }

    // Processar lead no HubSpot
    const result = await upsertByEmailOrCNPJ(lead);

    // Log do sucesso
    console.log('Lead processed successfully:', result);

    return res.status(200).json({ 
      ok: true, 
      hubspot: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Webhook error:', error);
    
    return res.status(500).json({ 
      ok: false, 
      error: error.message || 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
}

// Função para upsert no HubSpot
async function upsertByEmailOrCNPJ(data) {
  const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;
  const HUBSPOT_BASE = "https://api.hubapi.com";

  if (!HUBSPOT_TOKEN) {
    throw new Error('HUBSPOT_TOKEN not configured');
  }

  // Mapear campos do ElevenLabs/Twilio para HubSpot
  const props = {
    firstname: data?.nome || data?.first_name || data?.firstName || "",
    lastname: data?.sobrenome || data?.last_name || data?.lastName || "",
    phone: data?.celular || data?.telefone || data?.phone || data?.phoneNumber || "",
    company: data?.empresa || data?.company || data?.organization || "",
    cnpj: data?.cnpj || data?.document || "",
    endereco: data?.endereco || data?.address || data?.location || "",
    // Campos adicionais que podem vir do ElevenLabs
    email: data?.email || data?.emailAddress || "",
    lead_source: data?.source || "ElevenLabs Webhook",
    lead_status: data?.status || "New",
    notes: data?.notes || data?.message || data?.transcript || "",
    // Campos específicos do ElevenLabs
    conversation_id: data?.conversation_id || data?.sessionId || "",
    agent_id: data?.agent_id || data?.agentId || "",
    // Campos específicos do Twilio
    call_sid: data?.call_sid || data?.callSid || "",
    from_number: data?.from || data?.fromNumber || "",
    to_number: data?.to || data?.toNumber || "",
  };

  // Remover campos vazios
  Object.keys(props).forEach((key) => {
    if (props[key] === "" || props[key] === null || props[key] === undefined) {
      delete props[key];
    }
  });

  const headers = {
    Authorization: `Bearer ${HUBSPOT_TOKEN}`,
    "Content-Type": "application/json",
  };

  // 1) Se tiver e-mail, tenta atualizar por e-mail (idProperty=email)
  const email = props.email;
  if (email) {
    const url = `${HUBSPOT_BASE}/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`;
    
    try {
      const response = await fetch(url, { 
        method: "PATCH", 
        headers, 
        body: JSON.stringify({ properties: props }) 
      });

      if (response.status === 404) {
        // Contato não existe, criar novo
        const createUrl = `${HUBSPOT_BASE}/crm/v3/objects/contacts`;
        const createResponse = await fetch(createUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({ properties: props }),
        });
        
        if (!createResponse.ok) {
          const errorText = await createResponse.text();
          throw new Error(`HubSpot create failed: ${createResponse.status} - ${errorText}`);
        }
        
        return await createResponse.json();
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HubSpot patch failed: ${response.status} - ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error in email upsert:', error);
      throw error;
    }
  }

  // 2) Sem e-mail: usa CNPJ como chave (property custom "cnpj")
  const cnpj = props.cnpj;
  if (!cnpj) {
    throw new Error("Faltou e-mail e CNPJ para upsert.");
  }

  try {
    // Search por CNPJ
    const searchUrl = `${HUBSPOT_BASE}/crm/v3/objects/contacts/search`;
    const searchResponse = await fetch(searchUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        filterGroups: [{ 
          filters: [{ 
            propertyName: "cnpj", 
            operator: "EQ", 
            value: cnpj 
          }] 
        }],
        properties: ["email", "firstname", "lastname", "phone", "company", "cnpj", "endereco"],
        limit: 1,
      }),
    });
    
    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      throw new Error(`HubSpot search failed: ${searchResponse.status} - ${errorText}`);
    }
    
    const searchResults = await searchResponse.json();
    const results = searchResults.results || [];

    if (results.length) {
      // Contato existe, atualizar
      const contactId = results[0].id;
      const updateUrl = `${HUBSPOT_BASE}/crm/v3/objects/contacts/${contactId}`;
      const updateResponse = await fetch(updateUrl, { 
        method: "PATCH", 
        headers, 
        body: JSON.stringify({ properties: props }) 
      });
      
      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(`HubSpot update by ID failed: ${updateResponse.status} - ${errorText}`);
      }
      
      return await updateResponse.json();
    } else {
      // Contato não existe, criar novo
      const createUrl = `${HUBSPOT_BASE}/crm/v3/objects/contacts`;
      const createResponse = await fetch(createUrl, { 
        method: "POST", 
        headers, 
        body: JSON.stringify({ properties: props }) 
      });
      
      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        throw new Error(`HubSpot create (CNPJ) failed: ${createResponse.status} - ${errorText}`);
      }
      
      return await createResponse.json();
    }
  } catch (error) {
    console.error('Error in CNPJ upsert:', error);
    throw error;
  }
}
