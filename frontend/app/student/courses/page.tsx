"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { CourseCard } from "@/components/student/course-card"
import { CourseService } from "@/services/course.service"
import { EnrollmentService } from "@/services/enrollment.service"
import { Navbar } from "@/components/navbar"
export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [filteredCourses, setFilteredCourses] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([])
  const [studentId, setStudentId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Lấy studentId từ localStorage trên client
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

  // Fetch courses
useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await CourseService.getAll()
      // Chỉ lấy khóa học đã publish
      const approvedCourses = res.data.filter((c: any) => c.isActive) // hoặc c.status === 'published'
      setCourses(approvedCourses)
      setFilteredCourses(approvedCourses)
    } catch (error) {
      console.error("Failed to fetch courses:", error)
    } finally {
      setIsLoading(false)
    }
  }
  fetchCourses()
}, [])

  // Fetch student enrollments
  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!studentId) return
      try {
        // Sử dụng getAllEnrollments filter by student_id
        const res = await EnrollmentService.getAllEnrollments({ student_id: studentId })
        const enrolledIds = res.data.map((e: any) => e.course_id._id)
        setEnrolledCourses(enrolledIds)
      } catch (error) {
        console.error("Failed to fetch enrollments:", error)
      }
    }
    fetchEnrollments()
  }, [studentId])

  // Filter courses
  useEffect(() => {
    let filtered = courses

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((course) => course.category === selectedCategory)
    }

    setFilteredCourses(filtered)
  }, [searchTerm, selectedCategory, courses])

  // Enroll free course handler
  const handleEnroll = async (courseId: string) => {
    if (!studentId) {
      alert("You must be logged in to enroll")
      return
    }

    try {
      await EnrollmentService.createEnrollment({ user_id: studentId, course_id: courseId })
      setEnrolledCourses((prev) => [...prev, courseId])
      alert("Enrollment successful!")
    } catch (error) {
      console.error("Failed to enroll:", error)
      alert("Enrollment failed")
    }
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading courses...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Explore Courses</h1>
        <p className="text-muted-foreground">Discover and enroll in courses from expert instructors</p>
      </div>

      {/* Search & Filter */}
      <Card className="mb-8">
        <CardContent className="pt-6 space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Results</label>
              <div className="flex items-center h-10 px-3 border rounded-md bg-muted text-muted-foreground">
                {filteredCourses.length} courses found
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            isEnrolled={enrolledCourses.includes(course._id)}
            onEnroll={() => handleEnroll(course._id)}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
