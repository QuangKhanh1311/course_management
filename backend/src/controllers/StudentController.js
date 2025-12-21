// backend/src/controllers/StudentController.js
import Student from "../models/Student.js";

// Create student mới (liên kết với user_id)
export const createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ success: true, data: newStudent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("user_id");
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("user_id");
    if (!student) {
      return res.status(404).json({ success: false, message: "Student không tồn tại" });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: "Student không tồn tại" });
    }
    res.status(200).json({ success: true, data: updatedStudent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ success: false, message: "Student không tồn tại" });
    }
    res.status(200).json({ success: true, message: "Student đã xóa" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};