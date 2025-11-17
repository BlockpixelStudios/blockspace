import express from 'express'
import { authenticateToken } from '../middleware/auth.js'
import { supabase } from '../config/supabase.js'

const router = express.Router()

// Listar conversas
router.get('/conversations', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('conversation_participants')
      .select('*, conversations(*)')
      .eq('user_id', req.user.id)
    
    if (error) throw error
    res.json({ conversations: data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Enviar mensagem
router.post('/send', authenticateToken, async (req, res) => {
  try {
    const { conversation_id, content } = req.body
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        conversation_id,
        sender_id: req.user.id,
        content
      }])
      .select()
    
    if (error) throw error
    res.json({ success: true, message: data[0] })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
