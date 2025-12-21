// backend/src/models/Teacher.js
import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  qualification: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // 1 user chỉ làm teacher 1 lần
  },
});

export default mongoose.model("Teacher", teacherSchema);