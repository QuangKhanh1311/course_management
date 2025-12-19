import { type NextRequest, NextResponse } from "next/server"
import { signToken } from "@/lib/auth"

// Mock database - in production, use real database
const users = [
  {
    id: "1",
    email: "student@example.com",
    password: "cGFzc3dvcmQ=", // base64 encoded "password"
    name: "John Student",
    role: "student",
  },
  {
    id: "2",
    email: "instructor@example.com",
    password: "cGFzc3dvcmQ=",
    name: "Jane Instructor",
    role: "instructor",
  },
  {
    id: "3",
    email: "admin@example.com",
    password: "cGFzc3dvcmQ=",
    name: "Admin User",
    role: "admin",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = users.find((u) => u.email === email)

    if (!user || Buffer.from(password).toString("base64") !== user.password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return NextResponse.json({
      token,
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
