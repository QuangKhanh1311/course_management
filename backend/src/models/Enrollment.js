import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

// Đảm bảo 1 học viên chỉ ghi danh 1 khóa học 1 lần
enrollmentSchema.index({ course_id: 1, user_id: 1 }, { unique: true });

export default mongoose.model("Enrollment", enrollmentSchema);
