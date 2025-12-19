"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Share2 } from "lucide-react"
import { useRef } from "react"

export default function CertificatePage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const certificateRef = useRef<HTMLDivElement>(null)

  const courseName = "React Fundamentals"
  const studentName = "John Student"
  const completionDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleDownload = () => {
    // In production, use a library like html2pdf or jsPDF
    window.print()
  }

  const handleShare = () => {
    const text = `I just completed the "${courseName}" course on EduHub! Check it out.`
    if (navigator.share) {
      navigator.share({
        title: "Course Certificate",
        text: text,
      })
    } else {
      alert("Share this certificate: " + text)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Certificate */}
        <div
          ref={certificateRef}
          className="mb-8 bg-white dark:bg-slate-900 p-12 rounded-lg shadow-lg border-4 border-primary"
        >
          <div className="text-center space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-primary">Certificate of Completion</h1>
              <div className="w-24 h-1 bg-primary mx-auto" />
            </div>

            {/* Body */}
            <div className="space-y-6 py-8">
              <p className="text-lg text-muted-foreground">This is to certify that</p>

              <h2 className="text-4xl font-bold text-foreground border-b-2 border-primary pb-4">{studentName}</h2>

              <div className="space-y-2">
                <p className="text-lg text-muted-foreground">has successfully completed the course</p>
                <h3 className="text-3xl font-semibold text-foreground">{courseName}</h3>
              </div>

              <p className="text-muted-foreground">
                Demonstrating proficiency in the course material and meeting all requirements for completion.
              </p>

              <div className="flex justify-around pt-8">
                <div className="text-center">
                  <div className="w-32 h-1 bg-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Instructor Signature</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground mb-2">{completionDate}</p>
                  <p className="text-sm text-muted-foreground">Date of Completion</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-xs text-muted-foreground border-t pt-4">
              <p>Certificate ID: CERT-{Date.now()}</p>
              <p>EduHub Learning Platform</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button onClick={handleDownload} className="gap-2">
            <Download className="w-4 h-4" />
            Download Certificate
          </Button>
          <Button onClick={handleShare} variant="outline" className="gap-2 bg-transparent">
            <Share2 className="w-4 h-4" />
            Share Certificate
          </Button>
          <Button variant="outline" onClick={() => router.push("/student/my-courses")}>
            Back to Courses
          </Button>
        </div>

        {/* Info Card */}
        <Card className="mt-8 p-6">
          <h3 className="font-semibold text-foreground mb-2">About Your Certificate</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ This certificate verifies your completion of the course</li>
            <li>✓ You can download and share it on your resume or LinkedIn</li>
            <li>✓ Each certificate has a unique ID for verification</li>
            <li>✓ Certificates are valid indefinitely</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
