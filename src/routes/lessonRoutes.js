// backend/src/routes/lessonRoutes.js
import express from "express";
import {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
} from "../controllers/LessonController.js";

const router = express.Router();

router.post("/", createLesson);
router.get("/", getAllLessons); // Có thể dùng ?course_id=... để filter
router.get("/:id", getLessonById);
router.put("/:id", updateLesson);
router.delete("/:id", deleteLesson);

export default router;