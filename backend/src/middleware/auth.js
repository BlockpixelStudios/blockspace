import jwt from 'jsonwebtoken'
import { supabase } from '../config/supabase.js'

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return res.status(403).json({ error: 'Token inválido' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' })
  }
}

export const checkModerator = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('moderators')
      .select('*')
      .eq('user_id', req.user.id)
      .single()

    if (error || !data) {
      return res.status(403).json({ error: 'Acesso negado - Apenas moderadores' })
    }

    req.moderator = data
    next()
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao verificar permissões' })
  }
}

export const checkAdmin = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('moderators')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('role', 'admin')
      .single()

    if (error || !data) {
      return res.status(403).json({ error: 'Acesso negado - Apenas administradores' })
    }

    req.admin = data
    next()
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao verificar permissões' })
  }
      }
