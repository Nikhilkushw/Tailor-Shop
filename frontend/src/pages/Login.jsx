"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgot, setIsForgot] = useState(false); // ✅ Forgot Password toggle

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setIsForgot(false); // reset forgot when switching
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-100 to-indigo-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
          {isForgot
            ? "Reset Password 🔑"
            : isSignIn
            ? "Welcome Back 👋"
            : "Create Account ✨"}
        </h2>

        {/* Forms */}
        <AnimatePresence mode="wait">
          {isForgot ? (
            // 🔹 Forgot Password Form
            <motion.form
              key="forgot"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("📩 Password reset link sent (backend connect karo)");
              }}
            >
              <input
                type="email"
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
              onSubmit={(e) => {
                e.preventDefault();
                alert("✅ Signed In (backend connect karo)");
              }}
            >
              <input
                type="email"
                placeholder="Email Address"
                required
                className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-400"
              />
              <input
                type="password"
                placeholder="Password"
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
              onSubmit={(e) => {
                e.preventDefault();
                alert("✅ Signed Up (backend connect karo)");
              }}
            >
              <input
                type="text"
                placeholder="Full Name"
                required
                className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                pattern="[0-9]{10}"
                required
                className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-500 text-white py-2 rounded-lg shadow-md hover:bg-indigo-600 transition"
              >
                Sign Up
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
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
