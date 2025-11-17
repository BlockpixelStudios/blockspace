import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

// Importar rotas
import authRoutes from './routes/auth.js'
import postsRoutes from './routes/posts.js'
import usersRoutes from './routes/users.js'
import adminRoutes from './routes/admin.js'
import messagesRoutes from './routes/messages.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})
app.use('/api/', limiter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rotas
app.use('/api/auth', authRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/messages', messagesRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'BlockSpace API is running' })
})

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Algo deu errado!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

app.listen(PORT, () => {
  console.log(`🚀 BlockSpace Backend rodando na porta ${PORT}`)
})
