"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Award } from "lucide-react"

export default function MyCoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])

  useEffect(() => {
    // Mock enrolled courses
    const mockEnrolledCourses = [
      {
        id: "1",
        title: "React Fundamentals",
        instructor: "Jane Instructor",
        progress: 100,
        lessonsCompleted: 20,
        totalLessons: 20,
        image: "/react-course.jpg",
        quizPassed: true,
        certificateUrl: "/certificates/react-cert.pdf",
      },
      {
        id: "3",
        title: "Web Design Basics",
        instructor: "Design Expert",
        progress: 40,
        lessonsCompleted: 8,
        totalLessons: 20,
        image: "/web-design-course.jpg",
        quizPassed: false,
        certificateUrl: null,
      },
    ]

    setEnrolledCourses(mockEnrolledCourses)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Courses</h1>
        <p className="text-muted-foreground">Continue learning where you left off</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <Card>
          <CardContent className="pt-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
            <Link href="/student/courses">
              <Button>Browse Courses</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <CardHeader>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <CardDescription>{course.instructor}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>
                    {course.lessonsCompleted} of {course.totalLessons} lessons completed
                  </span>
                </div>

                {course.progress === 100 && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                    <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      {course.quizPassed ? "Completed with Certificate" : "Completed - Take Quiz"}
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  <Link href={`/student/courses/${course.id}/learn`} className="flex-1">
                    <Button className="w-full">Continue Learning</Button>
                  </Link>
                  {course.progress === 100 && !course.quizPassed && (
                    <Link href={`/student/courses/${course.id}/quiz`} className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        Take Quiz
                      </Button>
                    </Link>
                  )}
                  {course.quizPassed && (
                    <Link href={`/student/courses/${course.id}/certificate`} className="flex-1">
                      <Button variant="outline" className="w-full gap-2 bg-transparent">
                        <Award className="w-4 h-4" />
                        Certificate
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
