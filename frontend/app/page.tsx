"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (token) {
      if (role === "instructor") {
        router.push("/instructor/dashboard")
      } else if (role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/student/courses")
      }
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4">Welcome to EduHub</h1>
          <p className="text-xl text-muted-foreground mb-8">
            A comprehensive platform for online course management and learning
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>For Students</CardTitle>
              <CardDescription>Learn from expert instructors</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Browse courses, complete lessons, take quizzes, and earn certificates.
              </p>
              <Link href="/auth/login">
                <Button className="w-full">Get Started</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>For Instructors</CardTitle>
              <CardDescription>Create and manage courses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Create courses, upload content, manage students, and track progress.
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
                Monitor users, approve courses, view analytics, and manage content.
              </p>
              <Link href="/auth/login">
                <Button className="w-full">Admin Access</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">Already have an account?</p>
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
