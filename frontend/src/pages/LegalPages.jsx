import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, FileText, Shield, Cookie } from 'lucide-react'

// Página de Termos de Uso
export const TermsOfService = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="flex items-center gap-3 mb-8">
          <FileText className="text-purple-400" size={40} />
          <h1 className="text-4xl font-bold">Termos de Uso</h1>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 space-y-6">
          <p className="text-gray-400">
            <strong>Última atualização:</strong> 17 de novembro de 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold mb-3">1. Aceitação dos Termos</h2>
            <p className="text-gray-400 leading-relaxed">
              Ao acessar e usar o BlockSpace, você concorda em cumprir estes Termos de Uso. 
              Se você não concordar com qualquer parte destes termos, não use nosso serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Uso do Serviço</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              Você concorda em usar o BlockSpace apenas para fins legais e de acordo com estes termos.
              Você não deve:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
              <li>Publicar conteúdo ilegal, ofensivo, difamatório ou prejudicial</li>
              <li>Violar direitos de propriedade intelectual de terceiros</li>
              <li>Fazer spam ou enviar mensagens não solicitadas</li>
              <li>Tentar hackear ou comprometer a segurança da plataforma</li>
              <li>Personificar outras pessoas ou entidades</li>
              <li>Usar bots ou automação sem autorização</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. Contas de Usuário</h2>
            <p className="text-gray-400 leading-relaxed">
              Você é responsável por manter a confidencialidade de sua conta e senha. 
              Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta.
              Você deve ter pelo menos 13 anos para criar uma conta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Conteúdo do Usuário</h2>
            <p className="text-gray-400 leading-relaxed">
              Você mantém todos os direitos sobre o conteúdo que publica no BlockSpace. 
              No entanto, ao publicar conteúdo, você nos concede uma licença mundial, não exclusiva e 
              gratuita para usar, reproduzir, modificar e distribuir esse conteúdo no contexto do serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Moderação de Conteúdo</h2>
            <p className="text-gray-400 leading-relaxed">
              Reservamos o direito de remover qualquer conteúdo que viole estes termos ou que 
              consideremos inadequado. Podemos suspender ou encerrar contas que violem repetidamente 
              nossas políticas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">6. Isenção de Responsabilidade</h2>
            <p className="text-gray-400 leading-relaxed">
              O BlockSpace é fornecido "como está" sem garantias de qualquer tipo. Não garantimos que 
              o serviço estará disponível ininterruptamente ou livre de erros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">7. Alterações nos Termos</h2>
            <p className="text-gray-400 leading-relaxed">
              Podemos modificar estes termos a qualquer momento. Notificaremos os usuários sobre 
              mudanças significativas através da plataforma ou por email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">8. Contato</h2>
            <p className="text-gray-400 leading-relaxed">
              Para dúvidas sobre estes termos, entre em contato: legal@blockspace.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

// Página de Política de Privacidade
export const PrivacyPolicy = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="flex items-center gap-3 mb-8">
          <Shield className="text-purple-400" size={40} />
          <h1 className="text-4xl font-bold">Política de Privacidade</h1>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 space-y-6">
          <p className="text-gray-400">
            <strong>Última atualização:</strong> 17 de novembro de 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold mb-3">1. Informações que Coletamos</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              Coletamos diferentes tipos de informações para fornecer e melhorar nosso serviço:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
              <li><strong>Informações de Conta:</strong> Nome, email, nome de usuário, senha (criptografada)</li>
              <li><strong>Conteúdo:</strong> Posts, comentários, mensagens, fotos que você compartilha</li>
              <li><strong>Dados de Uso:</strong> Como você interage com a plataforma</li>
              <li><strong>Informações do Dispositivo:</strong> Tipo de dispositivo, sistema operacional, navegador</li>
              <li><strong>Localização:</strong> Localização aproximada baseada em IP (não rastreamos GPS)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Como Usamos suas Informações</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              Usamos suas informações para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
              <li>Fornecer, operar e manter nosso serviço</li>
              <li>Melhorar, personalizar e expandir nosso serviço</li>
              <li>Comunicar-nos com você, incluindo suporte ao cliente</li>
              <li>Enviar atualizações e informações sobre o serviço</li>
              <li>Prevenir fraudes e garantir a segurança</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. Compartilhamento de Informações</h2>
            <p className="text-gray-400 leading-relaxed">
              <strong>Nunca vendemos seus dados pessoais.</strong> Podemos compartilhar informações apenas:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4 mt-3">
              <li>Com seu consentimento explícito</li>
              <li>Para cumprir obrigações legais</li>
              <li>Para proteger nossos direitos e segurança</li>
              <li>Com provedores de serviços que nos ajudam a operar (ex: hospedagem)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Seus Direitos</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              Você tem direito a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incorretos</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Exportar seus dados</li>
              <li>Optar por não receber comunicações de marketing</li>
              <li>Retirar consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Segurança dos Dados</h2>
            <p className="text-gray-400 leading-relaxed">
              Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados, 
              incluindo criptografia SSL/TLS, senhas criptografadas, autenticação segura e backups regulares.
              No entanto, nenhum método de transmissão pela internet é 100% seguro.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">6. Retenção de Dados</h2>
            <p className="text-gray-400 leading-relaxed">
              Mantemos seus dados pelo tempo necessário para fornecer nossos serviços e cumprir 
              obrigações legais. Quando você deleta sua conta, removemos seus dados pessoais, 
              exceto quando exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">7. Menores de Idade</h2>
            <p className="text-gray-400 leading-relaxed">
              Nosso serviço é destinado a usuários com 13 anos ou mais. Não coletamos 
              intencionalmente informações de crianças menores de 13 anos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">8. Contato</h2>
            <p className="text-gray-400 leading-relaxed">
              Para questões sobre privacidade: privacy@blockspace.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

