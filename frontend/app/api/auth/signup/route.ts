import { type NextRequest, NextResponse } from "next/server"
import { signToken } from "@/lib/auth"

// Mock database - in production, use real database
const users: any[] = [
  {
    id: "1",
    email: "student@example.com",
    password: "cGFzc3dvcmQ=",
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
    const { name, email, password, role } = await request.json()

    if (users.find((u) => u.email === email)) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    const newUser = {
      id: String(users.length + 1),
      email,
      password: Buffer.from(password).toString("base64"),
      name,
      role: role || "student",
    }

    users.push(newUser)

    const token = await signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    })

    return NextResponse.json({
      token,
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
