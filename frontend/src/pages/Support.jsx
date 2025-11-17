import React, { useState } from 'react'
import { HelpCircle, MessageCircle, Mail, Book, Search, ChevronDown, ChevronUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Support = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaq, setOpenFaq] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const faqs = [
    {
      id: 1,
      question: 'Como criar uma conta no BlockSpace?',
      answer: 'Para criar uma conta, clique em "Criar Conta" na página inicial, preencha seus dados (nome, email, usuário e senha) e pronto! Você já pode começar a usar o BlockSpace.'
    },
    {
      id: 2,
      question: 'Como faço para recuperar minha senha?',
      answer: 'Na tela de login, clique em "Esqueceu a senha?" e siga as instruções. Enviaremos um email com um link para redefinir sua senha.'
    },
    {
      id: 3,
      question: 'Como postar no BlockSpace?',
      answer: 'No feed, você encontrará uma caixa de texto onde pode escrever seu post. Digite sua mensagem e clique em "Postar". Você também pode adicionar imagens clicando no ícone de imagem.'
    },
    {
      id: 4,
      question: 'O que são Stories?',
      answer: 'Stories são posts temporários que desaparecem após 24 horas. Perfeito para compartilhar momentos do dia a dia! Clique no botão "+" nos stories para criar o seu.'
    },
    {
      id: 5,
      question: 'Como denunciar conteúdo inadequado?',
      answer: 'Clique nos três pontos (⋮) no post ou perfil que deseja denunciar e selecione "Denunciar". Nossa equipe de moderação irá analisar o caso.'
    },
    {
      id: 6,
      question: 'Como deletar minha conta?',
      answer: 'Vá em Configurações > Conta > Zona de Perigo > Deletar Conta. Atenção: esta ação é irreversível!'
    },
    {
      id: 7,
      question: 'O BlockSpace é gratuito?',
      answer: 'Sim! O BlockSpace é 100% gratuito e sempre será. Não temos planos pagos nem cobramos por nenhuma funcionalidade.'
    },
    {
      id: 8,
      question: 'Como entrar em contato com o suporte?',
      answer: 'Você pode usar o formulário abaixo nesta página ou nos enviar um email para suporte@blockspace.com. Respondemos em até 24 horas!'
    }
  ]

  const quickLinks = [
    { icon: Book, title: 'Central de Ajuda', description: 'Guias e tutoriais completos', link: '#' },
    { icon: MessageCircle, title: 'Comunidade', description: 'Fórum de usuários', link: '#' },
    { icon: Mail, title: 'Email', description: 'suporte@blockspace.com', link: 'mailto:suporte@blockspace.com' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Mensagem enviada com sucesso! Responderemos em breve.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  const filteredFaqs = faqs.filter(faq =>
    searchQuery === '' ||
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-purple-500/20 p-8 text-center">
        <HelpCircle className="mx-auto mb-4 text-purple-400" size={48} />
        <h1 className="text-4xl font-bold mb-2">Centro de Suporte</h1>
        <p className="text-xl text-gray-300">Como podemos ajudar você hoje?</p>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar ajuda..."
              className="w-full bg-gray-900/50 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-800/50"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {quickLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <a
                key={index}
                href={link.link}
                className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all hover:scale-105"
              >
                <Icon className="text-purple-400 mb-3" size={32} />
                <h3 className="font-bold mb-1">{link.title}</h3>
                <p className="text-sm text-gray-400">{link.description}</p>
              </a>
            )
          })}
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
          <div className="space-y-3">
            {filteredFaqs.map(faq => (
              <div
                key={faq.id}
                className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-800/30 transition-all"
                >
                  <span className="font-semibold text-left">{faq.question}</span>
                  {openFaq === faq.id ? (
                    <ChevronUp className="text-purple-400 flex-shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-500 flex-shrink-0" size={20} />
                  )}
                </button>
                {openFaq === faq.id && (
                  <div className="px-4 pb-4 text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-2">Ainda precisa de ajuda?</h2>
          <p className="text-gray-400 mb-6">Envie uma mensagem e nossa equipe responderá em breve!</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Assunto</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Selecione um assunto</option>
                <option value="account">Problema com a conta</option>
                <option value="technical">Problema técnico</option>
                <option value="report">Denunciar conteúdo</option>
                <option value="suggestion">Sugestão</option>
                <option value="other">Outro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Mensagem</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="6"
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Descreva seu problema ou dúvida..."
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/50"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Precisa de mais ajuda? Consulte nossos{' '}
            <button onClick={() => navigate('/termos')} className="text-purple-400 hover:underline">
              Termos de Uso
            </button>
            {' '}ou{' '}
            <button onClick={() => navigate('/privacidade')} className="text-purple-400 hover:underline">
              Política de Privacidade
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Support
