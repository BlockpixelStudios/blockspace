import express from 'express'
import { authenticateToken } from '../middleware/auth.js'
import { supabase } from '../config/supabase.js'

const router = express.Router()

// Listar posts
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*, users(username, name, avatar, verified)')
      .order('created_at', { ascending: false })
      .limit(50)
    
    if (error) throw error
    res.json({ posts: data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Criar post
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content, image_url } = req.body
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        user_id: req.user.id,
        content,
        image_url
      }])
      .select()
    
    if (error) throw error
    res.json({ success: true, post: data[0] })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Curtir post
router.post('/:postId/like', authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params
    const { data, error } = await supabase
      .from('likes')
      .insert([{
        user_id: req.user.id,
        post_id: postId
      }])
    
    if (error) throw error
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
