import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Páginas que JÁ TEMOS
import LandingPage from './pages/LandingPage.jsx'

// Páginas que AINDA FALTAM (vamos criar aos poucos!)
import AuthPage from './pages/AuthPage.jsx'
import Feed from './pages/Feed.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import Messages from './pages/Messages.jsx'
import Search from './pages/Search.jsx'
import CreateContent from './pages/CreateContent.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import Support from './pages/Support.jsx'
import { TermsOfService, PrivacyPolicy, CookiePolicy } from './pages/LegalPages.jsx'
import Error404 from './pages/Error404.jsx'

// Componentes
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

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
