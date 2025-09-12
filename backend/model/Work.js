import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Store image URL/path
});

const workImageSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    sampleImage: { type: String, required: true }, // Store image URL/path
    items: [itemSchema],
  },
  { timestamps: true }
);

const WorkImage = mongoose.model("WorkImage", workImageSchema);
export default WorkImage;
