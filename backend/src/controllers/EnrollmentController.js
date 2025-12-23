import Enrollment from "../models/Enrollment.js";

// Create enrollment (ghi danh khóa học)
export const createEnrollment = async (req, res) => {
  try {
    const { course_id, user_id } = req.body;

    if (!course_id || !user_id) {
      return res.status(400).json({ success: false, message: "course_id và user_id bắt buộc" });
    }

    // Kiểm tra xem học viên đã enroll chưa
    const exists = await Enrollment.findOne({ course_id, user_id });
    if (exists) {
      return res.status(400).json({ success: false, message: "Bạn đã ghi danh khóa học này rồi" });
    }

    const newEnrollment = new Enrollment({ course_id, user_id });
    await newEnrollment.save();
    res.status(201).json({ success: true, data: newEnrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all enrollments (filter bằng user_id hoặc course_id)
export const getAllEnrollments = async (req, res) => {
  try {
    const query = {};
    if (req.query.user_id) query.user_id = req.query.user_id;
    if (req.query.course_id) query.course_id = req.query.course_id;

    const enrollments = await Enrollment.find(query).populate(["course_id", "user_id"]);
    res.status(200).json({ success: true, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get enrollment by ID
export const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate(["course_id", "user_id"]);
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
