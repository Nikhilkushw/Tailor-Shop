// src/pages/ResetPassword.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams(); // get token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const API_URL = "https://tailor-shop-1.onrender.com/api/user";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters");
      setIsError(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      setIsError(true);
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setIsError(false);

      await axios.post(`${API_URL}/reset-password/${token}`, { password });

      setMessage("✅ Password reset successful! Redirecting...");
      setIsError(false);

      // Redirect after success
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Reset password error:", err);
      setMessage(err.response?.data?.message || "❌ Something went wrong");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Reset Your Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 mb-4 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full p-3 mb-4 border rounded-md"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
