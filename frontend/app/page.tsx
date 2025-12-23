"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { TeacherService } from "@/services/teacher.service"

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      const token = localStorage.getItem("token")
      const userStr = localStorage.getItem("user")

      if (!token || !userStr) {
        setIsLoading(false)
        return
      }

      let user: any
      try {
        user = JSON.parse(userStr)
      } catch (err) {
        console.error("Invalid user in localStorage", err)
        setIsLoading(false)
        return
      }

      // ADMIN
      if (user.role === "admin") {
        router.replace("/admin/dashboard")
        return
      }

      // TEACHER → lấy từ bảng teachers
      if (user.role === "teacher") {
        try {
          const teacher = await TeacherService.getByUserId(user._id)

          if (!teacher || !teacher.isActive) {
            router.replace("/teacher/qualification")
          } else {
            router.replace("/teacher/dashboard")
          }
          return
        } catch (err) {
          console.error("Fetch teacher failed", err)
          setIsLoading(false)
          return
        }
      }

      // STUDENT
      router.replace("/student/courses")
    }

    run()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Welcome to EduHub</h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive platform for online course management and learning
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>For Students</CardTitle>
              <CardDescription>Learn from expert teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Browse courses, complete lessons, and earn certificates.
              </p>
              <Link href="/auth/login">
                <Button className="w-full">Get Started</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>For Teachers</CardTitle>
              <CardDescription>Create and manage courses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Create courses, upload content, manage students.
              </p>
              <Link href="/auth/login">
                <Button className="w-full">Start Teaching</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>For Admins</CardTitle>
              <CardDescription>Manage the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Monitor users, approve teachers, view analytics.
              </p>
              <Link href="/auth/login">
                <Button className="w-full">Admin Access</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Already have an account?
          </p>
          <Link href="/auth/login">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
