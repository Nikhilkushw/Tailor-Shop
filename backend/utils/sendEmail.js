import { createTransport } from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  if (!email) throw new Error("No recipient email provided");

  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Tailor Site" <${process.env.SMTP_USER}>`,
    to: email, // must be valid
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
  console.log("✅ Email sent to:", email);
};
