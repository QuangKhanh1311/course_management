import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"
import { CourseService } from "@/services/course.service"

interface CourseListProps {
  courses: any[]
  onDelete?: (courseId: string) => void
}

export function CourseList({ courses, onDelete }: CourseListProps) {
  const handleDelete = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      await CourseService.deleteCourse(courseId); // gọi API backend
      if (onDelete) onDelete(courseId); // cập nhật parent state
    } catch (err) {
      console.error("Failed to delete course", err);
    }
  }

  return (
    <div className="space-y-4">
      {courses.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No courses yet. Create your first course!</p>
      ) : (
        courses.map(course => (
          <div
            key={course._id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{course.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
                <Badge>{course.status}</Badge>
              </div>
            </div>
            <div className="text-right mr-4">
              <p className="font-semibold text-foreground">${course.price}</p>
              <p className="text-sm text-muted-foreground">{course.enrollmentCount || 0} students</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/teacher/courses/${course._id}/edit`}>
                <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
              </Link>
              <Button size="sm" variant="outline"><Eye className="w-4 h-4" /></Button>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive bg-transparent"
                onClick={() => handleDelete(course._id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
