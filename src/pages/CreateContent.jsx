import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Image as ImageIcon, Smile, MapPin, Users, Eye, EyeOff, Sparkles } from 'lucide-react'

const CreateContent = () => {
  const navigate = useNavigate()
  const [contentType, setContentType] = useState('post') // 'post' or 'story'
  const [content, setContent] = useState('')
  const [privacy, setPrivacy] = useState('public') // 'public', 'followers', 'private'
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setSelectedImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handlePost = () => {
    if (content.trim() || selectedImage) {
      // Aqui você faria a chamada à API
      alert(`${contentType === 'post' ? 'Post' : 'Story'} criado com sucesso!`)
      navigate('/feed')
    }
  }

  const handleClose = () => {
    if (content.trim() || selectedImage) {
      if (confirm('Descartar alterações?')) {
        navigate(-1)
      }
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all"
          >
            <X size={24} />
          </button>
          <h1 className="text-xl font-bold">
            {contentType === 'post' ? 'Criar Post' : 'Criar Story'}
          </h1>
          <button
            onClick={handlePost}
            disabled={!content.trim() && !selectedImage}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 px-6 py-2 rounded-full font-semibold transition-all"
          >
            {contentType === 'post' ? 'Publicar' : 'Compartilhar'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto">
          {/* Type Selector */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setContentType('post')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                contentType === 'post'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800'
              }`}
            >
              📝 Post
            </button>
            <button
              onClick={() => setContentType('story')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                contentType === 'story'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800'
              }`}
            >
              ✨ Story
            </button>
          </div>

          {/* Content Area */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 mb-4">
            <div className="flex gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl flex-shrink-0">
                🎨
              </div>
              <div className="flex-1">
                <p className="font-bold">Você</p>
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                  className="bg-gray-800/50 text-sm text-gray-400 rounded-lg px-3 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50"
                >
                  <option value="public">🌍 Público</option>
                  <option value="followers">👥 Seguidores</option>
                  <option value="private">🔒 Privado</option>
                </select>
              </div>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={contentType === 'post' ? 'O que está acontecendo?' : 'Compartilhe um momento...'}
              className="w-full bg-transparent text-white text-lg resize-none focus:outline-none min-h-[200px] placeholder-gray-500"
              autoFocus
            />

            {/* Image Preview */}
            {selectedImage && (
              <div className="relative mt-4 rounded-xl overflow-hidden">
                <img src={selectedImage} alt="Preview" className="w-full rounded-xl" />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 p-2 bg-black/70 hover:bg-black rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Story Duration (only for stories) */}
          {contentType === 'story' && (
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye size={20} className="text-purple-400" />
                  <span className="font-semibold">Duração do Story</span>
                </div>
                <span className="text-gray-400 text-sm">Desaparece em 24h</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-4">
            <p className="text-sm font-semibold mb-3 text-gray-400">Adicionar ao {contentType === 'post' ? 'post' : 'story'}</p>
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg cursor-pointer transition-all">
                <ImageIcon size={20} className="text-blue-400" />
                <span className="text-sm font-medium">Foto/Vídeo</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-all">
                <Smile size={20} className="text-yellow-400" />
                <span className="text-sm font-medium">Emoji</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-all">
                <MapPin size={20} className="text-red-400" />
                <span className="text-sm font-medium">Localização</span>
              </button>
              {contentType === 'post' && (
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-all">
                  <Users size={20} className="text-green-400" />
                  <span className="text-sm font-medium">Marcar</span>
                </button>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-purple-300 mb-1">Dica:</p>
                <p className="text-sm text-purple-200/80">
                  {contentType === 'post' 
                    ? 'Posts podem conter texto, imagens e vídeos. Use hashtags para alcançar mais pessoas!'
                    : 'Stories desaparecem em 24 horas. Perfeito para compartilhar momentos do dia a dia!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateContent
