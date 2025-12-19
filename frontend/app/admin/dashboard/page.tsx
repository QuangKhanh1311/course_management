"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, DollarSign, AlertCircle } from "lucide-react"
import { AdminStats } from "@/components/admin/admin-stats"
import { UserManagement } from "@/components/admin/user-management"
import { CourseModeration } from "@/components/admin/course-moderation"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalInstructors: 45,
    totalStudents: 1205,
    totalCourses: 128,
    totalRevenue: 45230.5,
    pendingCourses: 12,
    activeUsers: 342,
  })

  const [users, setUsers] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    // Mock data
    setUsers([
      {
        id: "1",
        name: "Jane Instructor",
        email: "instructor@example.com",
        role: "instructor",
        joinedAt: "2024-01-15",
        status: "active",
      },
      {
        id: "2",
        name: "John Student",
        email: "student@example.com",
        role: "student",
        joinedAt: "2024-02-20",
        status: "active",
      },
      {
        id: "3",
        name: "Design Expert",
        email: "designer@example.com",
        role: "instructor",
        joinedAt: "2024-01-10",
        status: "active",
      },
    ])

    setCourses([
      {
        id: "1",
        title: "React Fundamentals",
        instructor: "Jane Instructor",
        status: "published",
        students: 234,
        revenue: 11699.66,
      },
      {
        id: "2",
        title: "Advanced TypeScript",
        instructor: "Jane Instructor",
        status: "published",
        students: 156,
        revenue: 12478.44,
      },
      {
        id: "3",
        title: "Web Design Basics",
        instructor: "Design Expert",
        status: "pending",
        students: 0,
        revenue: 0,
      },
    ])
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users, courses, and view platform analytics</p>
      </div>

      {/* Key Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <AdminStats icon={Users} label="Total Users" value={stats.totalUsers} />
        <AdminStats icon={BookOpen} label="Total Courses" value={stats.totalCourses} />
        <AdminStats icon={DollarSign} label="Total Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} />
        <AdminStats icon={AlertCircle} label="Pending Courses" value={stats.pendingCourses} color="text-orange-500" />
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription>Key metrics and statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Active Users</span>
                  <span className="font-semibold text-foreground">{stats.activeUsers}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Total Instructors</span>
                  <span className="font-semibold text-foreground">{stats.totalInstructors}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Total Students</span>
                  <span className="font-semibold text-foreground">{stats.totalStudents}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Avg Revenue per Course</span>
                  <span className="font-semibold text-foreground">
                    ${(stats.totalRevenue / stats.totalCourses).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 py-2 border-b">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">New course published</p>
                    <p className="text-xs text-muted-foreground">React Fundamentals by Jane Instructor</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2 border-b">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">New user registration</p>
                    <p className="text-xs text-muted-foreground">50 new students joined today</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">Course pending review</p>
                    <p className="text-xs text-muted-foreground">Web Design Basics awaiting approval</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <UserManagement users={users} />
        </TabsContent>

        <TabsContent value="courses">
          <CourseModeration courses={courses} />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard stats={stats} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
