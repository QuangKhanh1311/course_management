"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { CourseBasicInfo } from "@/components/teacher/course-basic-info"
import { CourseLessons } from "@/components/teacher/course-lessons"
import { LessonQuizzes } from "@/components/teacher/course-quizzes"

import { CourseService } from "@/services/course.service"

export default function EditCoursePage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const [course, setCourse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await CourseService.getById(courseId)
        setCourse(res.data) // res.data là course object từ backend
      } catch (err) {
        console.error("Failed to fetch course:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
          <CardDescription>Edit course content and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <CourseBasicInfo course={course} onUpdate={setCourse} />
            </TabsContent>

            <TabsContent value="lessons" className="space-y-4">
              <CourseLessons courseId={courseId} />
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-4">
              {/* LessonQuizzes sẽ tự load lesson của course và quản lý quiz */}
              <LessonQuizzes courseId={courseId} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
