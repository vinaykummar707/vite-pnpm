import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { gql, useMutation } from "@apollo/client"
import { useState } from "react"

// Zod schema
const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type SignupFormValues = z.infer<typeof signupSchema>

// GraphQL mutation to insert into unit_admins
const INSERT_UNIT_ADMIN = gql`
  mutation InsertUnitAdmin($id: uuid!, $role: String!) {
    insert_unit_admins_one(object: { id: $id, role: $role }) {
      id
    }
  }
`

export default function Signup() {
  const navigate = useNavigate()
  const [signupError, setSignupError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  const [insertAdmin, { loading: insertLoading }] = useMutation(INSERT_UNIT_ADMIN)

  const onSubmit = async (data: SignupFormValues) => {
    setSignupError(null)

    // 1. Supabase signup
    const { data: signupData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          role: "UNIT_ADMIN", // Adds to user_metadata
        },
      },
    })

    if (error) {
      setSignupError(error.message)
      return
    }

    const user = signupData.user

    if (user) {
      // 2. Insert user into unit_admins via GraphQL
      try {
        await insertAdmin({
          variables: {
            id: user.id,
            role: "UNIT_ADMIN", // default role
          },
        })

        // 3. Navigate to onboarding
        navigate("/onboarding/dialysis-unit")
      } catch (err) {
        setSignupError("Failed to insert user data. Please try again.")
        console.error(err)
      }
    }
  }

  return (
    <div className="bg-muted flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              {signupError && (
                <p className="text-center text-sm text-red-600">{signupError}</p>
              )}

              <Button type="submit" className="w-full" disabled={insertLoading}>
                {insertLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
