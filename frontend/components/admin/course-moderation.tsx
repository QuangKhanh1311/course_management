"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

interface CourseModerationProps {
  courses: any[]
}

export function CourseModeration({ courses: initialCourses }: CourseModerationProps) {
  const [courses, setCourses] = useState(initialCourses)

  const handleApproveCourse = (id: string) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, status: "published" } : c)))
  }

  const handleRejectCourse = (id: string) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, status: "rejected" } : c)))
  }

  const pendingCourses = courses.filter((c) => c.status === "pending")
  const publishedCourses = courses.filter((c) => c.status === "published")

  return (
    <div className="space-y-6">
      {/* Pending Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Courses</CardTitle>
          <CardDescription>Courses awaiting approval</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingCourses.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No pending courses</p>
          ) : (
            <div className="space-y-4">
              {pendingCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="gap-2 bg-green-500 hover:bg-green-600"
                      onClick={() => handleApproveCourse(course.id)}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 text-destructive bg-transparent"
                      onClick={() => handleRejectCourse(course.id)}
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Published Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Published Courses</CardTitle>
          <CardDescription>Active courses on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Instructor</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Students</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {publishedCourses.map((course) => (
                  <tr key={course.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{course.title}</td>
                    <td className="py-3 px-4 text-muted-foreground">{course.instructor}</td>
                    <td className="py-3 px-4 text-foreground">{course.students}</td>
                    <td className="py-3 px-4 text-foreground font-semibold">${course.revenue.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
