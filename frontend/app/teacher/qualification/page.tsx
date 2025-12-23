"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TeacherService } from "@/services/teacher.service"

export default function QualificationPage() {
  const router = useRouter()
  const [qualification, setQualification] = useState("")
  const [loading, setLoading] = useState(true)
  const [teacherStatus, setTeacherStatus] = useState<"none" | "pending">("none")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function check() {
      const raw = localStorage.getItem("user")
      if (!raw) {
        router.replace("/auth/login")
        return
      }

      const user = JSON.parse(raw)
      if (user.role !== "teacher") {
        router.replace("/auth/login")
        return
      }

      const teacher = await TeacherService.getByUserId(user._id)

      if (!teacher || !teacher.qualification) {
        // chưa submit
        setTeacherStatus("none")
        setLoading(false)
        return
      }

      if (teacher.isActive) {
        // đã active → dashboard
        router.replace("/teacher/dashboard")
        return
      }

      // qualification có giá trị nhưng chưa active → pending
      setQualification(teacher.qualification)
      setTeacherStatus("pending")
      setLoading(false)
    }

    check()
  }, [router])

  const handleSubmit = async () => {
    if (!qualification.trim()) return
    setSubmitting(true)

    try {
      await TeacherService.submitQualification({ qualification })
      setTeacherStatus("pending") // sau submit → pending
    } catch (err) {
      console.error(err)
      alert("Failed to submit qualification")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return null

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Teacher Qualification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teacherStatus === "pending" && (
            <div className="p-3 bg-yellow-100 text-yellow-800 rounded-md">
              Your qualification has been submitted. Please wait for admin approval.
            </div>
          )}

          <Label>Your qualification / portfolio link</Label>
          <Textarea
            placeholder="LinkedIn, CV, Google Drive, GitHub..."
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            disabled={teacherStatus === "pending"}
          />

          <Button onClick={handleSubmit} disabled={submitting || teacherStatus === "pending"}>
            {submitting ? "Submitting..." : teacherStatus === "pending" ? "Submitted" : "Submit for review"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
