import React, { useState } from 'react'
import { CheckCircle, AlertTriangle, X, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

// Componente para adicionar verificação a usuários
export const VerifyUserPanel = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [verifiedUsers, setVerifiedUsers] = useState([
    { id: 2, name: 'Maria Silva', username: 'maria_dev', avatar: '👩‍💻', verifiedAt: '2024-01-15' },
    { id: 3, name: 'João Santos', username: 'joao_design', avatar: '🎨', verifiedAt: '2024-02-20' },
    { id: 4, name: 'Ana Costa', username: 'ana_tech', avatar: '🚀', verifiedAt: '2024-03-10' }
  ])

  const addVerification = () => {
    if (searchQuery.trim()) {
      alert(`Verificação adicionada para: ${searchQuery}`)
      setSearchQuery('')
    }
  }

  const removeVerification = (userId) => {
    if (confirm('Remover verificação deste usuário?')) {
      setVerifiedUsers(verifiedUsers.filter(u => u.id !== userId))
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CheckCircle className="text-blue-500" size={24} />
          Gerenciar Verificações
        </h3>
        
        {/* Add Verification */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Adicionar Verificação</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Email ou @usuario"
              className="flex-1 bg-gray-800/50 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700/50"
            />
            <button
              onClick={addVerification}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <CheckCircle size={18} />
              Verificar
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            O usuário receberá o selo azul de verificado ✓
          </p>
        </div>

        {/* Verified Users List */}
        <div>
          <h4 className="font-semibold mb-3">Usuários Verificados ({verifiedUsers.length})</h4>
          <div className="space-y-2">
            {verifiedUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl">
                    {user.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{user.name}</p>
                      <CheckCircle size={16} className="text-blue-500 fill-blue-500" />
                    </div>
                    <p className="text-sm text-gray-400">@{user.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    Verificado em {new Date(user.verifiedAt).toLocaleDateString('pt-BR')}
                  </span>
                  <button
                    onClick={() => removeVerification(user.id)}
                    className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-blue-300 mb-1">Sobre Verificações</p>
            <p className="text-sm text-blue-200/80">
              O selo de verificado indica que a conta é autêntica e pertence a uma figura pública, 
              celebridade, marca global ou organização verificada.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente para gerenciar avisos no topo do site
export const SiteAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      type: 'info',
      title: 'Manutenção Programada',
      message: 'O sistema passará por manutenção amanhã às 02h',
      active: true,
      createdAt: '2025-11-15'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Nova Política de Privacidade',
      message: 'Atualizamos nossa política de privacidade. Confira as mudanças.',
      active: false,
      createdAt: '2025-11-10'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: 'info',
    title: '',
    message: ''
  })

  const typeColors = {
    info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', icon: '💡' },
    warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: '⚠️' },
    success: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', icon: '✅' },
    error: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', icon: '🚨' }
  }

  const createAnnouncement = () => {
    if (formData.title.trim() && formData.message.trim()) {
      setAnnouncements([
        {
          id: Date.now(),
          ...formData,
          active: true,
          createdAt: new Date().toISOString().split('T')[0]
        },
        ...announcements
      ])
      setFormData({ type: 'info', title: '', message: '' })
      setShowForm(false)
    }
  }

  const toggleAnnouncement = (id) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, active: !a.active } : a
    ))
  }

  const deleteAnnouncement = (id) => {
    if (confirm('Deletar este aviso?')) {
      setAnnouncements(announcements.filter(a => a.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" size={24} />
            Avisos do Site
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? 'Cancelar' : 'Novo Aviso'}
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="bg-gray-800/30 rounded-xl p-4 mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Aviso</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-gray-800/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700/50"
              >
                <option value="info">💡 Informação</option>
                <option value="warning">⚠️ Aviso</option>
                <option value="success">✅ Sucesso</option>
                <option value="error">🚨 Erro/Urgente</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Manutenção Programada"
                className="w-full bg-gray-800/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mensagem</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Descreva o aviso..."
                rows="3"
                className="w-full bg-gray-800/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700/50 resize-none"
              />
            </div>
            <button
              onClick={createAnnouncement}
              className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-semibold transition-all"
            >
              Criar Aviso
            </button>
          </div>
        )}

        {/* Announcements List */}
        <div className="space-y-3">
          {announcements.map(announcement => {
            const colors = typeColors[announcement.type]
            return (
              <div
                key={announcement.id}
                className={`${colors.bg} border ${colors.border} rounded-xl p-4`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{colors.icon}</span>
                    <div>
                      <h4 className={`font-bold ${colors.text}`}>{announcement.title}</h4>
                      <p className="text-sm text-gray-400">
                        Criado em {new Date(announcement.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAnnouncement(announcement.id)}
                      className={`p-2 rounded-lg transition-all ${
                        announcement.active
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-gray-700/50 text-gray-500 hover:bg-gray-700'
                      }`}
                      title={announcement.active ? 'Desativar' : 'Ativar'}
                    >
                      {announcement.active ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    <button
                      onClick={() => deleteAnnouncement(announcement.id)}
                      className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-white text-sm">{announcement.message}</p>
                {announcement.active && (
                  <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Ativo e visível no topo do site
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Preview */}
      {announcements.filter(a => a.active).length > 0 && (
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
          <h4 className="font-semibold mb-3">Preview (como aparece no site):</h4>
          {announcements.filter(a => a.active).map(announcement => {
            const colors = typeColors[announcement.type]
            return (
              <div key={announcement.id} className={`${colors.bg} border ${colors.border} rounded-lg p-3 mb-2`}>
                <div className="flex items-center gap-2">
                  <span>{colors.icon}</span>
                  <p className={`font-semibold ${colors.text} flex-1`}>{announcement.title}</p>
                  <button className="text-gray-500 hover:text-white">
                    <X size={16} />
                  </button>
                </div>
                <p className="text-sm text-white/80 mt-1 ml-7">{announcement.message}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
    }
