import User from "../model/User.js";
import { randomBytes } from "crypto";
import { genSalt, hash } from "bcryptjs";
import { sendEmail } from "../config/email.js";

// Forgot Password (send email)
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("Forgot Password Request Received:", email);

  if (!email) return res.status(400).json({ ok: false, message: "Email required" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ ok: false, message: "User not found" });

    const token = randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail({
      to: user.email, // must be 'to', not 'email'
      subject: "Password Reset Request",
      html: `
        <h3>Password Reset Request</h3>
        <p>You requested a password reset. Click the link below:</p>
        <a href="${resetURL}" target="_blank">${resetURL}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
      text: `Password reset link: ${resetURL} (expires in 15 mins)`,
    });

    res.json({ ok: true, message: "Reset link sent to email" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) return res.status(400).json({ ok: false, message: "Password required" });

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ ok: false, message: "Invalid or expired token" });

    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    res.json({ ok: true, message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};
