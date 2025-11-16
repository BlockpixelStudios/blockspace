import React, { useState } from 'react'
import { Search as SearchIcon, TrendingUp, Hash, UserPlus, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('top')

  const [trendingTopics] = useState([
    { id: 1, tag: 'ReactJS', posts: '15.2K', trend: '+125%' },
    { id: 2, tag: 'NextJS', posts: '8.9K', trend: '+98%' },
    { id: 3, tag: 'TypeScript', posts: '12.4K', trend: '+87%' },
    { id: 4, tag: 'TailwindCSS', posts: '6.7K', trend: '+76%' },
    { id: 5, tag: 'JavaScript', posts: '25.1K', trend: '+65%' }
  ])

  const [suggestedUsers] = useState([
    { id: 2, name: 'Maria Silva', username: 'maria_dev', avatar: '👩‍💻', verified: true, followers: 3420, bio: 'Full Stack Developer' },
    { id: 3, name: 'João Santos', username: 'joao_design', avatar: '🎨', verified: true, followers: 2156, bio: 'UI/UX Designer' },
    { id: 4, name: 'Ana Costa', username: 'ana_tech', avatar: '🚀', verified: true, followers: 5890, bio: 'Tech Lead' },
    { id: 5, name: 'Pedro Lima', username: 'pedro_code', avatar: '💻', verified: false, followers: 4321, bio: 'Software Engineer' }
  ])

  const [recentSearches] = useState([
    { id: 1, type: 'user', name: 'Maria Silva', username: 'maria_dev', avatar: '👩‍💻' },
    { id: 2, type: 'hashtag', text: '#ReactJS' },
    { id: 3, type: 'user', name: 'João Santos', username: 'joao_design', avatar: '🎨' }
  ])

  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num
  }

  const tabs = [
    { id: 'top', label: 'Principal' },
    { id: 'users', label: 'Pessoas' },
    { id: 'posts', label: 'Posts' },
    { id: 'hashtags', label: 'Hashtags' }
  ]

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Search Bar */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 p-4 sticky top-0 z-10">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar no BlockSpace..."
            className="w-full bg-gray-800/50 text-white rounded-full pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50 transition-all"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Tabs */}
        {searchQuery && (
          <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {!searchQuery ? (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Pesquisas Recentes</h2>
                  <button className="text-sm text-purple-400 hover:text-purple-300">
                    Limpar tudo
                  </button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map(search => (
                    <div
                      key={search.id}
                      className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-4 hover:bg-gray-900/70 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {search.type === 'user' ? (
                          <>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                              {search.avatar}
                            </div>
                            <div>
                              <p className="font-semibold">{search.name}</p>
                              <p className="text-sm text-gray-400">@{search.username}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                              <Hash size={24} className="text-purple-400" />
                            </div>
                            <p className="font-semibold text-purple-400">{search.text}</p>
                          </>
                        )}
                      </div>
                      <button className="text-gray-500 hover:text-white p-2">
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Topics */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="text-purple-400" size={24} />
                Tendências para você
              </h2>
              <div className="space-y-2">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={topic.id}
                    onClick={() => setSearchQuery(`#${topic.tag}`)}
                    className="w-full bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-4 hover:bg-gray-900/70 transition-all text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-600">#{index + 1}</span>
                        <span className="text-lg font-bold text-purple-400">#{topic.tag}</span>
                      </div>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-semibold">
                        {topic.trend}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{topic.posts} posts</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested Users */}
            <div>
              <h2 className="text-xl font-bold mb-4">Pessoas para seguir</h2>
              <div className="space-y-3">
                {suggestedUsers.map(user => (
                  <div
                    key={user.id}
                    className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-4 hover:bg-gray-900/70 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl cursor-pointer"
                        onClick={() => navigate(`/profile/${user.username}`)}
                      >
                        {user.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span 
                            className="font-bold cursor-pointer hover:underline"
                            onClick={() => navigate(`/profile/${user.username}`)}
                          >
                            {user.name}
                          </span>
                          {user.verified && (
                            <svg className="w-4 h-4 text-blue-500 fill-blue-500" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-1">@{user.username}</p>
                        <p className="text-sm text-gray-400 mb-2">{user.bio}</p>
                        <p className="text-xs text-gray-500">{formatNumber(user.followers)} seguidores</p>
                      </div>
                      <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 flex-shrink-0">
                        <UserPlus size={16} />
                        Seguir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <SearchIcon size={64} className="mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-bold mb-2">Buscando por "{searchQuery}"</h3>
            <p className="text-gray-500">Os resultados aparecerão aqui</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
