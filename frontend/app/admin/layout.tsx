"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem("user")

    if (!raw) {
      router.replace("/auth/login")
      return
    }

    try {
      const user = JSON.parse(raw)

      // chỉ check role
      if (user.role !== "admin") {
        router.replace("/auth/login")
        return
      }

      setReady(true) // bật flag khi user là admin
    } catch {
      router.replace("/auth/login")
    }
  }, [router])

  if (!ready) return null // chờ xác thực admin

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">{children}</main>
    </>
  )
}
