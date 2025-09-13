import { createTransport } from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  if (!email) throw new Error("No recipient email provided");

  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // port 465 ke liye
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Tailor Site" <${process.env.SMTP_USER}>`,
    to: Array.isArray(email) ? email.join(", ") : email,
    subject: subject || "No Subject",
    html: message || "<p>No message provided</p>",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", email);
  } catch (err) {
    console.error("❌ Email send failed:", err.message);
    throw new Error("Email sending failed");
  }
};
