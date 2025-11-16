import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Home, Search, PlusCircle, MessageCircle, User, Bell, Menu, X, Settings, HelpCircle, Shield, Bug } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isModerator, isAdmin, signOut } = useAuth()
  
  const [showMenu, setShowMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // Mock notifications
  const notifications = [
    { id: 1, type: 'like', user: 'Maria Silva', avatar: '👩‍💻', message: 'curtiu seu post', time: '5min', read: false },
    { id: 2, type: 'follow', user: 'João Santos', avatar: '🎨', message: 'começou a seguir você', time: '1h', read: false },
    { id: 3, type: 'comment', user: 'Ana Costa', avatar: '🚀', message: 'comentou: "Adorei!"', time: '2h', read: true },
    { id: 4, type: 'mention', user: 'Pedro Lima', avatar: '💻', message: 'mencionou você', time: '3h', read: true }
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  const navItems = [
    { path: '/feed', icon: Home, label: 'Feed' },
    { path: '/search', icon: Search, label: 'Buscar' },
    { path: '/create', icon: PlusCircle, label: 'Criar' },
    { path: '/messages', icon: MessageCircle, label: 'Mensagens' },
    { path: `/profile/${user?.user_metadata?.username || 'me'}`, icon: User, label: 'Perfil' }
  ]

  const isActive = (path) => location.pathname === path

  const handleCreateClick = () => {
    // Abrir modal de criar post/story
    navigate('/create')
  }

  const menuItems = [
    { icon: Bug, label: 'Console de Debug', action: () => console.log('Debug mode'), show: true },
    { icon: Settings, label: 'Configurações', action: () => navigate('/settings'), show: true },
    { icon: HelpCircle, label: 'Suporte', action: () => navigate('/suporte'), show: true },
    { 
      icon: Shield, 
      label: 'Painel de Monitoramento', 
      action: () => navigate('/admin'), 
      show: isModerator || isAdmin,
      special: true 
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => navigate('/feed')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl">
              🚀
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text hidden sm:inline">
              BlockSpace
            </span>
          </button>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications)
                  setShowMenu(false)
                }}
                className="relative p-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-all"
              >
                <Bell size={22} />
                {unreadCount > 0 && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {unreadCount}
                  </div>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 w-80 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                    <div className="p-4 border-b border-gray-800">
                      <h3 className="font-bold text-lg">Notificações</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notif => (
                        <button
                          key={notif.id}
                          className={`w-full p-4 flex gap-3 hover:bg-gray-800/50 transition-all border-b border-gray-800/50 ${
                            !notif.read ? 'bg-purple-500/5' : ''
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl flex-shrink-0">
                            {notif.avatar}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm">
                              <span className="font-semibold">{notif.user}</span>
                              {' '}{notif.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                          {!notif.read && (
                            <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                          )}
                        </button>
                      ))}
                    </div>
                    <button className="w-full p-3 text-center text-purple-400 hover:bg-gray-800/50 font-semibold text-sm transition-all">
                      Ver todas as notificações
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowMenu(!showMenu)
                  setShowNotifications(false)
                }}
                className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-all"
              >
                <Menu size={22} />
              </button>

              {/* Menu Dropdown */}
              {showMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowMenu(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                    <div className="p-4 border-b border-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                          🎨
                        </div>
                        <div className="flex-1">
                          <p className="font-bold">{user?.user_metadata?.name || 'Usuário'}</p>
                          <p className="text-sm text-gray-400">@{user?.user_metadata?.username || 'usuario'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      {menuItems.filter(item => item.show).map((item, index) => {
                        const Icon = item.icon
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              item.action()
                              setShowMenu(false)
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800/50 transition-all ${
                              item.special ? 'text-purple-400' : 'text-gray-300'
                            }`}
                          >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                            {item.special && (
                              <span className="ml-auto text-xs bg-purple-500/20 px-2 py-1 rounded-full">
                                {isAdmin ? 'Admin' : 'Mod'}
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>

                    <div className="border-t border-gray-800 py-2">
                      <button
                        onClick={async () => {
                          await signOut()
                          navigate('/login')
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all font-medium"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sair
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/50 fixed bottom-0 left-0 right-0 z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            
            return (
              <button
                key={item.path}
                onClick={() => item.path === '/create' ? handleCreateClick() : navigate(item.path)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  active 
                    ? 'text-purple-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className={`relative ${item.path === '/create' ? 'scale-110' : ''}`}>
                  <Icon 
                    size={24} 
                    className={item.path === '/create' ? 'text-purple-400' : ''}
                    fill={active && item.path !== '/create' ? 'currentColor' : 'none'}
                  />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Desktop Sidebar (Optional - pode adicionar depois) */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-gray-900/50 border-r border-gray-800/50 p-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active 
                    ? 'bg-purple-600/20 text-purple-400' 
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <Icon size={22} />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>
    </div>
  )
}

export default Layout
