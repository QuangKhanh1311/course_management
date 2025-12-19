"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseBasicInfo } from "@/components/instructor/course-basic-info"
import { CourseLessons } from "@/components/instructor/course-lessons"
import { CourseQuizzes } from "@/components/instructor/course-quizzes"

export default function EditCoursePage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const [course, setCourse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock data - in production, fetch from API
    setCourse({
      id: courseId,
      title: "React Fundamentals",
      description: "Learn React from scratch",
      category: "web-development",
      level: "beginner",
      price: 49.99,
      status: "draft",
      lessons: [],
      quizzes: [],
    })
    setIsLoading(false)
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
              <CourseQuizzes courseId={courseId} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
