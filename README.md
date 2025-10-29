🧭 Guia de Configuração e Deploy – On Smart Tech / Onsmart.AI
🔧 Configuração inicial do Git

git config --global user.name onsmart-admin
git config --global user.email maicon.nunes@onsmart.com.br


💡 Essa configuração garante que todos os commits feitos pelo time mantenham um padrão de identificação da empresa.

🧠 Acesso aos repositórios e autenticação

Acesse o GitHub da On Smart Tech / Onsmart.AI com sua conta corporativa.

Certifique-se de estar autenticado na Vercel com o mesmo e-mail corporativo.
🔗 https://vercel.com/onsmart

🌐 Estrutura dos projetos na Vercel

Na Vercel, há três projetos principais sob a conta onsmart:

Projeto	Descrição	Status
onsmart.ai	Site oficial da Onsmart.AI (ativo em produção).	✅ Produção
onsmart.tech	Site institucional da On Smart Tech (em desenvolvimento).	🧩 Desenvolvimento
onsmart-assets	Repositório auxiliar para upload e hospedagem de imagens.	⚙️ Suporte

🔸 O projeto onsmart-assets é utilizado para armazenar imagens e gerar URLs públicas, evitando sobrecarga dos sites principais.

🚀 Deploy e versionamento via GitHub + Vercel
Push e Deploy automático

Ao executar um git push no repositório correspondente (por exemplo, o do site onsmart.tech), o GitHub aciona automaticamente um deploy contínuo na Vercel.

Durante esse processo, no painel do repositório do GitHub aparecerá o status do deploy (✅ sucesso / ❌ erro).

🕹️ Redeploy e rollback (voltar versão)

Se for necessário voltar para uma versão anterior do site:

Acesse o painel do projeto na Vercel.

Vá até a aba Deploys.

Localize o histórico completo das versões publicadas.

Clique em Redeploy na versão desejada para restaurá-la.

💬 Dica: sempre valide a versão antes do rollback e documente o motivo no canal interno (#dev-onsmart-deploys).

🧩 Boas práticas

Sempre crie branches específicas para features (feature/nome-da-feature) e use Pull Requests para integrar com a main.






Mantenha commits limpos e descritivos (ex: fix: corrigir carregamento de imagens na home).

Nunca faça push direto na branch main sem revisão.

Antes de fazer deploy, rode localmente npm run build e npm run dev para validar a integridade do projeto.