// Página de Política de Cookies
export const CookiePolicy = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="flex items-center gap-3 mb-8">
          <Cookie className="text-purple-400" size={40} />
          <h1 className="text-4xl font-bold">Política de Cookies</h1>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 space-y-6">
          <p className="text-gray-400">
            <strong>Última atualização:</strong> 17 de novembro de 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold mb-3">O que são Cookies?</h2>
            <p className="text-gray-400 leading-relaxed">
              Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você 
              visita nosso site. Eles nos ajudam a melhorar sua experiência e fornecer funcionalidades 
              essenciais da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Tipos de Cookies que Usamos</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-800/30 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2 text-purple-400">Cookies Essenciais</h3>
                <p className="text-gray-400 text-sm">
                  Necessários para o funcionamento básico do site. Sem eles, você não conseguirá 
                  fazer login ou usar recursos fundamentais.
                </p>
                <p className="text-gray-500 text-xs mt-2">Exemplos: Sessão de login, preferências de idioma</p>
              </div>

              <div className="bg-gray-800/30 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2 text-blue-400">Cookies de Performance</h3>
                <p className="text-gray-400 text-sm">
                  Coletam informações sobre como você usa o site, ajudando-nos a melhorar a 
                  performance e corrigir erros.
                </p>
                <p className="text-gray-500 text-xs mt-2">Exemplos: Análise de páginas visitadas, tempo de carregamento</p>
              </div>

              <div className="bg-gray-800/30 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2 text-green-400">Cookies de Funcionalidade</h3>
                <p className="text-gray-400 text-sm">
                  Lembram suas escolhas e preferências para melhorar sua experiência.
                </p>
                <p className="text-gray-500 text-xs mt-2">Exemplos: Tema escuro/claro, tamanho da fonte</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Cookies de Terceiros</h2>
            <p className="text-gray-400 leading-relaxed">
              Podemos usar serviços de terceiros que também utilizam cookies, como:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4 mt-3">
              <li>Análise de tráfego (Google Analytics, se aplicável)</li>
              <li>Autenticação social (Google, GitHub)</li>
              <li>CDN para entrega de conteúdo</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Gerenciar Cookies</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              Você pode controlar e gerenciar cookies de várias maneiras:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
              <li>Através das configurações do seu navegador</li>
              <li>Usando nossas configurações de preferências de cookies</li>
              <li>Instalando extensões de bloqueio de cookies</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-3">
              <strong>Atenção:</strong> Bloquear alguns cookies pode afetar a funcionalidade do site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Duração dos Cookies</h2>
            <div className="space-y-2 text-gray-400">
              <p><strong>Cookies de Sessão:</strong> Expiram quando você fecha o navegador</p>
              <p><strong>Cookies Persistentes:</strong> Permanecem por um período definido (geralmente até 1 ano)</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Atualizações desta Política</h2>
            <p className="text-gray-400 leading-relaxed">
              Podemos atualizar esta política de cookies periodicamente. Notificaremos sobre 
              mudanças significativas através de um aviso no site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Contato</h2>
            <p className="text-gray-400 leading-relaxed">
              Dúvidas sobre cookies: cookies@blockspace.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
            }
