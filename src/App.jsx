import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { Home, Search, PlusCircle, MessageCircle, User, Heart, Share2, Bookmark, Bell, Menu, X, Send, ArrowLeft, Eye, EyeOff } from 'lucide-react'

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
            <button onClick={() => navigate('/login')} className="px-6 py-2 text-gray-300 hover:text-white transition-colors">Entrar</button>
            <button onClick={() => navigate('/login')} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full font-semibold transition-all shadow-lg">Começar Grátis</button>
          </div>
        </div>
      </nav>
      
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-purple-400">✨</span>
            <span className="text-sm text-purple-300">Versão 0.1 - Agora Disponível!</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            A Rede Social do<br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Futuro Chegou</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Conecte-se com pessoas incríveis, compartilhe momentos e faça parte de uma comunidade vibrante. Tudo em um só lugar. 100% gratuito.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button onClick={() => navigate('/login')} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-purple-500/50 hover:scale-105">
              Criar Conta Grátis 🚀
            </button>
            <button onClick={() => navigate('/login')} className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full font-semibold transition-all">
              Já Tenho Conta
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {['10K+|Usuários', '1M+|Posts', '5M+|Conexões', '24/7|Suporte'].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">{stat.split('|')[0]}</div>
                <div className="text-sm text-gray-400">{stat.split('|')[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Por que escolher o <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">BlockSpace?</span>
            </h2>
            <p className="text-xl text-gray-400">Recursos incríveis para você se expressar</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all hover:scale-105 group">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform`}>{f.icon}</div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl text-gray-300 mb-8">Junte-se a milhares de pessoas e faça parte da revolução social</p>
          <button onClick={() => navigate('/login')} className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-purple-500/50 hover:scale-105">
            Criar Conta Agora - É Grátis! 🎉
          </button>
        </div>
      </section>
      
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl">🚀</div>
            <span className="text-xl font-bold">BlockSpace</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">A rede social do futuro para jovens conectados.</p>
          <div className="border-t border-gray-800 pt-6 text-gray-400 text-sm">
            <p>© 2025 BlockSpace. Todos os direitos reservados. Feito com 💜</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ===== LOGIN/CADASTRO =====
function AuthPage() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '', name: '', username: '' })
  
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
          
          <h1 className="text-4xl font-bold mb-2">{isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}</h1>
          <p className="text-gray-400 mb-8">{isLogin ? 'Entre para continuar' : 'Junte-se à nossa comunidade'}</p>
          
          <div className="space-y-4">
            {!isLogin && (
              <>
                <input type="text" placeholder="Nome completo" className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <input type="text" placeholder="@usuario" className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </>
            )}
            <input type="email" placeholder="Email" className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder="Senha" className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button onClick={() => navigate('/feed')} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 py-3 rounded-lg font-semibold transition-all shadow-lg">
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </div>
          
          <p className="text-center text-gray-400 mt-6">
            {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
            <button onClick={() => setIsLogin(!isLogin)} className="text-purple-400 font-semibold hover:underline">{isLogin ? 'Criar conta' : 'Entrar'}</button>
          </p>
        </div>
      </div>
      
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-900/50 to-blue-900/50 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative z-10 max-w-lg text-center">
          <h2 className="text-5xl font-bold mb-6">Conecte-se com o <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">mundo</span></h2>
          <p className="text-xl text-gray-300">Compartilhe momentos, faça amigos e seja parte de uma comunidade incrível.</p>
        </div>
      </div>
    </div>
  )
}

