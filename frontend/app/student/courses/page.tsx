"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { CourseCard } from "@/components/student/course-card"

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [filteredCourses, setFilteredCourses] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([])

  useEffect(() => {
const mockCourses = [
  {
    id: "1",
    title: "React Fundamentals",
    description: "Learn React from scratch with hands-on projects",
    category: "web-development",
    price: 0,
    image: "/react-course.jpg",
    instructor: "Jane Instructor",
  },
  {
    id: "2",
    title: "Advanced TypeScript",
    description: "Master TypeScript advanced concepts and patterns",
    category: "programming",
    price: 79.99,
    image: "/typescript-course.jpg",
    instructor: "Jane Instructor",
  },
  {
    id: "3",
    title: "UI/UX Design Basics",
    description: "Design user-friendly interfaces and experiences",
    category: "design",
    price: 49.99,
    image: "/ui-ux-design.jpg",
    instructor: "Design Expert",
  },
]

    setCourses(mockCourses)
    setFilteredCourses(mockCourses)

    // Load enrolled courses from localStorage
    const enrolled = JSON.parse(localStorage.getItem("enrolledCourses") || "[]")
    setEnrolledCourses(enrolled)
  }, [])

  useEffect(() => {
    let filtered = courses

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((course) => course.category === selectedCategory)
    }

    // Filter by level
    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel)
    }

    setFilteredCourses(filtered)
  }, [searchTerm, selectedCategory, selectedLevel, courses])

  const handleEnroll = (courseId: string) => {
    const newEnrolled = [...enrolledCourses, courseId]
    setEnrolledCourses(newEnrolled)
    localStorage.setItem("enrolledCourses", JSON.stringify(newEnrolled))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Explore Courses</h1>
        <p className="text-muted-foreground">Discover and enroll in courses from expert instructors</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="space-y-4">
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
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isEnrolled={enrolledCourses.includes(course.id)}
            onEnroll={() => handleEnroll(course.id)}
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
