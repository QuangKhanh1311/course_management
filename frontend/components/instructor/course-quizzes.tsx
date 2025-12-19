"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"

interface CourseQuizzesProps {
  courseId: string
}

export function CourseQuizzes({ courseId }: CourseQuizzesProps) {
  const [quizzes, setQuizzes] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    passingScore: 70,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddQuiz = () => {
    if (formData.title.trim()) {
      const newQuiz = {
        id: String(Date.now()),
        ...formData,
        questions: [],
      }
      setQuizzes([...quizzes, newQuiz])
      setFormData({ title: "", passingScore: 70 })
      setShowForm(false)
    }
  }

  const handleDeleteQuiz = (id: string) => {
    setQuizzes(quizzes.filter((q) => q.id !== id))
  }

  return (
    <div className="space-y-4">
      {quizzes.length > 0 && (
        <div className="space-y-2">
          {quizzes.map((quiz) => (
            <Card key={quiz.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{quiz.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">Passing Score: {quiz.passingScore}%</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive bg-transparent"
                    onClick={() => handleDeleteQuiz(quiz.id)}
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
            <CardTitle>Create New Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Quiz Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., React Basics Quiz"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passingScore">Passing Score (%)</Label>
              <Input
                id="passingScore"
                name="passingScore"
                type="number"
                min="0"
                max="100"
                value={formData.passingScore}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddQuiz}>Create Quiz</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Quiz
        </Button>
      )}
    </div>
  )
}
