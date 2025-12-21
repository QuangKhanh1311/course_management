// backend/src/models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Course", courseSchema);