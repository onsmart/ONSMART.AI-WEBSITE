/**
 * Vercel Serverless: formata texto em HTML com GPT (botão "Formatar com IA" no editor de conteúdo).
 * Requer OPENAI_API_KEY (e opcionalmente OPENAI_MODEL) nas variáveis de ambiente da Vercel.
 */
const SYSTEM_PROMPT = `Você é um editor que transforma texto em HTML para artigos de site. O resultado deve ser profissional: use HTML semântico E CSS inline (atributo style) em títulos e parágrafos para hierarquia visual, espaçamento e tipografia.

REGRAS OBRIGATÓRIAS:

1. HTML semântico + CSS inline em todas as tags de bloco (h2, h3, h4, p). Use o atributo style para deixar o texto profissional.

2. HIERARQUIA:
   - Título de seção → <h2 style="...">texto</h2>. NUNCA use h1 (o título do artigo já existe na página).
   - Subtítulo → <h3 style="...">texto</h3>.
   - Sub-subseção → <h4 style="...">texto</h4>.

3. PARÁGRAFOS: <p style="...">...</p>. Separe ideias em parágrafos distintos. Parágrafos curtos (2–4 frases).

4. LISTAS: <ul><li>...</li></ul> ou <ol><li>...</li></ol>. Pode usar style nos ul/ol/li para margin e padding se quiser.

5. ÊNFASE: <strong>, <em>. Links: <a href="URL">texto</a>.

6. CSS INLINE – use APENAS estas propriedades (seguras): margin, margin-top, margin-bottom, padding, padding-bottom, line-height, color, font-size, font-weight, text-align, border-bottom. Valores em rem, em ou px. Cores em hex (#111827, #4b5563) ou rgb. NÃO use: url(), expression(), javascript, behavior.

SUGESTÕES DE STYLE (use padrões assim para visual profissional):
- h2: margin-top: 2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; color: #111827; font-weight: 700; border-bottom: 1px solid #e5e7eb;
- h3: margin-top: 1.5rem; margin-bottom: 0.75rem; color: #1f2937; font-weight: 600;
- h4: margin-top: 1.25rem; margin-bottom: 0.5rem; color: #374151; font-weight: 600;
- p: line-height: 1.75; margin-bottom: 1rem; color: #4b5563;
- ul/ol: margin-top: 0.75rem; margin-bottom: 1rem; padding-left: 1.5rem;

TAGS PERMITIDAS: p, h2, h3, h4, ul, ol, li, strong, em, a, br. Atributos: href, target, rel, style. Sem script, div ou eventos.

EXEMPLO DE SAÍDA (HTML + CSS inline profissional):
<h2 style="margin-top: 2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; color: #111827; font-weight: 700; border-bottom: 1px solid #e5e7eb;">O excesso de informação e a falta de direção</h2>
<p style="line-height: 1.75; margin-bottom: 1rem; color: #4b5563;">A tecnologia avança em ritmo sem precedentes. São tantas ferramentas que fica difícil saber por onde começar.</p>
<p style="line-height: 1.75; margin-bottom: 1rem; color: #4b5563;">O crescimento consistente vem de filtrar e priorizar.</p>
<h2 style="margin-top: 2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; color: #111827; font-weight: 700; border-bottom: 1px solid #e5e7eb;">A ilusão da produtividade</h2>
<p style="line-height: 1.75; margin-bottom: 1rem; color: #4b5563;">Estar ocupado não é o mesmo que ser produtivo.</p>
<h2 style="margin-top: 2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; color: #111827; font-weight: 700; border-bottom: 1px solid #e5e7eb;">O caminho para a evolução sustentável</h2>
<p style="line-height: 1.75; margin-bottom: 1rem; color: #4b5563;">Para transformar progresso em evolução, é necessário equilíbrio. Três pilares principais:</p>
<ul style="margin-top: 0.75rem; margin-bottom: 1rem; padding-left: 1.5rem;">
<li style="margin-bottom: 0.5rem; line-height: 1.6;">Primeiro pilar.</li>
<li style="margin-bottom: 0.5rem; line-height: 1.6;">Segundo pilar.</li>
<li style="margin-bottom: 0.5rem; line-height: 1.6;">Terceiro pilar.</li>
</ul>

REGRAS FINAIS:
- Mantenha a ordem e o conteúdo do texto original. Não invente nem remova trechos.
- Todo título ou subtítulo reconhecível deve ser h2 ou h3 com style, nunca só negrito.
- Retorne SOMENTE o HTML, sem explicação, sem markdown, sem \`\`\` e sem texto antes ou depois.`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', req.headers?.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    let body = req.body;
    // Em alguns ambientes serverless o body não vem parseado; ler do stream.
    if (body === undefined && typeof req.on === 'function') {
      try {
        const raw = await new Promise((resolve, reject) => {
          let data = '';
          req.on('data', (chunk) => { data += typeof chunk === 'string' ? chunk : chunk.toString(); });
          req.on('end', () => resolve(data));
          req.on('error', reject);
        });
        body = raw ? JSON.parse(raw) : {};
      } catch (e) {
        console.error('openai-format-html: body parse failed', e?.message || e);
        return res.status(400).json({ error: 'Body inválido (JSON esperado)' });
      }
    }
    if (body === undefined || body === null) {
      return res.status(400).json({ error: 'Body da requisição não recebido. Envie JSON com Content-Type: application/json' });
    }
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: 'Body inválido (JSON esperado)' });
      }
    }
    const text = body?.text;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Campo "text" é obrigatório' });
    }
    // Limitar tamanho para evitar timeout na Vercel (resposta da OpenAI mais rápida)
    const maxChars = 12000;
    const textToFormat = text.length > maxChars ? text.slice(0, maxChars) : text;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API OpenAI não configurada' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: textToFormat },
        ],
        temperature: 0.15,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenAI format-html error:', response.status, errText);
      return res.status(response.status).json({ error: 'Erro ao formatar com IA' });
    }

    const data = await response.json();
    let html = data.choices?.[0]?.message?.content?.trim();
    if (!html) return res.status(500).json({ error: 'Resposta vazia da IA' });
    html = html.replace(/^```(?:html)?\s*/i, '').replace(/\s*```$/i, '').trim();
    html = html
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&');

    return res.status(200).json({ html });
  } catch (error) {
    console.error('Error in openai-format-html:', error);
    return res.status(500).json({ error: 'Erro interno ao formatar' });
  }
}
