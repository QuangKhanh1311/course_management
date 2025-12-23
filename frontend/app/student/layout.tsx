"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const raw = localStorage.getItem("user")

    if (!raw) {
      router.replace("/auth/login")
      return
    }

    try {
      const user = JSON.parse(raw)

      if (user.role !== "student") {
        router.replace("/auth/login")
      }
    } catch {
      localStorage.removeItem("user")
      router.replace("/auth/login")
    }
  }, [router, pathname])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">{children}</main>
    </>
  )
}
