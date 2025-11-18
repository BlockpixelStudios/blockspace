import express from 'express'
import { authenticateToken, checkAdmin, checkModerator } from '../middleware/auth.js'
import { supabase } from '../config/supabase.js'

const router = express.Router()

// ===== GERENCIAMENTO DE MODERADORES =====

// Adicionar moderador (apenas admin)
router.post('/moderators', authenticateToken, checkAdmin, async (req, res) => {
  try {
    const { user_id, role } = req.body

    const { data, error } = await supabase
      .from('moderators')
      .insert([{ 
        user_id, 
        role: role || 'moderator',
        added_by: req.user.id 
      }])
      .select()

    if (error) throw error

    res.json({ success: true, data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Remover moderador (apenas admin)
router.delete('/moderators/:userId', authenticateToken, checkAdmin, async (req, res) => {
  try {
    const { userId } = req.params

    const { error } = await supabase
      .from('moderators')
      .delete()
      .eq('user_id', userId)

    if (error) throw error

    res.json({ success: true, message: 'Moderador removido' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Listar todos os moderadores
router.get('/moderators', authenticateToken, checkModerator, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('moderators')
      .select(`
        *,
        user:users(id, username, name, avatar)
      `)

    if (error) throw error

    res.json({ moderators: data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ===== MODERAÇÃO DE CONTEÚDO =====

// Deletar post (moderador)
router.delete('/posts/:postId', authenticateToken, checkModerator, async (req, res) => {
  try {
    const { postId } = req.params

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)

    if (error) throw error

    // Log da ação
    await supabase.from('moderation_logs').insert([{
      moderator_id: req.user.id,
      action: 'delete_post',
      target_id: postId,
      target_type: 'post',
      reason: req.body.reason
    }])

    res.json({ success: true, message: 'Post deletado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Banir usuário (moderador)
router.post('/users/:userId/ban', authenticateToken, checkModerator, async (req, res) => {
  try {
    const { userId } = req.params
    const { reason, duration } = req.body

    const expiresAt = duration ? new Date(Date.now() + duration * 60 * 60 * 1000) : null

    const { data, error } = await supabase
      .from('banned_users')
      .insert([{
        user_id: userId,
        banned_by: req.user.id,
        reason,
        duration,
        expires_at: expiresAt,
        banned_at: new Date()
      }])

    if (error) throw error

    // Log da ação
    await supabase.from('moderation_logs').insert([{
      moderator_id: req.user.id,
      action: 'ban_user',
      target_id: userId,
      target_type: 'user',
      reason
    }])

    res.json({ success: true, message: 'Usuário banido' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Desbanir usuário (moderador)
router.post('/users/:userId/unban', authenticateToken, checkModerator, async (req, res) => {
  try {
    const { userId } = req.params

    const { error } = await supabase
      .from('banned_users')
      .update({ is_active: false })
      .eq('user_id', userId)
      .eq('is_active', true)

    if (error) throw error

    // Log da ação
    await supabase.from('moderation_logs').insert([{
      moderator_id: req.user.id,
      action: 'unban_user',
      target_id: userId,
      target_type: 'user'
    }])

    res.json({ success: true, message: 'Usuário desbanido' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ===== VERIFICAÇÃO DE USUÁRIOS =====

// Adicionar verificação (apenas admin)
router.post('/verify/:userId', authenticateToken, checkAdmin, async (req, res) => {
  try {
    const { userId } = req.params

    const { error } = await supabase
      .from('users')
      .update({ verified: true })
      .eq('id', userId)

    if (error) throw error

    // Log da ação
    await supabase.from('moderation_logs').insert([{
      moderator_id: req.user.id,
      action: 'verify_user',
      target_id: userId,
      target_type: 'user'
    }])

    res.json({ success: true, message: 'Usuário verificado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Remover verificação (apenas admin)
router.delete('/verify/:userId', authenticateToken, checkAdmin, async (req, res) => {
  try {
    const { userId } = req.params

    const { error } = await supabase
      .from('users')
      .update({ verified: false })
      .eq('id', userId)

    if (error) throw error

    // Log da ação
    await supabase.from('moderation_logs').insert([{
      moderator_id: req.user.id,
      action: 'unverify_user',
      target_id: userId,
      target_type: 'user'
    }])

    res.json({ success: true, message: 'Verificação removida' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ===== DENÚNCIAS =====

// Listar denúncias pendentes
router.get('/reports', authenticateToken, checkModerator, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select(`
        *,
        reporter:users!reports_reporter_id_fkey(id, username, name, avatar)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({ reports: data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Resolver denúncia
router.post('/reports/:reportId/resolve', authenticateToken, checkModerator, async (req, res) => {
  try {
    const { reportId } = req.params

    const { error } = await supabase
      .from('reports')
      .update({ 
        status: 'resolved',
        reviewed_by: req.user.id,
        reviewed_at: new Date()
      })
      .eq('id', reportId)

    if (error) throw error

    res.json({ success: true, message: 'Denúncia resolvida' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Descartar denúncia
router.post('/reports/:reportId/dismiss', authenticateToken, checkModerator, async (req, res) => {
  try {
    const { reportId } = req.params

    const { error } = await supabase
      .from('reports')
      .update({ 
        status: 'dismissed',
        reviewed_by: req.user.id,
        reviewed_at: new Date()
      })
      .eq('id', reportId)

    if (error) throw error

    res.json({ success: true, message: 'Denúncia descartada' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ===== ESTATÍSTICAS =====

// Estatísticas do site (apenas moderador)
router.get('/stats', authenticateToken, checkModerator, async (req, res) => {
  try {
    const [usersCount, postsCount, reportsCount, moderatorsCount] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('posts').select('id', { count: 'exact', head: true }),
      supabase.from('reports').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('moderators').select('id', { count: 'exact', head: true })
    ])

    res.json({
      totalUsers: usersCount.count || 0,
      totalPosts: postsCount.count || 0,
      totalReports: reportsCount.count || 0,
      activeModerators: moderatorsCount.count || 0
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Logs de moderação (apenas admin)
router.get('/logs', authenticateToken, checkAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('moderation_logs')
      .select(`
        *,
        moderator:moderators!moderation_logs_moderator_id_fkey(
          user:users(username, name, avatar)
        )
      `)
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw error

    res.json({ logs: data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
