import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Páginas que JÁ TEMOS
import LandingPage from './pages/LandingPage'

// Páginas que AINDA FALTAM (vamos criar aos poucos!)
import AuthPage from './pages/AuthPage'
// import Feed from './pages/Feed'
// import Profile from './pages/Profile'
// import Settings from './pages/Settings'
// import Messages from './pages/Messages'
// import Search from './pages/Search'
// import CreateContent from './pages/CreateContent'
// import AdminPanel from './pages/AdminPanel'
// import Support from './pages/Support'
// import { TermsOfService, PrivacyPolicy, CookiePolicy } from './pages/LegalPages'
// import Error404 from './pages/Error404'

// Componentes
// import Layout from './components/Layout'
// import ProtectedRoute from './components/ProtectedRoute'
// import AdminRoute from './components/AdminRoute'
// import { AuthProvider } from './contexts/AuthContext'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Página Principal */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Temporariamente: todas as outras rotas vão pra Landing */}
        <Route path="*" element={<LandingPage />} />
        
        {/* Depois que criar as páginas, descomenta estas rotas: */}
        {/* <Route path="/login" element={<AuthPage />} /> */}
        {/* <Route path="/feed" element={<Feed />} /> */}
        {/* <Route path="/profile/:username" element={<Profile />} /> */}
        {/* ... etc */}
      </Routes>
    </Router>
  )
        }
