import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { courseId, userId } = await request.json()

    // Mock payment processing
    // In production, integrate with Stripe API
    const paymentIntent = {
      id: `pi_${Date.now()}`,
      amount: 4999, // $49.99 in cents
      currency: "usd",
      status: "succeeded",
      courseId,
      userId,
      createdAt: new Date(),
    }

    return NextResponse.json(paymentIntent)
  } catch (error) {
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}
