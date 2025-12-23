"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { LessonService } from "@/services/lesson.service"
import { QuizService } from "@/services/quiz.service"
import { QuizResultService } from "@/services/quizResult.service"

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string

  const [studentId, setStudentId] = useState<string | null>(null)
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null)
  const [quiz, setQuiz] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState<boolean[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const letters = ["A","B","C","D"] // map index -> letter

  // Lấy studentId từ localStorage
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

  // Fetch lesson + quiz
 // Fetch lesson + quiz
useEffect(() => {
  if (!studentId) return

  const fetchLessonAndQuiz = async () => {
    try {
      setIsLoading(true)

      const lessonsRes = await LessonService.getByCourse(courseId)
      const lessons = lessonsRes.data.sort((a: any, b: any) => a.order - b.order)
      if (lessons.length === 0) {
        alert("Course này chưa có bài học")
        router.push("/student/courses")
        return
      }

      const lesson = lessons[0]
      setCurrentLessonId(lesson._id)

      const quizRes = await QuizService.getQuizzesByLesson(lesson._id)
      // Nếu bài học chưa có quiz thì redirect
      if (!quizRes.data || quizRes.data.length === 0) {
        alert("Bài học này chưa có quiz")
        router.push(`/student/courses/${courseId}/learn`)
        return
      }

      const lessonQuiz = quizRes.data[0]
      setQuiz(lessonQuiz)
      setAnswers(new Array(lessonQuiz.questions.length).fill(-1))
      setResults(new Array(lessonQuiz.questions.length).fill(false))
    } catch (err) {
      console.error(err)
      alert("Không thể tải quiz")
      router.push(`/student/courses/${courseId}`)
    } finally {
      setIsLoading(false)
    }
  }

  fetchLessonAndQuiz()
}, [courseId, studentId, router])

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    if (submitted) return
    const newAnswers = [...answers]
    newAnswers[questionIndex] = answerIndex
    setAnswers(newAnswers)
  }

  const handleSubmitQuiz = async () => {
    if (!quiz || !studentId) return

    const tempResults = quiz.questions.map(
      (q: any, i: number) => letters[answers[i]] === q.correct_answer
    )
    const correctCount = tempResults.filter(Boolean).length
    const calculatedScore = Math.round((correctCount / quiz.questions.length) * 100)

    setResults(tempResults)
    setScore(calculatedScore)
    setSubmitted(true)

    try {
      await QuizResultService.create({
        quiz_id: quiz._id,
        student_id: studentId,
        score: calculatedScore,
        answers,
      })
    } catch (err) {
      console.error("Không thể lưu kết quả quiz:", err)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (isLoading || !quiz) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-3xl font-bold text-foreground">Quiz Completed</h2>
            <p className="text-muted-foreground">
              You scored {score}% ({results.filter(Boolean).length}/{quiz.questions.length} correct)
            </p>
          </CardContent>
        </Card>

        {quiz.questions.map((q: any, i: number) => {
          const selected = answers[i]
          const isCorrect = results[i]
          return (
            <Card key={i} className={`border ${isCorrect ? "border-green-500" : "border-red-500"}`}>
              <CardContent className="space-y-2">
                <h3 className="font-semibold">{q.question_text}</h3>
                <div className="space-y-1">
                  {q.options.map((opt: string, idx: number) => {
                    const optionLetter = letters[idx]
                    const bg =
                      selected === idx
                        ? optionLetter === q.correct_answer
                          ? "bg-green-200"
                          : "bg-red-200"
                        : ""
                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded border border-gray-300 ${bg}`}
                      >
                        {opt}{" "}
                        {optionLetter === q.correct_answer && <span className="text-green-600 font-bold">✔</span>}
                        {selected === idx && optionLetter !== q.correct_answer && <span className="text-red-600 font-bold">✖</span>}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}

        <Button
          variant="outline"
          onClick={() => {
            setCurrentQuestion(0)
            setAnswers(new Array(quiz.questions.length).fill(-1))
            setResults(new Array(quiz.questions.length).fill(false))
            setSubmitted(false)
          }}
          className="flex-1"
        >
          Retake Quiz
        </Button>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
          <CardDescription>
            Question {currentQuestion + 1} of {quiz.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{question.question_text}</h3>

            <RadioGroup
              value={String(answers[currentQuestion])}
              onValueChange={(value) => handleAnswerChange(currentQuestion, Number(value))}
            >
              <div className="space-y-3">
                {question.options.map((option: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem value={String(index)} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900 dark:text-blue-100">
              Select an answer and click Next to continue. You can review your answers before submitting.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="flex-1 bg-transparent"
            >
              Previous
            </Button>
            {currentQuestion === quiz.questions.length - 1 ? (
              <Button onClick={handleSubmitQuiz} disabled={answers.includes(-1)} className="flex-1">
                Submit Quiz
              </Button>
            ) : (
              <Button onClick={handleNextQuestion} disabled={answers[currentQuestion] === -1} className="flex-1">
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
