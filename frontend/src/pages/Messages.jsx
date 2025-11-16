import React, { useState } from 'react'
import { Search, MoreVertical, Send, Smile, Image, Paperclip, Phone, Video, X } from 'lucide-react'

const Messages = () => {
  const [chats] = useState([
    {
      id: 1,
      type: 'private',
      user: {
        id: 2,
        name: 'Maria Silva',
        username: 'maria_dev',
        avatar: '👩‍💻',
        online: true
      },
      lastMessage: 'Viu meu último post sobre Next.js?',
      timestamp: '10:45',
      unread: 3,
      messages: [
        { id: 1, senderId: 2, content: 'Oi! Tudo bem?', timestamp: '10:30', read: true },
        { id: 2, senderId: 1, content: 'Oi Maria! Tudo ótimo e você?', timestamp: '10:32', read: true },
        { id: 3, senderId: 2, content: 'Muito bem! Trabalhando em um projeto novo', timestamp: '10:40', read: true },
        { id: 4, senderId: 2, content: 'Viu meu último post sobre Next.js?', timestamp: '10:45', read: false }
      ]
    },
    {
      id: 2,
      type: 'group',
      name: 'Dev Team 🚀',
      avatar: '💻',
      lastMessage: 'Pedro: Reunião confirmada para às 15h',
      timestamp: '09:15',
      unread: 8,
      members: [
        { id: 2, name: 'Maria Silva', avatar: '👩‍💻' },
        { id: 3, name: 'João Santos', avatar: '🎨' },
        { id: 5, name: 'Pedro Lima', avatar: '💻' }
      ],
      messages: [
        { id: 1, senderId: 3, senderName: 'João Santos', content: 'Bom dia, pessoal! 👋', timestamp: '08:00', read: true },
        { id: 2, senderId: 5, senderName: 'Pedro Lima', content: 'Bom dia! Vamos ter reunião hoje?', timestamp: '08:30', read: true },
        { id: 3, senderId: 2, senderName: 'Maria Silva', content: 'Sim! Às 15h pode ser?', timestamp: '08:45', read: true },
        { id: 4, senderId: 5, senderName: 'Pedro Lima', content: 'Reunião confirmada para às 15h', timestamp: '09:15', read: false }
      ]
    },
    {
      id: 3,
      type: 'private',
      user: {
        id: 4,
        name: 'Ana Costa',
        username: 'ana_tech',
        avatar: '🚀',
        online: false
      },
      lastMessage: 'Obrigada! 🎉',
      timestamp: 'Ontem',
      unread: 0,
      messages: [
        { id: 1, senderId: 4, content: 'E aí, como vai?', timestamp: 'Ontem 14:30', read: true },
        { id: 2, senderId: 1, content: 'Tudo bem! Adorei seu post sobre IA', timestamp: 'Ontem 14:35', read: true },
        { id: 3, senderId: 4, content: 'Obrigada! 🎉', timestamp: 'Ontem 14:40', read: true }
      ]
    }
  ])

  const [activeChat, setActiveChat] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const sendMessage = () => {
    if (newMessage.trim() && activeChat) {
      // Lógica de envio
      setNewMessage('')
    }
  }

  const filteredChats = chats.filter(chat => 
    searchQuery === '' || 
    (chat.type === 'private' 
      ? chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      : chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Chats List */}
      <div className={`${activeChat ? 'hidden md:flex' : 'flex'} w-full md:w-96 flex-col bg-gray-900/50 backdrop-blur-xl border-r border-gray-800/50`}>
        {/* Search */}
        <div className="p-4 border-b border-gray-800/50">
          <h2 className="text-2xl font-bold mb-4">Mensagens</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar conversas..."
              className="w-full bg-gray-800/50 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50 transition-all"
            />
          </div>
        </div>

        {/* Chats */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map(chat => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`w-full p-4 border-b border-gray-800/30 hover:bg-gray-800/30 transition-all ${
                activeChat?.id === chat.id ? 'bg-gray-800/50' : ''
              }`}
            >
              <div className="flex gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                    {chat.type === 'private' ? chat.user.avatar : chat.avatar}
                  </div>
                  {chat.type === 'private' && chat.user.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  )}
                  {chat.unread > 0 && (
                    <div className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center px-1.5 text-xs font-bold shadow-lg">
                      {chat.unread}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold truncate">
                      {chat.type === 'private' ? chat.user.name : chat.name}
                    </span>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{chat.timestamp}</span>
                  </div>
                  <p className={`text-sm truncate ${chat.unread > 0 ? 'text-white font-medium' : 'text-gray-400'}`}>
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {activeChat ? (
        <div className="flex-1 flex flex-col bg-gray-950/50 backdrop-blur-xl">
          {/* Chat Header */}
          <div className="p-4 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 flex items-center gap-3">
            <button
              onClick={() => setActiveChat(null)}
              className="md:hidden text-gray-400 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all"
            >
              <X size={20} />
            </button>
            
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                {activeChat.type === 'private' ? activeChat.user.avatar : activeChat.avatar}
              </div>
              {activeChat.type === 'private' && activeChat.user.online && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold truncate">
                {activeChat.type === 'private' ? activeChat.user.name : activeChat.name}
              </h3>
              {activeChat.type === 'group' ? (
                <p className="text-xs text-gray-500">{activeChat.members.length + 1} membros</p>
              ) : (
                <p className="text-xs text-gray-500">{activeChat.user.online ? 'Online' : 'Offline'}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all">
                <Phone size={20} />
              </button>
              <button className="text-gray-400 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all">
                <Video size={20} />
              </button>
              <button className="text-gray-400 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeChat.messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === 1 ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${msg.senderId === 1 ? 'order-2' : 'order-1'}`}>
                  {activeChat.type === 'group' && msg.senderId !== 1 && (
                    <p className="text-xs text-gray-500 mb-1 ml-3">{msg.senderName}</p>
                  )}
                  <div className={`px-4 py-2.5 rounded-2xl shadow-lg ${
                    msg.senderId === 1
                      ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-sm'
                      : 'bg-gray-800/80 backdrop-blur-xl text-white rounded-bl-sm'
                  }`}>
                    <p className="leading-relaxed">{msg.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-gray-900/80 backdrop-blur-xl border-t border-gray-800/50">
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all">
                <Image size={20} />
              </button>
              <button className="text-gray-400 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all">
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Digite uma mensagem..."
                className="flex-1 bg-gray-800/50 text-white rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50 transition-all"
              />
              <button className="text-gray-400 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all">
                <Smile size={20} />
              </button>
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 text-white p-3 rounded-full transition-all shadow-lg disabled:shadow-none"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-950/50">
          <div className="text-center text-gray-500">
            <MessageCircle size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl font-semibold">Selecione uma conversa</p>
            <p className="text-sm mt-2">Escolha uma conversa para começar a conversar</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages
