"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type User = {
  _id: string
  role: "student" | "instructor" | "admin"
}

export function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem("user")
    if (!raw) return

    try {
      const parsed = JSON.parse(raw)
      setUser(parsed)
    } catch {
      localStorage.removeItem("user")
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear() // hoặc removeItem("user")
    router.replace("/")
  }

  if (!user) return null

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          EduHub
        </Link>

        <div className="flex items-center gap-4">
          {user.role === "student" && (
            <Link href="/student/courses">
              <Button variant="ghost">Courses</Button>
            </Link>
          )}

          {user.role === "instructor" && (
            <Link href="/instructor/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          )}

          {user.role === "admin" && (
            <Link href="/admin/dashboard">
              <Button variant="ghost">Admin</Button>
            </Link>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
