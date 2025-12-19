"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Lock } from "lucide-react"

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string
  const [course, setCourse] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    // Mock course data
    const mockCourse = {
      id: courseId,
      title: "React Fundamentals",
      price: 49.99,
      instructor: "Jane Instructor",
    }
    setCourse(mockCourse)
  }, [courseId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Mock payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Add to enrolled courses
      const enrolled = JSON.parse(localStorage.getItem("enrolledCourses") || "[]")
      if (!enrolled.includes(courseId)) {
        enrolled.push(courseId)
        localStorage.setItem("enrolledCourses", JSON.stringify(enrolled))
      }

      // Redirect to course
      router.push(`/student/courses/${courseId}/learn`)
    } catch (error) {
      console.error("Payment error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!course) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground line-clamp-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${course.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">$0.00</span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">${course.price.toFixed(2)}</span>
              </div>

              <div className="bg-muted p-3 rounded-lg flex items-start gap-2 text-xs text-muted-foreground">
                <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Your payment is secure and encrypted</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Enter your card information to complete the purchase</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="4242 4242 4242 4242"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      maxLength="19"
                      required
                    />
                    <CreditCard className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Use 4242 4242 4242 4242 for testing</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      maxLength="5"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                      maxLength="4"
                      required
                    />
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    This is a demo checkout. Use test card 4242 4242 4242 4242 with any future date and any 3-digit CVC.
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isProcessing} size="lg">
                  {isProcessing ? "Processing..." : `Pay $${course.price.toFixed(2)}`}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By completing this purchase, you agree to our Terms of Service
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
