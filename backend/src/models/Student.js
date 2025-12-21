// backend/src/models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

export default mongoose.model("Student", studentSchema);