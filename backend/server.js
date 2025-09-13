import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import userRouter from "./route/user.route.js";
import transporter from "./config/email.js";
import serviceRouter from "./route/service.route.js";
import offerRoutes from "./route/offer.model.js";
import workImageRoutes from "./route/work.route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Static file serving (uploads public)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ DB connect
connectDB();

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
app.use("/api/user", userRouter);
app.use("/api/services", serviceRouter)
app.use("/api/offers", offerRoutes);
app.use("/api/work-images", workImageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
