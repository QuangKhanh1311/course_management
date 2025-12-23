// frontend/services/enrollment.service.ts
import { apiFetch } from "@/lib/api";

export const EnrollmentService = {
  // Ghi danh khóa học mới
  createEnrollment: (payload: { course_id: string; user_id: string }) => {
    return apiFetch("/enrollments", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Lấy tất cả enrollments, có thể filter theo student_id hoặc course_id
  getAllEnrollments: (params?: { student_id?: string; course_id?: string }) => {
    let query = "";
    if (params) {
      const q = new URLSearchParams(params as any).toString();
      if (q) query = "?" + q;
    }
    return apiFetch(`/enrollments${query}`, {
      method: "GET",
    });
  },

  // Lấy enrollments của 1 học viên
  getEnrollmentsByUser: (student_id: string) => {
    return apiFetch(`/enrollments?student_id=${student_id}`, {
      method: "GET",
    });
  },

  // Lấy enrollment theo ID
  getEnrollmentById: (id: string) => {
    return apiFetch(`/enrollments/${id}`, {
      method: "GET",
    });
  },

  // Xóa enrollment
  deleteEnrollment: (id: string) => {
    return apiFetch(`/enrollments/${id}`, {
      method: "DELETE",
    });
  },
};
