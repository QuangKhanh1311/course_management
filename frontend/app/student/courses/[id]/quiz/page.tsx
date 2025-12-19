"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const [quiz, setQuiz] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    // Mock quiz data
    const mockQuiz = {
      id: "quiz-1",
      title: "React Fundamentals Quiz",
      description: "Test your knowledge of React basics",
      passingScore: 70,
      questions: [
        {
          id: "q1",
          question: "What is React?",
          options: [
            "A JavaScript library for building user interfaces",
            "A Python framework",
            "A CSS preprocessor",
            "A database management system",
          ],
          correctAnswer: 0,
          explanation:
            "React is a JavaScript library developed by Facebook for building user interfaces with reusable components.",
        },
        {
          id: "q2",
          question: "What is JSX?",
          options: ["A type of database", "A syntax extension to JavaScript", "A CSS framework", "A testing library"],
          correctAnswer: 1,
          explanation: "JSX is a syntax extension to JavaScript that allows you to write HTML-like code in JavaScript.",
        },
        {
          id: "q3",
          question: "What is the purpose of state in React?",
          options: [
            "To store static data",
            "To manage component data that can change",
            "To define CSS styles",
            "To handle HTTP requests",
          ],
          correctAnswer: 1,
          explanation: "State is used to manage data that can change over time and trigger re-renders when updated.",
        },
        {
          id: "q4",
          question: "What are props in React?",
          options: [
            "Properties passed from parent to child components",
            "Methods for styling components",
            "Database queries",
            "Server-side functions",
          ],
          correctAnswer: 0,
          explanation: "Props are arguments passed into React components, similar to function parameters.",
        },
        {
          id: "q5",
          question: "What is a React Hook?",
          options: [
            "A way to hook into React features",
            "A CSS property",
            "A database connection",
            "A testing framework",
          ],
          correctAnswer: 0,
          explanation: "Hooks are functions that let you use state and other React features in functional components.",
        },
      ],
    }

    setQuiz(mockQuiz)
    setAnswers(new Array(mockQuiz.questions.length).fill(-1))
  }, [courseId])

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = answerIndex
    setAnswers(newAnswers)
  }

  const handleSubmitQuiz = () => {
    if (quiz) {
      let correctCount = 0
      quiz.questions.forEach((question: any, index: number) => {
        if (answers[index] === question.correctAnswer) {
          correctCount++
        }
      })

      const calculatedScore = Math.round((correctCount / quiz.questions.length) * 100)
      setScore(calculatedScore)
      setPassed(calculatedScore >= quiz.passingScore)
      setSubmitted(true)
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

  if (!quiz) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardContent className="pt-12 text-center space-y-6">
            {passed ? (
              <>
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Congratulations!</h2>
                  <p className="text-muted-foreground">You passed the quiz</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-16 h-16 text-destructive mx-auto" />
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Quiz Not Passed</h2>
                  <p className="text-muted-foreground">You need {quiz.passingScore}% to pass</p>
                </div>
              </>
            )}

            <div className="bg-muted p-6 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Your Score</p>
              <p className="text-4xl font-bold text-foreground">{score}%</p>
            </div>

            <div className="space-y-2">
              {quiz.questions.map((question: any, index: number) => (
                <div key={question.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  {answers[index] === question.correctAnswer ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  )}
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{question.question}</p>
                    {answers[index] !== question.correctAnswer && (
                      <p className="text-xs text-muted-foreground mt-1">{question.explanation}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              {passed && (
                <Button onClick={() => router.push(`/student/courses/${courseId}/certificate`)} className="flex-1">
                  Get Certificate
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentQuestion(0)
                  setAnswers(new Array(quiz.questions.length).fill(-1))
                  setSubmitted(false)
                }}
                className="flex-1"
              >
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
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
            <h3 className="text-lg font-semibold text-foreground">{question.question}</h3>

            <RadioGroup
              value={String(answers[currentQuestion])}
              onValueChange={(value) => handleAnswerChange(currentQuestion, Number.parseInt(value))}
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
