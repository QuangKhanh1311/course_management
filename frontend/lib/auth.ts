import { jwtVerify, SignJWT } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export async function signToken(payload: any) {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("7d").sign(secret)
}

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, secret)
    return verified.payload
  } catch (err) {
    return null
  }
}

export function hashPassword(password: string): string {
  // In production, use bcrypt
  return Buffer.from(password).toString("base64")
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}
