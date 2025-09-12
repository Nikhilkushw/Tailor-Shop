import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    number: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Role-based access
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // Forgot password
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date },
  },
  { timestamps: true }
);

export default model("User", userSchema);
