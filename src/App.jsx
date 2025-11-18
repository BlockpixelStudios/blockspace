import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        {/* TESTE RÁPIDO */}
        <Route path="/" element={
          <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-white mb-4">🚀 BlockSpace</h1>
              <p className="text-2xl text-white">Funcionando! 🎉</p>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App
