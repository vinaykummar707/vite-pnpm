import { useAuth } from '@/providers/AuthProvider'
import type { JSX } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return null
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  
  return children
}
