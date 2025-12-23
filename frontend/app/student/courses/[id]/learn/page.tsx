"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, FileText, Play, Download, BookOpen } from "lucide-react"
import { LessonService } from "@/services/lesson.service"
import { EnrollmentService } from "@/services/enrollment.service"
import { CourseService } from "@/services/course.service"

export default function LearnCoursePage() {
  const params = useParams()
  const courseId = params.id as string
  const router = useRouter()

  const [studentId, setStudentId] = useState<string | null>(null)
  const [course, setCourse] = useState<any>(null)
  const [currentLesson, setCurrentLesson] = useState<any>(null)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  // Lấy studentId từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setStudentId(user._id)
      } catch {
        setStudentId(null)
      }
    }
  }, [])

  // Chuyển URL YouTube sang embed
  const getEmbedUrl = (url: string) => {
    if (!url) return ""
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/")
    return url
  }

  // Fetch course + enrollment
  useEffect(() => {
    if (!studentId) return

    const fetchCourseAndEnrollment = async () => {
      try {
        setIsLoading(true)

        // Kiểm tra học viên đã enroll chưa
        const enrollmentsRes = await EnrollmentService.getEnrollmentsByUser(studentId)
        const enrolledCourseIds = enrollmentsRes.data.map((e: any) => e.course_id._id)
        if (!enrolledCourseIds.includes(courseId)) {
          alert("Bạn chưa đăng ký khóa học này")
          router.push("/student/courses")
          return
        }

        // Lấy thông tin course
        const courseRes = await CourseService.getById(courseId)
        const fetchedCourse = courseRes.data

        // Lấy danh sách lessons
        const lessonsRes = await LessonService.getByCourse(courseId)
        fetchedCourse.lessons = lessonsRes.data.sort((a: any, b: any) => a.order - b.order)

        setCourse(fetchedCourse)
        setCurrentLesson(fetchedCourse.lessons[0])
      } catch (err) {
        console.error(err)
        alert("Không thể tải khóa học")
        router.push("/student/courses")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourseAndEnrollment()
  }, [courseId, studentId, router])

  const handleCompleteLesson = () => {
    if (currentLesson && !completedLessons.includes(currentLesson._id)) {
      setCompletedLessons([...completedLessons, currentLesson._id])
    }
  }

  const handleNextLesson = () => {
    if (course && currentLesson) {
      const idx = course.lessons.findIndex((l: any) => l._id === currentLesson._id)
      if (idx < course.lessons.length - 1) setCurrentLesson(course.lessons[idx + 1])
    }
  }

  const handlePrevLesson = () => {
    if (course && currentLesson) {
      const idx = course.lessons.findIndex((l: any) => l._id === currentLesson._id)
      if (idx > 0) setCurrentLesson(course.lessons[idx - 1])
    }
  }

  if (isLoading || !course || !currentLesson) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  const progress = Math.round((completedLessons.length / course.lessons.length) * 100)

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? "w-80" : "w-0"} border-r bg-card transition-all duration-300 overflow-hidden flex flex-col`}>
          <div className="p-4 border-b">
            <h3 className="font-semibold text-foreground line-clamp-2">{course.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{course.teacher}</p>
          </div>

          {/* Progress */}
          <div className="p-4 border-b space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-foreground">Course Progress</span>
              <span className="text-xs font-semibold text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {completedLessons.length} of {course.lessons.length} lessons completed
            </p>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {course.lessons.map((lesson: any) => (
              <button
                key={lesson._id}
                onClick={() => setCurrentLesson(lesson)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  currentLesson._id === lesson._id ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                }`}
              >
                <div className="flex items-start gap-2">
                  {completedLessons.includes(lesson._id) ? (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  ) : (
                    <Play className="w-4 h-4 mt-1 flex-shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium line-clamp-2">{lesson.title}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Quiz Button */}
          <div className="p-4 border-t">
            <Link href={`/student/courses/${courseId}/quiz`} className="w-full">
              <Button variant="outline" className="w-full bg-transparent">Take Quiz</Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b bg-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <BookOpen className="w-5 h-5" />
              </button>
              <div>
                <h2 className="font-semibold text-foreground">Lesson {currentLesson.order}</h2>
                <p className="text-sm text-muted-foreground">{currentLesson.title}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                {currentLesson.video_url || currentLesson.videoUrl ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={getEmbedUrl(currentLesson.video_url || currentLesson.videoUrl)}
                    title={currentLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex items-center justify-center text-muted-foreground h-full">Video không khả dụng</div>
                )}
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>About this lesson</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{currentLesson.content}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resources" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Lesson Resources</CardTitle>
                      <CardDescription>Download materials for this lesson</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {currentLesson.material_url && (
                        <a
                          href={currentLesson.material_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted transition-colors"
                        >
                          <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">Lesson Notes (PDF)</p>
                            <p className="text-xs text-muted-foreground">Download and review</p>
                          </div>
                          <Download className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t bg-card p-4 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevLesson}
              disabled={course.lessons[0]._id === currentLesson._id}
              className="bg-transparent"
            >
              Previous Lesson
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={handleCompleteLesson}
                disabled={completedLessons.includes(currentLesson._id)}
                variant={completedLessons.includes(currentLesson._id) ? "outline" : "default"}
              >
                {completedLessons.includes(currentLesson._id) ? "Completed" : "Mark as Complete"}
              </Button>
              <Button
                onClick={handleNextLesson}
                disabled={course.lessons[course.lessons.length - 1]._id === currentLesson._id}
                className="gap-2"
              >
                Next Lesson
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
