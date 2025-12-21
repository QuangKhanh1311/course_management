// backend/src/controllers/QuizController.js
import Quiz from "../models/Quiz.js";

// Create quiz mới (với questions nhúng)
export const createQuiz = async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json({ success: true, data: newQuiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all quizzes (filter by lesson_id qua query)
export const getAllQuizzes = async (req, res) => {
  try {
    const query = req.query.lesson_id ? { lesson_id: req.query.lesson_id } : {};
    const quizzes = await Quiz.find(query);
    res.status(200).json({ success: true, data: quizzes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz không tồn tại" });
    }
    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update quiz (cập nhật questions nhúng)
export const updateQuiz = async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQuiz) {
      return res.status(404).json({ success: false, message: "Quiz không tồn tại" });
    }
    res.status(200).json({ success: true, data: updatedQuiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete quiz
export const deleteQuiz = async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) {
      return res.status(404).json({ success: false, message: "Quiz không tồn tại" });
    }
    res.status(200).json({ success: true, message: "Quiz đã xóa" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};