// backend/src/controllers/QuizResultController.js
import QuizResult from "../models/QuizResult.js";

// Create quiz result mới (submit kết quả)
export const createQuizResult = async (req, res) => {
  try {
    const newResult = new QuizResult(req.body);
    await newResult.save();
    res.status(201).json({ success: true, data: newResult });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all quiz results (filter by student_id hoặc quiz_id)
export const getAllQuizResults = async (req, res) => {
  try {
    const query = {};
    if (req.query.student_id) query.student_id = req.query.student_id;
    if (req.query.quiz_id) query.quiz_id = req.query.quiz_id;
    const results = await QuizResult.find(query);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get quiz result by ID
export const getQuizResultById = async (req, res) => {
  try {
    const result = await QuizResult.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: "QuizResult không tồn tại" });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update quiz result (nếu cần chỉnh sửa score)
export const updateQuizResult = async (req, res) => {
  try {
    const updatedResult = await QuizResult.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedResult) {
      return res.status(404).json({ success: false, message: "QuizResult không tồn tại" });
    }
    res.status(200).json({ success: true, data: updatedResult });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete quiz result
export const deleteQuizResult = async (req, res) => {
  try {
    const deletedResult = await QuizResult.findByIdAndDelete(req.params.id);
    if (!deletedResult) {
      return res.status(404).json({ success: false, message: "QuizResult không tồn tại" });
    }
    res.status(200).json({ success: true, message: "QuizResult đã xóa" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};