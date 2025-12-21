// backend/src/routes/quizResultRoutes.js
import express from "express";
import {
  createQuizResult,
  getAllQuizResults,
  getQuizResultById,
  updateQuizResult,
  deleteQuizResult,
} from "../controllers/QuizResultController.js";

const router = express.Router();

router.post("/", createQuizResult);
router.get("/", getAllQuizResults); // ?student_id=... hoặc ?quiz_id=...
router.get("/:id", getQuizResultById);
router.put("/:id", updateQuizResult);
router.delete("/:id", deleteQuizResult);

export default router;