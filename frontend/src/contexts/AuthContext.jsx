import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isModerator, setIsModerator] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        checkModeratorStatus(session.user.id)
      }
      setLoading(false)
    })

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        checkModeratorStatus(session.user.id)
      } else {
        setIsModerator(false)
        setIsAdmin(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkModeratorStatus = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('moderators')
        .select('role')
        .eq('user_id', userId)
        .single()

      if (data) {
        setIsModerator(true)
        setIsAdmin(data.role === 'admin')
      } else {
        setIsModerator(false)
        setIsAdmin(false)
      }
    } catch (err) {
      console.error('Erro ao verificar status de moderador:', err)
      setIsModerator(false)
      setIsAdmin(false)
    }
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signUp = async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    })
    return { data, error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsModerator(false)
    setIsAdmin(false)
  }

  const value = {
    user,
    loading,
    isModerator,
    isAdmin,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
    }
