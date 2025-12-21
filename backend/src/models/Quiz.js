// backend/src/models/Quiz.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question_text: {
    type: String,
    required: true,
  },
  correct_answer: {
    type: String,
    required: true,
  },
  // Nếu sau này muốn multiple choice, có thể thêm options: [String]
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  lesson_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  questions: [questionSchema], // Nhúng trực tiếp
});

export default mongoose.model("Quiz", quizSchema);