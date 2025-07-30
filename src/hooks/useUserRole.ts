// useUserRole.ts
import { useAccessToken } from '@nhost/react'
import jwtDecode from 'jwt-decode'

export const useUserRole = (): string | null => {
  const accessToken = useAccessToken()
  if (!accessToken) return null

  const decoded: any = jwtDecode(accessToken)
  return decoded['https://hasura.io/jwt/claims']?.['x-hasura-role'] || null
}
