import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String }, // ✅ Cloudinary ka URL as String
  },
  { timestamps: true }
);

const workSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    sampleImage: { type: String }, // ✅ Cloudinary ka URL as String
    items: [itemSchema],
  },
  { timestamps: true }
);

const Work = mongoose.model("Work", workSchema);
export default Work;
