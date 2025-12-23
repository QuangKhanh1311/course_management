import { apiFetch } from "@/lib/api";

export const QuizResultService = {
  // Submit kết quả quiz
  create: (payload: { quiz_id: string; student_id: string; score: number; answers?: string[] }) => {
    return apiFetch("/quiz-results", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Lấy tất cả kết quả, filter bằng student_id hoặc quiz_id
  getAll: (query?: { student_id?: string; quiz_id?: string }) => {
    const params = new URLSearchParams(query as any).toString();
    return apiFetch(`/quiz-results${params ? `?${params}` : ""}`);
  },

  // **Lấy kết quả lần trước của student cho 1 quiz**
  getByQuizAndStudent: async (quiz_id: string, student_id: string) => {
    return QuizResultService.getAll({ quiz_id, student_id });
  },

  // Lấy kết quả theo ID
  getById: (id: string) => {
    return apiFetch(`/quiz-results/${id}`);
  },

  // Cập nhật kết quả
  update: (id: string, payload: any) => {
    return apiFetch(`/quiz-results/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  // Xóa kết quả
  delete: (id: string) => {
    return apiFetch(`/quiz-results/${id}`, {
      method: "DELETE",
    });
  },
};
