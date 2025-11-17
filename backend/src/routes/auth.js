import express from 'express'
import { supabase } from '../config/supabase.js'

const router = express.Router()

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    res.json({ success: true, data })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Registro
router.post('/register', async (req, res) => {
  try {
    const { email, password, username, name } = req.body
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, name }
      }
    })
    
    if (error) throw error
    res.json({ success: true, data })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
