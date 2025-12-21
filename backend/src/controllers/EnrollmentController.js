// backend/src/controllers/EnrollmentController.js
import Enrollment from "../models/Enrollment.js";

// Create enrollment mới (ghi danh khóa học)
export const createEnrollment = async (req, res) => {
  try {
    const newEnrollment = new Enrollment(req.body);
    await newEnrollment.save();
    res.status(201).json({ success: true, data: newEnrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all enrollments (có thể filter by student_id hoặc course_id qua query)
export const getAllEnrollments = async (req, res) => {
  try {
    const query = {};
    if (req.query.student_id) query.student_id = req.query.student_id;
    if (req.query.course_id) query.course_id = req.query.course_id;
    const enrollments = await Enrollment.find(query).populate(["course_id", "student_id"]);
    res.status(200).json({ success: true, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get enrollment by ID
export const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate(["course_id", "student_id"]);
    if (!enrollment) {
      return res.status(404).json({ success: false, message: "Enrollment không tồn tại" });
    }
    res.status(200).json({ success: true, data: enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete enrollment (hủy ghi danh)
export const deleteEnrollment = async (req, res) => {
  try {
    const deletedEnrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!deletedEnrollment) {
      return res.status(404).json({ success: false, message: "Enrollment không tồn tại" });
    }
    res.status(200).json({ success: true, message: "Enrollment đã xóa" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};