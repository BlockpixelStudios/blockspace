import express from 'express'
import { authenticateToken } from '../middleware/auth.js'
import { supabase } from '../config/supabase.js'

const router = express.Router()

// Buscar perfil
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single()
    
    if (error) throw error
    res.json({ user: data })
  } catch (error) {
    res.status(404).json({ error: 'Usuário não encontrado' })
  }
})

// Seguir usuário
router.post('/:userId/follow', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params
    const { data, error } = await supabase
      .from('follows')
      .insert([{
        follower_id: req.user.id,
        following_id: userId
      }])
    
    if (error) throw error
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
