import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingScreen from './LoadingScreen'

const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (!user || !isAdmin) {
    return <Navigate to="/feed" replace />
  }

  return children
}

export default AdminRoute
