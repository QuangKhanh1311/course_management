"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, FileText, Play, MessageSquare, Download, BookOpen } from "lucide-react"
import { Content } from "next/font/google"

export default function LearnCoursePage() {
  const params = useParams()
  const courseId = params.id as string
  const [course, setCourse] = useState<any>(null)
  const [currentLesson, setCurrentLesson] = useState<any>(null)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // Mock course data
    const mockCourse = {
      id: courseId,
      title: "React Fundamentals",
      instructor: "Jane Instructor",
      lessons: [
        {
          id: "1",
          title: "Introduction to React",
          content: "Learn what React is and why it's useful",
          video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          material_url: "https://example.com/lesson1.pdf",
          order: 1,
        },
        {
          id: "2",
          title: "JSX and Components",
          content: "Understanding JSX syntax and component structure",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          material_url: "https://example.com/lesson2.pdf",
          order: 2,
        },
        {
          id: "3",
          title: "State and Props",
          content: "Managing component state and passing props",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          material_url: "https://example.com/lesson3.pdf",
          order: 3,
        },
      ],
    }

    setCourse(mockCourse)
    setCurrentLesson(mockCourse.lessons[0])
  }, [courseId])

  const handleCompleteLesson = () => {
    if (currentLesson && !completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id])
    }
  }

  const handleNextLesson = () => {
    if (course && currentLesson) {
      const currentIndex = course.lessons.findIndex((l: any) => l.id === currentLesson.id)
      if (currentIndex < course.lessons.length - 1) {
        setCurrentLesson(course.lessons[currentIndex + 1])
      }
    }
  }

  if (!course || !currentLesson) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-80" : "w-0"
          } border-r bg-card transition-all duration-300 overflow-hidden flex flex-col`}
        >
          <div className="p-4 border-b">
            <h3 className="font-semibold text-foreground line-clamp-2">{course.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{course.instructor}</p>
          </div>

          {/* Progress */}
          <div className="p-4 border-b space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground">Course Progress</span>
                <span className="text-xs font-semibold text-primary">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground">
              {completedLessons.length} of {course.lessons.length} lessons completed
            </p>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {course.lessons.map((lesson: any) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  currentLesson.id === lesson.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <div className="flex items-start gap-2">
                  {completedLessons.includes(lesson.id) ? (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  ) : (
                    <Play className="w-4 h-4 mt-1 flex-shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium line-clamp-2">{lesson.title}</p>
                    <p className="text-xs opacity-75">{lesson.duration}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Quiz Button */}
          <div className="p-4 border-t">
            <Link href={`/student/courses/${courseId}/quiz`} className="w-full">
              <Button variant="outline" className="w-full bg-transparent">
                Take Quiz
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b bg-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
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
              {/* Video Player */}
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Tabs */}
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
                      <a
                        href={currentLesson.resources}
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
              onClick={() => {
                const currentIndex = course.lessons.findIndex((l: any) => l.id === currentLesson.id)
                if (currentIndex > 0) {
                  setCurrentLesson(course.lessons[currentIndex - 1])
                }
              }}
              disabled={course.lessons[0].id === currentLesson.id}
              className="bg-transparent"
            >
              Previous Lesson
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={handleCompleteLesson}
                disabled={completedLessons.includes(currentLesson.id)}
                variant={completedLessons.includes(currentLesson.id) ? "outline" : "default"}
              >
                {completedLessons.includes(currentLesson.id) ? "Completed" : "Mark as Complete"}
              </Button>
              <Button
                onClick={handleNextLesson}
                disabled={course.lessons[course.lessons.length - 1].id === currentLesson.id}
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
