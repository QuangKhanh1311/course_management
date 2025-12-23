import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import cors from 'cors';

// Import routes
import userRoutes from "./routes/userRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import quizResultRoutes from "./routes/quizResultRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true,
}));

// Định tuyến API
app.use("/api/users", userRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/quiz-results", quizResultRoutes);
app.use("/api/payments", paymentRoutes);

// Route gốc để test
app.get("/", (req, res) => {
  res.send("Course Management API is running!");
});

// Khởi động server sau khi kết nối DB
async function startServer() {
  try {
    await connectDB();
    console.log("Success connect to Database");

    app.listen(PORT, () => {
      console.log(`Server bắt đầu trên cổng ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to Database:", error);
    process.exit(1);
  }
}

startServer();