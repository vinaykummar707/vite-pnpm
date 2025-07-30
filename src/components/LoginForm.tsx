// components/LoginForm.tsx
import { useEffect, useState } from 'react'
import { useSignInEmailPassword, useSignUpEmailPassword, useUserData } from '@nhost/react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signUpEmailPassword, isLoading, error } = useSignUpEmailPassword()
  const user = useUserData()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
   const res = await signUpEmailPassword(email, password);
   console.log(res)
  }

  useEffect(() => {
    console.log(user)
  },[user])

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit" disabled={isLoading}>Login</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  )
}
