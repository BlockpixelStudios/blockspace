import React, { useState, useEffect } from 'react'
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical, Plus, Image as ImageIcon } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import StoriesViewer from '../components/StoriesViewer'

const Feed = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        id: 2,
        name: 'Maria Silva',
        username: 'maria_dev',
        avatar: '👩‍💻',
        verified: true
      },
      content: 'Acabei de fazer o deploy do meu novo projeto no Vercel! A velocidade de desenvolvimento com Next.js é impressionante 🚀💙',
      image: null,
      likes: 342,
      comments: 28,
      shares: 15,
      liked: false,
      bookmarked: false,
      timestamp: '2h'
    },
    {
      id: 2,
      user: {
        id: 3,
        name: 'João Santos',
        username: 'joao_design',
        avatar: '🎨',
        verified: true
      },
      content: 'Novo design system pronto! Trabalhei com gradientes vibrantes e micro-interações. O que acharam? 🎨✨\n\n#DesignSystem #UIUX',
      image: null,
      likes: 189,
      comments: 42,
      shares: 23,
      liked: true,
      bookmarked: true,
      timestamp: '4h'
    },
    {
      id: 3,
      user: {
        id: 4,
        name: 'Ana Costa',
        username: 'ana_tech',
        avatar: '🚀',
        verified: true
      },
      content: 'A conferência de IA hoje foi incrível! Aprendi sobre os novos modelos de linguagem e suas aplicações práticas. O futuro é agora! 🤖💡',
      image: null,
      likes: 567,
      comments: 89,
      shares: 34,
      liked: false,
      bookmarked: false,
      timestamp: '7h'
    }
  ])

  const [stories, setStories] = useState([
    { id: 1, user: { username: 'você', avatar: '🎨' }, viewed: false, hasStory: false },
    { id: 2, user: { username: 'maria_dev', avatar: '👩‍💻' }, viewed: false, hasStory: true },
    { id: 3, user: { username: 'joao_design', avatar: '🎨' }, viewed: true, hasStory: true },
    { id: 4, user: { username: 'ana_tech', avatar: '🚀' }, viewed: false, hasStory: true },
    { id: 5, user: { username: 'pedro_code', avatar: '💻' }, viewed: false, hasStory: true }
  ])

  const [newPost, setNewPost] = useState('')
  const [showStoryViewer, setShowStoryViewer] = useState(false)
  const [activeStoryIndex, setActiveStoryIndex] = useState(0)

  const toggleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const toggleBookmark = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked }
        : post
    ))
  }

  const createPost = () => {
    if (newPost.trim()) {
      setPosts([{
        id: Date.now(),
        user: {
          id: user.id,
          name: user.user_metadata?.name || 'Você',
          username: user.user_metadata?.username || 'voce',
          avatar: '🎨',
          verified: false
        },
        content: newPost,
        image: null,
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        bookmarked: false,
        timestamp: 'Agora'
      }, ...posts])
      setNewPost('')
    }
  }

  const openStory = (index) => {
    setActiveStoryIndex(index)
    setShowStoryViewer(true)
  }

  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Stories */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-b border-gray-800/50 p-4 sticky top-0 z-10 backdrop-blur-xl">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {/* Add Story */}
          <button 
            onClick={() => navigate('/create-story')}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-[2px] group-hover:scale-110 transition-transform duration-200">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-2xl">
                  🎨
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-2 border-gray-900 shadow-lg">
                <Plus size={14} className="text-white" />
              </div>
            </div>
            <span className="text-xs text-gray-400 font-medium">Seu Story</span>
          </button>

          {/* Stories List */}
          {stories.filter(s => s.hasStory).map((story, index) => (
            <button
              key={story.id}
              onClick={() => openStory(index)}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              <div className={`w-16 h-16 rounded-full p-[2px] group-hover:scale-110 transition-transform duration-200 ${
                story.viewed 
                  ? 'bg-gradient-to-br from-gray-600 to-gray-700' 
                  : 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500'
              }`}>
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-2xl">
                  {story.user.avatar}
                </div>
              </div>
              <span className="text-xs text-gray-400 font-medium truncate max-w-[64px]">
                {story.user.username}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800/50 p-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl flex-shrink-0 cursor-pointer hover:scale-105 transition-transform">
            🎨
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="O que está acontecendo?"
              className="w-full bg-gray-800/50 text-white rounded-2xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50 placeholder-gray-500 transition-all"
              rows="3"
            />
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-1">
                <button className="text-blue-400 hover:text-blue-300 p-2.5 hover:bg-blue-500/10 rounded-full transition-all">
                  <ImageIcon size={20} />
                </button>
              </div>
              <button
                onClick={createPost}
                disabled={!newPost.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 text-white px-8 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-purple-500/50 disabled:shadow-none"
              >
                Postar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div>
        {posts.map(post => (
          <div key={post.id} className="bg-gray-900/30 backdrop-blur-xl border-b border-gray-800/50 p-4 hover:bg-gray-900/50 transition-all duration-200">
            <div className="flex gap-3">
              <div 
                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => navigate(`/profile/${post.user.username}`)}
              >
                {post.user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span 
                      className="font-bold text-white hover:underline cursor-pointer"
                      onClick={() => navigate(`/profile/${post.user.username}`)}
                    >
                      {post.user.name}
                    </span>
                    {post.user.verified && (
                      <svg className="w-4 h-4 text-blue-500 fill-blue-500" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span className="text-gray-500 text-sm">@{post.user.username}</span>
                    <span className="text-gray-600">·</span>
                    <span className="text-gray-500 text-sm">{post.timestamp}</span>
                  </div>
                  <button className="text-gray-500 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all">
                    <MoreVertical size={18} />
                  </button>
                </div>
                <p className="text-white leading-relaxed break-words whitespace-pre-wrap mb-4">
                  {post.content}
                </p>
                <div className="flex items-center gap-8 text-gray-500">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-2 hover:text-pink-500 transition-all group"
                  >
                    <div className="p-2 rounded-full group-hover:bg-pink-500/10 transition-all">
                      <Heart 
                        size={18} 
                        className={post.liked ? 'fill-pink-500 text-pink-500' : 'group-hover:scale-110 transition-transform'} 
                      />
                    </div>
                    <span className="text-sm font-medium">{formatNumber(post.likes)}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-500 transition-all group">
                    <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-all">
                      <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-500 transition-all group">
                    <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-all">
                      <Share2 size={18} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-sm font-medium">{post.shares}</span>
                  </button>
                  <button 
                    onClick={() => toggleBookmark(post.id)}
                    className="flex items-center gap-2 hover:text-yellow-500 transition-all ml-auto group"
                  >
                    <div className="p-2 rounded-full group-hover:bg-yellow-500/10 transition-all">
                      <Bookmark 
                        size={18} 
                        className={`${post.bookmarked ? 'fill-yellow-500 text-yellow-500' : ''} group-hover:scale-110 transition-transform`} 
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Story Viewer */}
      {showStoryViewer && (
        <StoriesViewer
          stories={stories.filter(s => s.hasStory)}
          initialIndex={activeStoryIndex}
          onClose={() => setShowStoryViewer(false)}
        />
      )}
    </div>
  )
}

export default Feed
