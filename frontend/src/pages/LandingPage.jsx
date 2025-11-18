import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, MessageCircle, Users, Shield, Zap, Heart, TrendingUp } from 'lucide-react'

const LandingPage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: MessageCircle,
      title: 'Posts Ilimitados',
      description: 'Compartilhe seus pensamentos, fotos e vídeos com o mundo',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Conecte-se',
      description: 'Siga pessoas interessantes e faça parte de comunidades',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Stories 24h',
      description: 'Compartilhe momentos que desaparecem em 24 horas',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'Seguro e Moderado',
      description: 'Ambiente seguro com moderação ativa',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const stats = [
    { number: '10K+', label: 'Usuários Ativos' },
    { number: '1M+', label: 'Posts Criados' },
    { number: '5M+', label: 'Conexões Feitas' },
    { number: '24/7', label: 'Suporte Online' }
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
              🚀
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
              BlockSpace
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Entrar
            </button>
            <button
              onClick={() => navigate('/login?tab=signup')}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full font-semibold transition-all shadow-lg hover:shadow-purple-500/50"
            >
              Começar Grátis
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="text-purple-400" size={16} />
            <span className="text-sm text-purple-300">Versão 0.1 - Agora Disponível!</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            A Rede Social do
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
              Futuro Chegou
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Conecte-se com pessoas incríveis, compartilhe momentos e faça parte de uma comunidade vibrante. 
            Tudo em um só lugar. 100% gratuito.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => navigate('/login?tab=signup')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
            >
              Criar Conta Grátis 🚀
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full font-semibold transition-all"
            >
              Já Tenho Conta
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Por que escolher o{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                BlockSpace?
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Recursos incríveis para você se expressar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all hover:scale-105 group"
                >
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Junte-se a milhares de pessoas e faça parte da revolução social
          </p>
          <button
            onClick={() => navigate('/login?tab=signup')}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
          >
            Criar Conta Agora - É Grátis! 🎉
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl">
                  🚀
                </div>
                <span className="text-xl font-bold">BlockSpace</span>
              </div>
              <p className="text-gray-400 text-sm">
                A rede social do futuro para jovens conectados.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="/suporte" className="hover:text-white transition-colors">Suporte</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/termos" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="/privacidade" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="/cookies" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Redes Sociais</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 BlockSpace. Todos os direitos reservados. Feito com 💜</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
