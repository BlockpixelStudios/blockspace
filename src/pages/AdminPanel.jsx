import React, { useState } from 'react'
import { Shield, Users, FileText, AlertTriangle, TrendingUp, Ban, Trash2, Check, X, UserPlus, Activity } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminPanel = () => {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')

  const [stats] = useState({
    totalUsers: 10234,
    totalPosts: 125890,
    totalReports: 12,
    activeModerators: 5
  })

  const [moderators] = useState([
    { id: 1, name: 'Você', username: 'admin', avatar: '👑', role: 'admin', addedAt: '2024-01-01' },
    { id: 2, name: 'Maria Silva', username: 'maria_dev', avatar: '👩‍💻', role: 'moderator', addedAt: '2024-02-15' },
    { id: 3, name: 'João Santos', username: 'joao_design', avatar: '🎨', role: 'moderator', addedAt: '2024-03-10' }
  ])

  const [reports] = useState([
    { 
      id: 1, 
      type: 'post', 
      reporter: { name: 'Pedro Lima', username: 'pedro_code', avatar: '💻' },
      reason: 'Spam',
      description: 'Post contém spam e links suspeitos',
      status: 'pending',
      createdAt: '2h'
    },
    {
      id: 2,
      type: 'user',
      reporter: { name: 'Ana Costa', username: 'ana_tech', avatar: '🚀' },
      reason: 'Assédio',
      description: 'Usuário enviando mensagens ofensivas',
      status: 'pending',
      createdAt: '5h'
    },
    {
      id: 3,
      type: 'post',
      reporter: { name: 'Julia Oliveira', username: 'julia_data', avatar: '📊' },
      reason: 'Conteúdo Inadequado',
      description: 'Post com conteúdo inadequado',
      status: 'resolved',
      createdAt: '1d'
    }
  ])

  const [recentActivity] = useState([
    { id: 1, moderator: 'Você', action: 'Deletou um post', target: 'Post #12345', time: '10min' },
    { id: 2, moderator: 'Maria Silva', action: 'Baniu usuário', target: '@user123', time: '1h' },
    { id: 3, moderator: 'João Santos', action: 'Resolveu denúncia', target: 'Report #456', time: '3h' }
  ])

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'moderators', label: 'Moderadores', icon: Shield },
    { id: 'reports', label: 'Denúncias', icon: AlertTriangle, badge: reports.filter(r => r.status === 'pending').length },
    { id: 'activity', label: 'Atividade', icon: Activity }
  ]

  if (!isAdmin) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Shield size={64} className="mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-2">Acesso Negado</h2>
          <p className="text-gray-400 mb-4">Você não tem permissão para acessar esta página</p>
          <button
            onClick={() => navigate('/feed')}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all"
          >
            Voltar ao Feed
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-purple-500/20 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="text-purple-400" size={32} />
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          </div>
          <p className="text-purple-300">Bem-vindo, {user?.user_metadata?.name || 'Admin'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-2 relative ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                {tab.label}
                {tab.badge > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-2xl border border-purple-500/20">
                <Users className="text-purple-400 mb-3" size={32} />
                <h3 className="text-3xl font-bold mb-1">{stats.totalUsers.toLocaleString()}</h3>
                <p className="text-gray-400">Usuários Totais</p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 p-6 rounded-2xl border border-blue-500/20">
                <FileText className="text-blue-400 mb-3" size={32} />
                <h3 className="text-3xl font-bold mb-1">{stats.totalPosts.toLocaleString()}</h3>
                <p className="text-gray-400">Posts Publicados</p>
              </div>
              <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 p-6 rounded-2xl border border-red-500/20">
                <AlertTriangle className="text-red-400 mb-3" size={32} />
                <h3 className="text-3xl font-bold mb-1">{stats.totalReports}</h3>
                <p className="text-gray-400">Denúncias Pendentes</p>
              </div>
              <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 p-6 rounded-2xl border border-green-500/20">
                <Shield className="text-green-400 mb-3" size={32} />
                <h3 className="text-3xl font-bold mb-1">{stats.activeModerators}</h3>
                <p className="text-gray-400">Moderadores Ativos</p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Atividade Recente</h3>
              <div className="space-y-3">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div>
                      <p className="font-medium">{activity.moderator}</p>
                      <p className="text-sm text-gray-400">{activity.action} • {activity.target}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Moderators */}
        {activeTab === 'moderators' && (
          <div>
            {isAdmin && (
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Adicionar Moderador</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Email ou @usuario"
                    className="flex-1 bg-gray-800/50 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700/50"
                  />
                  <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2">
                    <UserPlus size={18} />
                    Adicionar
                  </button>
                </div>
              </div>
            )}

            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Usuário</th>
                    <th className="text-left p-4 font-semibold">Cargo</th>
                    <th className="text-left p-4 font-semibold">Adicionado em</th>
                    {isAdmin && <th className="text-left p-4 font-semibold">Ações</th>}
                  </tr>
                </thead>
                <tbody>
                  {moderators.map(mod => (
                    <tr key={mod.id} className="border-t border-gray-800/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl">
                            {mod.avatar}
                          </div>
                          <div>
                            <p className="font-semibold">{mod.name}</p>
                            <p className="text-sm text-gray-400">@{mod.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          mod.role === 'admin'
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {mod.role === 'admin' ? 'Administrador' : 'Moderador'}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">
                        {new Date(mod.addedAt).toLocaleDateString('pt-BR')}
                      </td>
                      {isAdmin && mod.role !== 'admin' && (
                        <td className="p-4">
                          <button className="text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            {reports.map(report => (
              <div key={report.id} className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                      {report.reporter.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Denúncia de {report.type === 'post' ? 'Post' : 'Usuário'}</h3>
                      <p className="text-gray-400 text-sm">Por @{report.reporter.username} • {report.createdAt}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    report.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : report.status === 'resolved'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {report.status === 'pending' ? 'Pendente' : report.status === 'resolved' ? 'Resolvida' : 'Descartada'}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-white mb-2"><strong>Motivo:</strong> {report.reason}</p>
                  <p className="text-gray-400">{report.description}</p>
                </div>
                {report.status === 'pending' && (
                  <div className="flex gap-3">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                      <Check size={18} />
                      Resolver
                    </button>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                      <Ban size={18} />
                      Banir Usuário
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                      <X size={18} />
                      Descartar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Activity */}
        {activeTab === 'activity' && (
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Log de Atividades</h3>
            <div className="space-y-3">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.moderator} • {activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.target}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
