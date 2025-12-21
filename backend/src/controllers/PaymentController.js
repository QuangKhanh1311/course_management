// backend/src/controllers/PaymentController.js
import Payment from "../models/Payment.js";

// Create payment mới (cho enrollment)
export const createPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    await newPayment.save();
    res.status(201).json({ success: true, data: newPayment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all payments (filter by enrollment_id)
export const getAllPayments = async (req, res) => {
  try {
    const query = req.query.enrollment_id ? { enrollment_id: req.query.enrollment_id } : {};
    const payments = await Payment.find(query);
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment không tồn tại" });
    }
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update payment (cập nhật status, ví dụ sau khi thanh toán thành công)
export const updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPayment) {
      return res.status(404).json({ success: false, message: "Payment không tồn tại" });
    }
    res.status(200).json({ success: true, data: updatedPayment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete payment
export const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ success: false, message: "Payment không tồn tại" });
    }
    res.status(200).json({ success: true, message: "Payment đã xóa" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};