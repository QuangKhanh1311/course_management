// backend/src/models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  enrollment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enrollment",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  method: {
    type: String,
    enum: ["momo", "vnpay", "paypal", "cash"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Payment", paymentSchema);