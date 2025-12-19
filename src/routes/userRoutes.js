// backend/src/routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";

const router = express.Router();

// Đăng ký và đăng nhập
router.post("/register", registerUser);
router.post("/login", loginUser);

// CRUD users
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;