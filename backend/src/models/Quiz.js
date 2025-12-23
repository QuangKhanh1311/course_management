// backend/src/models/Quiz.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question_text: { type: String, required: true },
  options: { type: [String], required: true }, // [A, B, C, D]
  correct_answer: { type: String, required: true }, // "A" | "B" | "C" | "D"
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  lesson_id: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
  questions: [questionSchema],
});

export default mongoose.model("Quiz", quizSchema);
