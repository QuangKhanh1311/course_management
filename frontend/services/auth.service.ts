import { apiFetch } from "@/lib/api"

export const AuthService = {
  login(email: string, password: string) {
    return apiFetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  register(payload: any) {
    return apiFetch("/users/register", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  },

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },
}
