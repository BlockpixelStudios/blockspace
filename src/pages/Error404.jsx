import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Search, ArrowLeft } from 'lucide-react'

const Error404 = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        {/* Animação de Erro */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text animate-pulse">
            404
          </div>
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 -z-10"></div>
        </div>

        {/* Emoji Triste */}
        <div className="text-8xl mb-6 animate-bounce">
          😢
        </div>

        {/* Mensagem */}
        <h1 className="text-4xl font-bold mb-4">
          Oops! Página não encontrada
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          A página que você está procurando não existe ou foi movida para outro lugar.
        </p>

        {/* Sugestões */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 mb-8">
          <h3 className="font-bold mb-4">O que você pode fazer:</h3>
          <ul className="text-left space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Verificar se a URL está correta
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Voltar para a página anterior
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Ir para a página inicial
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Usar a busca para encontrar o que procura
            </li>
          </ul>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full font-semibold transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
          <button
            onClick={() => navigate('/feed')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50"
          >
            <Home size={20} />
            Ir para o Feed
          </button>
          <button
            onClick={() => navigate('/search')}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Search size={20} />
            Buscar
          </button>
        </div>

        {/* Footer */}
        <p className="mt-12 text-gray-600 text-sm">
          Código do erro: 404 - Página não encontrada
        </p>
      </div>
    </div>
  )
}

export default Error404
