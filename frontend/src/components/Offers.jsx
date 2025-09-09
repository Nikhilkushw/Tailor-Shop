"use client";
import { motion } from "framer-motion";
import offers from "../data/offers";

export default function Offers() {
  if (!offers.length) return null;

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
        Offers
      </motion.h2>

      {/* Offers Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-6"
      >
        {offers.map((o, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
            className="p-6 rounded-2xl border bg-sky-50 cursor-pointer transition-transform"
          >
            <div className="text-lg font-semibold text-sky-700">{o.title}</div>
            <p className="text-gray-700 mt-1">{o.desc}</p>
            {o.valid && (
              <p className="text-xs text-gray-500 mt-2">
                Valid till: {o.valid}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
