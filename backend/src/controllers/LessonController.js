// backend/src/controllers/LessonController.js
import Lesson from "../models/Lesson.js";

// Create lesson mới
export const createLesson = async (req, res) => {
  try {
    const newLesson = new Lesson(req.body);
    await newLesson.save();
    res.status(201).json({ success: true, data: newLesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all lessons (có thể filter by course_id qua query)
export const getAllLessons = async (req, res) => {
  try {
    const query = req.query.course_id ? { course_id: req.query.course_id } : {};
    const lessons = await Lesson.find(query).sort("order");
    res.status(200).json({ success: true, data: lessons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get lesson by ID
export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson không tồn tại" });
    }
    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update lesson
export const updateLesson = async (req, res) => {
  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLesson) {
      return res.status(404).json({ success: false, message: "Lesson không tồn tại" });
    }
    res.status(200).json({ success: true, data: updatedLesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete lesson
export const deleteLesson = async (req, res) => {
  try {
    const deletedLesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!deletedLesson) {
      return res.status(404).json({ success: false, message: "Lesson không tồn tại" });
    }
    res.status(200).json({ success: true, message: "Lesson đã xóa" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};