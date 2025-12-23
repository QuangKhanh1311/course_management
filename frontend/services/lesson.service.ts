import { apiFetch } from "@/lib/api"

export const LessonService = {
  create(payload: {
    title: string,
    content?: string,
    video_url?: string,
    material_url?: string,
    order: number,
    course_id: string
  }) {
    return apiFetch("/lessons", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  },

getByCourse(courseId: string) {
  return apiFetch(`/lessons?course_id=${courseId}`)
},


  getById(lessonId: string) {
    return apiFetch(`/lessons/${lessonId}`)
  },

  update(lessonId: string, payload: any) {
    return apiFetch(`/lessons/${lessonId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    })
  },

  delete(lessonId: string) {
    return apiFetch(`/lessons/${lessonId}`, {
      method: "DELETE",
    })
  }
}
