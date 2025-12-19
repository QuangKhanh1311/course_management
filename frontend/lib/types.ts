export type UserRole = "student" | "instructor" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: Date
}

export interface Course {
  id: string
  title: string
  description: string
  instructorId: string
  price: number
  coverImage?: string
  category: string
  level: "beginner" | "intermediate" | "advanced"
  status: "draft" | "published" | "archived"
  enrollmentCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  videoUrl?: string
  pdfUrl?: string
  order: number
  createdAt: Date
}

export interface Quiz {
  id: string
  lessonId: string
  title: string
  questions: QuizQuestion[]
  passingScore: number
  createdAt: Date
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface Enrollment {
  id: string
  studentId: string
  courseId: string
  enrolledAt: Date
  completedAt?: Date
  progress: number
}

export interface Certificate {
  id: string
  enrollmentId: string
  courseId: string
  studentId: string
  issuedAt: Date
  certificateUrl: string
}
