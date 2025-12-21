// backend/src/routes/quizRoutes.js
import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} from "../controllers/QuizController.js";

const router = express.Router();

router.post("/", createQuiz);
router.get("/", getAllQuizzes); // ?lesson_id=... để filter
router.get("/:id", getQuizById);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;