// components/RoleProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuthenticationStatus } from '@nhost/react'
import type { JSX } from 'react'

export const RoleProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element
  allowedRoles: string[]
}) => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  if (isLoading) return <p>Loading...</p>
  if (!isAuthenticated) return <Navigate to="/login" />
  // if (!allowedRoles.includes(role || '')) return <Navigate to="/unauthorized" />

  return children
}
