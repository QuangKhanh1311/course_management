// services/course.service.ts
import { apiFetch } from "@/lib/api";

export const CourseService = {
  create(payload: {
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
    teacher_id: string;
  }) {
    return apiFetch("/courses", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getByTeacher(teacherId: string) {
    return apiFetch(`/courses/teacher-courses?teacherId=${teacherId}`);
  },

  getById(courseId: string) {
    return apiFetch(`/courses/${courseId}`);
  },

  getAll() {           // <-- Đổi từ getAllCourse() thành getAll()
    return apiFetch("/courses");
  },

  deleteCourse(courseId: string) {
    return apiFetch(`/courses/${courseId}`, {
      method: "DELETE",
    });
  },

  update(courseId: string, payload: any) {
    return apiFetch(`/courses/${courseId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }
};
