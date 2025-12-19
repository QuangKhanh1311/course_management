"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, BookOpen, Users, DollarSign, TrendingUp } from "lucide-react"
import { CourseList } from "@/components/instructor/course-list"
import { StatsCard } from "@/components/instructor/stats-card"

export default function InstructorDashboard() {
  const [courses, setCourses] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    // Mock data - in production, fetch from API
    setCourses([
      {
        id: "1",
        title: "React Fundamentals",
        description: "Learn React from scratch",
        price: 49.99,
        enrollmentCount: 234,
        status: "published",
        category: "Web Development",
      },
      {
        id: "2",
        title: "Advanced TypeScript",
        description: "Master TypeScript advanced concepts",
        price: 79.99,
        enrollmentCount: 156,
        status: "published",
        category: "Programming",
      },
    ])

    setStats({
      totalCourses: 2,
      totalStudents: 390,
      totalRevenue: 6349.9,
    })
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Instructor Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your courses and track student progress</p>
        </div>
        <Link href="/instructor/courses/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Course
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <StatsCard icon={BookOpen} label="Total Courses" value={stats.totalCourses} />
        <StatsCard icon={Users} label="Total Students" value={stats.totalStudents} />
        <StatsCard icon={DollarSign} label="Total Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Courses</CardTitle>
          <CardDescription>Manage and monitor your published courses</CardDescription>
        </CardHeader>
        <CardContent>
          <CourseList courses={courses} />
        </CardContent>
      </Card>
    </div>
  )
}
