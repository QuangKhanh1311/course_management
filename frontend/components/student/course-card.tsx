"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users } from "lucide-react"

interface CourseCardProps {
  course: any
  isEnrolled: boolean
  onEnroll: () => void
}

export function CourseCard({ course, isEnrolled, onEnroll }: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
        <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-full object-cover" />
      </div>

      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {course.level}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-semibold">{course.rating}</span>
          </div>
        </div>
        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{course.instructor}</span>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.students}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-foreground">${course.price}</span>
          {isEnrolled ? (
            <Link href={`/student/courses/${course.id}/learn`}>
              <Button size="sm">Continue</Button>
            </Link>
          ) : (
            <Link href={`/student/checkout/${course.id}`}>
              <Button size="sm" onClick={onEnroll}>
                Enroll
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
