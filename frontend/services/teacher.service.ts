// services/teacher.service.ts
import { apiFetch } from "@/lib/api"

export const TeacherService = {
  create(payload: { user_id: string; qualification?: string }) {
    return apiFetch("/teachers", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  },

  getAll() {
    return apiFetch("/teachers")
  },

  async getByUserId(userId: string) {
    const res = await apiFetch("/teachers")
    return res.data.find((t: any) => t.user_id?._id === userId) || null
  },

  async update(teacherId: string, payload: any) {
    return apiFetch(`/teachers/${teacherId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    })
  },

  async submitQualification(payload: { qualification: string }) {
    const raw = localStorage.getItem("user")
    if (!raw) throw new Error("User not found")
    const user = JSON.parse(raw)

    const teacher = await this.getByUserId(user._id)
    if (!teacher) throw new Error("Teacher not found")

    return this.update(teacher._id, {
      qualification: payload.qualification,
      isActive: false, // luôn false khi submit
    })
  },
}
