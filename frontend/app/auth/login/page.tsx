"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useAuth } from "@/hooks/useAuth"
import { TeacherService } from "@/services/teacher.service"

export default function LoginPage() {
  const router = useRouter()
  const { login, loading, error } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const user = await login(email, password)
    if (!user) return

    console.log("LOGIN USER =", user)

    // ADMIN
    if (user.role === "admin") {
      router.push("/admin/dashboard")
      return
    }

    // TEACHER
    if (user.role === "teacher") {
      try {
        const teacher = await TeacherService.getByUserId(user._id)

        // chưa có hồ sơ teacher
        if (!teacher) {
          router.push("/teacher/qualification")
          return
        }

        // chưa được duyệt
        if (!teacher.isActive) {
          router.push("/teacher/qualification")
        } else {
          router.push("/teacher/dashboard")
        }
      } catch (err) {
        console.error("Fetch teacher failed", err)
        router.push("/teacher/qualification")
      }
      return
    }

    // STUDENT
    router.push("/student/courses")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In to EduHub</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
