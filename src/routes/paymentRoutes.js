// backend/src/routes/paymentRoutes.js
import express from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} from "../controllers/PaymentController.js";

const router = express.Router();

router.post("/", createPayment);
router.get("/", getAllPayments); // ?enrollment_id=...
router.get("/:id", getPaymentById);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

export default router;