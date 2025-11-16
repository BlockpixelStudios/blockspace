import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const AuthPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { signIn, signUp } = useAuth()
  
  const [isLogin, setIsLogin] = useState(searchParams.get('tab') !== 'signup')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    name: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password)
        if (error) throw error
        navigate('/feed')
      } else {
        if (!formData.username || !formData.name) {
          setError('Preencha todos os campos')
          setLoading(false)
          return
        }
        const { error } = await signUp(formData.email, formData.password, formData.username)
        if (error) throw error
        navigate('/feed')
      }
    } catch (err) {
      setError(err.message || 'Erro ao autenticar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
              🚀
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
              BlockSpace
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-2">
            {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
          </h1>
          <p className="text-gray-400 mb-8">
            {isLogin 
              ? 'Entre para continuar sua jornada' 
              : 'Junte-se à nossa comunidade incrível'}
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nome de Usuário</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="seu_usuario"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-11 pr-11 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/50 disabled:shadow-none"
            >
              {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-800"></div>
            <span className="text-sm text-gray-500">ou</span>
            <div className="flex-1 h-px bg-gray-800"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full bg-white/5 hover:bg-white/10 border border-gray-800 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Continuar com Google
            </button>
            <button className="w-full bg-white/5 hover:bg-white/10 border border-gray-800 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
              <img src="https://github.com/favicon.ico" alt="GitHub" className="w-5 h-5" />
              Continuar com GitHub
            </button>
          </div>

          {/* Toggle */}
          <p className="text-center text-gray-400 mt-6">
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              {isLogin ? 'Criar conta' : 'Entrar'}
            </button>
          </p>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-8">
            Ao continuar, você concorda com nossos{' '}
            <a href="/termos" className="text-purple-400 hover:underline">Termos de Uso</a>
            {' '}e{' '}
            <a href="/privacidade" className="text-purple-400 hover:underline">Política de Privacidade</a>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-900/50 via-transparent to-blue-900/50 relative overflow-hidden items-center justify-center p-12">
        {/* Background Effects */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-5xl font-bold mb-6">
            Conecte-se com o{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              mundo
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Compartilhe momentos, faça amigos e seja parte de uma comunidade incrível.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                ✨
              </div>
              <div>
                <p className="font-semibold">Interface Moderna</p>
                <p className="text-sm text-gray-400">Design limpo e intuitivo</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                🔒
              </div>
              <div>
                <p className="font-semibold">100% Seguro</p>
                <p className="text-sm text-gray-400">Seus dados protegidos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                🚀
              </div>
              <div>
                <p className="font-semibold">Sempre Gratuito</p>
                <p className="text-sm text-gray-400">Sem custos ocultos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
