import { config } from "dotenv";
config(); // load .env variables first

import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP connection error:", err);
  } else {
    console.log("SMTP ready to send emails ✅");
  }
});

// Helper function to send email
export const sendEmail = async ({ to, subject, html, text }) => {
  if (!to) throw new Error("No recipient provided for email"); // important
  try {
    await transporter.sendMail({
      from: `"Tailor Site" <${process.env.SMTP_USER}>`,
      to, // correct field
      subject,
      html,
      text,
    });
    console.log("✅ Email sent to:", to);
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    throw err;
  }
};

export default transporter;
