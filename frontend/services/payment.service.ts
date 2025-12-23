// frontend/services/payment.service.ts
import { apiFetch } from "@/lib/api";

export const PaymentService = {
  // Tạo payment mới
  createPayment: (payload: any) => {
    return apiFetch("/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },

  // Lấy tất cả payment, có thể filter theo enrollment_id
  getAllPayments: (params?: { enrollment_id?: string }) => {
    let query = "";
    if (params) {
      const q = new URLSearchParams(params as any).toString();
      if (q) query = "?" + q;
    }
    return apiFetch(`/payments${query}`, { method: "GET" });
  },

  // Lấy payment theo ID
  getPaymentById: (id: string) => {
    return apiFetch(`/payments/${id}`, { method: "GET" });
  },

  // Cập nhật payment (ví dụ sau khi thanh toán thành công)
  updatePayment: (id: string, payload: any) => {
    return apiFetch(`/payments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },

  // Xóa payment
  deletePayment: (id: string) => {
    return apiFetch(`/payments/${id}`, { method: "DELETE" });
  },
};
