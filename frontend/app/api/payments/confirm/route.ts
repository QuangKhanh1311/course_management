import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, courseId, userId } = await request.json()

    // Mock payment confirmation
    // In production, verify with Stripe
    const enrollment = {
      id: `enr_${Date.now()}`,
      courseId,
      userId,
      enrolledAt: new Date(),
      paymentId: paymentIntentId,
      status: "active",
    }

    return NextResponse.json(enrollment)
  } catch (error) {
    return NextResponse.json({ error: "Enrollment failed" }, { status: 500 })
  }
}
