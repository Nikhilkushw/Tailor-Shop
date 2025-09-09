"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useAuth();

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setIsForgot(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((p) => ({ ...p, [name]: value }));
  };

  // 🔹 SIGNUP
  const handleUserSignUp = async (e) => {
    e.preventDefault();
    const { name, email, number, password, confirmPassword } = signUpData;
    if (!name || !email || !number || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const endpoint = "http://localhost:5000/api/user/signup";
      const response = await axios.post(endpoint, signUpData);

      if (response.data?.token) {
        login(response.data); // ✅ context update
        navigate("/");
      }
      alert("User registered successfully!");
    } catch (err) {
      console.error("Error registering user:", err);
      alert(
        `Registration failed: ${err.response?.data?.message || err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 SIGNIN
  const handleUserSignIn = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = signInData;
      if (!email || !password) {
        alert("Please fill all fields.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        signInData
      );

      if (response.data?.token) {
        login(response.data); // ✅ context update
        navigate("/");
      }
      alert("Login successful!");
    } catch (error) {
      console.error("Error logging in:", error);
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-100 to-indigo-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
          {isForgot
            ? "Reset Password 🔑"
            : isSignIn
            ? "Welcome Back 👋"
            : "Create Account ✨"}
        </h2>

        <AnimatePresence mode="wait">
          {/* 🔹 Forgot Password */}
          {isForgot ? (
            <motion.form
              key="forgot"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("📩 Password reset link sent (implement backend)");
              }}
            >
              <input
                type="email"
                name="forgotEmail"
                placeholder="Enter your registered Email"
                required
                className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-400"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-500 text-white py-2 rounded-lg shadow-md hover:bg-purple-600 transition"
              >
                Send Reset Link
              </motion.button>
              <p className="text-sm text-gray-600 text-center">
                Remembered password?{" "}
                <button
                  type="button"
                  onClick={() => setIsForgot(false)}
                  className="text-sky-600 font-semibold hover:underline"
                >
                  Back to Sign In
                </button>
              </p>
            </motion.form>
          ) : isSignIn ? (
            // 🔹 Sign In Form
            <motion.form
              key="signin"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4"
              onSubmit={handleUserSignIn}
            >
              <input
                type="email"
                name="loginEmail"
                placeholder="Email Address"
                onChange={(e) =>
                  setSignInData({ ...signInData, email: e.target.value })
                }
                required
                className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-400"
              />
              <input
                type="password"
                name="loginPassword"
                placeholder="Password"
                onChange={(e) =>
                  setSignInData({ ...signInData, password: e.target.value })
                }
                required
                className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-400"
              />
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" /> Remember me
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgot(true)}
                  className="text-sky-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-sky-500 text-white py-2 rounded-lg shadow-md hover:bg-sky-600 transition"
              >
                Sign In
              </motion.button>
            </motion.form>
          ) : (
            // 🔹 Sign Up Form
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4"
              onSubmit={handleUserSignUp}
            >
              <input
                type="text"
                name="name"
                value={signUpData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="email"
                name="email"
                value={signUpData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="tel"
                name="number"
                value={signUpData.number}
                onChange={handleChange}
                placeholder="Mobile Number"
                pattern="[0-9]{10}"
                required
                className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="password"
                name="password"
                value={signUpData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="password"
                name="confirmPassword"
                value={signUpData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="bg-indigo-500 text-white py-2 rounded-lg shadow-md hover:bg-indigo-600 transition disabled:opacity-60"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {!isForgot && (
          <p className="text-sm text-gray-600 text-center mt-6">
            {isSignIn ? "Don’t have an account? " : "Already have an account? "}
            <button
              onClick={toggleForm}
              className="text-sky-600 font-semibold hover:underline"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        )}
      </motion.div>
    </div>
  );
}
