// backend/src/models/Enrollment.js
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  enrolled_at: {
    type: Date,
    default: Date.now,
  },
});

// Đảm bảo 1 học viên chỉ ghi danh 1 khóa học 1 lần
enrollmentSchema.index({ course_id: 1, student_id: 1 }, { unique: true });

export default mongoose.model("Enrollment", enrollmentSchema);