# Testes de integração e persistência

Scripts para verificar se as integrações (Resend, Mailchimp, HubSpot), o Supabase e a API do site estão funcionando. Todos carregam o `.env` da raiz do projeto.

## Comandos

| Comando | Descrição |
|--------|------------|
| `npm run test:services` | Executa **todos** os testes em sequência (Supabase, Resend, Mailchimp, HubSpot, Site). |
| `npm run test:supabase` | Testa persistência no **Supabase** (tabelas e storage). |
| `npm run test:resend` | Testa envio de e-mail com **Resend**. |
| `npm run test:mailchimp` | Testa **Mailchimp** (listas e adicionar contato). |
| `npm run test:hubspot` | Testa **HubSpot** (criar/atualizar contato). |
| `npm run test:site` | Testa **API/site** (backend tRPC); requer servidor rodando. |

## Variáveis de ambiente (.env)

### Supabase (obrigatório para test:supabase)
- `SUPABASE_URL` – URL do projeto
- `SUPABASE_SERVICE_ROLE_KEY` – Chave service role (não expor no front)

### Resend (obrigatório para test:resend)
- `RESEND_API_KEY` – Chave da API
- `RESEND_SENDER_EMAIL` – E-mail remetente (domínio verificado)
- Opcional: `RESEND_SENDER_NAME`, `RESEND_TEST_TO` (destino do e-mail de teste)

### Mailchimp (obrigatório para test:mailchimp)
- `MAILCHIMP_API_KEY` – Chave da API (formato: `xxx-us16`)
- `MAILCHIMP_LIST_ID` – ID da lista/audience
- Opcional: `MAILCHIMP_API_BASE`, `MAILCHIMP_TEST_EMAIL`, `MAILCHIMP_TEST_PHONE`

### HubSpot (obrigatório para test:hubspot)
- `HUBSPOT_ACCESS_TOKEN` – Token da Private App (não use API key antiga em UUID)
- Opcional: `HUBSPOT_TEST_EMAIL`, `HUBSPOT_TEST_PHONE`

### Site/API (test:site)
- O servidor deve estar rodando (`npm run dev:one` ou `npm run server`).
- Opcional: `PORT` (padrão 3001), `VITE_API_URL` (base da API).

## Comportamento

- **test:supabase**: Lê `marketing_users` e `marketing_contents`, faz insert/delete de um registro de teste, lista buckets de storage.
- **test:resend**: Envia um e-mail de teste para `RESEND_TEST_TO` ou `RESEND_SENDER_EMAIL`.
- **test:mailchimp**: Lista listas, adiciona/atualiza um contato de teste na lista se `MAILCHIMP_TEST_EMAIL` estiver definido.
- **test:hubspot**: Verifica o token, busca ou cria um contato com o e-mail de teste.
- **test:site**: Verifica se o servidor responde e se a rota tRPC `marketing.public.list` retorna dados (persistência lida pela API). Se o servidor não estiver rodando, o teste é **ignorado** (exit 0) para não falhar o `test:services`.

Ao rodar `npm run test:services`, o teste **Site/API** é opcional: se falhar (por exemplo, servidor fora), os demais ainda determinam sucesso ou falha.
