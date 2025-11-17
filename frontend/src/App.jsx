import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

// Páginas
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Messages from './pages/Messages'
import Search from './pages/Search'
import CreateContent from './pages/CreateContent'
import AdminPanel from './pages/AdminPanel'
import Support from './pages/Support'
import { TermsOfService, PrivacyPolicy, CookiePolicy } from './pages/LegalPages'
import Error404 from './pages/Error404'

// Components
import Layout from './components/Layout'
import LoadingScreen from './components/LoadingScreen'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Páginas Públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          
          {/* Páginas Protegidas (precisa estar logado) */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create" element={<CreateContent />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Páginas Administrativas */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            } 
          />

          {/* Páginas de Suporte/Legal */}
          <Route path="/suporte" element={<Support />} />
          <Route path="/termos" element={<TermsOfService />} />
          <Route path="/privacidade" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />

          {/* Erro 404 */}
          <Route path="/404" element={<Error404 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
