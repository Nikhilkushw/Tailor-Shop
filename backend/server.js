import express from 'express'; // or const express = require('express') if CommonJS
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import connectDB from './config/db.js';
import userRouter from './route/user.route.js'; // corrected import

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Contact form API
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    await transporter.sendMail({
      from: `${name} <${email}>`, // customer ka email
      to: process.env.RECEIVER_EMAIL, // tumhe aayega
      replyTo: email, // reply direct customer ko chala jaye
      subject: `🧵 New Tailor Enquiry from ${name}`,
      text: `
  You have received a new enquiry from your Tailor Shop website:

  👤 Name: ${name}
  📧 Email: ${email}
  📞 Phone: ${phone}

  💬 Message:
  ${message}

  ------
  Please respond to the customer as soon as possible.
  `,
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color:#2c3e50;">🧵 New Customer Enquiry</h2>
      <p>You have received a new enquiry from your <strong>Tailor Shop</strong> website.</p>

      <table style="width:100%; border-collapse: collapse; margin: 15px 0;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">👤 <strong>Name</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">📧 <strong>Email</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">📞 <strong>Phone</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
        </tr>
      </table>

      <h3 style="margin-top:20px;">💬 Message:</h3>
      <p style="background:#f9f9f9; padding:10px; border-left:4px solid #2c3e50;">
        ${message}
      </p>

      <hr style="margin:20px 0;"/>
      <p style="font-size: 14px; color:#555;">
        ✨ Please respond to the customer as soon as possible.<br/>
        Tailor Shop Enquiry System
      </p>
    </div>
  `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Failed to send email" });
  }
});

// User routes
app.use("/api/user", userRouter); // use the user routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
