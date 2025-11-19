import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'

// ===== LANDING PAGE =====
function LandingPage() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">🚀</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">BlockSpace</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigate('/login')} className="px-6 py-2 text-gray-300 hover:text-white transition-colors">Entrar</button>
            <button onClick={() => navigate('/login')} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold">Começar Grátis</button>
          </div>
        </div>
      </nav>
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            A Rede Social do<br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Futuro Chegou</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Conecte-se com pessoas incríveis, compartilhe momentos e faça parte de uma comunidade vibrante.
          </p>
          <button onClick={() => navigate('/login')} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-lg">
            Criar Conta Grátis 🚀
          </button>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
            {['10K+ Usuários', '1M+ Posts', '5M+ Conexões', '24/7 Suporte'].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">{stat.split(' ')[0]}</div>
                <div className="text-sm text-gray-400">{stat.split(' ').slice(1).join(' ')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ===== LOGIN PAGE =====
function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl mx-auto mb-4">🚀</div>
          <h1 className="text-3xl font-bold">Bem-vindo ao BlockSpace</h1>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" 
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha" 
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button 
            onClick={() => navigate('/feed')}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3 rounded-lg font-bold mb-4"
          >
            Entrar
          </button>
          <button onClick={() => navigate('/')} className="w-full text-gray-400 hover:text-white">← Voltar</button>
        </div>
      </div>
    </div>
  )
}

// ===== FEED =====
function FeedPage() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">🚀</div>
            <span className="text-xl font-bold">BlockSpace</span>
          </div>
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white">Sair</button>
        </div>
      </nav>
      
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-4">
          <textarea placeholder="O que está acontecendo?" className="w-full bg-gray-800 rounded-lg p-4 resize-none focus:outline-none" rows="3"></textarea>
          <button className="mt-3 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold">Postar</button>
        </div>
        
        <div className="text-center py-20 text-gray-500">
          <div className="text-6xl mb-4">📝</div>
          <p>Seus posts aparecerão aqui!</p>
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
        <div className="text-9xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-6">404</div>
        <div className="text-8xl mb-6">😢</div>
        <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
        <button onClick={() => navigate('/')} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold">
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  )
                                      }
