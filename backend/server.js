import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import userRouter from "./route/user.route.js";
import transporter from "./config/email.js";
import serviceRouter from "./route/service.route.js";
import offerRoutes from "./route/offer.route.js"; // ✅ route hona chahiye
import workImageRoutes from "./route/work.route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Proper __dirname resolve for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ DB connect
connectDB();

// ✅ Root health check (important for Render)
app.get("/", (req, res) => {
  res.send("✅ Tailor Shop API is running...");
});

// ✅ Contact form API
const sendMail = async (mailOptions) => {
  if (!transporter) throw new Error("Email transporter not initialized");
  return transporter.sendMail(mailOptions);
};

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    await sendMail({
      from: `${name} <${email}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `🧵 New Tailor Enquiry from ${name}`,
      text: `
You have received a new enquiry:

👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}

💬 Message: ${message}
      `,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("❌ Contact form email failed:", err);
    res.status(500).json({ ok: false, error: "Failed to send email" });
  }
});

// ✅ Routes
app.get("/", (req, res) => {
  res.send("✅ Tailor Shop Backend is running!");
});
app.use("/api/user", userRouter);
app.use("/api/services", serviceRouter);
app.use("/api/offers", offerRoutes);
app.use("/api/work-images", workImageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
