// backend/src/models/QuizResult.js
import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
  submitted_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("QuizResult", quizResultSchema);