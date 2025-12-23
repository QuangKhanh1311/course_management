// frontend/services/quiz.service.ts
import { apiFetch } from "@/lib/api";

export const QuizService = {
  // Lấy quiz theo lesson_id
  getQuizzesByLesson: (lessonId: string) => {
    return apiFetch(`/quizzes?lesson_id=${lessonId}`, { method: "GET" });
  },

  getQuizById: (id: string) => {
    return apiFetch(`/quizzes/${id}`, { method: "GET" });
  },

  createQuiz: (payload: any) => {
    return apiFetch("/quizzes", { method: "POST", body: JSON.stringify(payload) });
  },

  updateQuiz: (id: string, payload: any) => {
    return apiFetch(`/quizzes/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  },

  deleteQuiz: (id: string) => {
    return apiFetch(`/quizzes/${id}`, { method: "DELETE" });
  },
};
