"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LessonService } from "@/services/lesson.service"
import { QuizService } from "@/services/quiz.service"
import { Trash2 } from "lucide-react"

interface LessonQuizzesProps {
  courseId: string
}

export function LessonQuizzes({ courseId }: LessonQuizzesProps) {
  const [lessons, setLessons] = useState<any[]>([])
  const [selectedLesson, setSelectedLesson] = useState<any>(null)
  const [quizzes, setQuizzes] = useState<any[]>([])
  const [newQuestions, setNewQuestions] = useState<Record<string, any>>({})
  
  // States form thêm quiz
  const [showQuizForm, setShowQuizForm] = useState(false)
  const [quizFormData, setQuizFormData] = useState({ title: "", description: "" })
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null)

  // Fetch lessons khi load component
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await LessonService.getByCourse(courseId)
        setLessons(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchLessons()
  }, [courseId])

  // Chọn lesson
  const handleSelectLesson = async (lesson: any) => {
    setSelectedLesson(lesson)
    setNewQuestions({})
    setShowQuizForm(false)
    setEditingQuizId(null)

    try {
      const res = await QuizService.getQuizzesByLesson(lesson._id)
      setQuizzes(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  // Inline form: thay đổi input
  const handleNewQuestionChange = (quizId: string, field: string, value: string) => {
    setNewQuestions((prev) => ({
      ...prev,
      [quizId]: {
        ...prev[quizId],
        [field]: value,
        options: {
          ...prev[quizId]?.options,
          [field.startsWith("option") ? field : ""]: value
        }
      }
    }))
  }

  // Thêm câu hỏi inline
  const handleAddQuestionInline = async (quizId: string) => {
    const nq = newQuestions[quizId]
    if (!nq || !nq.question_text || !nq.correct_answer || !nq.options) return alert("Fill all fields")

    const options = [nq.options.optionA, nq.options.optionB, nq.options.optionC, nq.options.optionD]
    const correct_answer = nq.correct_answer
    if (!["A","B","C","D"].includes(correct_answer)) return alert("Invalid correct answer")

    try {
      const quiz = quizzes.find((q) => q._id === quizId)
      const updatedQuestions = [...(quiz.questions || []), { question_text: nq.question_text, options, correct_answer }]
      await QuizService.updateQuiz(quizId, { ...quiz, questions: updatedQuestions })
      const res = await QuizService.getQuizzesByLesson(selectedLesson._id)
      setQuizzes(res.data)
      setNewQuestions((prev) => ({ ...prev, [quizId]: {} }))
    } catch (err) {
      console.error(err)
    }
  }

  // Xóa câu hỏi
  const handleDeleteQuestion = async (quizId: string, questionIdx: number) => {
    try {
      const quiz = quizzes.find((q) => q._id === quizId)
      if (!quiz) return
      const updatedQuestions = quiz.questions.filter((_: any, idx: number) => idx !== questionIdx)
      await QuizService.updateQuiz(quizId, { ...quiz, questions: updatedQuestions })
      const res = await QuizService.getQuizzesByLesson(selectedLesson._id)
      setQuizzes(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  // Thay đổi input form thêm quiz
  const handleQuizFormChange = (field: string, value: string) => {
    setQuizFormData(prev => ({ ...prev, [field]: value }))
  }

  // Thêm hoặc update quiz
  const handleAddOrUpdateQuiz = async () => {
    if (!selectedLesson) return alert("Select a lesson first")
    if (!quizFormData.title) return alert("Enter quiz title")
    try {
      if (editingQuizId) {
        await QuizService.updateQuiz(editingQuizId, { ...quizFormData, lesson_id: selectedLesson._id })
      } else {
        await QuizService.createQuiz({ ...quizFormData, lesson_id: selectedLesson._id, questions: [] })
      }
      const res = await QuizService.getQuizzesByLesson(selectedLesson._id)
      setQuizzes(res.data)
      setShowQuizForm(false)
      setQuizFormData({ title: "", description: "" })
      setEditingQuizId(null)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Select a Lesson to Manage Quizzes</h3>
      <div className="flex gap-2">
        {lessons.map((lesson) => (
          <Button
            key={lesson._id}
            variant={selectedLesson?._id === lesson._id ? "default" : "outline"}
            onClick={() => handleSelectLesson(lesson)}
          >
            {lesson.title}
          </Button>
        ))}
      </div>

      {selectedLesson && (
        <>
          {quizzes.map((quiz) => (
            <Card key={quiz._id}>
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{quiz.description}</p>

                {quiz.questions.map((q: any, idx: number) => (
                  <div key={idx} className="p-2 border rounded space-y-1">
                    <p className="font-medium">{q.question_text} (Answer: {q.correct_answer})</p>
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt: string, i: number) => (
                        <span
                          key={i}
                          className={`p-1 rounded border ${q.correct_answer === ["A","B","C","D"][i] ? "bg-green-200" : ""}`}
                        >
                          {["A","B","C","D"][i]}: {opt}
                        </span>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteQuestion(quiz._id, idx)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                {/* Form thêm câu hỏi inline */}
                <div className="mt-2 p-2 border rounded space-y-2">
                  <h4 className="font-medium">Add New Question</h4>
                  <Input
                    placeholder="Question text"
                    value={newQuestions[quiz._id]?.question_text || ""}
                    onChange={(e) => handleNewQuestionChange(quiz._id, "question_text", e.target.value)}
                  />
                  {["A","B","C","D"].map((label) => (
                    <Input
                      key={label}
                      placeholder={`Option ${label}`}
                      value={newQuestions[quiz._id]?.options?.[`option${label}`] || ""}
                      onChange={(e) => handleNewQuestionChange(quiz._id, `option${label}`, e.target.value)}
                    />
                  ))}
                  <Input
                    placeholder="Correct answer (A/B/C/D)"
                    value={newQuestions[quiz._id]?.correct_answer || ""}
                    onChange={(e) => handleNewQuestionChange(quiz._id, "correct_answer", e.target.value)}
                  />
                  <Button size="sm" onClick={() => handleAddQuestionInline(quiz._id)}>Add Question</Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Nút thêm quiz mới */}
          <Button onClick={() => setShowQuizForm(true)} className="mt-2">
            Add New Quiz
          </Button>

          {/* Form thêm quiz */}
          {showQuizForm && (
            <Card className="mt-2 p-4 space-y-2 border">
              <h4 className="font-medium">{editingQuizId ? "Edit Quiz" : "Add New Quiz"}</h4>
              <Input
                placeholder="Quiz title"
                value={quizFormData.title}
                onChange={(e) => handleQuizFormChange("title", e.target.value)}
              />
              <Input
                placeholder="Quiz description"
                value={quizFormData.description}
                onChange={(e) => handleQuizFormChange("description", e.target.value)}
              />
              <div className="flex gap-2 mt-2">
                <Button onClick={handleAddOrUpdateQuiz}>
                  {editingQuizId ? "Update Quiz" : "Create Quiz"}
                </Button>
                <Button variant="outline" onClick={() => setShowQuizForm(false)}>Cancel</Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
