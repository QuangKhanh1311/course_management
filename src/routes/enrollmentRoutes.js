// backend/src/routes/enrollmentRoutes.js
import express from "express";
import {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  deleteEnrollment,
} from "../controllers/EnrollmentController.js";

const router = express.Router();

router.post("/", createEnrollment);
router.get("/", getAllEnrollments); // ?student_id=... hoặc ?course_id=...
router.get("/:id", getEnrollmentById);
router.delete("/:id", deleteEnrollment);

export default router;