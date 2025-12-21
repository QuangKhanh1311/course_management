// backend/src/models/Lesson.js
import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  video_url: {
    type: String,
  },
  material_url: {
    type: String,
  },
  order: {
    type: Number,
    required: true,
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

export default mongoose.model("Lesson", lessonSchema);