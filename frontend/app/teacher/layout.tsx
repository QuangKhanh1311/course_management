"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
      if (user.role !== "teacher") {
        router.replace("/auth/login")
        return
      }

      setReady(true)
    } catch {
      router.replace("/auth/login")
    }
  }, [router])

  if (!ready) return null

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">{children}</main>
    </>
  )
}