// ===== FEED =====
function FeedPage() {
  const navigate = useNavigate()
  const [newPost, setNewPost] = useState('')
  const [posts] = useState([
    { id: 1, user: 'Maria Silva', username: 'maria_dev', avatar: '👩‍💻', content: 'Acabei de lançar meu projeto! 🚀', likes: 342, comments: 28, time: '2h' },
    { id: 2, user: 'João Santos', username: 'joao_design', avatar: '🎨', content: 'Novo design system pronto! 🎨✨', likes: 189, comments: 42, time: '4h' },
    { id: 3, user: 'Ana Costa', username: 'ana_tech', avatar: '🚀', content: 'Conferência de IA foi incrível! 🤖', likes: 567, comments: 89, time: '7h' }
  ])
  
  const NavIcon = ({ Icon, label, path }) => (
    <button onClick={() => path && navigate(path)} className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-white transition-colors">
      <Icon size={24} />
      <span className="text-xs">{label}</span>
    </button>
  )
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl">🚀</div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">BlockSpace</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-white transition-colors"><Bell size={22} /></button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors"><Menu size={22} /></button>
          </div>
        </div>
      </nav>
      
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="bg-gray-900/50 border-b border-gray-800 p-4">
          <div className="flex gap-3 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl flex-shrink-0">🎨</div>
            <div className="flex-1">
              <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="O que está acontecendo?" className="w-full bg-gray-800/50 text-white rounded-2xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50" rows="3" />
              <div className="flex justify-end mt-3">
                <button onClick={() => setNewPost('')} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-8 py-2.5 rounded-full font-semibold transition-all shadow-lg">Postar</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-900/30 border-b border-gray-800/50 p-4 hover:bg-gray-900/50 transition-all">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl flex-shrink-0">{post.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold">{post.user}</span>
                    <span className="text-gray-500 text-sm">@{post.username}</span>
                    <span className="text-gray-600">·</span>
                    <span className="text-gray-500 text-sm">{post.time}</span>
                  </div>
                  <p className="text-white mb-4">{post.content}</p>
                  <div className="flex gap-8 text-gray-500">
                    <button className="flex items-center gap-2 hover:text-pink-500 transition-colors"><Heart size={18} /> {post.likes}</button>
                    <button className="flex items-center gap-2 hover:text-blue-500 transition-colors"><MessageCircle size={18} /> {post.comments}</button>
                    <button className="flex items-center gap-2 hover:text-green-500 transition-colors"><Share2 size={18} /></button>
                    <button className="flex items-center gap-2 hover:text-yellow-500 transition-colors ml-auto"><Bookmark size={18} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <nav className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 fixed bottom-0 left-0 right-0 z-50">
        <div className="flex justify-around py-2">
          <NavIcon Icon={Home} label="Feed" />
          <NavIcon Icon={Search} label="Buscar" path="/search" />
          <NavIcon Icon={PlusCircle} label="Criar" />
          <NavIcon Icon={MessageCircle} label="Chat" path="/messages" />
          <NavIcon Icon={User} label="Perfil" path="/profile" />
        </div>
      </nav>
    </div>
  )
}

// ===== BUSCA =====
function SearchPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  
  const trending = [
    { tag: 'ReactJS', posts: '15.2K' },
    { tag: 'NextJS', posts: '8.9K' },
    { tag: 'TypeScript', posts: '12.4K' }
  ]
  
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar no BlockSpace..." className="w-full bg-gray-800/50 text-white rounded-full pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50" />
          </div>
        </div>
      </nav>
      
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Tendências para você</h2>
        <div className="space-y-2">
          {trending.map((t, i) => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 hover:bg-gray-900/70 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-purple-400">#{t.tag}</span>
                  <p className="text-sm text-gray-400">{t.posts} posts</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ===== MENSAGENS =====
function MessagesPage() {
  const navigate = useNavigate()
  const [chats] = useState([
    { id: 1, name: 'Maria Silva', avatar: '👩‍💻', lastMsg: 'Viu meu último post?', time: '10:45', unread: 3 },
    { id: 2, name: 'Dev Team 🚀', avatar: '💻', lastMsg: 'Reunião às 15h', time: '09:15', unread: 8 }
  ])
  
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 p-4">
        <h1 className="text-2xl font-bold">Mensagens</h1>
      </nav>
      
      <div className="max-w-4xl mx-auto">
        {chats.map(chat => (
          <div key={chat.id} className="border-b border-gray-800 p-4 hover:bg-gray-900/30 transition-all cursor-pointer">
            <div className="flex gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">{chat.avatar}</div>
                {chat.unread > 0 && <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">{chat.unread}</div>}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="font-semibold">{chat.name}</span>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{chat.lastMsg}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== PERFIL =====
function ProfilePage() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 h-48"></div>
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <div className="flex justify-between items-start -mt-16 mb-4">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-6xl border-4 border-black">🎨</div>
          <button onClick={() => navigate('/settings')} className="mt-16 px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-full font-semibold transition-all">Editar Perfil</button>
        </div>
        
        <h2 className="text-2xl font-bold mb-1">Você</h2>
        <p className="text-gray-500 mb-3">@seu_usuario</p>
        <p className="mb-4">Bem-vindo ao BlockSpace! 🚀✨</p>
        
        <div className="flex gap-6 text-sm mb-6">
          <div><span className="font-bold text-white">189</span> <span className="text-gray-500">Seguindo</span></div>
          <div><span className="font-bold text-white">1.2K</span> <span className="text-gray-500">Seguidores</span></div>
        </div>
        
        <div className="text-center py-20 text-gray-500">
          <div className="text-6xl mb-4">📝</div>
          <p>Seus posts aparecerão aqui</p>
        </div>
      </div>
    </div>
  )
}

// ===== ERROR 404 =====
function Error404() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-9xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse mb-6">404</div>
        <div className="text-8xl mb-6">😢</div>
        <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
        <p className="text-xl text-gray-400 mb-8">A página que você procura não existe</p>
        <button onClick={() => navigate('/')} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full font-bold transition-all shadow-2xl hover:shadow-purple-500/50">
          Voltar para Home
        </button>
      </div>
    </div>
  )
}

// ===== APP PRINCIPAL =====
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  )
              }
