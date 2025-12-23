"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string
  const [course, setCourse] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Mock course data
    const mockCourse = {
      id: courseId,
      title: "React Fundamentals",
      price: 49.99,
      teacher: "Jane Teacher",
    }
    setCourse(mockCourse)
  }, [courseId])

  const handlePayment = async () => {
    if (!course) return
    setIsProcessing(true)
    try {
      // Giả lập delay thanh toán giống MoMo
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Lưu vào localStorage (giả lập enrollment)
      const enrolled = JSON.parse(localStorage.getItem("enrolledCourses") || "[]")
      if (!enrolled.includes(courseId)) {
        enrolled.push(courseId)
        localStorage.setItem("enrolledCourses", JSON.stringify(enrolled))
      }

      alert("Thanh toán thành công! Bạn đã có quyền truy cập khóa học.")
      router.push(`/student/courses/${courseId}/learn`)
    } catch (err) {
      console.error(err)
      alert("Thanh toán thất bại")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!course) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="p-6 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="mb-4">
          <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
          <CardDescription>Giá: ${course.price.toFixed(2)}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-500 dark:text-blue-300" />
            <span className="text-sm text-blue-900 dark:text-blue-100">
              Thanh toán an toàn qua MoMo
            </span>
          </div>

          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg"
            size="lg"
          >
            {isProcessing ? "Đang xử lý..." : `Thanh toán $${course.price.toFixed(2)} bằng MoMo`}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-2">
            Bằng cách bấm nút thanh toán, bạn đồng ý với <span className="underline">Điều khoản dịch vụ</span>.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
