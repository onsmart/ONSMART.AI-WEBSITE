import React from 'react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';

const PoliticaPrivacidade = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <UnifiedSEO 
        title="Política de Privacidade - onsmartAI"
        description="Política de privacidade da onsmartAI. Saiba como protegemos seus dados pessoais e respeitamos sua privacidade."
        keywords="política de privacidade, proteção de dados, LGPD, privacidade, onsmartAI"
      />
      
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Política de Privacidade
          </h1>
          
          <div className="prose max-w-none dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
              <p>
                A onsmartAI ("nós", "nosso" ou "empresa") está comprometida em proteger e respeitar sua privacidade. 
                Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações 
                quando você visita nosso site ou utiliza nossos serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Informações que Coletamos</h2>
              <h3 className="text-xl font-medium mb-2">2.1 Informações Pessoais</h3>
              <p>Podemos coletar as seguintes informações pessoais:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Nome completo</li>
                <li>Endereço de email</li>
                <li>Número de telefone</li>
                <li>Empresa e cargo</li>
                <li>Informações de contato profissional</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">2.2 Informações Técnicas</h3>
              <ul className="list-disc ml-6">
                <li>Endereço IP</li>
                <li>Tipo de navegador e versão</li>
                <li>Sistema operacional</li>
                <li>Páginas visitadas e tempo de permanência</li>
                <li>Cookies e tecnologias similares</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Como Usamos suas Informações</h2>
              <p>Utilizamos suas informações para:</p>
              <ul className="list-disc ml-6">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Responder às suas consultas e solicitações</li>
                <li>Enviar comunicações de marketing (com seu consentimento)</li>
                <li>Análise e melhoria do site</li>
                <li>Cumprimento de obrigações legais</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Compartilhamento de Informações</h2>
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
                exceto nas seguintes circunstâncias:
              </p>
              <ul className="list-disc ml-6">
                <li>Com seu consentimento explícito</li>
                <li>Para prestadores de serviços que nos auxiliam</li>
                <li>Quando exigido por lei</li>
                <li>Para proteger nossos direitos legais</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
              <p>
                Utilizamos cookies para melhorar sua experiência em nosso site. Você pode configurar 
                seu navegador para recusar cookies, mas isso pode afetar a funcionalidade do site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Seus Direitos (LGPD)</h2>
              <p>Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
              <ul className="list-disc ml-6">
                <li>Confirmar a existência de tratamento de dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou inexatos</li>
                <li>Solicitar a exclusão de dados</li>
                <li>Revogar consentimento</li>
                <li>Portabilidade dos dados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Segurança</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger 
                suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contato</h2>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, 
                entre em contato conosco:
              </p>
              <ul className="list-none ml-0">
                <li><strong>Email:</strong> atendimento.ai@onsmart.com.br</li>
                <li><strong>Telefone:</strong> +55 (11) 5093-1495</li>
                <li><strong>WhatsApp:</strong> +55 (11) 99666-9247</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;
