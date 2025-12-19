"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

interface CourseLessonsProps {
  courseId: string
}

export function CourseLessons({ courseId }: CourseLessonsProps) {
  const [lessons, setLessons] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    pdfUrl: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddLesson = () => {
    if (formData.title.trim()) {
      const newLesson = {
        id: String(Date.now()),
        ...formData,
        order: lessons.length + 1,
      }
      setLessons([...lessons, newLesson])
      setFormData({ title: "", description: "", videoUrl: "", pdfUrl: "" })
      setShowForm(false)
    }
  }

  const handleDeleteLesson = (id: string) => {
    setLessons(lessons.filter((l) => l.id !== id))
  }

  return (
    <div className="space-y-4">
      {lessons.length > 0 && (
        <div className="space-y-2">
          {lessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{lesson.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
                    {lesson.videoUrl && <p className="text-xs text-muted-foreground mt-2">Video: {lesson.videoUrl}</p>}
                    {lesson.pdfUrl && <p className="text-xs text-muted-foreground">PDF: {lesson.pdfUrl}</p>}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive bg-transparent"
                    onClick={() => handleDeleteLesson(lesson.id)}
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
              <Label htmlFor="videoUrl">Video URL (YouTube)</Label>
              <Input
                id="videoUrl"
                name="videoUrl"
                placeholder="https://youtube.com/..."
                value={formData.videoUrl}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdfUrl">PDF URL</Label>
              <Input
                id="pdfUrl"
                name="pdfUrl"
                placeholder="https://example.com/file.pdf"
                value={formData.pdfUrl}
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
