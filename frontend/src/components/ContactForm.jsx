"use client";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // ✅ success/error message

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setStatus({ type: "success", msg: "✅ Message sent successfully!" });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", msg: "❌ Failed to send. Please try again." });
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800"
      >
        📩 Contact Us
      </motion.h2>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="flex flex-col gap-4 p-8 border rounded-2xl shadow-lg bg-white"
      >
        {/* Inputs */}
        {["name", "email", "phone"].map((field, i) => (
          <motion.input
            key={i}
            type={field === "email" ? "email" : "text"}
            name={field}
            placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
            value={form[field]}
            onChange={handleChange}
            required
            variants={fadeUp}
            className="border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-400 outline-none transition"
          />
        ))}

        {/* Message */}
        <motion.textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          variants={fadeUp}
          className="border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-400 outline-none transition h-32 resize-none"
        />

        {/* Button */}
        <motion.button
          type="submit"
          variants={fadeUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-sky-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-sky-700 transition"
        >
          🚀 Send Message
        </motion.button>
      </motion.form>

      {/* Status Message */}
      {status && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 text-center font-medium ${
            status.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status.msg}
        </motion.p>
      )}
    </section>
  );
}
