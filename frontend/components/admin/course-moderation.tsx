"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Play, FileText, Download, BookOpen, ChevronRight } from "lucide-react"
import { CourseService } from "@/services/course.service"
import { LessonService } from "@/services/lesson.service"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface Lesson {
  _id: string
  title: string
  order: number
  video_url?: string
  material_url?: string
}

interface Course {
  id: string
  title: string
  instructor: string
  students: number
  revenue: number
  isActive: boolean
  status: "pending" | "published"
  lessons?: Lesson[]
}

export function CourseModeration() {
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await CourseService.getAll()
        const mapped: Course[] = res.data.map((c: any) => ({
          id: c._id,
          title: c.title,
          instructor: c.teacher_id?.full_name || "Unknown",
          students: c.students || 0,
          revenue: c.revenue || 0,
          isActive: c.isActive || false,
          status: c.isActive ? "published" : "pending",
        }))
        setCourses(mapped)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const handleApproveCourse = async (id: string) => {
    await CourseService.update(id, { isActive: true })
    setCourses(courses.map(c => c.id === id ? { ...c, isActive: true, status: "published" } : c))
  }

  const handleRejectCourse = async (id: string) => {
    await CourseService.update(id, { isActive: false })
    setCourses(courses.map(c => c.id === id ? { ...c, isActive: false, status: "pending" } : c))
  }

  const openCourseModal = async (course: Course) => {
    if (!course.lessons) {
      const res = await LessonService.getByCourse(course.id)
      course.lessons = res.data.sort((a: Lesson, b: Lesson) => a.order - b.order)
    }
    setSelectedCourse(course)
    setCurrentLesson(course.lessons?.[0] || null) 
  }

  const handleNextLesson = () => {
    if (selectedCourse && currentLesson) {
      const idx = selectedCourse.lessons!.findIndex(l => l._id === currentLesson._id)
      if (idx < selectedCourse.lessons!.length - 1) setCurrentLesson(selectedCourse.lessons![idx + 1])
    }
  }

  const handlePrevLesson = () => {
    if (selectedCourse && currentLesson) {
      const idx = selectedCourse.lessons!.findIndex(l => l._id === currentLesson._id)
      if (idx > 0) setCurrentLesson(selectedCourse.lessons![idx - 1])
    }
  }

  const getEmbedUrl = (url: string) => {
    if (!url) return ""
    return url.includes("watch?v=") ? url.replace("watch?v=", "embed/") : url
  }

  if (isLoading) return <div>Loading...</div>

  const pendingCourses = courses.filter(c => c.status === "pending")
  const publishedCourses = courses.filter(c => c.status === "published")

  return (
    <div className="space-y-6">
      {/* Pending */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Courses</CardTitle>
          <CardDescription>Courses awaiting approval</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingCourses.map(course => (
            <div key={course.id} className="flex justify-between items-center p-4 border rounded-lg mb-2">
              <div>
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground">by {course.instructor}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => handleApproveCourse(course.id)}>
                  <CheckCircle className="w-4 h-4" /> Approve
                </Button>
                <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleRejectCourse(course.id)}>
                  <XCircle className="w-4 h-4" /> Reject
                </Button>
                <Button size="sm" variant="outline" onClick={() => openCourseModal(course)}>
                  <BookOpen className="w-4 h-4" /> View
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Published */}
      <Card>
        <CardHeader>
          <CardTitle>Published Courses</CardTitle>
          <CardDescription>Active courses on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          {publishedCourses.map(course => (
            <div key={course.id} className="flex justify-between items-center p-4 border rounded-lg mb-2">
              <div>
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground">by {course.instructor}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => openCourseModal(course)}>
                <BookOpen className="w-4 h-4" /> View
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modal */}
      {selectedCourse && currentLesson && (
        <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
  <DialogContent className="w-[90%] max-w-6xl p-0 rounded-lg overflow-hidden">
    {/* Header */}
    <DialogHeader className="flex justify-between p-4 border-b bg-card">
      <DialogTitle className="font-bold text-lg">{selectedCourse.title}</DialogTitle>
      <DialogClose className="p-2 text-lg font-semibold">✕</DialogClose>
    </DialogHeader>

    <div className="flex h-[80vh]">
      {/* Sidebar lessons */}
      <div className="w-40 border-r bg-gray-50 overflow-y-auto p-4">
        <h4 className="font-semibold mb-4">Lessons</h4>
        {selectedCourse.lessons!.map(lesson => (
          <button
            key={lesson._id}
            onClick={() => setCurrentLesson(lesson)}
            className={`w-full text-left p-3 mb-2 rounded-lg flex items-center gap-2 transition-colors ${
              currentLesson._id === lesson._id ? "bg-primary text-primary-foreground font-medium shadow" : "hover:bg-muted text-foreground"
            }`}
          >
            <span className="font-semibold">{lesson.order}.</span>
            <span className="line-clamp-2">{lesson.title}</span>
            {lesson.video_url && <Play className="w-4 h-4 ml-auto text-muted-foreground" />}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-white">
        {/* Video */}
        <div className="aspect-video bg-black rounded-lg shadow-lg mb-6 overflow-hidden">
          {currentLesson.video_url ? (
            <iframe
              className="w-full h-full"
              src={getEmbedUrl(currentLesson.video_url)}
              title={currentLesson.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center text-muted-foreground h-full text-lg">Video không khả dụng</div>
          )}
        </div>

        {/* Tabs Overview / Resources */}
        <Tabs defaultValue="overview" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="text-muted-foreground">
            <p>{currentLesson.title}</p>
          </TabsContent>

          <TabsContent value="resources" className="space-y-2">
            {currentLesson.material_url && (
              <a
                href={currentLesson.material_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 border rounded hover:bg-muted"
              >
                <FileText className="w-4 h-4" /> Download Material
                <Download className="w-4 h-4" />
              </a>
            )}
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between mt-auto">
          <Button
            onClick={handlePrevLesson}
            disabled={selectedCourse.lessons![0]._id === currentLesson._id}
            className="flex items-center gap-2"
          >
            <ChevronRight className="w-4 h-4 rotate-180" /> Previous
          </Button>
          <Button
            onClick={handleNextLesson}
            disabled={selectedCourse.lessons![selectedCourse.lessons!.length - 1]._id === currentLesson._id}
            className="flex items-center gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>

      )}
    </div>
  )
}
