// backend/src/controllers/TeacherController.js
import Teacher from "../models/Teacher.js";

// Create teacher mới (liên kết với user_id)
export const createTeacher = async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();
    res.status(201).json({ success: true, data: newTeacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("user_id");
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate("user_id");
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher không tồn tại" });
    }
    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update teacher
export const updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeacher) {
      return res.status(404).json({ success: false, message: "Teacher không tồn tại" });
    }
    res.status(200).json({ success: true, data: updatedTeacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete teacher
export const deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ success: false, message: "Teacher không tồn tại" });
    }
    res.status(200).json({ success: true, message: "Teacher đã xóa" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};