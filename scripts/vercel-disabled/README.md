# Funções desativadas no deploy Vercel (plano Hobby)

O plano **Hobby da Vercel** permite no máximo **12 Serverless Functions** por deploy. Para não ultrapassar o limite, estas rotas foram **movidas para fora da pasta `api/`** e **não são deployadas** na Vercel.

- **docker-monitoring.js** – Monitoramento Docker (útil só em ambiente com Node + Docker; na Vercel não há Docker).
- **whatsapp-test.js** – Endpoint de teste do webhook WhatsApp.
- **whatsapp-test-config.js** – Endpoint de teste de configuração WhatsApp/Evolution API.

Se você fizer deploy em outro host (ex.: Node com `server.js`), pode recolocar esses arquivos em `api/` ou chamar a lógica a partir do seu servidor. Em ambiente local com `npm run server`, essas rotas continuam em `server.js` (se estiverem integradas lá).

Para reativar na Vercel (ex.: se mudar para plano Pro), copie os arquivos daqui de volta para `api/` (ou para os caminhos originais dentro de `api/`).
