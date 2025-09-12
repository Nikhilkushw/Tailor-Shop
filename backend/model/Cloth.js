import { Schema, model } from "mongoose";

const clothSchema = new Schema(
  {
    Type: [
      {
        type: { type: String, required: true }, // cloth type ka naam
        sampleImage: { type: String }, // ek sample image
        images: [{ type: String }], // multiple images
      },
    ],
  },
  { timestamps: true }
);

export default model("Cloth", clothSchema);
