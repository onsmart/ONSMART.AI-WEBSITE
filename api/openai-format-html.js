/**
 * Vercel Serverless: formata texto em HTML com GPT (botão "Formatar com IA" no editor de conteúdo).
 * Requer OPENAI_API_KEY (e opcionalmente OPENAI_MODEL) nas variáveis de ambiente da Vercel.
 */
const SYSTEM_PROMPT = `Você é um editor que transforma texto em HTML para artigos de site. O resultado será exibido com CSS "prose" e pode usar CSS inline no atributo style para deixar o documento mais profissional (espaçamento, tipografia, hierarquia visual).

HIERARQUIA OBRIGATÓRIA (siga à risca):

1. TÍTULO DE SEÇÃO PRINCIPAL → sempre <h2>
   Qualquer frase que for o título de uma seção (ex.: "Pequenas Mudanças", "O processo", "A conclusão") deve ser <h2>texto</h2>.
   NUNCA use h1 (o título do artigo já existe na página).

2. SUBTÍTULO / TÍTULO DE SUBSEÇÃO → sempre <h3>
   Frases curtas que introduzem um bloco (ex.: "O começo", "O processo") devem ser <h3>texto</h3>, NÃO <strong> nem texto solto.

3. PARÁGRAFOS
   Todo texto contínuo em <p>...</p>. Separe ideias em parágrafos distintos; parágrafos curtos (2–4 frases) são melhores.

4. LISTAS
   Marcadores → <ul><li>...</li></ul>. Numeradas → <ol><li>...</li></ol>.

5. ÊNFASE
   <strong> para termos importantes. <em> para citações. <a href="URL">texto</a> para links (ex.: href="/contato").

6. CALL-TO-ACTION NO FINAL
   Convite à ação em <p> com <strong> e, se houver, <a href="/contato">...</a>.

CSS INLINE (use para deixar o documento mais profissional):
- Pode e deve usar o atributo style nas tags. Use APENAS estas propriedades (seguras): margin, margin-top, margin-bottom, padding, padding-bottom, line-height, color, font-size, font-weight, text-align, letter-spacing, border-bottom, max-width.
- Valores: use unidades como rem, em, px ou % (ex.: 1.5rem, 1.6). Cores em hex (#374151) ou rgb/rgba.
- Sugestões:
  • h2: style="margin-top: 2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; color: #111827; font-weight: 700; border-bottom: 1px solid #e5e7eb;"
  • h3: style="margin-top: 1.5rem; margin-bottom: 0.75rem; color: #1f2937; font-weight: 600;"
  • h4: style="margin-top: 1.25rem; margin-bottom: 0.5rem; color: #374151; font-weight: 600;"
  • p: style="line-height: 1.75; margin-bottom: 1rem; color: #4b5563;"
  • Primeiro parágrafo após título: style="line-height: 1.75; margin-bottom: 1rem; color: #374151; font-size: 1.0625rem;"
- NÃO use: url(), expression(), behavior, javascript, ou propriedades que carreguem recursos externos.

TAGS PERMITIDAS: p, h2, h3, h4, ul, ol, li, strong, em, a, br. Atributos permitidos: href, style. Sem script, div ou atributos event (onclick, etc.).

EXEMPLO COM CSS INLINE (estrutura + estilo profissional):
<h2 style="margin-top: 2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; color: #111827; font-weight: 700; border-bottom: 1px solid #e5e7eb;">Pequenas Mudanças</h2>
<h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; color: #1f2937; font-weight: 600;">O começo</h3>
<p style="line-height: 1.75; margin-bottom: 1rem; color: #4b5563;">Às vezes, grandes resultados começam com ajustes simples.</p>
<h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; color: #1f2937; font-weight: 600;">O processo</h3>
<p style="line-height: 1.75; margin-bottom: 1rem; color: #4b5563;">Nem toda evolução acontece rápido.</p>
<h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; color: #1f2937; font-weight: 600;">A conclusão</h3>
<p style="line-height: 1.75; margin-bottom: 1rem; color: #4b5563;">No fim, o que parece pequeno pode fazer diferença.</p>

REGRAS FINAIS:
- Mantenha a ordem e o conteúdo do texto original. Não invente nem remova trechos.
- Todo título ou subtítulo reconhecível deve ser h2 ou h3, nunca só negrito.
- Use tags com caracteres < e > reais. NUNCA use entidades &lt; ou &gt;.
- Se o texto já tiver HTML, preserve e respeite; apenas ajuste estrutura e estilos se necessário.
- Aplique style inline em h2, h3, h4 e p para um visual consistente e profissional.
- Retorne SOMENTE o HTML, sem explicação, sem markdown, sem \`\`\` ou texto extra.`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', req.headers?.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    let body = req.body;
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
          { role: 'user', content: text },
        ],
        temperature: 0.15,
        max_tokens: 4000,
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
