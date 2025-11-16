import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings, MoreVertical, MapPin, Link as LinkIcon, Calendar, UserPlus, UserCheck, MessageCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
  const { username } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  // Mock data - substituir por dados reais da API
  const [profileData, setProfileData] = useState({
    id: 2,
    username: 'maria_dev',
    name: 'Maria Silva',
    avatar: '👩‍💻',
    bio: 'Full Stack Developer | React & Node.js enthusiast 🚀\nCriando coisas incríveis na web ✨',
    location: 'São Paulo, Brasil',
    website: 'mariadev.com',
    joinedDate: 'Janeiro 2024',
    verified: true,
    followers: 3420,
    following: 892,
    isFollowing: false
  })

  const [activeTab, setActiveTab] = useState('posts')
  
  const [userPosts] = useState([
    {
      id: 1,
      content: 'Acabei de fazer o deploy do meu novo projeto no Vercel! A velocidade de desenvolvimento com Next.js é impressionante 🚀💙',
      likes: 342,
      comments: 28,
      shares: 15,
      timestamp: '2h'
    },
    {
      id: 2,
      content: 'Alguém mais viciado em café enquanto programa? ☕💻',
      likes: 156,
      comments: 45,
      shares: 8,
      timestamp: '1d'
    },
    {
      id: 3,
      content: 'Terminei o curso de TypeScript! Agora é hora de colocar em prática 🎯',
      likes: 289,
      comments: 32,
      shares: 12,
      timestamp: '3d'
    }
  ])

  const isOwnProfile = user?.user_metadata?.username === username

  const toggleFollow = () => {
    setProfileData(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1
    }))
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-xl">{profileData.name}</h1>
            <p className="text-sm text-gray-500">{userPosts.length} posts</p>
          </div>
          <button className="text-gray-400 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 h-48"></div>

      {/* Profile Info */}
      <div className="bg-gray-900/50 backdrop-blur-xl px-4 pb-4">
        {/* Avatar and Actions */}
        <div className="flex justify-between items-start -mt-16 mb-4">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-6xl border-4 border-gray-900 shadow-2xl">
            {profileData.avatar}
          </div>
          <div className="flex gap-2 mt-16">
            {isOwnProfile ? (
              <button
                onClick={() => navigate('/settings')}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-full font-semibold transition-all flex items-center gap-2"
              >
                <Settings size={18} />
                Editar Perfil
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/messages')}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-all"
                >
                  <MessageCircle size={20} />
                </button>
                <button
                  onClick={toggleFollow}
                  className={`px-6 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
                    profileData.isFollowing
                      ? 'bg-gray-800 hover:bg-red-600 text-white'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {profileData.isFollowing ? (
                    <>
                      <UserCheck size={18} />
                      Seguindo
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Seguir
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold">{profileData.name}</h2>
            {profileData.verified && (
              <svg className="w-6 h-6 text-blue-500 fill-blue-500" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <p className="text-gray-500 mb-3">@{profileData.username}</p>
          <p className="text-white whitespace-pre-wrap mb-4">{profileData.bio}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
            {profileData.location && (
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                {profileData.location}
              </div>
            )}
            {profileData.website && (
              <a 
                href={`https://${profileData.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-400 hover:underline"
              >
                <LinkIcon size={16} />
                {profileData.website}
              </a>
            )}
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              Entrou em {profileData.joinedDate}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <button className="hover:underline">
              <span className="font-bold text-white">{formatNumber(profileData.following)}</span>
              <span className="text-gray-500 ml-1">Seguindo</span>
            </button>
            <button className="hover:underline">
              <span className="font-bold text-white">{formatNumber(profileData.followers)}</span>
              <span className="text-gray-500 ml-1">Seguidores</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800/50 flex">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-4 font-semibold transition-colors relative ${
            activeTab === 'posts' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          Posts
          {activeTab === 'posts' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500 rounded-full"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('replies')}
          className={`flex-1 py-4 font-semibold transition-colors relative ${
            activeTab === 'replies' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          Respostas
          {activeTab === 'replies' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500 rounded-full"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`flex-1 py-4 font-semibold transition-colors relative ${
            activeTab === 'media' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          Mídia
          {activeTab === 'media' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500 rounded-full"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('likes')}
          className={`flex-1 py-4 font-semibold transition-colors relative ${
            activeTab === 'likes' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          Curtidas
          {activeTab === 'likes' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500 rounded-full"></div>
          )}
        </button>
      </div>

      {/* Posts */}
      {activeTab === 'posts' && (
        <div>
          {userPosts.map(post => (
            <div key={post.id} className="bg-gray-900/30 backdrop-blur-xl border-b border-gray-800/50 p-4 hover:bg-gray-900/50 transition-all">
              <p className="text-white whitespace-pre-wrap mb-3">{post.content}</p>
              <div className="flex gap-8 text-gray-500 text-sm">
                <span>{post.likes} curtidas</span>
                <span>{post.comments} comentários</span>
                <span>{post.shares} compartilhamentos</span>
                <span className="ml-auto">{post.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab !== 'posts' && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold mb-2">Nada aqui ainda</h3>
          <p className="text-gray-500">Quando houver conteúdo, aparecerá aqui.</p>
        </div>
      )}
    </div>
  )
}

export default Profile
