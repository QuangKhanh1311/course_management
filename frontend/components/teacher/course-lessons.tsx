"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import { LessonService } from "@/services/lesson.service"

interface CourseLessonsProps {
  courseId: string
}

export function CourseLessons({ courseId }: CourseLessonsProps) {
  const [lessons, setLessons] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
    material_url: "",
  })

  // Fetch lessons từ backend khi load page
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await LessonService.getByCourse(courseId)
        setLessons(res.data)
      } catch (err) {
        console.error("Failed to fetch lessons", err)
      }
    }
    fetchLessons()
  }, [courseId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Thêm lesson lên backend
  const handleAddLesson = async () => {
    if (!formData.title.trim()) return

    try {
      const res = await LessonService.create({
        ...formData,
        order: lessons.length + 1,
        course_id: courseId,
      })
      setLessons([...lessons, res.data])
      setFormData({ title: "", description: "", video_url: "", material_url: "" })
      setShowForm(false)
    } catch (err) {
      console.error("Failed to add lesson", err)
    }
  }

  // Xóa lesson trên backend
  const handleDeleteLesson = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return

    try {
      await LessonService.delete(id)
      setLessons(lessons.filter((l) => l._id !== id))
    } catch (err) {
      console.error("Failed to delete lesson", err)
    }
  }

  return (
    <div className="space-y-4">
      {lessons.length > 0 && (
        <div className="space-y-2">
          {lessons.map((lesson) => (
            <Card key={lesson._id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{lesson.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
                    {lesson.video_url && <p className="text-xs text-muted-foreground mt-2">Video: {lesson.video_url}</p>}
                    {lesson.material_url && <p className="text-xs text-muted-foreground">PDF: {lesson.material_url}</p>}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive bg-transparent"
                    onClick={() => handleDeleteLesson(lesson._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Lesson</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Lesson Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Introduction to React"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Lesson description..."
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="video_url">Video URL (YouTube)</Label>
              <Input
                id="video_url"
                name="video_url"
                placeholder="https://youtube.com/..."
                value={formData.video_url}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="material_url">PDF URL</Label>
              <Input
                id="material_url"
                name="material_url"
                placeholder="https://example.com/file.pdf"
                value={formData.material_url}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddLesson}>Add Lesson</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Lesson
        </Button>
      )}
    </div>
  )
}
