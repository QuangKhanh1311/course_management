import { useState } from "react"
import { AuthService } from "@/services/auth.service"

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const res = await AuthService.login(email, password)
      console.log("LOGIN RES =", res)
      localStorage.setItem("token", res.token)
      localStorage.setItem("user", JSON.stringify(res.user))

      return res.user
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}
