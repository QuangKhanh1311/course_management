"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role !== "student") {
      router.push("/auth/login")
    }
  }, [router])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">{children}</main>
    </>
  )
}
