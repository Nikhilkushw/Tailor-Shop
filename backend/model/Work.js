import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

const workSchema = new mongoose.Schema({
  type: { type: String, required: true },
  sampleImage: String, // relative path
  items: [itemSchema],
});

export default mongoose.model("Work", workSchema);
