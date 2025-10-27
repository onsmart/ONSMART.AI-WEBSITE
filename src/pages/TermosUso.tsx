import React from 'react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';

const TermosUso = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <UnifiedSEO 
        title="Termos de Uso - onsmartAI"
        description="Termos de uso da onsmartAI. Conheça as condições para utilização de nossos serviços de Agentes de IA empresarial."
        keywords="termos de uso, condições de uso, serviços ia, onsmartAI, agentes ia"
      />
      
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Termos de Uso
          </h1>
          
          <div className="prose max-w-none dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar o site da onsmartAI e nossos serviços, você aceita e concorda 
                em cumprir estes Termos de Uso. Se você não concordar com qualquer parte destes 
                termos, não deve usar nossos serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Sobre a onsmartAI</h2>
              <p>
                A onsmartAI é uma empresa especializada em transformação empresarial através de 
                Agentes de Inteligência Artificial, oferecendo consultoria, implementação e 
                suporte para organizações que desejam aumentar sua produtividade e eficiência 
                operacional.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Serviços Oferecidos</h2>
              <p>Nossos serviços incluem, mas não se limitam a:</p>
              <ul className="list-disc ml-6">
                <li>Consultoria estratégica em IA empresarial</li>
                <li>Desenvolvimento e implementação de Agentes de IA</li>
                <li>Metodologia LÍDER para transformação empresarial</li>
                <li>Suporte técnico e manutenção</li>
                <li>Treinamento e capacitação de equipes</li>
                <li>Diagnóstico gratuito de potencial de IA</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Uso Aceitável</h2>
              <p>Você concorda em usar nossos serviços apenas para fins legais e de acordo com:</p>
              <ul className="list-disc ml-6">
                <li>Todas as leis e regulamentações aplicáveis</li>
                <li>Estes Termos de Uso</li>
                <li>Nossa Política de Privacidade</li>
                <li>Quaisquer diretrizes adicionais fornecidas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo do site, incluindo textos, gráficos, logos, ícones, imagens, 
                clipes de áudio, downloads digitais e software, é propriedade da onsmartAI ou 
                de seus fornecedores de conteúdo e é protegido por leis de direitos autorais.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Limitação de Responsabilidade</h2>
              <p>
                A onsmartAI não será responsável por quaisquer danos diretos, indiretos, 
                incidentais, especiais ou consequenciais resultantes do uso ou incapacidade 
                de usar nossos serviços, mesmo que tenhamos sido avisados da possibilidade 
                de tais danos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Modificações dos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
                As modificações entrarão em vigor imediatamente após sua publicação no site. 
                É sua responsabilidade revisar periodicamente estes termos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Rescisão</h2>
              <p>
                Podemos rescindir ou suspender seu acesso aos nossos serviços imediatamente, 
                sem aviso prévio, por qualquer motivo, incluindo, sem limitação, se você 
                violar estes Termos de Uso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Lei Aplicável</h2>
              <p>
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. 
                Qualquer disputa será resolvida nos tribunais competentes do Brasil.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Contato</h2>
              <p>
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
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

export default TermosUso;
