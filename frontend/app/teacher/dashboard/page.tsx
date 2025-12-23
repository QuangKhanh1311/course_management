"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus, BookOpen, Users, DollarSign } from "lucide-react"
import { CourseList } from "@/components/teacher/course-list"
import { StatsCard } from "@/components/teacher/stats-card"
import { CourseService } from "@/services/course.service"
import { EnrollmentService } from "@/services/enrollment.service"

export default function InstructorDashboard() {
  const [courses, setCourses] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      console.error("No current user found")
      setIsLoading(false)
      return
    }

    const currentUser = JSON.parse(storedUser)
    const teacherId = currentUser._id

    const fetchDashboardData = async () => {
      try {
        // 1️⃣ Lấy danh sách course của giảng viên
        const courseRes = await CourseService.getByTeacher(teacherId)
        const rawCourses = courseRes.data

        // 2️⃣ Lấy enrollment theo từng course
        const enrollmentResponses = await Promise.all(
          rawCourses.map((course: any) =>
            EnrollmentService.getAllEnrollments({ course_id: course._id })
          )
        )

        // 3️⃣ Gắn enrollmentCount và status vào từng course
        const coursesWithExtra = rawCourses.map((course: any, index: number) => ({
          ...course,
          enrollmentCount: enrollmentResponses[index].data.length,
          status: course.isActive ? "published" : "pending", // <-- gắn trạng thái
        }))

        setCourses(coursesWithExtra)

        // 4️⃣ Tính tổng học viên KHÔNG trùng
        const allEnrollments = enrollmentResponses.flatMap(
          (res: any) => res.data
        )
        const uniqueStudents = new Set(
          allEnrollments.map((e: any) =>
            e.user_id?._id || e.student_id?._id || e.user_id || e.student_id
          )
        )

        // 5️⃣ Tổng doanh thu từ price * số học viên
        const totalRevenue = coursesWithExtra.reduce((sum, course) => {
          return sum + (course.price || 0) * course.enrollmentCount
        }, 0)

        setStats({
          totalCourses: coursesWithExtra.length,
          totalStudents: uniqueStudents.size,
          totalRevenue,
        })
      } catch (err) {
        console.error("Failed to fetch dashboard:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Instructor Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your courses and track student progress
          </p>
        </div>
        <Link href="/teacher/courses/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Course
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <StatsCard
          icon={BookOpen}
          label="Total Courses"
          value={stats.totalCourses}
        />
        <StatsCard
          icon={Users}
          label="Total Students"
          value={stats.totalStudents}
        />
        <StatsCard
          icon={DollarSign}
          label="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
        />
      </div>

      {/* Course List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Courses</CardTitle>
          <CardDescription>
            Manage and monitor your published courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CourseList
            courses={courses}
            onDelete={(id) =>
              setCourses((prev) => prev.filter((c) => c._id !== id))
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}
