"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="container py-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
      >
        {/* Heading */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center"
        >
          Owner ke baare mein
        </motion.h1>

        {/* Owner Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 leading-relaxed text-lg mb-8 text-center"
        >
          Namaste! Main{" "}
          <span className="font-semibold text-gray-900">Parvati Kushwah</span>{" "}
          hoon. Mere paas{" "}
          <span className="font-semibold">30+ years</span> ka experience hai{" "}
          <span className="text-indigo-600 font-medium">
            high-quality stitching, perfect fitting
          </span>{" "}
          aur{" "}
          <span className="text-indigo-600 font-medium">on-time delivery</span>{" "}
          mein. Hum{" "}
          <span className="font-semibold">Ladies</span> ke liye
          designer kapde banate hain.
        </motion.p>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Specialization",
              desc: "Suits, Sherwani, Lehenga, Blouse",
            },
            {
              title: "Express Alterations",
              desc: "Same-day service (T&C apply)",
            },
            {
              title: "Styling Guidance",
              desc: "Fabric suggestions & personal styling tips",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-indigo-50 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
