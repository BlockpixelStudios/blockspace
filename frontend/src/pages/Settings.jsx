import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Lock, Bell, Shield, Palette, Globe, LogOut, Trash2, Camera } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Settings = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const [activeSection, setActiveSection] = useState('account')
  const [profileData, setProfileData] = useState({
    name: user?.user_metadata?.name || '',
    username: user?.user_metadata?.username || '',
    bio: '',
    location: '',
    website: ''
  })

  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    messages: true,
    email: false
  })

  const [privacy, setPrivacy] = useState({
    privateAccount: false,
    showActivity: true,
    allowMessages: true
  })

  const handleLogout = async () => {
    if (confirm('Tem certeza que deseja sair?')) {
      await signOut()
      navigate('/login')
    }
  }

  const handleDeleteAccount = () => {
    if (confirm('⚠️ ATENÇÃO: Esta ação é irreversível! Tem certeza que deseja deletar sua conta?')) {
      // Implementar lógica de exclusão
      alert('Funcionalidade em desenvolvimento')
    }
  }

  const sections = [
    { id: 'account', name: 'Conta', icon: User },
    { id: 'security', name: 'Segurança', icon: Lock },
    { id: 'notifications', name: 'Notificações', icon: Bell },
    { id: 'privacy', name: 'Privacidade', icon: Shield },
    { id: 'appearance', name: 'Aparência', icon: Palette },
    { id: 'language', name: 'Idioma', icon: Globe }
  ]

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
          <h1 className="text-xl font-bold">Configurações</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${
                      activeSection === section.id
                        ? 'bg-purple-600/20 text-purple-400 border-l-4 border-purple-500'
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{section.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
              
              {/* Account Section */}
              {activeSection === 'account' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Configurações da Conta</h2>
                  
                  {/* Avatar */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Foto de Perfil</label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl">
                        🎨
                      </div>
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all flex items-center gap-2">
                        <Camera size={18} />
                        Alterar Foto
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Nome de Usuário</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                        <input
                          type="text"
                          value={profileData.username}
                          onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        rows="4"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        placeholder="Conte um pouco sobre você..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Localização</label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="São Paulo, Brasil"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Website</label>
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="seusite.com"
                      />
                    </div>

                    <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition-all">
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              )}

              {/* Security Section */}
              {activeSection === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Segurança</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Senha Atual</label>
                      <input
                        type="password"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nova Senha</label>
                      <input
                        type="password"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Confirmar Nova Senha</label>
                      <input
                        type="password"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="••••••••"
                      />
                    </div>
                    <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition-all">
                      Alterar Senha
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Notificações</h2>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                        <div>
                          <p className="font-medium capitalize">{key === 'likes' ? 'Curtidas' : key === 'comments' ? 'Comentários' : key === 'follows' ? 'Novos Seguidores' : key === 'messages' ? 'Mensagens' : 'Email'}</p>
                          <p className="text-sm text-gray-400">Receber notificações</p>
                        </div>
                        <button
                          onClick={() => setNotifications({...notifications, [key]: !value})}
                          className={`relative w-12 h-6 rounded-full transition-all ${
                            value ? 'bg-purple-600' : 'bg-gray-700'
                          }`}
                        >
                          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-0'
                          }`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy Section */}
              {activeSection === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Privacidade</h2>
                  <div className="space-y-4">
                    {Object.entries(privacy).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                        <div>
                          <p className="font-medium">
                            {key === 'privateAccount' ? 'Conta Privada' : 
                             key === 'showActivity' ? 'Mostrar Atividade' : 
                             'Permitir Mensagens'}
                          </p>
                          <p className="text-sm text-gray-400">
                            {key === 'privateAccount' ? 'Apenas seguidores aprovados podem ver seus posts' :
                             key === 'showActivity' ? 'Outros podem ver quando você está online' :
                             'Qualquer pessoa pode te enviar mensagens'}
                          </p>
                        </div>
                        <button
                          onClick={() => setPrivacy({...privacy, [key]: !value})}
                          className={`relative w-12 h-6 rounded-full transition-all ${
                            value ? 'bg-purple-600' : 'bg-gray-700'
                          }`}
                        >
                          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-0'
                          }`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appearance Section */}
              {activeSection === 'appearance' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Aparência</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <p className="font-medium mb-2">Tema</p>
                      <div className="grid grid-cols-3 gap-3">
                        <button className="p-4 bg-black border-2 border-purple-500 rounded-lg">
                          <div className="w-full h-20 bg-gradient-to-br from-gray-900 to-black rounded mb-2"></div>
                          <p className="text-sm font-medium">Escuro</p>
                        </button>
                        <button className="p-4 bg-gray-800 border-2 border-gray-700 rounded-lg opacity-50">
                          <div className="w-full h-20 bg-white rounded mb-2"></div>
                          <p className="text-sm font-medium">Claro</p>
                          <p className="text-xs text-gray-500">Em breve</p>
                        </button>
                        <button className="p-4 bg-gray-800 border-2 border-gray-700 rounded-lg opacity-50">
                          <div className="w-full h-20 bg-gradient-to-br from-gray-600 to-gray-400 rounded mb-2"></div>
                          <p className="text-sm font-medium">Auto</p>
                          <p className="text-xs text-gray-500">Em breve</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Language Section */}
              {activeSection === 'language' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Idioma</h2>
                  <select className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Português (Brasil)</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </div>
              )}
            </div>

            {/* Danger Zone */}
            <div className="mt-6 bg-red-900/20 border border-red-500/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-4">Zona de Perigo</h3>
              <div className="space-y-3">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 py-3 rounded-lg font-semibold transition-all"
                >
                  <LogOut size={18} />
                  Sair da Conta
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition-all"
                >
                  <Trash2 size={18} />
                  Deletar Conta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
