import { useAuth } from "@/providers/AuthProvider"
import { useQuery, gql } from "@apollo/client"
import type { JSX } from "react"
import { Navigate, useLocation } from "react-router-dom"

const GET_ADMIN_STATUS = gql`
  query GetAdminStatus($id: uuid!) {
    unit_admins_by_pk(id: $id) {
      id
      has_onboarded
    }
  }
`

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading: authLoading } = useAuth()
  const location = useLocation()

  const { data, loading: adminLoading } = useQuery(GET_ADMIN_STATUS, {
    variables: { id: user?.id },
    skip: !user,
  })

  const isAdmin = !!data?.unit_admins_by_pk
  const hasOnboarded = data?.unit_admins_by_pk?.has_onboarded

  if (authLoading || adminLoading) return null

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (isAdmin && !hasOnboarded && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />
  }

  return children
}
