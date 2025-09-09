"use client";
import { motion } from "framer-motion";
import services from "../data/services";

export default function Services() {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="container py-12">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold mb-6 text-gray-800"
      >
        Our Services
      </motion.h2>

      {/* Services Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((s, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
            className="p-6 rounded-2xl border bg-white shadow-sm cursor-pointer transition-transform"
          >
            <div className="text-xl font-semibold text-sky-700">{s.title}</div>
            <p className="text-gray-600 mt-2">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
