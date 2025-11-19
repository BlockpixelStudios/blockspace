import React, { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { Home, Search, PlusCircle, MessageCircle, User, Heart, Share2, Bookmark, Bell, Menu, X, Send, ArrowLeft, Eye, EyeOff, Settings, Upload, Image as ImageIcon, Camera, LogOut, Shield, TrendingUp, AlertTriangle, Users, FileText, Trash2, Check, Ban, ChevronDown, ChevronUp, HelpCircle, Mail, Book, ExternalLink, Sparkles, MapPin, Calendar, Link as LinkIcon, MoreVertical, UserPlus, UserCheck, Phone, Video, Smile, Paperclip } from 'lucide-react'
import { supabase } from './services/supabase'

// ===== CONTEXT DE AUTENTICAÇÃO =====
const AuthContext = createContext()
const useAuth = () => useContext(AuthContext)

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session?.user ?? null)
    setLoading(false)
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  const signUp = async (email, password, username, name) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, name } }
    })
    return { data, error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// ===== COMPONENTE DE NAVEGAÇÃO =====
function BottomNav() {
  const navigate = useNavigate()
  const location = window.location.pathname
  
  const navItems = [
    { path: '/feed', icon: Home, label: 'Feed' },
    { path: '/search', icon: Search, label: 'Buscar' },
    { path: '/create', icon: PlusCircle, label: 'Criar' },
    { path: '/messages', icon: MessageCircle, label: 'Chat' },
    { path: '/profile', icon: User, label: 'Perfil' }
  ]
  
  return (
    <nav className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 fixed bottom-0 left-0 right-0 z-50">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = location === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${
                active ? 'text-purple-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon size={24} fill={active ? 'currentColor' : 'none'} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

// ===== HEADER COM NOTIFICAÇÕES =====
function Header({ showBack, title }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  
  const notifications = [
    { id: 1, type: 'like', user: 'Maria Silva', message: 'curtiu seu post', time: '5min', read: false },
    { id: 2, type: 'follow', user: 'João Santos', message: 'começou a seguir você', time: '1h', read: false }
  ]
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  return (
    <nav className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 p-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {showBack ? (
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowLeft size={20} /> {title || 'Voltar'}
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl">🚀</div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">BlockSpace</span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={22} />
              {unreadCount > 0 && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {unreadCount}
                </div>
              )}
            </button>
            
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 top-full mt-2 w-80 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="font-bold">Notificações</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`p-4 border-b border-gray-800/50 hover:bg-gray-800/30 ${!notif.read ? 'bg-purple-500/5' : ''}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl flex-shrink-0">
                            {notif.type === 'like' ? '❤️' : '👤'}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm"><span className="font-semibold">{notif.user}</span> {notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                          {!notif.read && <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          
          <button onClick={() => setShowMenu(!showMenu)} className="p-2 text-gray-400 hover:text-white transition-colors">
            <Menu size={22} />
          </button>
          
          {showMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                <div className="p-4 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">🎨</div>
                    <div>
                      <p className="font-bold">{user?.user_metadata?.name || 'Usuário'}</p>
                      <p className="text-sm text-gray-400">@{user?.user_metadata?.username || 'usuario'}</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button onClick={() => { navigate('/settings'); setShowMenu(false) }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800/50 transition-all">
                    <Settings size={20} /> Configurações
                  </button>
                  <button onClick={() => { navigate('/support'); setShowMenu(false) }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800/50 transition-all">
                    <HelpCircle size={20} /> Suporte
                  </button>
                  <button onClick={() => { navigate('/admin'); setShowMenu(false) }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800/50 transition-all text-purple-400">
                    <Shield size={20} /> Painel Admin
                  </button>
                </div>
                <div className="border-t border-gray-800 py-2">
                  <button onClick={() => { useAuth().signOut(); navigate('/') }} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all">
                    <LogOut size={20} /> Sair
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

// ===== LANDING PAGE =====
function LandingPage() {
  const navigate = useNavigate()
  
  const features = [
    { icon: '💬', title: 'Posts Ilimitados', desc: 'Compartilhe seus pensamentos com o mundo', color: 'from-blue-500 to-cyan-500' },
    { icon: '👥', title: 'Conecte-se', desc: 'Siga pessoas interessantes', color: 'from-purple-500 to-pink-500' },
    { icon: '⚡', title: 'Stories 24h', desc: 'Compartilhe momentos temporários', color: 'from-orange-500 to-red-500' },
    { icon: '🛡️', title: 'Seguro', desc: 'Ambiente moderado e protegido', color: 'from-green-500 to-emerald-500' }
  ]
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">🚀</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">BlockSpace</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigate('/auth')} className="px-6 py-2 text-gray-300 hover:text-white transition-colors">Entrar</button>
            <button onClick={() => navigate('/auth')} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full font-semibold transition-all shadow-lg">Começar Grátis</button>
          </div>
        </div>
      </nav>
      
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="text-purple-400" size={16} />
            <span className="text-sm text-purple-300">Versão 0.1 - Agora Disponível!</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            A Rede Social do<br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Futuro Chegou</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Conecte-se com pessoas incríveis, compartilhe momentos e faça parte de uma comunidade vibrante. 100% gratuito.
          </p>
          
          <button onClick={() => navigate('/auth')} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-purple-500/50 hover:scale-105">
            Criar Conta Grátis 🚀
          </button>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
            {['10K+|Usuários', '1M+|Posts', '5M+|Conexões', '24/7|Suporte'].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">{stat.split('|')[0]}</div>
                <div className="text-sm text-gray-400">{stat.split('|')[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Por que <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">BlockSpace?</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all hover:scale-105">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 text-2xl`}>{f.icon}</div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <footer className="border-t border-gray-800 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">© 2025 BlockSpace. Feito com 💜</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <button onClick={() => navigate('/legal/terms')} className="text-gray-400 hover:text-white">Termos</button>
            <button onClick={() => navigate('/legal/privacy')} className="text-gray-400 hover:text-white">Privacidade</button>
            <button onClick={() => navigate('/legal/cookies')} className="text-gray-400 hover:text-white">Cookies</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ===== PÁGINAS LEGAIS =====
function LegalPages() {
  const { type } = useParams()
  const navigate = useNavigate()
  
  const content = {
    terms: { title: 'Termos de Uso', icon: FileText, text: 'Ao usar o BlockSpace, você concorda com nossos termos...' },
    privacy: { title: 'Política de Privacidade', icon: Shield, text: 'Sua privacidade é importante para nós...' },
    cookies: { title: 'Política de Cookies', icon: '🍪', text: 'Usamos cookies para melhorar sua experiência...' }
  }
  
  const current = content[type] || content.terms
  const Icon = current.icon
  
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={20} /> Voltar
      </button>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          {typeof Icon === 'string' ? <span className="text-4xl">{Icon}</span> : <Icon className="text-purple-400" size={40} />}
          <h1 className="text-4xl font-bold">{current.title}</h1>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          <p className="text-gray-400 leading-relaxed">{current.text}</p>
        </div>
      </div>
    </div>
  )
}

// ===== AUTH PAGE =====
function AuthPage() {
  const navigate = useNavigate()
  const { signIn, signUp } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ email: '', password: '', name: '', username: '' })
  
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
        const { error } = await signUp(formData.email, formData.password, formData.username, formData.name)
        if (error) throw error
        navigate('/feed')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8">
            <ArrowLeft size={20} /> Voltar
          </button>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">🚀</div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">BlockSpace</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">{isLogin ? 'Bem-vindo!' : 'Crie sua conta'}</h1>
          <p className="text-gray-400 mb-8">{isLogin ? 'Entre para continuar' : 'Junte-se à comunidade'}</p>
          
          {error && <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 text-red-400">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <input type="text" placeholder="Nome completo" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                <input type="text" placeholder="@usuario" onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
              </>
            )}
            <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder="Senha" onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 py-3 rounded-lg font-semibold transition-all shadow-lg">
              {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </form>
          
          <p className="text-center text-gray-400 mt-6">
            {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
            <button onClick={() => setIsLogin(!isLogin)} className="text-purple-400 font-semibold hover:underline">
              {isLogin ? 'Criar conta' : 'Entrar'}
            </button>
          </p>
        </div>
      </div>
      
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-900/50 to-blue-900/50 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Conecte-se com o <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">mundo</span>
          </h2>
          <p className="text-xl text-gray-300">Compartilhe momentos e faça amigos!</p>
        </div>
      </div>
    </div>
  )
}

// ===== FEED =====
function FeedPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    loadPosts()
  }, [])
  
  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users(id, username, name, avatar, verified)
        `)
        .order('created_at', { ascending: false })
        .limit(50)
      
      if (error) throw error
      setPosts(data || [])
    } catch (err) {
      console.error('Erro ao carregar posts:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const createPost = async () => {
    if (!newPost.trim()) return
    
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          user_id: user.id,
          content: newPost
        }])
        .select()
      
      if (error) throw error
      setNewPost('')
      loadPosts()
    } catch (err) {
      alert('Erro ao criar post: ' + err.message)
    }
  }
  
  const toggleLike = async (postId) => {
    try {
      const { data: existingLike } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single()
      
      if (existingLike) {
        await supabase.from('likes').delete().eq('id', existingLike.id)
      } else {
        await supabase.from('likes').insert([{ post_id: postId, user_id: user.id }])
      }
      loadPosts()
    } catch (err) {
      console.error('Erro ao dar like:', err)
    }
  }
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="bg-gray-900/50 border-b border-gray-800 p-4">
          <div className="flex gap-3 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl flex-shrink-0 cursor-pointer" onClick={() => navigate('/profile')}>
              {user?.user_metadata?.avatar || '🎨'}
            </div>
            <div className="flex-1">
              <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="O que está acontecendo?" className="w-full bg-gray-800/50 text-white rounded-2xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50 placeholder-gray-500" rows="3" />
              <div className="flex justify-between items-center mt-3">
                <button className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded-full transition-all">
                  <ImageIcon size={20} />
                </button>
                <button onClick={createPost} disabled={!newPost.trim()} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 px-8 py-2.5 rounded-full font-semibold transition-all shadow-lg disabled:shadow-none">
                  Postar
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {loading ? (
            <div className="text-center py-20 text-gray-500">Carregando...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="text-6xl mb-4">📝</div>
              <p>Nenhum post ainda. Seja o primeiro a postar!</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="bg-gray-900/30 border-b border-gray-800/50 p-4 hover:bg-gray-900/50 transition-all">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl flex-shrink-0 cursor-pointer" onClick={() => navigate(`/profile/${post.users.username}`)}>
                    {post.users.avatar || '👤'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold cursor-pointer hover:underline" onClick={() => navigate(`/profile/${post.users.username}`)}>{post.users.name}</span>
                      {post.users.verified && <CheckCircle size={16} className="text-blue-500 fill-blue-500" />}
                      <span className="text-gray-500 text-sm">@{post.users.username}</span>
                      <span className="text-gray-600">·</span>
                      <span className="text-gray-500 text-sm">{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-white mb-4 leading-relaxed">{post.content}</p>
                    <div className="flex gap-8 text-gray-500">
                      <button onClick={() => toggleLike(post.id)} className="flex items-center gap-2 hover:text-pink-500 transition-all group">
                        <div className="p-2 rounded-full group-hover:bg-pink-500/10">
                          <Heart size={18} />
                        </div>
                        <span className="text-sm">{post.likes_count || 0}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-blue-500 transition-all group">
                        <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                          <MessageCircle size={18} />
                        </div>
                        <span className="text-sm">{post.comments_count || 0}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-green-500 transition-all group">
                        <div className="p-2 rounded-full group-hover:bg-green-500/10">
                          <Share2 size={18} />
                        </div>
                      </button>
                      <button className="flex items-center gap-2 hover:text-yellow-500 transition-all ml-auto group">
                        <div className="p-2 rounded-full group-hover:bg-yellow-500/10">
                          <Bookmark size={18} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <BottomNav />
    </div>
  )
}

// ===== CRIAR CONTEÚDO =====
function CreateContentPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [contentType, setContentType] = useState('post')
  const [content, setContent] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  
  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setSelectedImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }
  
  const handlePost = async () => {
    if (!content.trim() && !selectedImage) return
    
    try {
      if (contentType === 'post') {
        const { error } = await supabase.from('posts').insert([{
          user_id: user.id,
          content,
          image_url: selectedImage
        }])
        if (error) throw error
      } else {
        const { error } = await supabase.from('stories').insert([{
          user_id: user.id,
          content,
          image_url: selectedImage
        }])
        if (error) throw error
      }
      navigate('/feed')
    } catch (err) {
      alert('Erro ao criar: ' + err.message)
    }
  }
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/feed')} className="text-gray-400 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all">
            <X size={24} />
          </button>
          <h1 className="text-xl font-bold">{contentType === 'post' ? 'Criar Post' : 'Criar Story'}</h1>
          <button onClick={handlePost} disabled={!content.trim() && !selectedImage} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 px-6 py-2 rounded-full font-semibold transition-all">
            Publicar
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 mb-6">
            <button onClick={() => setContentType('post')} className={`flex-1 py-3 rounded-xl font-semibold transition-all ${contentType === 'post' ? 'bg-purple-600' : 'bg-gray-900/50 hover:bg-gray-800'}`}>
              📝 Post
            </button>
            <button onClick={() => setContentType('story')} className={`flex-1 py-3 rounded-xl font-semibold transition-all ${contentType === 'story' ? 'bg-purple-600' : 'bg-gray-900/50 hover:bg-gray-800'}`}>
              ✨ Story
            </button>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder={contentType === 'post' ? 'O que está acontecendo?' : 'Compartilhe um momento...'} className="w-full bg-transparent text-white text-lg resize-none focus:outline-none min-h-[200px] placeholder-gray-500" autoFocus />
            
            {selectedImage && (
              <div className="relative mt-4">
                <img src={selectedImage} alt="Preview" className="w-full rounded-xl" />
                <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 p-2 bg-black/70 hover:bg-black rounded-full transition-all">
                  <X size={20} />
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 mt-4">
            <p className="text-sm font-semibold mb-3 text-gray-400">Adicionar ao {contentType === 'post' ? 'post' : 'story'}</p>
            <div className="flex gap-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg cursor-pointer transition-all">
                <ImageIcon size={20} className="text-blue-400" />
                <span className="text-sm font-medium">Foto/Vídeo</span>
                <input type="file" accept="image/*,video/*" onChange={handleImageSelect} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===== PERFIL =====
function ProfilePage() {
  const { username } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    loadProfile()
  }, [username])
  
  const loadProfile = async () => {
    try {
      const targetUsername = username || user?.user_metadata?.username
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('username', targetUsername)
        .single()
      
      if (profileError) throw profileError
      setProfile(profileData)
      
      const { data: postsData } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', profileData.id)
        .order('created_at', { ascending: false })
      
      setPosts(postsData || [])
    } catch (err) {
      console.error('Erro ao carregar perfil:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const isOwnProfile = !username || username === user?.user_metadata?.username
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header showBack={!isOwnProfile} title={profile?.name} />
      
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 h-48" />
        
        <div className="max-w-4xl mx-auto px-4 pb-4">
          <div className="flex justify-between items-start -mt-16 mb-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-6xl border-4 border-black shadow-2xl">
              {profile?.avatar || '🎨'}
            </div>
            {isOwnProfile ? (
              <button onClick={() => navigate('/settings')} className="mt-16 px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-full font-semibold transition-all flex items-center gap-2">
                <Settings size={18} /> Editar Perfil
              </button>
            ) : (
              <button className="mt-16 px-6 py-2 bg-white text-black hover:bg-gray-200 rounded-full font-semibold transition-all flex items-center gap-2">
                <UserPlus size={18} /> Seguir
              </button>
            )}
          </div>
          
          <h2 className="text-2xl font-bold mb-1">{profile?.name || 'Carregando...'}</h2>
          <p className="text-gray-500 mb-3">@{profile?.username}</p>
          <p className="mb-4">{profile?.bio || 'Sem bio ainda'}</p>
          
          <div className="flex gap-6 text-sm mb-6">
            <div><span className="font-bold text-white">{profile?.following_count || 0}</span> <span className="text-gray-500">Seguindo</span></div>
            <div><span className="font-bold text-white">{profile?.followers_count || 0}</span> <span className="text-gray-500">Seguidores</span></div>
          </div>
          
          <div className="border-t border-gray-800 mt-6">
            {posts.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <div className="text-6xl mb-4">📝</div>
                <p>Nenhum post ainda</p>
              </div>
            ) : (
              posts.map(post => (
                <div key={post.id} className="border-b border-gray-800 p-4">
                  <p className="text-white mb-3">{post.content}</p>
                  <div className="flex gap-6 text-gray-500 text-sm">
                    <span>{post.likes_count || 0} curtidas</span>
                    <span>{post.comments_count || 0} comentários</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {isOwnProfile && <BottomNav />}
    </div>
  )
}

// ===== APP PRINCIPAL =====
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/create" element={<CreateContentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/legal/:type" element={<LegalPages />} />
          <Route path="*" element={<ErrorPage code="404" />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

// ===== PÁGINA DE ERRO =====
function ErrorPage({ code }) {
  const navigate = useNavigate()
  
  const errors = {
    '404': { title: 'Página não encontrada', desc: 'A página que você procura não existe', emoji: '😢' },
    '403': { title: 'Acesso negado', desc: 'Você não tem permissão para acessar', emoji: '🔒' },
    '500': { title: 'Erro no servidor', desc: 'Algo deu errado, tente novamente', emoji: '💥' },
    '99': { title: 'Falha na conexão', desc: 'Verifique sua internet', emoji: '📡' }
  }
  
  const error = errors[code] || errors['404']
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-9xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-6">{code}</div>
        <div className="text-8xl mb-6">{error.emoji}</div>
        <h1 className="text-4xl font-bold mb-4">{error.title}</h1>
        <p className="text-xl text-gray-400 mb-8">{error.desc}</p>
        <button onClick={() => navigate('/')} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold transition-all shadow-2xl hover:shadow-purple-500/50">
          Voltar para Home
        </button>
      </div>
    </div>
  )
                                                                       }
